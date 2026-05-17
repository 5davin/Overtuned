import {
  BODY_TYPES,
  CATEGORIES,
  CHECK_MODULES,
  DEFAULT_DASHBOARD_VEHICLE,
  FUEL_TYPES,
  MODEL_PROFILES,
  SOURCE_LINKS,
  STATUS_OPTIONS,
  TRANSMISSIONS,
} from "./data.js";

const STORAGE_KEY = "siagamobil-state-v1";
const appRoot = document.getElementById("app");
const modulesById = new Map(CHECK_MODULES.map((entry) => [entry.id, entry]));

const UI_TEXT = {
  id: {
    brand: "SiagaMobil",
    subtitle: "Belajar cek kondisi mobil untuk jalanan dan kebiasaan berkendara di Indonesia.",
    disclaimer:
      "Aplikasi ini bersifat edukatif. Jika muncul gejala serius, berhenti di tempat aman dan hubungi bengkel atau bantuan darurat.",
    chooseLanguage: "Pilih bahasa",
    startSetup: "Mulai dengan profil kendaraan pertama",
    startApp: "Masuk ke aplikasi",
    home: "Beranda",
    learn: "Belajar cek",
    history: "Riwayat",
    garage: "Garasi",
    reminders: "Pengingat",
    settings: "Pengaturan",
    activeVehicle: "Kendaraan aktif",
    noVehicle: "Belum ada kendaraan",
    dueSoon: "Perlu perhatian",
    recommended: "Rekomendasi berikutnya",
    recentChecks: "Pemeriksaan terbaru",
    createVehicle: "Tambah kendaraan",
    updateOdometer: "Perbarui odometer",
    save: "Simpan",
    cancel: "Batal",
    openGuide: "Buka panduan",
    logCheck: "Simpan hasil cek",
    addReminder: "Tambah pengingat",
    language: "Bahasa",
    units: "Satuan",
    kilometersOnly: "Kilometer adalah satuan default dan satu-satunya di v1.",
    useLanguage: "Gunakan bahasa ini",
    emptyHistory: "Belum ada hasil pemeriksaan.",
    emptyReminders: "Belum ada pengingat. Tambahkan pengingat berbasis hari atau kilometer.",
    noLessons: "Belum ada modul di kategori ini.",
    firstVehicleCallout: "Lengkapi mobil pertama agar rekomendasi dan pengingat bisa dihitung.",
    inspectionStatus: "Status kondisi",
    odometer: "Odometer (km)",
    notes: "Catatan",
    date: "Tanggal",
    optionalPhoto: "Foto opsional",
    reminderMode: "Tipe pengingat",
    intervalDays: "Interval hari",
    intervalKm: "Interval kilometer",
    nextDue: "Jatuh tempo berikutnya",
    setActive: "Jadikan aktif",
    module: "Modul cek",
    vehicle: "Kendaraan",
    onboardingTitle: "Bangun kebiasaan cek mobil dengan bahasa yang nyaman untuk Anda.",
    onboardingCopy:
      "Aplikasi ini mengajarkan langkah aman untuk memeriksa oli, ban, rem, aki, lampu, sampai cek pasca banjir dan persiapan mudik.",
    nativeContent: "Konten Indonesia ditulis sebagai konten asli, bukan sekadar terjemahan.",
    learnIntro: "Semua pelajaran dimulai dari langkah aman, lalu tanda normal, tanda bahaya, dan tindakan berikutnya.",
    indonesiaFocus: "Fokus Indonesia",
    historyFilterVehicle: "Filter kendaraan",
    historyFilterModule: "Filter modul",
    reminderDateMode: "Berbasis hari",
    reminderKmMode: "Berbasis km",
    staleMileage: "Perbarui kilometer kendaraan agar pengingat km lebih akurat.",
    noRecentLogs: "Belum ada log pemeriksaan untuk kendaraan ini.",
    safetyFirst: "Utamakan keselamatan",
    urgentStop:
      "Jika ada lampu merah kritis, rem berubah drastis, suhu naik, atau mesin diduga kemasukan air, hentikan penggunaan dan minta bantuan profesional.",
    latestVehicleStatus: "Status kendaraan terbaru",
    allVehicles: "Semua kendaraan",
    allModules: "Semua modul",
    dueNow: "Perlu ditindak sekarang",
    dueLater: "Belum jatuh tempo",
    reminderCreated: "Pengingat tersimpan.",
    inspectionSaved: "Hasil cek tersimpan.",
    vehicleSaved: "Kendaraan tersimpan.",
    odometerUpdated: "Odometer diperbarui.",
    deleteReminder: "Hapus",
    backToLearn: "Kembali ke daftar modul",
    safetyPrep: "Persiapan aman",
    whyMatters: "Kenapa penting",
    whenCheck: "Kapan dicek",
    toolsNeeded: "Peralatan",
    normalSigns: "Tanda normal",
    warningSigns: "Tanda bahaya",
    commonMistakes: "Kesalahan umum",
    nextActions: "Tindakan berikutnya",
    indonesiaNotes: "Catatan Indonesia",
    instructionMode: "Mode panduan",
    urgencyGuide: "Panduan urgensi",
    photoAttached: "Foto terlampir",
    readiness: "Kesiapan",
    viewAll: "Lihat semua",
    recentUpdate: "Pembaruan terakhir",
    activeTag: "Aktif",
    kmStatusCurrent: "km saat ini",
    kmStatusOverdue: "km melewati target",
    brandLabel: "Merek",
    modelLabel: "Model",
    yearLabel: "Tahun",
    fuelLabel: "Bahan bakar",
    transmissionLabel: "Transmisi",
    bodyTypeLabel: "Tipe bodi",
    dashboardTitle: "Dashboard kondisi mobil",
    healthScore: "Skor kondisi",
    analysisTitle: "Analisis & rekomendasi",
    modelProfile: "Profil model",
    ownerFocus: "Fokus pemilik Brio",
    sourceBasis: "Dasar sumber",
    quickActions: "Aksi cepat",
    recommendationNow: "Tindakan sekarang",
    recommendationSoon: "Tindakan berikutnya",
    recommendationWatch: "Hal yang perlu dipantau",
    noAnalysisYet: "Belum ada log cukup banyak, jadi rekomendasi saat ini memakai profil kendaraan, pengingat, dan fokus perawatan dasar Honda.",
    overdueCount: "Item yang sudah jatuh tempo",
    profileMatched: "Profil cocok",
    trackStatus: "Lacak, perbarui, dan analisis kondisi mobil Anda.",
    openOilGuide: "Cek oli",
    openTireGuide: "Cek ban",
    openBrakeGuide: "Cek rem",
    sourcedForIndonesia: "Disusun dari sumber Honda yang relevan untuk mobil di Indonesia.",
    sourceTagOfficial: "Sumber resmi",
    skillTitle: "Skill analisis",
    skillBlurb: "Skill Codex terpasang untuk analisis kondisi mobil Indonesia dan rekomendasi tindakan.",
    baselineAssumption: "Asumsi default: kendaraan contoh Anda adalah 2018 Honda Brio Satya dan data tetap bisa diedit kapan saja.",
    conditionSnapshot: "Snapshot kondisi",
    lastServiceDate: "Tanggal servis terakhir",
    lastOilChangeKm: "Kilometer ganti oli terakhir",
    oilStatusLabel: "Status oli",
    coolantStatusLabel: "Status coolant",
    batteryStatusLabel: "Status aki",
    brakeStatusLabel: "Status rem",
    tireStatusLabel: "Status ban",
    warningLightLabel: "Lampu peringatan",
    floodExposureLabel: "Paparan banjir",
    healthSignalsSaved: "Parameter kondisi diperbarui.",
    warningLightsNone: "Tidak ada lampu peringatan aktif",
    activeWarnings: "Ada lampu peringatan aktif",
    floodNone: "Tidak ada riwayat banjir terbaru",
    floodRecent: "Baru melewati genangan / banjir ringan",
    floodSevere: "Riwayat banjir berat / perlu inspeksi",
    lessonImage: "Ilustrasi langkah",
  },
  en: {
    brand: "SiagaMobil",
    subtitle: "Learn car checks with guidance tuned for Indonesian roads and ownership patterns.",
    disclaimer:
      "This app is educational only. If you notice serious symptoms, stop somewhere safe and contact a workshop or emergency support.",
    chooseLanguage: "Choose your language",
    startSetup: "Start with your first vehicle profile",
    startApp: "Enter app",
    home: "Home",
    learn: "Learn Checks",
    history: "History",
    garage: "Garage",
    reminders: "Reminders",
    settings: "Settings",
    activeVehicle: "Active vehicle",
    noVehicle: "No vehicle yet",
    dueSoon: "Needs attention",
    recommended: "Recommended next checks",
    recentChecks: "Recent checks",
    createVehicle: "Add vehicle",
    updateOdometer: "Update odometer",
    save: "Save",
    cancel: "Cancel",
    openGuide: "Open guide",
    logCheck: "Save check result",
    addReminder: "Add reminder",
    language: "Language",
    units: "Units",
    kilometersOnly: "Kilometers are the default and only unit in v1.",
    useLanguage: "Use this language",
    emptyHistory: "No inspection results yet.",
    emptyReminders: "No reminders yet. Add a day-based or kilometer-based reminder.",
    noLessons: "No lessons in this category yet.",
    firstVehicleCallout: "Add your first vehicle so recommendations and reminders can be calculated.",
    inspectionStatus: "Condition status",
    odometer: "Odometer (km)",
    notes: "Notes",
    date: "Date",
    optionalPhoto: "Optional photo",
    reminderMode: "Reminder type",
    intervalDays: "Day interval",
    intervalKm: "Kilometer interval",
    nextDue: "Next due",
    setActive: "Set active",
    module: "Check module",
    vehicle: "Vehicle",
    onboardingTitle: "Build a safer car-check habit in the language that fits you best.",
    onboardingCopy:
      "The app teaches safe steps for oil, tires, brakes, battery, lights, flood recovery, and pre-mudik preparation.",
    nativeContent: "Indonesian content is written natively, not treated as a direct translation.",
    learnIntro: "Every lesson starts with safe prep, then normal signs, warning signs, and what to do next.",
    indonesiaFocus: "Indonesia focus",
    historyFilterVehicle: "Filter vehicle",
    historyFilterModule: "Filter module",
    reminderDateMode: "Day based",
    reminderKmMode: "Kilometer based",
    staleMileage: "Update your vehicle mileage so kilometer reminders stay accurate.",
    noRecentLogs: "No recent logs for this vehicle yet.",
    safetyFirst: "Safety first",
    urgentStop:
      "If critical red warnings appear, braking changes sharply, temperature rises, or the engine may have ingested water, stop using the car and seek professional help.",
    latestVehicleStatus: "Latest vehicle status",
    allVehicles: "All vehicles",
    allModules: "All modules",
    dueNow: "Action needed now",
    dueLater: "Not due yet",
    reminderCreated: "Reminder saved.",
    inspectionSaved: "Check result saved.",
    vehicleSaved: "Vehicle saved.",
    odometerUpdated: "Odometer updated.",
    deleteReminder: "Delete",
    backToLearn: "Back to lesson library",
    safetyPrep: "Safety prep",
    whyMatters: "Why it matters",
    whenCheck: "When to check",
    toolsNeeded: "Tools needed",
    normalSigns: "Normal signs",
    warningSigns: "Warning signs",
    commonMistakes: "Common mistakes",
    nextActions: "Next actions",
    indonesiaNotes: "Indonesia notes",
    instructionMode: "Instruction mode",
    urgencyGuide: "Urgency guide",
    photoAttached: "Photo attached",
    readiness: "Readiness",
    viewAll: "View all",
    recentUpdate: "Latest update",
    activeTag: "Active",
    kmStatusCurrent: "current km",
    kmStatusOverdue: "km above target",
    brandLabel: "Brand",
    modelLabel: "Model",
    yearLabel: "Year",
    fuelLabel: "Fuel",
    transmissionLabel: "Transmission",
    bodyTypeLabel: "Body type",
    dashboardTitle: "Car condition dashboard",
    healthScore: "Health score",
    analysisTitle: "Analysis & recommendations",
    modelProfile: "Model profile",
    ownerFocus: "Brio owner focus",
    sourceBasis: "Source basis",
    quickActions: "Quick actions",
    recommendationNow: "Do now",
    recommendationSoon: "Plan next",
    recommendationWatch: "Keep watching",
    noAnalysisYet: "There are not many logs yet, so the current recommendations use the vehicle profile, reminders, and Honda's core maintenance focus areas.",
    overdueCount: "Overdue items",
    profileMatched: "Profile match",
    trackStatus: "Track, update, and analyze your car condition.",
    openOilGuide: "Check oil",
    openTireGuide: "Check tires",
    openBrakeGuide: "Check brakes",
    sourcedForIndonesia: "Built from Honda sources relevant to cars in Indonesia.",
    sourceTagOfficial: "Official source",
    skillTitle: "Analysis skill",
    skillBlurb: "A Codex skill is installed for Indonesian car-condition analysis and action recommendations.",
    baselineAssumption: "Default assumption: your example vehicle is a 2018 Honda Brio Satya, and every field remains editable.",
    conditionSnapshot: "Condition snapshot",
    lastServiceDate: "Last service date",
    lastOilChangeKm: "Last oil change mileage",
    oilStatusLabel: "Oil status",
    coolantStatusLabel: "Coolant status",
    batteryStatusLabel: "Battery status",
    brakeStatusLabel: "Brake status",
    tireStatusLabel: "Tire status",
    warningLightLabel: "Warning lights",
    floodExposureLabel: "Flood exposure",
    healthSignalsSaved: "Condition parameters updated.",
    warningLightsNone: "No active warning lights",
    activeWarnings: "Active warning lights present",
    floodNone: "No recent flood exposure",
    floodRecent: "Recent shallow water / light flood exposure",
    floodSevere: "Serious flood exposure / inspection needed",
    lessonImage: "Step illustration",
  },
};

