const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const SCALE_STEPS = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
};
const PRESETS = [
  { value: "third-up", label: "Diatonic 3rd above", steps: 2 },
  { value: "third-down", label: "Diatonic 3rd below", steps: -2 },
  { value: "fourth-up", label: "Diatonic 4th above", steps: 3 },
  { value: "fourth-down", label: "Diatonic 4th below", steps: -3 },
  { value: "fifth-up", label: "Diatonic 5th above", steps: 4 },
  { value: "octave-up", label: "Octave above", semitones: 12 },
  { value: "octave-down", label: "Octave below", semitones: -12 },
];

const elements = {
  file: document.getElementById("audio-file"),
  demoButton: document.getElementById("demo-btn"),
  fileLabel: document.getElementById("file-label"),
  statusLabel: document.getElementById("status-label"),
  statusValue: document.getElementById("status-value"),
  key: document.getElementById("key-select"),
  scale: document.getElementById("scale-select"),
  summary: document.getElementById("analysis-summary"),
  duration: document.getElementById("duration-label"),
  confidence: document.getElementById("confidence-label"),
  canvas: document.getElementById("timeline"),
  originalVolume: document.getElementById("original-volume"),
  suara2Volume: document.getElementById("suara2-volume"),
  suara3Volume: document.getElementById("suara3-volume"),
  suara2Preset: document.getElementById("suara2-preset"),
  suara3Preset: document.getElementById("suara3-preset"),
  mixButton: document.getElementById("mix-btn"),
  stopButton: document.getElementById("stop-btn"),
  playButtons: Array.from(document.querySelectorAll("[data-play]")),
};

const state = {
  context: null,
  audioBuffer: null,
  frames: [],
  harmony: {
    suara2: [],
    suara3: [],
  },
  activeNodes: [],
};

function initControls() {
  elements.key.innerHTML = NOTE_NAMES.map((note) => `<option value="${note}">${note}</option>`).join("");
  elements.key.value = "C";

  const options = PRESETS.map((preset) => `<option value="${preset.value}">${preset.label}</option>`).join("");
  elements.suara2Preset.innerHTML = options;
  elements.suara3Preset.innerHTML = options;
  elements.suara2Preset.value = "third-up";
  elements.suara3Preset.value = "third-down";

  [...elements.playButtons, elements.mixButton, elements.stopButton].forEach((button) => {
    button.disabled = button.id !== "stop-btn";
  });
}

function setStatus(label, value) {
  elements.statusLabel.textContent = label;
  elements.statusValue.textContent = value;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function getAudioContext() {
  if (!state.context) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    state.context = new AudioContextClass();
  }
  return state.context;
}

function getMonoSamples(buffer) {
  const length = buffer.length;
  const channels = buffer.numberOfChannels;
  const mono = new Float32Array(length);
  for (let channel = 0; channel < channels; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      mono[index] += data[index] / channels;
    }
  }
  return mono;
}

function rms(samples, start, size) {
  let sum = 0;
  for (let index = 0; index < size; index += 1) {
    const value = samples[start + index] || 0;
    sum += value * value;
  }
  return Math.sqrt(sum / size);
}

function detectPitch(frame, sampleRate) {
  const size = frame.length;
  let frameRms = 0;
  for (let i = 0; i < size; i += 1) {
    frameRms += frame[i] * frame[i];
  }
  frameRms = Math.sqrt(frameRms / size);
  if (frameRms < 0.012) {
    return null;
  }

  const minFrequency = 80;
  const maxFrequency = 880;
  const minLag = Math.floor(sampleRate / maxFrequency);
  const maxLag = Math.floor(sampleRate / minFrequency);
  let bestLag = 0;
  let bestScore = 0;

  for (let lag = minLag; lag <= maxLag; lag += 1) {
    let correlation = 0;
    let energyA = 0;
    let energyB = 0;
    const compareLength = size - lag;
    for (let i = 0; i < compareLength; i += 1) {
      const a = frame[i];
      const b = frame[i + lag];
      correlation += a * b;
      energyA += a * a;
      energyB += b * b;
    }
    const score = correlation / Math.sqrt(energyA * energyB || 1);
    if (score > bestScore) {
      bestScore = score;
      bestLag = lag;
    }
  }

  if (bestScore < 0.42 || bestLag === 0) {
    return null;
  }

  return {
    frequency: sampleRate / bestLag,
    confidence: Math.min(1, Math.max(0, (bestScore - 0.42) / 0.48)),
    level: Math.min(1, frameRms * 16),
  };
}