const CONDITION_SIGNAL_OPTIONS = [
  { value: "ok", label: STATUS_OPTIONS[0].label },
  { value: "monitor", label: STATUS_OPTIONS[1].label },
  { value: "service-soon", label: STATUS_OPTIONS[2].label },
  { value: "urgent", label: STATUS_OPTIONS[3].label },
];

const WARNING_LIGHT_OPTIONS = [
  { value: "none", label: { id: "Tidak ada", en: "None" } },
  { value: "monitor", label: { id: "Ada indikator kuning", en: "Yellow warning present" } },
  { value: "urgent", label: { id: "Ada indikator merah", en: "Red warning present" } },
];

const FLOOD_EXPOSURE_OPTIONS = [
  { value: "none", label: { id: "Tidak ada", en: "None" } },
  { value: "recent", label: { id: "Genangan ringan", en: "Recent shallow water" } },
  { value: "severe", label: { id: "Banjir berat", en: "Serious flood exposure" } },
];

const persistentState = loadState();
const uiState = {
  historyVehicle: "all",
  historyModule: "all",
  reminderMode: "date",
  flash: "",
};

registerServiceWorker();
render();

appRoot.addEventListener("click", handleClick);
appRoot.addEventListener("submit", handleSubmit);
appRoot.addEventListener("change", handleChange);

function loadState() {
  const starterVehicle = {
    id: "vehicle-brio-satya-2018",
    ...DEFAULT_DASHBOARD_VEHICLE,
  };
  const defaults = {
    settings: {
      locale: "id",
      units: "km",
    },
    vehicles: [starterVehicle],
    activeVehicleId: starterVehicle.id,
    inspections: [],
    reminders: [],
    view: "home",
    selectedModuleId: "",
  };

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    const state = {
      ...defaults,
      ...parsed,
      settings: { ...defaults.settings, ...(parsed.settings || {}) },
      vehicles: Array.isArray(parsed.vehicles) ? parsed.vehicles.map(ensureVehicleShape) : defaults.vehicles,
      inspections: Array.isArray(parsed.inspections) ? parsed.inspections : [],
      reminders: Array.isArray(parsed.reminders) ? parsed.reminders : [],
    };

    if (!state.activeVehicleId && state.vehicles[0]) {
      state.activeVehicleId = state.vehicles[0].id;
    }
    if (state.activeVehicleId && !state.vehicles.some((vehicle) => vehicle.id === state.activeVehicleId) && state.vehicles[0]) {
      state.activeVehicleId = state.vehicles[0].id;
    }
    if (!state.view) {
      state.view = "home";
    }
    return state;
  } catch (_error) {
    return defaults;
  }
}

function ensureVehicleShape(vehicle) {
  const healthSignals = {
    oilStatus: "ok",
    coolantStatus: "ok",
    batteryStatus: "ok",
    brakeStatus: "ok",
    tireStatus: "ok",
    warningLightStatus: "none",
    floodExposure: "none",
    ...(vehicle.healthSignals || {}),
  };

  return {
    ...vehicle,
    lastServiceDate: vehicle.lastServiceDate || "",
    lastOilChangeKm: Number(vehicle.lastOilChangeKm || 0),
    healthSignals,
  };
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentState));
}

function t(key) {
  const locale = persistentState.settings.locale || "en";
  return UI_TEXT[locale][key] || key;
}

function localize(item) {
  const locale = persistentState.settings.locale || "en";
  if (!item) {
    return "";
  }
  return item[locale] ?? item.en ?? "";
}

function getModuleContent(moduleId) {
  const locale = persistentState.settings.locale || "en";
  const module = modulesById.get(moduleId);
  return module ? module.locales[locale] : null;
}

function moduleTitle(moduleId) {
  const content = getModuleContent(moduleId);
  return content ? content.title : moduleId;
}

function activeVehicle() {
  return persistentState.vehicles.find((vehicle) => vehicle.id === persistentState.activeVehicleId) || null;
}