function analyzeMelody(buffer) {
  const samples = getMonoSamples(buffer);
  const frameSize = 2048;
  const hopSize = 1024;
  const frames = [];

  for (let start = 0; start + frameSize < samples.length; start += hopSize) {
    const frame = samples.subarray(start, start + frameSize);
    const detected = detectPitch(frame, buffer.sampleRate);
    frames.push({
      time: start / buffer.sampleRate,
      duration: hopSize / buffer.sampleRate,
      frequency: detected?.frequency || null,
      confidence: detected?.confidence || 0,
      level: detected?.level || Math.min(1, rms(samples, start, frameSize) * 16),
    });
  }

  return smoothFrames(frames);
}

function smoothFrames(frames) {
  return frames.map((frame, index) => {
    if (!frame.frequency) {
      return frame;
    }
    const nearby = frames
      .slice(Math.max(0, index - 2), index + 3)
      .filter((candidate) => candidate.frequency && Math.abs(candidate.frequency - frame.frequency) / frame.frequency < 0.18);

    if (nearby.length < 2 && frame.confidence < 0.62) {
      return { ...frame, frequency: null, confidence: 0 };
    }

    const average = nearby.reduce((sum, candidate) => sum + candidate.frequency, 0) / nearby.length;
    return { ...frame, frequency: average };
  });
}

function frequencyToMidi(frequency) {
  return Math.round(69 + 12 * Math.log2(frequency / 440));
}

function midiToFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function nearestScaleMidi(midi, keyName, scaleName) {
  const root = NOTE_NAMES.indexOf(keyName);
  const scale = SCALE_STEPS[scaleName];
  let best = midi;
  let bestDistance = Infinity;
  for (let octave = -2; octave <= 10; octave += 1) {
    for (const step of scale) {
      const candidate = root + step + octave * 12;
      const distance = Math.abs(candidate - midi);
      if (distance < bestDistance) {
        best = candidate;
        bestDistance = distance;
      }
    }
  }
  return best;
}

function transposeDiatonic(midi, keyName, scaleName, diatonicSteps) {
  const root = NOTE_NAMES.indexOf(keyName);
  const scale = SCALE_STEPS[scaleName];
  const source = nearestScaleMidi(midi, keyName, scaleName);
  const relative = source - root;
  const octave = Math.floor(relative / 12);
  const pitchClass = ((relative % 12) + 12) % 12;
  const degree = scale.indexOf(pitchClass);
  if (degree < 0) {
    return source + diatonicSteps * 2;
  }

  const targetDegree = degree + diatonicSteps;
  const octaveShift = Math.floor(targetDegree / scale.length);
  const normalizedDegree = ((targetDegree % scale.length) + scale.length) % scale.length;
  return root + scale[normalizedDegree] + (octave + octaveShift) * 12;
}

function buildHarmony(frames, presetValue) {
  const preset = PRESETS.find((candidate) => candidate.value === presetValue) || PRESETS[0];
  return frames.map((frame) => {
    if (!frame.frequency) {
      return { ...frame, frequency: null };
    }
    const sourceMidi = frequencyToMidi(frame.frequency);
    const snapped = nearestScaleMidi(sourceMidi, elements.key.value, elements.scale.value);
    const harmonyMidi = typeof preset.semitones === "number"
      ? snapped + preset.semitones
      : transposeDiatonic(snapped, elements.key.value, elements.scale.value, preset.steps);
    return {
      ...frame,
      frequency: midiToFrequency(harmonyMidi),
      midi: harmonyMidi,
    };
  });
}

function regenerateHarmony() {
  state.harmony.suara2 = buildHarmony(state.frames, elements.suara2Preset.value);
  state.harmony.suara3 = buildHarmony(state.frames, elements.suara3Preset.value);
  drawTimeline();
}

function voicedStats(frames) {
  const voiced = frames.filter((frame) => frame.frequency);
  const averageConfidence = voiced.length
    ? voiced.reduce((sum, frame) => sum + frame.confidence, 0) / voiced.length
    : 0;
  return {
    voiced,
    confidence: averageConfidence,
    coverage: frames.length ? voiced.length / frames.length : 0,
  };
}