function vehicleLabel(vehicle) {
  return `${vehicle.make} ${vehicle.model} ${vehicle.year}`;
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function matchedModelProfile(vehicle) {
  if (!vehicle) {
    return null;
  }

  const make = normalizeText(vehicle.make);
  const model = normalizeText(vehicle.model);

  return (
    MODEL_PROFILES.find((profile) => {
      const makeMatch = profile.matchers.make.some((candidate) => make.includes(candidate));
      const modelMatch = profile.matchers.model.some((candidate) => model.includes(candidate));
      const yearMatch = !profile.matchers.year || Number(vehicle.year) === Number(profile.matchers.year);
      return makeMatch && modelMatch && yearMatch;
    }) || null
  );
}

function sourceById(sourceId) {
  return SOURCE_LINKS.find((source) => source.id === sourceId) || null;
}

function conditionSignalLabel(value) {
  return localize(CONDITION_SIGNAL_OPTIONS.find((entry) => entry.value === value)?.label || STATUS_OPTIONS[0].label);
}

function warningLightLabel(value) {
  return localize(WARNING_LIGHT_OPTIONS.find((entry) => entry.value === value)?.label || WARNING_LIGHT_OPTIONS[0].label);
}

function floodExposureLabel(value) {
  return localize(FLOOD_EXPOSURE_OPTIONS.find((entry) => entry.value === value)?.label || FLOOD_EXPOSURE_OPTIONS[0].label);
}

function latestInspectionMap(vehicleId) {
  const map = new Map();
  for (const entry of persistentState.inspections
    .filter((item) => item.vehicleId === vehicleId)
    .sort((left, right) => new Date(right.checkedAt) - new Date(left.checkedAt))) {
    if (!map.has(entry.moduleId)) {
      map.set(entry.moduleId, entry);
    }
  }
  return map;
}

function daysSince(dateValue) {
  if (!dateValue) {
    return Number.POSITIVE_INFINITY;
  }
  return Math.floor((Date.now() - new Date(dateValue).getTime()) / (1000 * 60 * 60 * 24));
}

function derivedAnalysis(vehicle) {
  if (!vehicle) {
    return null;
  }

  const profile = matchedModelProfile(vehicle);
  const healthSignals = vehicle.healthSignals || {};
  const latestByModule = latestInspectionMap(vehicle.id);
  const reminders = persistentState.reminders.map(reminderSummary).filter((summary) => summary && summary.vehicle.id === vehicle.id);
  const overdueReminders = reminders.filter((summary) => summary.dueState === "now");
  const recentInspections = [...persistentState.inspections]
    .filter((entry) => entry.vehicleId === vehicle.id)
    .sort((left, right) => new Date(right.checkedAt) - new Date(left.checkedAt));
  const severeInspections = recentInspections.filter((entry) => ["urgent", "service-soon"].includes(entry.status)).slice(0, 3);
  const criticalModules = ["engine-oil", "coolant", "tire-pressure", "brake-fluid", "battery"];
  const uncheckedCriticalModules = criticalModules.filter((moduleId) => !latestByModule.has(moduleId));
  const staleCriticalModules = criticalModules.filter((moduleId) => {
    const latest = latestByModule.get(moduleId);
    return latest && daysSince(latest.checkedAt) > 120;
  });

  let score = 100;
  score -= overdueReminders.length * 7;
  score -= severeInspections.filter((entry) => entry.status === "urgent").length * 18;
  score -= severeInspections.filter((entry) => entry.status === "service-soon").length * 10;
  score -= staleCriticalModules.length * 5;
  score -= uncheckedCriticalModules.length * 3;
  score -= ["service-soon", "urgent"].includes(healthSignals.oilStatus) ? 8 : 0;
  score -= ["service-soon", "urgent"].includes(healthSignals.coolantStatus) ? 7 : 0;
  score -= ["service-soon", "urgent"].includes(healthSignals.brakeStatus) ? 10 : 0;
  score -= ["service-soon", "urgent"].includes(healthSignals.tireStatus) ? 8 : 0;
  score -= ["service-soon", "urgent"].includes(healthSignals.batteryStatus) ? 6 : 0;
  score -= healthSignals.warningLightStatus === "monitor" ? 8 : 0;
  score -= healthSignals.warningLightStatus === "urgent" ? 18 : 0;
  score -= healthSignals.floodExposure === "recent" ? 6 : 0;
  score -= healthSignals.floodExposure === "severe" ? 16 : 0;
  if (isMileageStale(vehicle)) {
    score -= 8;
  }
  if (!recentInspections.length) {
    score -= 12;
  }
  score = Math.max(34, Math.min(99, score));

  const recommendations = [];

  if (uncheckedCriticalModules.includes("engine-oil") || staleCriticalModules.includes("engine-oil")) {
    recommendations.push({
      bucket: "now",
      title: t("openOilGuide"),
      body:
        persistentState.settings.locale === "id"
          ? "Honda menyarankan cek level oli di antara batas bawah dan atas, serta perhatikan warna oli. Untuk Brio yang dipakai harian di kota, ini layak jadi prioritas awal."
          : "Honda recommends checking that engine oil sits between the lower and upper marks and watching the oil color. For a city-driven Brio, this is a strong first priority.",
      moduleId: "engine-oil",
      sourceIds: ["honda-indonesia-home-check"],
    });
  }

  if (["service-soon", "urgent"].includes(healthSignals.oilStatus)) {
    recommendations.push({
      bucket: healthSignals.oilStatus === "urgent" ? "now" : "soon",
      title: t("openOilGuide"),
      body:
        persistentState.settings.locale === "id"
          ? "Snapshot kondisi menunjukkan oli butuh perhatian. Padukan hasil visual pada dipstick dengan riwayat ganti oli terakhir sebelum memutuskan pemakaian lanjutan."
          : "The condition snapshot says oil needs attention. Combine the visual dipstick result with the last oil-change record before deciding on further use.",
      moduleId: "engine-oil",
      sourceIds: ["honda-indonesia-home-check", "honda-indonesia-service"],
    });
  }

  if (uncheckedCriticalModules.includes("tire-pressure") || staleCriticalModules.includes("tire-pressure")) {
    recommendations.push({
      bucket: "now",
      title: t("openTireGuide"),
      body:
        persistentState.settings.locale === "id"
          ? "Honda menekankan tekanan ban harus mengikuti stiker pilar pintu pengemudi atau buku manual. Untuk Brio Satya di jalan kota Indonesia, cek tekanan, alur, dan sidewall secara rutin."
          : "Honda emphasizes that tire pressure should follow the driver-door sticker or the owner manual. For a Brio Satya on Indonesian roads, check pressure, tread, and sidewalls regularly.",
      moduleId: "tire-pressure",
      sourceIds: ["honda-indonesia-tires"],
    });
  }

  if (uncheckedCriticalModules.includes("brake-fluid") || staleCriticalModules.includes("brake-fluid")) {
    recommendations.push({
      bucket: "soon",
      title: t("openBrakeGuide"),
      body:
        persistentState.settings.locale === "id"
          ? "Honda Brio brochure menyoroti ABS dan EBD, jadi sistem rem layak dijaga rapat. Bila belum ada log rem baru, lakukan cek pedal rem dan minyak rem berikutnya."
          : "Honda's Brio brochure highlights ABS and EBD, so braking deserves close attention. If you have no fresh brake log, make brake feel and brake-fluid checks the next update.",
      moduleId: "brake-feel",
      sourceIds: ["honda-indonesia-brio-brochure"],
    });
  }

  if (["service-soon", "urgent"].includes(healthSignals.brakeStatus)) {
    recommendations.push({
      bucket: healthSignals.brakeStatus === "urgent" ? "now" : "soon",
      title: t("openBrakeGuide"),
      body:
        persistentState.settings.locale === "id"
          ? "Status rem yang menurun harus didahulukan, apalagi untuk Brio harian di lalu lintas kota dan musim hujan."
          : "Any brake-status downgrade should move to the front of the queue, especially for a daily Brio in city traffic and rainy conditions.",
      moduleId: "brake-feel",
      sourceIds: ["honda-indonesia-brio-brochure"],
    });
  }

  if (["service-soon", "urgent"].includes(healthSignals.tireStatus)) {
    recommendations.push({
      bucket: healthSignals.tireStatus === "urgent" ? "now" : "soon",
      title: t("openTireGuide"),
      body:
        persistentState.settings.locale === "id"
          ? "Status ban menunjukkan perlu cek lebih detail. Honda menyarankan mengganti ban saat sisa alur mencapai 3 mm dan selalu mengacu ke label tekanan ban kendaraan."
          : "The tire status suggests a closer check. Honda advises replacing tires when remaining tread reaches 3 mm and always following the vehicle pressure label.",
      moduleId: "tire-tread",
      sourceIds: ["honda-indonesia-tires"],
    });
  }

  if (healthSignals.warningLightStatus !== "none") {
    recommendations.push({
      bucket: healthSignals.warningLightStatus === "urgent" ? "now" : "watch",
      title: persistentState.settings.locale === "id" ? "Tinjau lampu peringatan dashboard" : "Review dashboard warning lights",
      body:
        persistentState.settings.locale === "id"
          ? "Ada indikator aktif pada snapshot kendaraan. Cocokkan warna indikator dan gejalanya sebelum memutuskan tetap berkendara."
          : "The dashboard snapshot includes an active warning. Match the warning color to real-world symptoms before continuing normal driving.",
      moduleId: "dashboard-warnings",
      sourceIds: ["honda-indonesia-home-check"],
    });
  }

  if (healthSignals.floodExposure !== "none") {
    recommendations.push({
      bucket: healthSignals.floodExposure === "severe" ? "now" : "watch",
      title: persistentState.settings.locale === "id" ? "Lakukan cek pasca banjir" : "Run the post-flood check",
      body:
        persistentState.settings.locale === "id"
          ? "Snapshot kendaraan menunjukkan paparan genangan atau banjir. Prioritaskan rem, interior, sensor, dan bila perlu konsultasi ke bengkel resmi Honda."
          : "The vehicle snapshot shows recent water or flood exposure. Prioritize the brakes, interior, sensors, and an authorized Honda inspection when needed.",
      moduleId: "post-flood",
      sourceIds: ["honda-indonesia-post-flood"],
    });
  }

  if (overdueReminders.length) {
    recommendations.push({
      bucket: "soon",
      title: persistentState.settings.locale === "id" ? "Tangani pengingat yang jatuh tempo" : "Clear overdue reminders",
      body:
        persistentState.settings.locale === "id"
          ? `Ada ${overdueReminders.length} pengingat yang sudah melewati target. Jadikan itu urutan kerja berikutnya agar jadwal servis Brio tetap rapi.`
          : `You have ${overdueReminders.length} reminders beyond target. Use them as your next work queue so the Brio's maintenance cadence stays organized.`,
      moduleId: overdueReminders[0]?.module.id || "pre-trip",
      sourceIds: ["honda-indonesia-service"],
    });
  }

  if (isMileageStale(vehicle)) {
    recommendations.push({
      bucket: "watch",
      title: persistentState.settings.locale === "id" ? "Perbarui kilometer" : "Refresh the odometer",
      body:
        persistentState.settings.locale === "id"
          ? "Pengingat berbasis kilometer akan lebih akurat kalau odometer diperbarui setelah pemakaian harian atau perjalanan luar kota."
          : "Kilometer-based reminders become more trustworthy when the odometer is updated after daily use or out-of-town trips.",
      moduleId: "pre-trip",
      sourceIds: ["honda-indonesia-service"],
    });
  }

  if (profile) {
    recommendations.push({
      bucket: "watch",
      title: persistentState.settings.locale === "id" ? "Gunakan fokus lokal Brio" : "Use the Brio local focus",
      body: localize(profile.focusAreas)[0],
      moduleId: "post-flood",
      sourceIds: profile.sourceIds.slice(0, 2),
    });
  }

  return {
    score,
    overdueCount: overdueReminders.length,
    profile,
    recentInspections,
    staleCriticalModules,
    recommendations: recommendations.slice(0, 5),
    sources: profile ? profile.sourceIds.map(sourceById).filter(Boolean) : SOURCE_LINKS.slice(0, 4),
    healthSignals,
  };
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(value) {
  if (!value) {
    return "—";
  }
  return new Date(value).toLocaleDateString(persistentState.settings.locale === "id" ? "id-ID" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function statusMeta(status) {
  return STATUS_OPTIONS.find((entry) => entry.value === status) || STATUS_OPTIONS[0];
}

function latestInspectionFor(vehicleId, moduleId) {
  return [...persistentState.inspections]
    .filter((entry) => entry.vehicleId === vehicleId && (!moduleId || entry.moduleId === moduleId))
    .sort((left, right) => new Date(right.checkedAt) - new Date(left.checkedAt))[0];
}

function vehicleOdometer(vehicle) {
  const fromLogs = persistentState.inspections
    .filter((entry) => entry.vehicleId === vehicle.id)
    .reduce((highest, entry) => Math.max(highest, Number(entry.odometerKm || 0)), 0);
  return Math.max(Number(vehicle.odometerKm || 0), fromLogs);
}

function isMileageStale(vehicle) {
  const latest = latestInspectionFor(vehicle.id);
  if (!latest) {
    return false;
  }
  const ageMs = Date.now() - new Date(latest.checkedAt).getTime();
  return ageMs > 1000 * 60 * 60 * 24 * 45;
}

function reminderSummary(reminder) {
  const vehicle = persistentState.vehicles.find((entry) => entry.id === reminder.vehicleId);
  const module = modulesById.get(reminder.moduleId);
  if (!vehicle || !module) {
    return null;
  }

  const currentKm = vehicleOdometer(vehicle);
  let dueState = "later";
  let dueLabel = "";

  if (reminder.mode === "date") {
    const dueDate = reminder.nextDueDate;
    dueState = new Date(dueDate).getTime() <= Date.now() ? "now" : "later";
    dueLabel = formatDate(dueDate);
  } else {
    const dueKm = Number(reminder.nextDueKm || 0);
    dueState = currentKm >= dueKm ? "now" : "later";
    dueLabel = `${dueKm.toLocaleString()} km`;
  }

  return {
    reminder,
    vehicle,
    module,
    currentKm,
    dueState,
    dueLabel,
  };
}

function recommendedModules(vehicleId) {
  return [...CHECK_MODULES]
    .sort((left, right) => {
      const leftLog = latestInspectionFor(vehicleId, left.id);
      const rightLog = latestInspectionFor(vehicleId, right.id);
      if (!leftLog && !rightLog) {
        return left.estimatedMinutes - right.estimatedMinutes;
      }
      if (!leftLog) {
        return -1;
      }
      if (!rightLog) {
        return 1;
      }
      return new Date(leftLog.checkedAt) - new Date(rightLog.checkedAt);
    })
    .slice(0, 4);
}

function setFlash(message) {
  uiState.flash = message;
  window.setTimeout(() => {
    if (uiState.flash === message) {
      uiState.flash = "";
      render();
    }
  }, 2600);
}

function categoryLabel(categoryId) {
  return localize(CATEGORIES.find((entry) => entry.id === categoryId)?.label || { id: categoryId, en: categoryId });
}

function difficultyLabel(level) {
  const labels = {
    beginner: { id: "Pemula", en: "Beginner" },
    intermediate: { id: "Menengah", en: "Intermediate" },
  };
  return localize(labels[level] || labels.beginner);
}

function iconForStep(imageKey) {
  const map = {
    "hood-open": "Kap",
    dipstick: "Dipstick",
    "level-check": "Level",
    reservoir: "Tangki",
    "fluid-window": "Jendela",
    "leak-check": "Bocor",
    "brake-reservoir": "Rem",
    pedal: "Pedal",
    battery: "Aki",
    "battery-terminals": "Terminal",
    starter: "Starter",
    "door-sticker": "Stiker",
    gauge: "Gauge",
    "air-adjust": "PSI",
    "tread-pattern": "Tapak",
    sidewall: "Sidewall",
    "tread-depth": "Alur",
    "spare-wheel": "Serep",
    "jack-kit": "Dongkrak",
    "warning-triangle": "Segitiga",
    "wiper-blade": "Wiper",
    windscreen: "Kaca",
    "washer-tank": "Washer",
    headlights: "Lampu",
    "signal-lights": "Sein",
    "brake-lights": "Stop",
    cluster: "Dash",
    "warning-colors": "Merah",
    "driver-view": "Ikon",
    "brake-sound": "Bunyi",
    "straight-stop": "Lurus",
    vents: "Vent",
    "ac-cool": "Dingin",
    defogger: "Defog",
    "trip-engine-bay": "Mesin",
    "trip-tire-check": "Ban",
    "trip-cabin": "Kabin",
    "flood-depth": "Air",
    "flood-brake": "Basah",
    "flood-electrical": "Sensor",
  };
  return map[imageKey] || "Langkah";
}

function optionsMarkup(list, selectedValue) {
  return list
    .map((entry) => {
      const selected = entry.value === selectedValue ? "selected" : "";
      return `<option value="${escapeHtml(entry.value)}" ${selected}>${escapeHtml(localize(entry.label))}</option>`;
    })
    .join("");
}

function renderLessonIllustration(imageKey, title) {
  const label = escapeHtml(title);
  const spec = illustrationSpec(imageKey);
  const area = escapeHtml(localize(spec.area));
  const target = escapeHtml(localize(spec.target));
  return `
    <svg viewBox="0 0 260 170" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="240" height="150" rx="24" fill="#ffffff" stroke="#d7e2de" />
      <rect x="22" y="22" width="216" height="126" rx="18" fill="#f7faf9" />
      <rect x="28" y="28" width="74" height="24" rx="12" fill="#e7f3f0" />
      <text x="65" y="44" font-size="10" text-anchor="middle" fill="#0d6b61" font-family="Avenir Next, Arial, sans-serif">${area}</text>
      ${renderIllustrationScene(spec)}
      <rect x="134" y="114" width="88" height="24" rx="12" fill="#0d6b61" />
      <text x="178" y="129" font-size="10" text-anchor="middle" fill="#ffffff" font-family="Avenir Next, Arial, sans-serif">${target}</text>
    </svg>
  `;
}

function illustrationSpec(imageKey) {
  const specs = {
    "hood-open": { variant: "engine-bay", target: { id: "Buka kap mesin", en: "Open hood" }, area: { id: "Ruang mesin", en: "Engine bay" }, hx: 94, hy: 66 },
    dipstick: { variant: "engine-bay", target: { id: "Dipstick oli", en: "Oil dipstick" }, area: { id: "Ruang mesin", en: "Engine bay" }, hx: 150, hy: 86 },
    "level-check": { variant: "tool", target: { id: "Batas min-max", en: "Min-max marks" }, area: { id: "Dipstick", en: "Dipstick" }, hx: 82, hy: 88 },
    reservoir: { variant: "engine-bay", target: { id: "Tabung coolant", en: "Coolant reservoir" }, area: { id: "Ruang mesin", en: "Engine bay" }, hx: 174, hy: 74 },
    "fluid-window": { variant: "reservoir", target: { id: "Jendela level", en: "Level window" }, area: { id: "Tabung cairan", en: "Fluid tank" }, hx: 88, hy: 78 },
    "leak-check": { variant: "under-car", target: { id: "Cari noda bocor", en: "Look for leaks" }, area: { id: "Bawah mobil", en: "Under the car" }, hx: 120, hy: 108 },
    "brake-reservoir": { variant: "engine-bay", target: { id: "Reservoir rem", en: "Brake reservoir" }, area: { id: "Dekat firewall", en: "Near firewall" }, hx: 182, hy: 60 },
    pedal: { variant: "driver-footwell", target: { id: "Pedal rem", en: "Brake pedal" }, area: { id: "Bawah dashboard", en: "Driver footwell" }, hx: 146, hy: 96 },
    battery: { variant: "engine-bay", target: { id: "Aki", en: "Battery" }, area: { id: "Ruang mesin", en: "Engine bay" }, hx: 104, hy: 88 },
    "battery-terminals": { variant: "battery-closeup", target: { id: "Terminal aki", en: "Battery terminals" }, area: { id: "Atas aki", en: "Top of battery" }, hx: 96, hy: 74 },
    starter: { variant: "dashboard-cabin", target: { id: "Amati starter", en: "Observe starting" }, area: { id: "Posisi pengemudi", en: "Driver seat" }, hx: 92, hy: 84 },
    "door-sticker": { variant: "door-pillar", target: { id: "Stiker tekanan ban", en: "Tire pressure label" }, area: { id: "Pilar pintu sopir", en: "Driver door pillar" }, hx: 136, hy: 78 },
    gauge: { variant: "wheel-closeup", target: { id: "Pentil ban", en: "Valve stem" }, area: { id: "Roda", en: "Wheel" }, hx: 116, hy: 94 },
    "air-adjust": { variant: "wheel-closeup", target: { id: "Isi / kurangi angin", en: "Inflate / deflate" }, area: { id: "Ban", en: "Tire" }, hx: 116, hy: 94 },
    "tread-pattern": { variant: "tire-face", target: { id: "Pola aus tapak", en: "Tread pattern" }, area: { id: "Permukaan ban", en: "Tire face" }, hx: 106, hy: 86 },
    sidewall: { variant: "wheel-closeup", target: { id: "Sidewall ban", en: "Tire sidewall" }, area: { id: "Sisi ban", en: "Tire side" }, hx: 126, hy: 78 },
    "tread-depth": { variant: "tire-face", target: { id: "Kedalaman alur", en: "Tread depth" }, area: { id: "Tapak ban", en: "Tire tread" }, hx: 116, hy: 86 },
    "spare-wheel": { variant: "trunk", target: { id: "Ban serep", en: "Spare tire" }, area: { id: "Bagasi", en: "Trunk" }, hx: 108, hy: 94 },
    "jack-kit": { variant: "trunk", target: { id: "Dongkrak & kunci", en: "Jack & wrench" }, area: { id: "Kompartemen bagasi", en: "Trunk compartment" }, hx: 160, hy: 92 },
    "warning-triangle": { variant: "trunk", target: { id: "Segitiga pengaman", en: "Warning triangle" }, area: { id: "Bagasi", en: "Trunk" }, hx: 174, hy: 70 },
    "wiper-blade": { variant: "windscreen", target: { id: "Karet wiper", en: "Wiper blade" }, area: { id: "Kaca depan", en: "Windshield" }, hx: 98, hy: 72 },
    windscreen: { variant: "windscreen", target: { id: "Area sapuan kaca", en: "Wipe area" }, area: { id: "Kaca depan", en: "Windshield" }, hx: 118, hy: 68 },
    "washer-tank": { variant: "engine-bay", target: { id: "Tabung washer", en: "Washer tank" }, area: { id: "Ruang mesin", en: "Engine bay" }, hx: 82, hy: 92 },
    headlights: { variant: "car-front", target: { id: "Lampu utama", en: "Headlights" }, area: { id: "Depan mobil", en: "Front of car" }, hx: 74, hy: 84 },
    "signal-lights": { variant: "car-front", target: { id: "Lampu sein", en: "Signal lights" }, area: { id: "Depan / belakang", en: "Front / rear" }, hx: 176, hy: 84 },
    "brake-lights": { variant: "car-rear", target: { id: "Lampu rem", en: "Brake lights" }, area: { id: "Belakang mobil", en: "Rear of car" }, hx: 166, hy: 86 },
    cluster: { variant: "dashboard-cluster", target: { id: "Panel instrumen", en: "Instrument cluster" }, area: { id: "Dashboard", en: "Dashboard" }, hx: 122, hy: 84 },
    "warning-colors": { variant: "dashboard-cluster", target: { id: "Warna indikator", en: "Warning colors" }, area: { id: "Dashboard", en: "Dashboard" }, hx: 164, hy: 66 },
    "driver-view": { variant: "dashboard-cabin", target: { id: "Cocokkan gejala", en: "Match symptoms" }, area: { id: "Posisi mengemudi", en: "Driver view" }, hx: 144, hy: 82 },
    "brake-sound": { variant: "wheel-closeup", target: { id: "Suara dari roda", en: "Noise near wheel" }, area: { id: "Area rem roda", en: "Wheel brake area" }, hx: 116, hy: 84 },
    "straight-stop": { variant: "road-lane", target: { id: "Mobil berhenti lurus", en: "Straight stop" }, area: { id: "Jalur aman", en: "Safe lane" }, hx: 128, hy: 84 },
    vents: { variant: "dashboard-cabin", target: { id: "Kisi AC", en: "AC vents" }, area: { id: "Dashboard tengah", en: "Center dash" }, hx: 132, hy: 72 },
    "ac-cool": { variant: "dashboard-cabin", target: { id: "Rasakan hawa dingin", en: "Feel cold airflow" }, area: { id: "Vent AC", en: "AC vent" }, hx: 154, hy: 72 },
    defogger: { variant: "windscreen", target: { id: "Mode defogger", en: "Defogger mode" }, area: { id: "Kaca depan", en: "Windshield" }, hx: 162, hy: 70 },
    "trip-engine-bay": { variant: "engine-bay", target: { id: "Cek cairan & aki", en: "Check fluids & battery" }, area: { id: "Ruang mesin", en: "Engine bay" }, hx: 130, hy: 78 },
    "trip-tire-check": { variant: "car-side", target: { id: "Ban & tekanan", en: "Tires & pressure" }, area: { id: "Sisi mobil", en: "Side of car" }, hx: 90, hy: 102 },
    "trip-cabin": { variant: "dashboard-cabin", target: { id: "Dokumen & alat", en: "Cabin essentials" }, area: { id: "Kabin depan", en: "Front cabin" }, hx: 166, hy: 90 },
    "flood-depth": { variant: "car-side-water", target: { id: "Tinggi air", en: "Water level" }, area: { id: "Sisi mobil", en: "Side of car" }, hx: 144, hy: 102 },
    "flood-brake": { variant: "car-side-water", target: { id: "Rem & karpet", en: "Brakes & carpets" }, area: { id: "Setelah genangan", en: "After floodwater" }, hx: 88, hy: 106 },
    "flood-electrical": { variant: "dashboard-cabin", target: { id: "Sensor & listrik", en: "Sensors & electrics" }, area: { id: "Dashboard / kabin", en: "Dash / cabin" }, hx: 152, hy: 84 },
  };
  return specs[imageKey] || { variant: "dashboard-cabin", target: { id: "Langkah", en: "Step" }, area: { id: "Area mobil", en: "Vehicle area" }, hx: 120, hy: 82 };
}

function renderIllustrationScene(spec) {
  const dot = `<circle cx="${spec.hx}" cy="${spec.hy}" r="10" fill="#ffffff" stroke="#0d6b61" stroke-width="4" />`;
  const pulse = `<circle cx="${spec.hx}" cy="${spec.hy}" r="18" fill="#0d6b61" opacity="0.12" />`;
  const callout = `<path d="M${spec.hx + 10} ${spec.hy - 10} L146 112" stroke="#0d6b61" stroke-width="3" stroke-linecap="round" />`;

  const scenes = {
    "engine-bay": `
      <rect x="44" y="54" width="136" height="54" rx="18" fill="#e9f4f1" stroke="#b9d5cd" />
      <path d="M44 58 L70 38 H156 L180 58" fill="none" stroke="#8fb0a7" stroke-width="5" />
      <rect x="64" y="70" width="42" height="22" rx="8" fill="#c3d8d1" />
      <rect x="118" y="66" width="36" height="28" rx="8" fill="#d6e7e2" />
      <path d="M112 84 H160" stroke="#8fb0a7" stroke-width="5" />
      ${pulse}${dot}${callout}
    `,
    reservoir: `
      <rect x="82" y="44" width="56" height="72" rx="14" fill="#eef6f4" stroke="#a8c8be" stroke-width="4" />
      <rect x="90" y="70" width="40" height="30" rx="8" fill="#d8ebe5" />
      <line x1="90" y1="64" x2="130" y2="64" stroke="#c4932b" stroke-width="3" />
      <line x1="90" y1="104" x2="130" y2="104" stroke="#c4932b" stroke-width="3" />
      ${pulse}${dot}${callout}
    `,
    "under-car": `
      <path d="M48 86 H178 L162 104 H64 Z" fill="#edf4f2" stroke="#b9d5cd" stroke-width="4" />
      <circle cx="78" cy="104" r="12" fill="#d9e8e3" stroke="#98b7ae" stroke-width="4" />
      <circle cx="148" cy="104" r="12" fill="#d9e8e3" stroke="#98b7ae" stroke-width="4" />
      <path d="M104 116 C110 122, 118 122, 124 116" stroke="#0d6b61" stroke-width="4" fill="none" />
      ${pulse}${dot}${callout}
    `,
    "driver-footwell": `
      <rect x="54" y="42" width="116" height="66" rx="18" fill="#eef5f3" stroke="#bdd6cf" />
      <rect x="62" y="50" width="42" height="36" rx="10" fill="#dbeae5" />
      <path d="M118 54 V96 M118 96 H144" stroke="#95b2aa" stroke-width="6" stroke-linecap="round" />
      <path d="M150 54 V96 M150 96 H166" stroke="#c4d7d1" stroke-width="6" stroke-linecap="round" />
      ${pulse}${dot}${callout}
    `,
    "battery-closeup": `
      <rect x="74" y="52" width="84" height="52" rx="12" fill="#e8f3f0" stroke="#abc9bf" stroke-width="4" />
      <rect x="88" y="44" width="14" height="12" rx="4" fill="#c6d9d3" />
      <rect x="130" y="44" width="14" height="12" rx="4" fill="#c6d9d3" />
      <line x1="95" y1="64" x2="107" y2="64" stroke="#0d6b61" stroke-width="4" />
      <line x1="137" y1="60" x2="137" y2="72" stroke="#0d6b61" stroke-width="4" />
      <line x1="131" y1="66" x2="143" y2="66" stroke="#0d6b61" stroke-width="4" />
      ${pulse}${dot}${callout}
    `,
    "dashboard-cabin": `
      <rect x="40" y="48" width="150" height="64" rx="22" fill="#eef5f3" stroke="#bdd6cf" stroke-width="4" />
      <path d="M64 96 H160" stroke="#9bb6ae" stroke-width="5" />
      <circle cx="74" cy="80" r="14" fill="#dceae5" />
      <rect x="102" y="68" width="54" height="18" rx="9" fill="#d2e4de" />
      <rect x="164" y="62" width="14" height="28" rx="7" fill="#dceae5" />
      ${pulse}${dot}${callout}
    `,
    "door-pillar": `
      <rect x="66" y="36" width="120" height="84" rx="18" fill="#eef5f3" stroke="#bdd6cf" stroke-width="4" />
      <rect x="96" y="48" width="34" height="56" rx="8" fill="#ffffff" stroke="#a8c8be" stroke-width="3" />
      <line x1="104" y1="60" x2="122" y2="60" stroke="#95b2aa" stroke-width="3" />
      <line x1="104" y1="72" x2="122" y2="72" stroke="#95b2aa" stroke-width="3" />
      <line x1="104" y1="84" x2="122" y2="84" stroke="#95b2aa" stroke-width="3" />
      ${pulse}${dot}${callout}
    `,
    "wheel-closeup": `
      <circle cx="108" cy="84" r="36" fill="#eef5f3" stroke="#b7d1ca" stroke-width="4" />
      <circle cx="108" cy="84" r="18" fill="#dceae5" />
      <circle cx="136" cy="84" r="4" fill="#0d6b61" />
      ${pulse}${dot}${callout}
    `,
    "tire-face": `
      <rect x="68" y="38" width="80" height="92" rx="22" fill="#eef5f3" stroke="#b7d1ca" stroke-width="4" />
      <path d="M86 48 V120 M108 48 V120 M130 48 V120" stroke="#97b7ae" stroke-width="5" stroke-linecap="round" />
      ${pulse}${dot}${callout}
    `,
    trunk: `
      <rect x="48" y="52" width="144" height="64" rx="18" fill="#eef5f3" stroke="#bdd6cf" stroke-width="4" />
      <path d="M48 64 L120 34 L192 64" fill="none" stroke="#9ab7ae" stroke-width="5" />
      <circle cx="92" cy="90" r="18" fill="#dceae5" />
      <rect x="136" y="80" width="28" height="18" rx="6" fill="#dceae5" />
      ${pulse}${dot}${callout}
    `,
    windscreen: `
      <path d="M58 46 H170 L188 104 H40 Z" fill="#eef5f3" stroke="#bdd6cf" stroke-width="4" />
      <path d="M74 98 C92 76, 104 72, 120 68" fill="none" stroke="#9bb6ae" stroke-width="6" stroke-linecap="round" />
      <path d="M116 100 C130 80, 142 74, 156 70" fill="none" stroke="#c0d4ce" stroke-width="6" stroke-linecap="round" />
      ${pulse}${dot}${callout}
    `,
    "car-front": `
      <path d="M58 96 H182 L170 70 H70 Z" fill="#eef5f3" stroke="#bdd6cf" stroke-width="4" />
      <rect x="74" y="74" width="24" height="14" rx="6" fill="#dceae5" />
      <rect x="142" y="74" width="24" height="14" rx="6" fill="#dceae5" />
      <rect x="104" y="78" width="32" height="10" rx="5" fill="#d1e4de" />
      ${pulse}${dot}${callout}
    `,
    "car-rear": `
      <path d="M62 70 H178 V100 H54 Z" fill="#eef5f3" stroke="#bdd6cf" stroke-width="4" />
      <rect x="72" y="80" width="26" height="12" rx="6" fill="#dceae5" />
      <rect x="144" y="80" width="26" height="12" rx="6" fill="#dceae5" />
      <rect x="108" y="74" width="28" height="16" rx="6" fill="#d1e4de" />
      ${pulse}${dot}${callout}
    `,
    "dashboard-cluster": `
      <rect x="56" y="44" width="148" height="72" rx="22" fill="#eef5f3" stroke="#bdd6cf" stroke-width="4" />
      <circle cx="98" cy="82" r="18" fill="#dceae5" />
      <circle cx="160" cy="82" r="18" fill="#dceae5" />
      <circle cx="160" cy="66" r="6" fill="#0d6b61" opacity="0.7" />
      ${pulse}${dot}${callout}
    `,
    "road-lane": `
      <rect x="42" y="36" width="164" height="92" rx="18" fill="#f5f8f7" stroke="#cdded9" stroke-width="4" />
      <path d="M124 46 V118" stroke="#d7b96c" stroke-width="5" stroke-dasharray="8 8" />
      <rect x="94" y="70" width="60" height="26" rx="12" fill="#e2efeb" stroke="#a7c8be" stroke-width="3" />
      ${pulse}${dot}${callout}
    `,
    "car-side": `
      <path d="M52 90 H186 L168 64 H96 L78 74 H60 Z" fill="#eef5f3" stroke="#bdd6cf" stroke-width="4" />
      <circle cx="84" cy="96" r="14" fill="#dceae5" stroke="#9cb7af" stroke-width="3" />
      <circle cx="154" cy="96" r="14" fill="#dceae5" stroke="#9cb7af" stroke-width="3" />
      ${pulse}${dot}${callout}
    `,
    "car-side-water": `
      <path d="M52 90 H186 L168 64 H96 L78 74 H60 Z" fill="#eef5f3" stroke="#bdd6cf" stroke-width="4" />
      <circle cx="84" cy="96" r="14" fill="#dceae5" stroke="#9cb7af" stroke-width="3" />
      <circle cx="154" cy="96" r="14" fill="#dceae5" stroke="#9cb7af" stroke-width="3" />
      <path d="M34 106 C58 94, 78 112, 102 102 C126 92, 148 112, 188 102" fill="none" stroke="#6aa9c6" stroke-width="8" stroke-linecap="round" />
      ${pulse}${dot}${callout}
    `,
    tool: `
      <rect x="92" y="36" width="24" height="92" rx="12" fill="#eef5f3" stroke="#b7d1ca" stroke-width="4" />
      <line x1="92" y1="60" x2="116" y2="60" stroke="#c4932b" stroke-width="4" />
      <line x1="92" y1="98" x2="116" y2="98" stroke="#c4932b" stroke-width="4" />
      ${pulse}${dot}${callout}
    `,
  };
  return scenes[spec.variant] || scenes["dashboard-cabin"];
}

function render() {
  const locale = persistentState.settings.locale || "en";
  document.documentElement.lang = locale;
  document.title = t("brand");

  if (!persistentState.settings.locale || persistentState.vehicles.length === 0) {
    appRoot.innerHTML = renderOnboarding();
    return;
  }

  appRoot.innerHTML = renderShell();
}

function renderOnboarding() {
  const locale = persistentState.settings.locale || "id";
  const copy = UI_TEXT[locale];
  return `
    <main class="landing-shell">
      <section class="hero-card">
        <div class="hero-copy">
          <p class="eyebrow">${copy.brand}</p>
          <h1>${copy.onboardingTitle}</h1>
          <p>${copy.onboardingCopy}</p>
        </div>
        <div class="hero-panel">
          <div class="chip-row">
            <span class="chip">${copy.indonesiaFocus}</span>
            <span class="chip">ID / EN</span>
            <span class="chip">PWA</span>
          </div>
          <p class="callout-text">${copy.nativeContent}</p>
          <form id="onboarding-form" class="stack-form">
            <label>
              <span>${copy.chooseLanguage}</span>
              <select name="locale" required>
                <option value="id" ${locale === "id" ? "selected" : ""}>Bahasa Indonesia</option>
                <option value="en" ${locale === "en" ? "selected" : ""}>English</option>
              </select>
            </label>
            <label>
              <span>${copy.brandLabel}</span>
              <input name="make" type="text" maxlength="40" placeholder="Honda" value="Honda" required />
            </label>
            <label>
              <span>${copy.modelLabel}</span>
              <input name="model" type="text" maxlength="40" placeholder="Brio Satya" value="Brio Satya" required />
            </label>
            <div class="split-grid">
              <label>
                <span>${copy.yearLabel}</span>
                <input name="year" type="number" min="1990" max="2035" value="2018" required />
              </label>
              <label>
                <span>${copy.odometer}</span>
                <input name="odometerKm" type="number" min="0" step="1" value="${DEFAULT_DASHBOARD_VEHICLE.odometerKm}" required />
              </label>
            </div>
            <div class="split-grid">
              <label>
                <span>${copy.fuelLabel}</span>
                <select name="fuelType">${optionsMarkup(FUEL_TYPES, DEFAULT_DASHBOARD_VEHICLE.fuelType)}</select>
              </label>
              <label>
                <span>${copy.transmissionLabel}</span>
                <select name="transmission">${optionsMarkup(TRANSMISSIONS, DEFAULT_DASHBOARD_VEHICLE.transmission)}</select>
              </label>
            </div>
            <label>
              <span>${copy.bodyTypeLabel}</span>
              <select name="bodyType">${optionsMarkup(BODY_TYPES, DEFAULT_DASHBOARD_VEHICLE.bodyType)}</select>
            </label>
            <button class="primary-btn" type="submit">${copy.startApp}</button>
          </form>
        </div>
      </section>
    </main>
  `;
}

function renderShell() {
  const vehicle = activeVehicle();
  const content =
    persistentState.view === "learn"
      ? renderLearnView()
      : persistentState.view === "guided"
        ? renderGuidedView()
        : persistentState.view === "history"
          ? renderHistoryView()
          : persistentState.view === "garage"
            ? renderGarageView()
            : persistentState.view === "reminders"
              ? renderReminderView()
              : persistentState.view === "settings"
                ? renderSettingsView()
                : renderHomeView();

  return `
    <div class="mobile-app">
      <header class="topbar">
        <div>
          <p class="eyebrow">${t("brand")}</p>
          <h1>${t("subtitle")}</h1>
        </div>
        <div class="topbar-meta">
          <span class="topbar-chip">${persistentState.settings.locale === "id" ? "Bahasa Indonesia" : "English"}</span>
          <span class="topbar-chip">${vehicle ? escapeHtml(vehicleLabel(vehicle)) : t("noVehicle")}</span>
        </div>
      </header>
      ${uiState.flash ? `<div class="flash-banner">${escapeHtml(uiState.flash)}</div>` : ""}
      <main class="content-pane">
        ${content}
      </main>
      <nav class="bottom-nav">
        ${renderNavButton("home", t("home"))}
        ${renderNavButton("learn", t("learn"))}
        ${renderNavButton("history", t("history"))}
        ${renderNavButton("garage", t("garage"))}
        ${renderNavButton("reminders", t("reminders"))}
        ${renderNavButton("settings", t("settings"))}
      </nav>
    </div>
  `;
}

function renderNavButton(view, label) {
  const active = persistentState.view === view ? "active" : "";
  return `<button class="nav-btn ${active}" data-action="view" data-view="${view}" type="button">${escapeHtml(label)}</button>`;
}

function renderHomeView() {
  const vehicle = activeVehicle();
  const analysis = derivedAnalysis(vehicle);
  const reminderCards = persistentState.reminders.map(reminderSummary).filter(Boolean).slice(0, 3);
  const latestLogs = [...persistentState.inspections]
    .filter((entry) => !vehicle || entry.vehicleId === vehicle.id)
    .sort((left, right) => new Date(right.checkedAt) - new Date(left.checkedAt))
    .slice(0, 3);
  const recommendations = vehicle ? recommendedModules(vehicle.id) : CHECK_MODULES.slice(0, 4);

  return `
    <section class="hero-stack">
      <article class="primary-panel dashboard-hero">
        <div class="panel-headline">
          <div>
            <p class="eyebrow">${t("dashboardTitle")}</p>
            <h2>${t("trackStatus")}</h2>
          </div>
          <button class="text-btn" type="button" data-action="view" data-view="learn">${t("viewAll")}</button>
        </div>
        <p>${t("baselineAssumption")}</p>
        <div class="quick-action-row">
          <button class="secondary-btn compact-btn" data-action="open-module" data-module-id="engine-oil" type="button">${t("openOilGuide")}</button>
          <button class="secondary-btn compact-btn" data-action="open-module" data-module-id="tire-pressure" type="button">${t("openTireGuide")}</button>
          <button class="secondary-btn compact-btn" data-action="open-module" data-module-id="brake-feel" type="button">${t("openBrakeGuide")}</button>
        </div>
      </article>

      <article class="primary-panel vehicle-panel">
        <div class="panel-headline">
          <div>
            <p class="eyebrow">${t("activeVehicle")}</p>
            <h2>${vehicle ? escapeHtml(vehicleLabel(vehicle)) : t("noVehicle")}</h2>
          </div>
          <button class="text-btn" type="button" data-action="view" data-view="garage">${t("garage")}</button>
        </div>
        ${
          vehicle
            ? `
              <div class="stat-grid">
                <div class="stat-card">
                  <span>${t("latestVehicleStatus")}</span>
                  <strong>${vehicleOdometer(vehicle).toLocaleString()} km</strong>
                </div>
                <div class="stat-card">
                  <span>${t("recentUpdate")}</span>
                  <strong>${latestInspectionFor(vehicle.id) ? formatDate(latestInspectionFor(vehicle.id).checkedAt) : "—"}</strong>
                </div>
                <div class="stat-card">
                  <span>${t("healthScore")}</span>
                  <strong>${analysis ? analysis.score : "—"}/100</strong>
                </div>
                <div class="stat-card">
                  <span>${t("overdueCount")}</span>
                  <strong>${analysis ? analysis.overdueCount : 0}</strong>
                </div>
              </div>
              ${isMileageStale(vehicle) ? `<p class="stale-note">${t("staleMileage")}</p>` : ""}
            `
            : `<p>${t("firstVehicleCallout")}</p>`
        }
      </article>
    </section>

    ${
      vehicle
        ? `
          <section class="section-block">
            <div class="section-head">
              <div>
                <p class="eyebrow">${t("conditionSnapshot")}</p>
                <h3>${t("conditionSnapshot")}</h3>
              </div>
              <button class="text-btn" type="button" data-action="view" data-view="garage">${t("garage")}</button>
            </div>
            <div class="card-list">
              <article class="mini-card">
                <p class="mini-label">${t("lastServiceDate")}</p>
                <h4>${vehicle.lastServiceDate ? formatDate(vehicle.lastServiceDate) : "—"}</h4>
                <p>${t("lastOilChangeKm")}: ${vehicle.lastOilChangeKm ? `${Number(vehicle.lastOilChangeKm).toLocaleString()} km` : "—"}</p>
              </article>
              <article class="mini-card">
                <p class="mini-label">${t("oilStatusLabel")}</p>
                <h4>${conditionSignalLabel(vehicle.healthSignals.oilStatus)}</h4>
                <p>${t("coolantStatusLabel")}: ${conditionSignalLabel(vehicle.healthSignals.coolantStatus)}</p>
              </article>
              <article class="mini-card">
                <p class="mini-label">${t("brakeStatusLabel")}</p>
                <h4>${conditionSignalLabel(vehicle.healthSignals.brakeStatus)}</h4>
                <p>${t("tireStatusLabel")}: ${conditionSignalLabel(vehicle.healthSignals.tireStatus)}</p>
              </article>
              <article class="mini-card">
                <p class="mini-label">${t("warningLightLabel")}</p>
                <h4>${warningLightLabel(vehicle.healthSignals.warningLightStatus)}</h4>
                <p>${t("floodExposureLabel")}: ${floodExposureLabel(vehicle.healthSignals.floodExposure)}</p>
              </article>
            </div>
          </section>
        `
        : ""
    }

    ${
      analysis
        ? `
          <section class="section-block">
            <div class="section-head">
              <div>
                <p class="eyebrow">${t("analysisTitle")}</p>
                <h3>${t("analysisTitle")}</h3>
              </div>
            </div>
            <div class="analysis-grid">
              <article class="detail-card">
                <p class="mini-label">${t("healthScore")}</p>
                <h3 class="score-display">${analysis.score}<span>/100</span></h3>
                <p>${t("noAnalysisYet")}</p>
              </article>
              <article class="detail-card">
                <p class="mini-label">${t("modelProfile")}</p>
                <h3>${analysis.profile ? escapeHtml(localize(analysis.profile.label)) : escapeHtml(vehicleLabel(vehicle))}</h3>
                <p>${analysis.profile ? t("profileMatched") : t("activeVehicle")}</p>
                <ul class="bullet-list">
                  ${
                    analysis.profile
                      ? localize(analysis.profile.facts).map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")
                      : `<li>${escapeHtml(t("sourcedForIndonesia"))}</li>`
                  }
                </ul>
              </article>
            </div>
            <div class="card-list">
              ${analysis.recommendations.map((item) => renderRecommendationCard(item)).join("")}
            </div>
          </section>
        `
        : ""
    }

    <section class="section-block">
      <div class="section-head">
        <div>
          <p class="eyebrow">${t("dueSoon")}</p>
          <h3>${t("reminders")}</h3>
        </div>
        <button class="text-btn" type="button" data-action="view" data-view="reminders">${t("addReminder")}</button>
      </div>
      <div class="card-list">
        ${
          reminderCards.length
            ? reminderCards
                .map(
                  (summary) => `
                    <article class="mini-card ${summary.dueState === "now" ? "due-now" : ""}">
                      <p class="mini-label">${escapeHtml(moduleTitle(summary.module.id))}</p>
                      <h4>${escapeHtml(vehicleLabel(summary.vehicle))}</h4>
                      <p>${t("nextDue")}: ${escapeHtml(summary.dueLabel)}</p>
                      <span class="status-pill ${summary.dueState === "now" ? "status-urgent" : "status-ok"}">${summary.dueState === "now" ? t("dueNow") : t("dueLater")}</span>
                    </article>
                  `
                )
                .join("")
            : `<article class="mini-card empty-card"><p>${t("emptyReminders")}</p></article>`
        }
      </div>
    </section>

    <section class="section-block">
      <div class="section-head">
        <div>
          <p class="eyebrow">${t("recommended")}</p>
          <h3>${t("learn")}</h3>
        </div>
        <button class="text-btn" type="button" data-action="view" data-view="learn">${t("viewAll")}</button>
      </div>
      <div class="card-list">
        ${recommendations.map((module) => renderModuleCard(module)).join("")}
      </div>
    </section>

    <section class="section-block">
      <div class="section-head">
        <div>
          <p class="eyebrow">${t("recentChecks")}</p>
          <h3>${t("history")}</h3>
        </div>
        <button class="text-btn" type="button" data-action="view" data-view="history">${t("viewAll")}</button>
      </div>
      <div class="card-list">
        ${
          latestLogs.length
            ? latestLogs.map((entry) => renderHistoryCard(entry)).join("")
            : `<article class="mini-card empty-card"><p>${t("noRecentLogs")}</p></article>`
        }
      </div>
    </section>

    ${
      analysis
        ? `
          <section class="section-block">
            <div class="section-head">
              <div>
                <p class="eyebrow">${t("sourceBasis")}</p>
                <h3>${t("sourceBasis")}</h3>
              </div>
            </div>
            <div class="card-list">
              ${analysis.sources.map((source) => renderSourceCard(source)).join("")}
            </div>
            <article class="detail-card tone-local">
              <p class="mini-label">${t("skillTitle")}</p>
              <h3>${t("skillBlurb")}</h3>
            </article>
          </section>
        `
        : ""
    }
  `;
}

function renderLearnView() {
  return `
    <section class="section-block">
      <div class="section-head">
        <div>
          <p class="eyebrow">${t("instructionMode")}</p>
          <h2>${t("learn")}</h2>
        </div>
      </div>
      <p class="section-copy">${t("learnIntro")}</p>
      ${CATEGORIES.map((category) => renderCategorySection(category.id)).join("")}
    </section>
  `;
}

function renderCategorySection(categoryId) {
  const matches = CHECK_MODULES.filter((entry) => entry.category === categoryId);
  return `
    <section class="module-section">
      <div class="section-head">
        <div>
          <p class="eyebrow">${escapeHtml(categoryLabel(categoryId))}</p>
          <h3>${escapeHtml(categoryLabel(categoryId))}</h3>
        </div>
      </div>
      <div class="card-list">
        ${matches.length ? matches.map((module) => renderModuleCard(module)).join("") : `<p>${t("noLessons")}</p>`}
      </div>
    </section>
  `;
}

function renderModuleCard(module) {
  const content = getModuleContent(module.id);
  const note = localize(module.localIndonesiaNotes)[0];
  const leadStep = content.instructionSteps[0];
  return `
    <article class="module-card">
      <div class="module-visual">
        ${renderLessonIllustration(leadStep.imageKey, leadStep.title)}
      </div>
      <p class="mini-label">${escapeHtml(categoryLabel(module.category))}</p>
      <h4>${escapeHtml(content.title)}</h4>
      <p>${escapeHtml(content.summary)}</p>
      <div class="module-meta">
        <span>${module.estimatedMinutes} min</span>
        <span>${escapeHtml(difficultyLabel(module.difficulty))}</span>
      </div>
      <p class="local-note">${escapeHtml(note)}</p>
      <button class="primary-btn compact-btn" data-action="open-module" data-module-id="${module.id}" type="button">${t("openGuide")}</button>
    </article>
  `;
}

function renderGuidedView() {
  const module = modulesById.get(persistentState.selectedModuleId) || CHECK_MODULES[0];
  const content = getModuleContent(module.id);
  const vehicle = activeVehicle();
  const defaultKm = vehicle ? vehicleOdometer(vehicle) : 0;
  const urgency = localize(module.urgencyRules);

  return `
    <section class="section-block">
      <button class="text-btn back-btn" type="button" data-action="view" data-view="learn">${t("backToLearn")}</button>
      <article class="guide-hero">
        <p class="eyebrow">${escapeHtml(categoryLabel(module.category))}</p>
        <h2>${escapeHtml(content.title)}</h2>
        <p>${escapeHtml(content.summary)}</p>
        <div class="guide-meta">
          <span>${module.estimatedMinutes} min</span>
          <span>${escapeHtml(difficultyLabel(module.difficulty))}</span>
        </div>
      </article>

      ${renderListCard(t("safetyPrep"), content.safetySteps, "safety")}
      ${renderListCard(t("whyMatters"), content.whyItMatters)}
      ${renderListCard(t("whenCheck"), content.whenToCheck)}
      ${renderListCard(t("toolsNeeded"), content.toolsNeeded)}
      ${renderListCard(t("indonesiaNotes"), localize(module.localIndonesiaNotes), "local")}

      <article class="detail-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">${t("instructionMode")}</p>
            <h3>${t("instructionMode")}</h3>
          </div>
        </div>
        <div class="step-list">
          ${content.instructionSteps
            .map(
              (step, index) => `
                <article class="step-card">
                  <div class="lesson-image" aria-label="${escapeHtml(t("lessonImage"))}">
                    ${renderLessonIllustration(step.imageKey, step.title)}
                  </div>
                  <div class="step-token">${escapeHtml(iconForStep(step.imageKey))}</div>
                  <div>
                    <p class="mini-label">0${index + 1}</p>
                    <h4>${escapeHtml(step.title)}</h4>
                    <p>${escapeHtml(step.body)}</p>
                    <p class="step-safety">${escapeHtml(step.safetyNote)}</p>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </article>

      ${renderListCard(t("normalSigns"), content.normalSigns)}
      ${renderListCard(t("warningSigns"), content.warningSigns, "warning")}
      ${renderListCard(t("commonMistakes"), content.commonMistakes)}
      ${renderListCard(t("nextActions"), content.nextActions)}

      <article class="detail-card urgency-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">${t("urgencyGuide")}</p>
            <h3>${t("urgencyGuide")}</h3>
          </div>
        </div>
        <div class="urgency-grid">
          ${STATUS_OPTIONS.map(
            (status) => `
              <article class="urgency-item">
                <span class="status-pill ${statusClass(status.value)}">${escapeHtml(localize(status.label))}</span>
                <p>${escapeHtml(urgency[status.value])}</p>
              </article>
            `
          ).join("")}
        </div>
      </article>

      <article class="detail-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">${t("logCheck")}</p>
            <h3>${t("logCheck")}</h3>
          </div>
        </div>
        <form id="inspection-form" class="stack-form" data-module-id="${module.id}">
          <label>
            <span>${t("inspectionStatus")}</span>
            <select name="status">${optionsMarkup(STATUS_OPTIONS, "ok")}</select>
          </label>
          <div class="split-grid">
            <label>
              <span>${t("date")}</span>
              <input name="checkedAt" type="date" value="${todayISO()}" required />
            </label>
            <label>
              <span>${t("odometer")}</span>
              <input name="odometerKm" type="number" min="0" step="1" value="${defaultKm}" required />
            </label>
          </div>
          <label>
            <span>${t("notes")}</span>
            <textarea name="notes" rows="4" placeholder="${escapeHtml(content.summary)}"></textarea>
          </label>
          <label>
            <span>${t("optionalPhoto")}</span>
            <input name="photo" type="file" accept="image/*" />
          </label>
          <button class="primary-btn" type="submit">${t("save")}</button>
        </form>
      </article>
    </section>
  `;
}

function renderListCard(title, items, tone = "") {
  return `
    <article class="detail-card ${tone ? `tone-${tone}` : ""}">
      <div class="section-head">
        <div>
          <p class="eyebrow">${escapeHtml(title)}</p>
          <h3>${escapeHtml(title)}</h3>
        </div>
      </div>
      <ul class="bullet-list">
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
  `;
}

function renderRecommendationCard(item) {
  const bucketLabel =
    item.bucket === "now" ? t("recommendationNow") : item.bucket === "soon" ? t("recommendationSoon") : t("recommendationWatch");
  return `
    <article class="mini-card recommendation-card">
      <div class="panel-headline">
        <div>
          <p class="mini-label">${escapeHtml(bucketLabel)}</p>
          <h4>${escapeHtml(item.title)}</h4>
        </div>
        <span class="status-pill ${item.bucket === "now" ? "status-urgent" : item.bucket === "soon" ? "status-soon" : "status-monitor"}">${escapeHtml(bucketLabel)}</span>
      </div>
      <p>${escapeHtml(item.body)}</p>
      <div class="source-chip-row">
        ${item.sourceIds
          .map((sourceId) => sourceById(sourceId))
          .filter(Boolean)
          .map((source) => `<a class="chip source-chip" href="${source.url}" target="_blank" rel="noreferrer">${escapeHtml(t("sourceTagOfficial"))}</a>`)
          .join("")}
      </div>
      <button class="text-btn" type="button" data-action="open-module" data-module-id="${item.moduleId}">${t("openGuide")}</button>
    </article>
  `;
}

function renderSourceCard(source) {
  return `
    <article class="mini-card source-card">
      <p class="mini-label">${t("sourceTagOfficial")}</p>
      <h4>${escapeHtml(source.label)}</h4>
      <p>${escapeHtml(localize(source.note))}</p>
      <a class="text-btn" href="${source.url}" target="_blank" rel="noreferrer">${source.url}</a>
    </article>
  `;
}

function renderHistoryView() {
  const filtered = [...persistentState.inspections]
    .filter((entry) => (uiState.historyVehicle === "all" ? true : entry.vehicleId === uiState.historyVehicle))
    .filter((entry) => (uiState.historyModule === "all" ? true : entry.moduleId === uiState.historyModule))
    .sort((left, right) => new Date(right.checkedAt) - new Date(left.checkedAt));

  return `
    <section class="section-block">
      <div class="section-head">
        <div>
          <p class="eyebrow">${t("recentChecks")}</p>
          <h2>${t("history")}</h2>
        </div>
      </div>
      <div class="filter-grid">
        <label>
          <span>${t("historyFilterVehicle")}</span>
          <select data-ui="history-vehicle">
            <option value="all"${uiState.historyVehicle === "all" ? " selected" : ""}>${t("allVehicles")}</option>
            ${persistentState.vehicles
              .map(
                (vehicle) =>
                  `<option value="${vehicle.id}"${uiState.historyVehicle === vehicle.id ? " selected" : ""}>${escapeHtml(vehicleLabel(vehicle))}</option>`
              )
              .join("")}
          </select>
        </label>
        <label>
          <span>${t("historyFilterModule")}</span>
          <select data-ui="history-module">
            <option value="all"${uiState.historyModule === "all" ? " selected" : ""}>${t("allModules")}</option>
            ${CHECK_MODULES.map((module) => {
              const content = getModuleContent(module.id);
              return `<option value="${module.id}"${uiState.historyModule === module.id ? " selected" : ""}>${escapeHtml(content.title)}</option>`;
            }).join("")}
          </select>
        </label>
      </div>
      <div class="card-list">
        ${filtered.length ? filtered.map((entry) => renderHistoryCard(entry)).join("") : `<article class="mini-card empty-card"><p>${t("emptyHistory")}</p></article>`}
      </div>
    </section>
  `;
}

function renderHistoryCard(entry) {
  const vehicle = persistentState.vehicles.find((item) => item.id === entry.vehicleId);
  const module = getModuleContent(entry.moduleId);
  const status = statusMeta(entry.status);
  return `
    <article class="mini-card history-card">
      <div class="panel-headline">
        <div>
          <p class="mini-label">${vehicle ? escapeHtml(vehicleLabel(vehicle)) : "—"}</p>
          <h4>${module ? escapeHtml(module.title) : entry.moduleId}</h4>
        </div>
        <span class="status-pill ${statusClass(entry.status)}">${escapeHtml(localize(status.label))}</span>
      </div>
      <p>${formatDate(entry.checkedAt)} · ${Number(entry.odometerKm).toLocaleString()} km</p>
      ${entry.notes ? `<p>${escapeHtml(entry.notes)}</p>` : ""}
      ${entry.photoUrl ? `<img class="photo-thumb" src="${entry.photoUrl}" alt="${escapeHtml(t("photoAttached"))}" />` : ""}
    </article>
  `;
}

function renderGarageView() {
  const current = activeVehicle();
  return `
    <section class="section-block">
      <div class="section-head">
        <div>
          <p class="eyebrow">${t("garage")}</p>
          <h2>${t("garage")}</h2>
        </div>
      </div>
      <article class="detail-card">
        <form id="vehicle-form" class="stack-form">
          <div class="split-grid">
            <label>
              <span>${t("brandLabel")}</span>
              <input name="make" type="text" maxlength="40" placeholder="Honda" value="Honda" required />
            </label>
            <label>
              <span>${t("modelLabel")}</span>
              <input name="model" type="text" maxlength="40" placeholder="Brio Satya" value="Brio Satya" required />
            </label>
          </div>
          <div class="split-grid">
            <label>
              <span>${t("yearLabel")}</span>
              <input name="year" type="number" min="1990" max="2035" value="2018" required />
            </label>
            <label>
              <span>${t("odometer")}</span>
              <input name="odometerKm" type="number" min="0" step="1" value="${current ? vehicleOdometer(current) : 0}" required />
            </label>
          </div>
          <div class="split-grid">
              <label>
                <span>${t("fuelLabel")}</span>
                <select name="fuelType">${optionsMarkup(FUEL_TYPES, DEFAULT_DASHBOARD_VEHICLE.fuelType)}</select>
              </label>
              <label>
                <span>${t("transmissionLabel")}</span>
                <select name="transmission">${optionsMarkup(TRANSMISSIONS, DEFAULT_DASHBOARD_VEHICLE.transmission)}</select>
              </label>
            </div>
            <label>
            <span>${t("bodyTypeLabel")}</span>
            <select name="bodyType">${optionsMarkup(BODY_TYPES, DEFAULT_DASHBOARD_VEHICLE.bodyType)}</select>
          </label>
          <button class="primary-btn" type="submit">${t("createVehicle")}</button>
        </form>
      </article>

      ${
        current
          ? `
            <article class="detail-card">
              <div class="section-head">
                <div>
                  <p class="eyebrow">${t("conditionSnapshot")}</p>
                  <h3>${escapeHtml(vehicleLabel(current))}</h3>
                </div>
              </div>
              <form class="stack-form" data-form="health-signals" data-vehicle-id="${current.id}">
                <div class="split-grid">
                  <label>
                    <span>${t("lastServiceDate")}</span>
                    <input name="lastServiceDate" type="date" value="${current.lastServiceDate || ""}" />
                  </label>
                  <label>
                    <span>${t("lastOilChangeKm")}</span>
                    <input name="lastOilChangeKm" type="number" min="0" step="1" value="${current.lastOilChangeKm || ""}" />
                  </label>
                </div>
                <div class="split-grid">
                  <label>
                    <span>${t("oilStatusLabel")}</span>
                    <select name="oilStatus">${optionsMarkup(CONDITION_SIGNAL_OPTIONS, current.healthSignals.oilStatus)}</select>
                  </label>
                  <label>
                    <span>${t("coolantStatusLabel")}</span>
                    <select name="coolantStatus">${optionsMarkup(CONDITION_SIGNAL_OPTIONS, current.healthSignals.coolantStatus)}</select>
                  </label>
                </div>
                <div class="split-grid">
                  <label>
                    <span>${t("batteryStatusLabel")}</span>
                    <select name="batteryStatus">${optionsMarkup(CONDITION_SIGNAL_OPTIONS, current.healthSignals.batteryStatus)}</select>
                  </label>
                  <label>
                    <span>${t("brakeStatusLabel")}</span>
                    <select name="brakeStatus">${optionsMarkup(CONDITION_SIGNAL_OPTIONS, current.healthSignals.brakeStatus)}</select>
                  </label>
                </div>
                <div class="split-grid">
                  <label>
                    <span>${t("tireStatusLabel")}</span>
                    <select name="tireStatus">${optionsMarkup(CONDITION_SIGNAL_OPTIONS, current.healthSignals.tireStatus)}</select>
                  </label>
                  <label>
                    <span>${t("warningLightLabel")}</span>
                    <select name="warningLightStatus">${optionsMarkup(WARNING_LIGHT_OPTIONS, current.healthSignals.warningLightStatus)}</select>
                  </label>
                </div>
                <label>
                  <span>${t("floodExposureLabel")}</span>
                  <select name="floodExposure">${optionsMarkup(FLOOD_EXPOSURE_OPTIONS, current.healthSignals.floodExposure)}</select>
                </label>
                <button class="primary-btn" type="submit">${t("save")}</button>
              </form>
            </article>
          `
          : ""
      }

      <div class="card-list">
        ${persistentState.vehicles
          .map((vehicle) => {
            const isActive = vehicle.id === persistentState.activeVehicleId;
            return `
              <article class="mini-card ${isActive ? "active-vehicle" : ""}">
                <div class="panel-headline">
                  <div>
                    <p class="mini-label">${escapeHtml(localize(BODY_TYPES.find((entry) => entry.value === vehicle.bodyType)?.label || { id: "", en: "" }))}</p>
                    <h4>${escapeHtml(vehicleLabel(vehicle))}</h4>
                  </div>
                  ${isActive ? `<span class="status-pill status-ok">${t("activeTag")}</span>` : ""}
                </div>
                <p>${vehicleOdometer(vehicle).toLocaleString()} km · ${escapeHtml(localize(FUEL_TYPES.find((entry) => entry.value === vehicle.fuelType)?.label || { id: "", en: "" }))}</p>
                <div class="action-row">
                  <button class="secondary-btn compact-btn" data-action="set-active-vehicle" data-vehicle-id="${vehicle.id}" type="button">${t("setActive")}</button>
                </div>
                <form class="stack-form mini-form" data-form="odometer" data-vehicle-id="${vehicle.id}">
                  <label>
                    <span>${t("updateOdometer")}</span>
                    <input name="odometerKm" type="number" min="0" step="1" value="${vehicleOdometer(vehicle)}" required />
                  </label>
                  <button class="secondary-btn compact-btn" type="submit">${t("save")}</button>
                </form>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderReminderView() {
  const current = activeVehicle();
  return `
    <section class="section-block">
      <div class="section-head">
        <div>
          <p class="eyebrow">${t("reminders")}</p>
          <h2>${t("reminders")}</h2>
        </div>
      </div>

      <article class="detail-card">
        <form id="reminder-form" class="stack-form">
          <label>
            <span>${t("vehicle")}</span>
            <select name="vehicleId">
              ${persistentState.vehicles
                .map(
                  (vehicle) =>
                    `<option value="${vehicle.id}"${vehicle.id === persistentState.activeVehicleId ? " selected" : ""}>${escapeHtml(vehicleLabel(vehicle))}</option>`
                )
                .join("")}
            </select>
          </label>
          <label>
            <span>${t("module")}</span>
            <select name="moduleId">
              ${CHECK_MODULES.map((module) => {
                const content = getModuleContent(module.id);
                return `<option value="${module.id}">${escapeHtml(content.title)}</option>`;
              }).join("")}
            </select>
          </label>
          <label>
            <span>${t("reminderMode")}</span>
            <select name="mode" data-ui="reminder-mode">
              <option value="date"${uiState.reminderMode === "date" ? " selected" : ""}>${t("reminderDateMode")}</option>
              <option value="km"${uiState.reminderMode === "km" ? " selected" : ""}>${t("reminderKmMode")}</option>
            </select>
          </label>
          ${
            uiState.reminderMode === "date"
              ? `
                <label>
                  <span>${t("intervalDays")}</span>
                  <input name="dateIntervalDays" type="number" min="1" value="30" required />
                </label>
              `
              : `
                <label>
                  <span>${t("intervalKm")}</span>
                  <input name="kmInterval" type="number" min="100" step="100" value="5000" required />
                </label>
              `
          }
          <button class="primary-btn" type="submit">${t("addReminder")}</button>
        </form>
      </article>

      ${current && isMileageStale(current) ? `<p class="stale-note">${t("staleMileage")}</p>` : ""}

      <div class="card-list">
        ${
          persistentState.reminders.length
            ? persistentState.reminders
                .map(reminderSummary)
                .filter(Boolean)
                .sort((left, right) => {
                  if (left.dueState === right.dueState) {
                    return 0;
                  }
                  return left.dueState === "now" ? -1 : 1;
                })
                .map(
                  (summary) => `
                    <article class="mini-card ${summary.dueState === "now" ? "due-now" : ""}">
                      <div class="panel-headline">
                        <div>
                          <p class="mini-label">${escapeHtml(vehicleLabel(summary.vehicle))}</p>
                          <h4>${escapeHtml(getModuleContent(summary.module.id).title)}</h4>
                        </div>
                        <span class="status-pill ${summary.dueState === "now" ? "status-urgent" : "status-ok"}">${
                          summary.dueState === "now" ? t("dueNow") : t("dueLater")
                        }</span>
                      </div>
                      <p>${t("nextDue")}: ${escapeHtml(summary.dueLabel)}</p>
                      ${
                        summary.reminder.mode === "km"
                          ? `<p>${summary.currentKm.toLocaleString()} km • ${
                              summary.currentKm >= summary.reminder.nextDueKm ? t("kmStatusOverdue") : t("kmStatusCurrent")
                            }</p>`
                          : ""
                      }
                      <button class="text-btn" type="button" data-action="delete-reminder" data-reminder-id="${summary.reminder.id}">${t("deleteReminder")}</button>
                    </article>
                  `
                )
                .join("")
            : `<article class="mini-card empty-card"><p>${t("emptyReminders")}</p></article>`
        }
      </div>
    </section>
  `;
}

function renderSettingsView() {
  return `
    <section class="section-block">
      <div class="section-head">
        <div>
          <p class="eyebrow">${t("settings")}</p>
          <h2>${t("settings")}</h2>
        </div>
      </div>
      <article class="detail-card">
        <p class="mini-label">${t("language")}</p>
        <div class="toggle-row">
          <button class="secondary-btn ${persistentState.settings.locale === "id" ? "selected-toggle" : ""}" type="button" data-action="set-locale" data-locale="id">Bahasa Indonesia</button>
          <button class="secondary-btn ${persistentState.settings.locale === "en" ? "selected-toggle" : ""}" type="button" data-action="set-locale" data-locale="en">English</button>
        </div>
      </article>
      <article class="detail-card">
        <p class="mini-label">${t("units")}</p>
        <h3>km</h3>
        <p>${t("kilometersOnly")}</p>
      </article>
      <article class="detail-card tone-warning">
        <p class="mini-label">${t("safetyFirst")}</p>
        <h3>${t("disclaimer")}</h3>
      </article>
    </section>
  `;
}

function statusClass(status) {
  if (status === "urgent") return "status-urgent";
  if (status === "service-soon") return "status-soon";
  if (status === "monitor") return "status-monitor";
  return "status-ok";
}

function handleClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  if (action === "view") {
    persistentState.view = button.dataset.view;
    if (button.dataset.view !== "guided") {
      persistentState.selectedModuleId = "";
    }
    saveState();
    render();
  }

  if (action === "open-module") {
    persistentState.view = "guided";
    persistentState.selectedModuleId = button.dataset.moduleId;
    saveState();
    render();
  }

  if (action === "set-locale") {
    persistentState.settings.locale = button.dataset.locale;
    saveState();
    render();
  }

  if (action === "set-active-vehicle") {
    persistentState.activeVehicleId = button.dataset.vehicleId;
    saveState();
    render();
  }

  if (action === "delete-reminder") {
    persistentState.reminders = persistentState.reminders.filter((entry) => entry.id !== button.dataset.reminderId);
    saveState();
    render();
  }
}

function handleChange(event) {
  const control = event.target;
  if (control.dataset.ui === "history-vehicle") {
    uiState.historyVehicle = control.value;
    render();
  }
  if (control.dataset.ui === "history-module") {
    uiState.historyModule = control.value;
    render();
  }
  if (control.dataset.ui === "reminder-mode") {
    uiState.reminderMode = control.value;
    render();
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (form.id === "onboarding-form") {
    const formData = new FormData(form);
    const vehicle = buildVehicle(formData);
    persistentState.settings.locale = String(formData.get("locale") || "id");
    persistentState.vehicles = [vehicle];
    persistentState.activeVehicleId = vehicle.id;
    persistentState.view = "home";
    saveState();
    render();
    return;
  }

  if (form.id === "vehicle-form") {
    const vehicle = buildVehicle(new FormData(form));
    persistentState.vehicles.unshift(vehicle);
    persistentState.activeVehicleId = vehicle.id;
    saveState();
    form.reset();
    setFlash(t("vehicleSaved"));
    render();
    return;
  }

  if (form.dataset.form === "odometer") {
    const vehicle = persistentState.vehicles.find((entry) => entry.id === form.dataset.vehicleId);
    if (vehicle) {
      const nextKm = Number(new FormData(form).get("odometerKm") || 0);
      vehicle.odometerKm = Math.max(vehicleOdometer(vehicle), nextKm);
      saveState();
      setFlash(t("odometerUpdated"));
      render();
    }
    return;
  }

  if (form.dataset.form === "health-signals") {
    const vehicle = persistentState.vehicles.find((entry) => entry.id === form.dataset.vehicleId);
    if (vehicle) {
      const formData = new FormData(form);
      vehicle.lastServiceDate = String(formData.get("lastServiceDate") || "");
      vehicle.lastOilChangeKm = Number(formData.get("lastOilChangeKm") || 0);
      vehicle.healthSignals = {
        ...vehicle.healthSignals,
        oilStatus: String(formData.get("oilStatus") || "ok"),
        coolantStatus: String(formData.get("coolantStatus") || "ok"),
        batteryStatus: String(formData.get("batteryStatus") || "ok"),
        brakeStatus: String(formData.get("brakeStatus") || "ok"),
        tireStatus: String(formData.get("tireStatus") || "ok"),
        warningLightStatus: String(formData.get("warningLightStatus") || "none"),
        floodExposure: String(formData.get("floodExposure") || "none"),
      };
      saveState();
      setFlash(t("healthSignalsSaved"));
      render();
    }
    return;
  }

  if (form.id === "inspection-form") {
    const formData = new FormData(form);
    const vehicle = activeVehicle();
    if (!vehicle) {
      return;
    }
    const photoFile = formData.get("photo");
    const photoUrl = photoFile instanceof File && photoFile.size ? await fileToDataUrl(photoFile) : "";
    const checkedAt = String(formData.get("checkedAt") || todayISO());
    const odometerKm = Number(formData.get("odometerKm") || vehicleOdometer(vehicle));

    persistentState.inspections.unshift({
      id: createId("inspection"),
      vehicleId: vehicle.id,
      moduleId: form.dataset.moduleId,
      status: String(formData.get("status") || "ok"),
      odometerKm,
      notes: String(formData.get("notes") || "").trim(),
      photoUrl,
      checkedAt,
      localeUsed: persistentState.settings.locale,
    });

    vehicle.odometerKm = Math.max(vehicle.odometerKm, odometerKm);
    saveState();
    setFlash(t("inspectionSaved"));
    persistentState.view = "history";
    render();
    return;
  }

  if (form.id === "reminder-form") {
    const formData = new FormData(form);
    const vehicleId = String(formData.get("vehicleId") || "");
    const moduleId = String(formData.get("moduleId") || "");
    const mode = String(formData.get("mode") || "date");
    const baselineLog = latestInspectionFor(vehicleId, moduleId);
    const vehicle = persistentState.vehicles.find((entry) => entry.id === vehicleId);
    const baseDate = baselineLog ? new Date(baselineLog.checkedAt) : new Date();
    const baseKm = baselineLog ? Number(baselineLog.odometerKm || 0) : vehicle ? vehicleOdometer(vehicle) : 0;

    const reminder = {
      id: createId("reminder"),
      vehicleId,
      moduleId,
      mode,
      dateIntervalDays: mode === "date" ? Number(formData.get("dateIntervalDays") || 30) : null,
      kmInterval: mode === "km" ? Number(formData.get("kmInterval") || 5000) : null,
      nextDueDate: "",
      nextDueKm: null,
    };

    if (mode === "date") {
      baseDate.setDate(baseDate.getDate() + reminder.dateIntervalDays);
      reminder.nextDueDate = baseDate.toISOString().slice(0, 10);
    } else {
      reminder.nextDueKm = baseKm + reminder.kmInterval;
    }

    persistentState.reminders.unshift(reminder);
    saveState();
    setFlash(t("reminderCreated"));
    render();
  }
}

function buildVehicle(formData) {
  return ensureVehicleShape({
    id: createId("vehicle"),
    make: String(formData.get("make") || "").trim(),
    model: String(formData.get("model") || "").trim(),
    year: Number(formData.get("year") || new Date().getFullYear()),
    fuelType: String(formData.get("fuelType") || "pertamax"),
    transmission: String(formData.get("transmission") || "automatic"),
    bodyType: String(formData.get("bodyType") || "mpv"),
    odometerKm: Number(formData.get("odometerKm") || 0),
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Unable to read the selected image."));
    reader.readAsDataURL(file);
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Ignore registration failures so the app still works online.
      });
    });
  }
}