function drawTimeline() {
  const canvas = elements.canvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fbf7f0";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(13, 63, 67, 0.11)";
  ctx.lineWidth = 1;
  for (let line = 1; line < 5; line += 1) {
    const y = (height / 5) * line;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  if (!state.frames.length || !state.audioBuffer) {
    ctx.fillStyle = "#68706c";
    ctx.font = "600 18px Inter, sans-serif";
    ctx.fillText("Upload audio to see the melody contour.", 28, height / 2);
    return;
  }

  drawBars(ctx, state.frames, "#ef765f", 0.2);
  drawLine(ctx, state.frames, "#0d3f43", 2.4);
  drawLine(ctx, state.harmony.suara2, "#0d6b70", 2);
  drawLine(ctx, state.harmony.suara3, "#ef765f", 2);
}

function xFor(frame) {
  return (frame.time / state.audioBuffer.duration) * elements.canvas.width;
}

function yFor(frequency) {
  const minMidi = 43;
  const maxMidi = 84;
  const midi = 69 + 12 * Math.log2(frequency / 440);
  const normalized = (midi - minMidi) / (maxMidi - minMidi);
  return elements.canvas.height - Math.min(1, Math.max(0, normalized)) * (elements.canvas.height - 24) - 12;
}

function drawBars(ctx, frames, color, opacity) {
  const barWidth = Math.max(1, elements.canvas.width / Math.max(1, frames.length));
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  frames.forEach((frame) => {
    const height = Math.max(2, frame.confidence * elements.canvas.height * 0.72);
    ctx.fillRect(xFor(frame), elements.canvas.height - height, barWidth, height);
  });
  ctx.globalAlpha = 1;
}

function drawLine(ctx, frames, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  let drawing = false;
  ctx.beginPath();
  frames.forEach((frame) => {
    if (!frame.frequency) {
      drawing = false;
      return;
    }
    const x = xFor(frame);
    const y = yFor(frame.frequency);
    if (!drawing) {
      ctx.moveTo(x, y);
      drawing = true;
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
}

async function handleFile(file) {
  if (!file) {
    return;
  }
  stopPlayback();
  setStatus("Analyzing", "Decoding audio in browser");
  elements.fileLabel.textContent = file.name;

  try {
    const context = getAudioContext();
    const data = await file.arrayBuffer();
    const buffer = await context.decodeAudioData(data.slice(0));
    state.audioBuffer = buffer;
    state.frames = analyzeMelody(buffer);
    regenerateHarmony();

    const stats = voicedStats(state.frames);
    elements.duration.textContent = formatTime(buffer.duration);
    elements.confidence.textContent = `${Math.round(stats.confidence * 100)}%`;
    elements.summary.textContent = `${Math.round(stats.coverage * 100)}% voiced frames detected`;
    setStatus("Ready", "Guide parts generated");
    [...elements.playButtons, elements.mixButton, elements.stopButton].forEach((button) => {
      button.disabled = false;
    });
  } catch (error) {
    setStatus("Could not decode", error.message || "Try another audio file");
    elements.summary.textContent = "Audio decode failed";
  }
}

async function handleDemoTone() {
  stopPlayback();
  setStatus("Analyzing", "Decoding demo WAV in browser");
  elements.fileLabel.textContent = "Demo: C - E - G melody";

  try {
    const context = getAudioContext();
    const data = await createDemoWavBlob().arrayBuffer();
    const buffer = await context.decodeAudioData(data.slice(0));
    state.audioBuffer = buffer;
    state.frames = analyzeMelody(buffer);
    regenerateHarmony();

    const stats = voicedStats(state.frames);
    elements.duration.textContent = formatTime(buffer.duration);
    elements.confidence.textContent = `${Math.round(stats.confidence * 100)}%`;
    elements.summary.textContent = `${Math.round(stats.coverage * 100)}% voiced frames detected`;
    setStatus("Ready", "Guide parts generated");
    [...elements.playButtons, elements.mixButton, elements.stopButton].forEach((button) => {
      button.disabled = false;
    });
  } catch (error) {
    setStatus("Could not decode", error.message || "Demo generation failed");
    elements.summary.textContent = "Demo decode failed";
  }
}

function createDemoWavBlob() {
  const sampleRate = 44100;
  const seconds = 2.4;
  const samples = Math.floor(sampleRate * seconds);
  const data = new DataView(new ArrayBuffer(samples * 2));

  for (let index = 0; index < samples; index += 1) {
    const time = index / sampleRate;
    const frequency = time < 0.8 ? 261.63 : time < 1.6 ? 329.63 : 392;
    const envelope = Math.min(1, time * 20, (seconds - time) * 20);
    const sample = Math.max(-1, Math.min(1, Math.sin(2 * Math.PI * frequency * time) * 0.45 * envelope));
    data.setInt16(index * 2, Math.round(sample * 32767), true);
  }

  const header = new DataView(new ArrayBuffer(44));
  writeAscii(header, 0, "RIFF");
  header.setUint32(4, 36 + data.byteLength, true);
  writeAscii(header, 8, "WAVE");
  writeAscii(header, 12, "fmt ");
  header.setUint32(16, 16, true);
  header.setUint16(20, 1, true);
  header.setUint16(22, 1, true);
  header.setUint32(24, sampleRate, true);
  header.setUint32(28, sampleRate * 2, true);
  header.setUint16(32, 2, true);
  header.setUint16(34, 16, true);
  writeAscii(header, 36, "data");
  header.setUint32(40, data.byteLength, true);

  return new Blob([header, data], { type: "audio/wav" });
}

function writeAscii(view, offset, text) {
  for (let index = 0; index < text.length; index += 1) {
    view.setUint8(offset + index, text.charCodeAt(index));
  }
}

function stopPlayback() {
  state.activeNodes.forEach((node) => {
    try {
      node.stop();
    } catch (error) {
      // Already stopped.
    }
  });
  state.activeNodes = [];
}

function playOriginal(context, destination, volume) {
  const source = context.createBufferSource();
  const gain = context.createGain();
  source.buffer = state.audioBuffer;
  gain.gain.value = volume;
  source.connect(gain);
  gain.connect(destination);
  source.start();
  state.activeNodes.push(source);
}

function playGuide(context, frames, destination, volume, waveform = "sine") {
  const master = context.createGain();
  master.gain.value = volume * 0.18;
  master.connect(destination);

  buildGuideSegments(frames).forEach((segment) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const attackEnd = Math.min(segment.start + 0.024, segment.end);
    const releaseStart = Math.max(attackEnd, segment.end - 0.024);
    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(segment.frequency, context.currentTime + segment.start);
    gain.gain.setValueAtTime(0.0001, context.currentTime + segment.start);
    gain.gain.linearRampToValueAtTime(segment.level * 0.9 + 0.1, context.currentTime + attackEnd);
    gain.gain.setValueAtTime(segment.level * 0.9 + 0.1, context.currentTime + releaseStart);
    gain.gain.linearRampToValueAtTime(0.0001, context.currentTime + segment.end);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(context.currentTime + segment.start);
    oscillator.stop(context.currentTime + segment.end + 0.02);
    state.activeNodes.push(oscillator);
  });
}

function buildGuideSegments(frames) {
  const segments = [];
  let current = null;

  frames.forEach((frame) => {
    if (!frame.frequency || frame.confidence < 0.2 || typeof frame.midi !== "number") {
      if (current) {
        segments.push(current);
        current = null;
      }
      return;
    }

    const end = frame.time + frame.duration;
    if (current && current.midi === frame.midi && frame.time - current.end < frame.duration * 1.6) {
      current.end = end;
      current.level = Math.max(current.level, frame.level);
      return;
    }

    if (current) {
      segments.push(current);
    }
    current = {
      start: frame.time,
      end,
      frequency: frame.frequency,
      midi: frame.midi,
      level: frame.level,
    };
  });

  if (current) {
    segments.push(current);
  }

  return segments;
}

async function playMode(mode) {
  if (!state.audioBuffer) {
    return;
  }
  const context = getAudioContext();
  if (context.state === "suspended") {
    await context.resume();
  }
  stopPlayback();
  const destination = context.destination;

  if (mode === "original" || mode === "mix") {
    playOriginal(context, destination, Number(elements.originalVolume.value));
  }
  if (mode === "suara2" || mode === "mix") {
    playGuide(context, state.harmony.suara2, destination, Number(elements.suara2Volume.value), "triangle");
  }
  if (mode === "suara3" || mode === "mix") {
    playGuide(context, state.harmony.suara3, destination, Number(elements.suara3Volume.value), "sine");
  }
  setStatus("Playing", mode === "mix" ? "Practice Mix" : mode.replace("suara", "Suara "));
}

elements.file.addEventListener("change", (event) => {
  handleFile(event.target.files[0]);
});

elements.demoButton.addEventListener("click", handleDemoTone);

[elements.key, elements.scale, elements.suara2Preset, elements.suara3Preset].forEach((control) => {
  control.addEventListener("change", () => {
    if (!state.frames.length) {
      return;
    }
    regenerateHarmony();
    setStatus("Ready", "Guide parts regenerated");
  });
});

elements.playButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playMode(button.dataset.play);
  });
});

elements.mixButton.addEventListener("click", () => {
  playMode("mix");
});

elements.stopButton.addEventListener("click", () => {
  stopPlayback();
  setStatus("Ready", state.audioBuffer ? "Guide parts generated" : "Upload a clear lead vocal");
});

window.addEventListener("beforeunload", stopPlayback);

initControls();
drawTimeline();
