export const LOCALES = ["id", "en"];

export const CATEGORIES = [
  { id: "fluids", label: { id: "Cairan", en: "Fluids" } },
  { id: "tires", label: { id: "Ban dan roda", en: "Tires and wheels" } },
  { id: "electrical", label: { id: "Kelistrikan", en: "Electrical" } },
  { id: "safety", label: { id: "Keselamatan", en: "Safety" } },
  { id: "comfort", label: { id: "Kenyamanan", en: "Comfort" } },
  { id: "trip", label: { id: "Perjalanan", en: "Trip prep" } },
  { id: "weather", label: { id: "Cuaca dan banjir", en: "Weather and flood" } },
];

export const FUEL_TYPES = [
  { value: "pertalite", label: { id: "Pertalite", en: "Pertalite" } },
  { value: "pertamax", label: { id: "Pertamax", en: "Pertamax" } },
  { value: "pertamax-turbo", label: { id: "Pertamax Turbo", en: "Pertamax Turbo" } },
  { value: "solar", label: { id: "Solar", en: "Solar diesel" } },
  { value: "dexlite", label: { id: "Dexlite", en: "Dexlite" } },
  { value: "pertamina-dex", label: { id: "Pertamina Dex", en: "Pertamina Dex" } },
];

export const BODY_TYPES = [
  { value: "mpv", label: { id: "MPV", en: "MPV" } },
  { value: "lcgc", label: { id: "LCGC", en: "LCGC" } },
  { value: "hatchback", label: { id: "Hatchback", en: "Hatchback" } },
  { value: "sedan", label: { id: "Sedan", en: "Sedan" } },
  { value: "suv", label: { id: "SUV", en: "SUV" } },
  { value: "pickup", label: { id: "Pickup", en: "Pickup" } },
];

export const TRANSMISSIONS = [
  { value: "manual", label: { id: "Manual", en: "Manual" } },
  { value: "automatic", label: { id: "Otomatis", en: "Automatic" } },
  { value: "cvt", label: { id: "CVT", en: "CVT" } },
];

export const STATUS_OPTIONS = [
  { value: "ok", label: { id: "OK", en: "OK" } },
  { value: "monitor", label: { id: "Pantau", en: "Monitor" } },
  { value: "service-soon", label: { id: "Servis segera", en: "Needs service soon" } },
  { value: "urgent", label: { id: "Mendesak", en: "Urgent" } },
];

function content(id, en) {
  return { id, en };
}

function module(definition) {
  return definition;
}

export const CHECK_MODULES = [
  module({
    id: "engine-oil",
    category: "fluids",
    estimatedMinutes: 6,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Kemacetan harian dan suhu panas kota dapat mempercepat penurunan kualitas oli.",
        "Untuk mobil yang sering dipakai mudik atau macet berat, cek level oli lebih sering daripada jadwal servis minimum.",
      ],
      [
        "Daily stop-go traffic and hot urban temperatures can age engine oil faster.",
        "Cars used for heavy commuting or long mudik trips should have their oil level checked more often than the minimum service schedule.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Lanjutkan pemantauan rutin. Catat kilometer dan cek kembali pada minggu berikutnya atau sebelum perjalanan jauh.",
        monitor: "Top up atau pantau warna oli. Jadwalkan pemeriksaan ulang dalam waktu dekat.",
        "service-soon": "Buat janji servis bila level berada dekat minimum atau oli terlihat sangat gelap dan encer.",
        urgent: "Jangan memaksa mobil dipakai bila lampu oli menyala atau suara mesin kasar. Berhenti aman dan minta bantuan bengkel.",
      },
      {
        ok: "Continue normal monitoring. Log the odometer and check again next week or before a long trip.",
        monitor: "Top up or watch the oil condition closely. Recheck soon.",
        "service-soon": "Book service if the level sits near minimum or the oil looks very dark and thin.",
        urgent: "Do not keep driving if the oil warning light appears or the engine sounds rough. Stop safely and seek workshop help.",
      }
    ),
    locales: {
      id: {
        title: "Oli mesin",
        summary: "Panduan cepat untuk memeriksa level dan kondisi oli mesin dengan aman.",
        whyItMatters: [
          "Oli melumasi komponen mesin dan membantu mengendalikan panas.",
          "Level oli yang rendah dapat mempercepat keausan dan memicu kerusakan serius.",
        ],
        whenToCheck: [
          "Saat mesin dingin atau setelah mesin dimatikan beberapa menit di permukaan rata.",
          "Sebelum perjalanan jauh, setelah macet berat, dan bila lampu oli pernah berkedip.",
        ],
        toolsNeeded: ["Lap bersih atau tisu bengkel", "Sarung tangan tipis bila perlu"],
        safetySteps: [
          "Parkir di tempat datar dan aktifkan rem tangan.",
          "Jangan menyentuh bagian panas di sekitar mesin.",
        ],
        instructionSteps: [
          {
            title: "Siapkan mobil",
            body: "Matikan mesin, tunggu 5 sampai 10 menit, lalu buka kap mesin pada posisi aman.",
            safetyNote: "Pastikan kap tertopang sempurna sebelum tangan masuk ke ruang mesin.",
            imageKey: "hood-open",
          },
          {
            title: "Cari dipstick oli",
            body: "Temukan gagang dipstick, tarik keluar, bersihkan, lalu masukkan kembali sampai penuh.",
            safetyNote: "Jangan salah mengambil dipstick transmisi jika mobil Anda memilikinya.",
            imageKey: "dipstick",
          },
          {
            title: "Baca level oli",
            body: "Tarik kembali dipstick dan lihat apakah level oli berada di antara tanda minimum dan maksimum.",
            safetyNote: "Bila level di bawah minimum, jangan langsung perjalanan jauh sebelum ditambah dan dicek penyebabnya.",
            imageKey: "level-check",
          },
        ],
        normalSigns: ["Level berada di antara min dan max", "Tidak ada bau gosong yang kuat", "Warna masih konsisten tanpa busa"],
        warningSigns: ["Level di bawah minimum", "Ada busa atau campuran seperti susu", "Lampu oli menyala atau mesin terdengar kasar"],
        commonMistakes: ["Mengecek di jalan miring", "Membaca oli saat baru mesin dimatikan", "Mengisi terlalu banyak"],
        nextActions: ["Tambahkan oli sesuai spesifikasi bila kurang", "Servis bila warna atau tekstur oli tidak normal", "Hentikan penggunaan bila ada indikasi tekanan oli bermasalah"],
      },
      en: {
        title: "Engine oil",
        summary: "A quick guide to safely checking engine oil level and condition.",
        whyItMatters: [
          "Oil lubricates engine parts and helps control heat.",
          "Low oil can speed up wear and trigger severe engine damage.",
        ],
        whenToCheck: [
          "When the engine is cool or a few minutes after shutdown on level ground.",
          "Before long trips, after heavy traffic, and any time the oil warning light has flickered.",
        ],
        toolsNeeded: ["Clean rag or workshop tissue", "Light gloves if preferred"],
        safetySteps: ["Park on level ground and engage the parking brake.", "Avoid touching hot engine parts."],
        instructionSteps: [
          {
            title: "Prepare the car",
            body: "Switch off the engine, wait 5 to 10 minutes, then open the hood securely.",
            safetyNote: "Make sure the hood is properly supported before reaching into the bay.",
            imageKey: "hood-open",
          },
          {
            title: "Find the dipstick",
            body: "Locate the oil dipstick, pull it out, wipe it clean, and insert it fully again.",
            safetyNote: "Do not confuse it with a transmission dipstick on older cars that still have one.",
            imageKey: "dipstick",
          },
          {
            title: "Read the level",
            body: "Pull it back out and confirm the oil sits between the minimum and maximum marks.",
            safetyNote: "If it is below minimum, avoid a long drive until you top up and inspect the cause.",
            imageKey: "level-check",
          },
        ],
        normalSigns: ["Oil level sits between min and max", "No strong burnt smell", "Color is consistent and not foamy"],
        warningSigns: ["Oil level below minimum", "Foamy or milky appearance", "Oil light stays on or the engine sounds rough"],
        commonMistakes: ["Checking on a slope", "Reading immediately after shutdown", "Overfilling the engine"],
        nextActions: ["Top up with the correct spec if low", "Service the car if the oil texture or color looks abnormal", "Stop using the car if pressure-related symptoms appear"],
      },
    },
  }),
  module({
    id: "coolant",
    category: "fluids",
    estimatedMinutes: 5,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Cuaca panas dan kemacetan panjang membuat sistem pendingin bekerja lebih keras.",
        "Setelah perjalanan menanjak atau macet berat, biarkan mesin dingin total sebelum membuka tutup reservoir.",
      ],
      [
        "Hot weather and long traffic jams put extra load on the cooling system.",
        "After hills or heavy traffic, let the engine cool fully before touching the reservoir cap.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Level coolant stabil dan tidak ada kebocoran. Lanjutkan pemeriksaan berkala.",
        monitor: "Pantau level beberapa hari ke depan jika mendekati batas minimum.",
        "service-soon": "Segera servis bila level turun berulang atau terlihat bekas kebocoran.",
        urgent: "Jangan buka tutup radiator saat panas. Hentikan kendaraan bila indikator suhu naik atau uap keluar.",
      },
      {
        ok: "Coolant level is stable and no leak is visible. Continue periodic checks.",
        monitor: "Watch the level over the next few days if it is close to minimum.",
        "service-soon": "Service soon if the level keeps dropping or you can see leak traces.",
        urgent: "Never open the radiator cap when hot. Stop driving if the temperature rises or steam appears.",
      }
    ),
    locales: {
      id: {
        title: "Coolant",
        summary: "Cara aman memeriksa reservoir coolant untuk mencegah overheat.",
        whyItMatters: [
          "Coolant menjaga suhu mesin tetap stabil.",
          "Kekurangan coolant dapat menyebabkan mesin overheat dan mogok.",
        ],
        whenToCheck: ["Saat mesin benar-benar dingin", "Sebelum mudik atau setelah indikator suhu terlihat tidak normal"],
        toolsNeeded: ["Senter kecil bila reservoir kurang terlihat"],
        safetySteps: ["Jangan buka tutup radiator ketika mesin panas", "Gunakan sarung tangan bila area sekitar masih hangat"],
        instructionSteps: [
          {
            title: "Cari tabung reservoir",
            body: "Temukan tangki coolant transparan dengan tanda minimum dan maksimum.",
            safetyNote: "Baca manual kendaraan jika letaknya tidak jelas.",
            imageKey: "reservoir",
          },
          {
            title: "Lihat level cairan",
            body: "Pastikan cairan berada di antara batas min dan max saat mesin dingin.",
            safetyNote: "Jangan menilai level dari cairan yang masih bergolak setelah mesin panas.",
            imageKey: "fluid-window",
          },
          {
            title: "Cari tanda kebocoran",
            body: "Periksa selang, area reservoir, dan bawah mobil untuk noda cairan berwarna.",
            safetyNote: "Jika ada kerak putih atau bau manis tajam, anggap sebagai tanda perlu pemeriksaan lanjutan.",
            imageKey: "leak-check",
          },
        ],
        normalSigns: ["Level stabil", "Warna cairan bersih sesuai jenis coolant", "Tidak ada noda bocor di sekitar selang"],
        warningSigns: ["Level turun cepat", "Warna keruh atau bercampur minyak", "Indikator suhu naik"],
        commonMistakes: ["Membuka tutup radiator saat panas", "Menambah air sembarang terus-menerus tanpa mencari sumber bocor", "Mengabaikan kipas radiator yang sering menyala lama"],
        nextActions: ["Top up sesuai rekomendasi kendaraan", "Jadwalkan servis jika level sering turun", "Berhenti aman bila mesin mulai overheat"],
      },
      en: {
        title: "Coolant",
        summary: "How to safely check the coolant reservoir and reduce overheating risk.",
        whyItMatters: ["Coolant keeps engine temperature stable.", "Low coolant can lead to overheating and breakdowns."],
        whenToCheck: ["Only when the engine is fully cool", "Before mudik trips or after unusual temperature readings"],
        toolsNeeded: ["Small flashlight if the reservoir is hard to see"],
        safetySteps: ["Never open the radiator cap when hot", "Wear gloves if the area still feels warm"],
        instructionSteps: [
          {
            title: "Find the reservoir",
            body: "Locate the translucent coolant tank with minimum and maximum markings.",
            safetyNote: "Check the vehicle manual if the location is unclear.",
            imageKey: "reservoir",
          },
          {
            title: "Read the level",
            body: "Confirm the fluid sits between min and max while the engine is cold.",
            safetyNote: "Do not judge the level while fluid is still turbulent after a hot shutdown.",
            imageKey: "fluid-window",
          },
          {
            title: "Check for leaks",
            body: "Inspect hoses, the reservoir area, and the ground under the car for colored fluid stains.",
            safetyNote: "White crust or a sweet smell means the system needs closer inspection.",
            imageKey: "leak-check",
          },
        ],
        normalSigns: ["Stable level", "Clean fluid color appropriate to the coolant type", "No stains near hoses"],
        warningSigns: ["Level drops quickly", "Cloudy fluid or oily contamination", "Temperature gauge climbs high"],
        commonMistakes: ["Opening the radiator cap while hot", "Repeatedly topping up with plain water without finding the leak", "Ignoring cooling fans that run unusually long"],
        nextActions: ["Top up with the correct fluid", "Book service if the level keeps dropping", "Stop safely if the engine begins to overheat"],
      },
    },
  }),
  module({
    id: "brake-fluid",
    category: "fluids",
    estimatedMinutes: 5,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Jalan macet, turunan panjang, dan sering injak-rem membuat sistem rem bekerja berat.",
        "Jika sering melewati daerah berbukit atau perjalanan jauh, cek rem sebelum berangkat.",
      ],
      [
        "Heavy traffic, long descents, and frequent braking put more load on the brake system.",
        "If you regularly drive hills or long routes, inspect the brakes before leaving.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Reservoir terlihat normal dan pedal rem terasa konsisten.",
        monitor: "Pantau bila level mulai turun namun belum ada gejala di pedal.",
        "service-soon": "Servis cepat bila level mendekati minimum atau warna cairan semakin gelap.",
        urgent: "Jangan lanjut berkendara bila pedal rem ambles, rem terasa kosong, atau ada kebocoran cairan rem.",
      },
      {
        ok: "The reservoir looks normal and the brake pedal feels consistent.",
        monitor: "Watch closely if the level is dropping but pedal feel remains stable.",
        "service-soon": "Service soon if the level approaches minimum or the fluid has turned very dark.",
        urgent: "Do not keep driving if the brake pedal sinks, feels empty, or you find a brake fluid leak.",
      }
    ),
    locales: {
      id: {
        title: "Minyak rem",
        summary: "Pemeriksaan visual reservoir minyak rem dan tanda bahaya pedal rem.",
        whyItMatters: ["Minyak rem menyalurkan tekanan saat Anda mengerem.", "Cairan yang kurang atau bocor adalah risiko keselamatan tinggi."],
        whenToCheck: ["Sebelum perjalanan jauh", "Segera bila pedal rem terasa berbeda dari biasanya"],
        toolsNeeded: ["Senter kecil"],
        safetySteps: ["Matikan mesin dan parkir rata", "Hindari tumpahan minyak rem ke cat bodi karena dapat merusak lapisan"],
        instructionSteps: [
          {
            title: "Temukan reservoir rem",
            body: "Cari tabung minyak rem di dekat firewall ruang mesin.",
            safetyNote: "Jangan membuka tutup jika Anda hanya perlu cek level visual.",
            imageKey: "brake-reservoir",
          },
          {
            title: "Baca level dan warna",
            body: "Pastikan cairan berada di atas minimum dan warnanya tidak terlalu gelap.",
            safetyNote: "Level rendah bisa berarti kampas aus atau ada kebocoran, jadi jangan hanya tambah cairan lalu abaikan.",
            imageKey: "fluid-window",
          },
          {
            title: "Rasakan pedal rem",
            body: "Dengan mesin hidup, injak pedal rem perlahan. Pedal harus terasa mantap, tidak ambles berlebihan.",
            safetyNote: "Jika pedal terasa kosong, jangan dipakai ke jalan umum sebelum diperiksa.",
            imageKey: "pedal",
          },
        ],
        normalSigns: ["Level di atas minimum", "Warna cairan masih jernih relatif", "Pedal rem mantap"],
        warningSigns: ["Level turun mendekati minimum", "Pedal rem spongy atau ambles", "Ada noda cairan di sekitar roda atau master rem"],
        commonMistakes: ["Menambah cairan tanpa mencari sebab turunnya level", "Mengabaikan perubahan pedal rem", "Mencampur jenis minyak rem tanpa cek spesifikasi"],
        nextActions: ["Catat gejala dan jadwalkan inspeksi rem", "Segera ke bengkel bila ada rasa rem kosong", "Gunakan towing bila pengereman sudah tidak aman"],
      },
      en: {
        title: "Brake fluid",
        summary: "Visual brake fluid reservoir checks plus danger signs in pedal feel.",
        whyItMatters: ["Brake fluid transfers pressure when you brake.", "Low or leaking brake fluid is a high safety risk."],
        whenToCheck: ["Before a long trip", "Immediately if the brake pedal feels different"],
        toolsNeeded: ["Small flashlight"],
        safetySteps: ["Switch off the engine and park on level ground", "Avoid spilling brake fluid on painted surfaces"],
        instructionSteps: [
          {
            title: "Find the brake reservoir",
            body: "Look for the brake fluid reservoir near the firewall in the engine bay.",
            safetyNote: "Do not open the cap if you only need a visual level check.",
            imageKey: "brake-reservoir",
          },
          {
            title: "Read the level and color",
            body: "Confirm the fluid is above minimum and not excessively dark.",
            safetyNote: "A low level can mean worn pads or a leak, so do not just top up and ignore it.",
            imageKey: "fluid-window",
          },
          {
            title: "Feel the pedal",
            body: "With the engine running, press the brake pedal gradually. It should feel firm, not sink excessively.",
            safetyNote: "If the pedal feels empty, do not take the car onto public roads before inspection.",
            imageKey: "pedal",
          },
        ],
        normalSigns: ["Fluid above minimum", "Relatively clear color", "Firm brake pedal"],
        warningSigns: ["Level close to minimum", "Spongy or sinking pedal", "Fluid stains around wheels or the master cylinder"],
        commonMistakes: ["Topping up without finding the cause", "Ignoring brake feel changes", "Mixing fluid types without checking spec"],
        nextActions: ["Log the symptoms and schedule a brake inspection", "Go to a workshop immediately if braking feels empty", "Use towing if the brakes are no longer safe"],
      },
    },
  }),
  module({
    id: "battery",
    category: "electrical",
    estimatedMinutes: 5,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Panas tinggi di parkiran terbuka dapat memperpendek umur aki.",
        "Mobil yang sering dipakai jarak pendek di kemacetan bisa mengalami pengisian aki yang kurang optimal.",
      ],
      [
        "High heat in open parking can shorten battery life.",
        "Cars used mostly for short stop-go trips may not recharge the battery optimally.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Terminal bersih dan start mesin normal.",
        monitor: "Pantau bila ada kerak tipis atau start mulai lebih lambat.",
        "service-soon": "Servis aki bila tegangan atau start terasa melemah beberapa hari berturut-turut.",
        urgent: "Jika mobil sulit start total, terminal sangat longgar, atau lampu aki menyala, segera cek bengkel.",
      },
      {
        ok: "Terminals are clean and starts are normal.",
        monitor: "Watch it if light corrosion appears or cranking becomes slightly slower.",
        "service-soon": "Service the battery if voltage or cranking strength drops for several days.",
        urgent: "If the car barely starts, the terminals are loose, or the battery light is on, seek workshop help quickly.",
      }
    ),
    locales: {
      id: {
        title: "Aki",
        summary: "Pemeriksaan visual aki untuk mendeteksi korosi, terminal longgar, dan gejala aki lemah.",
        whyItMatters: ["Aki mendukung proses starter dan sistem listrik dasar.", "Aki lemah sering muncul tiba-tiba saat mobil akan dipakai."],
        whenToCheck: ["Setiap beberapa minggu", "Sebelum perjalanan jauh atau bila starter mulai berat"],
        toolsNeeded: ["Senter", "Sarung tangan tipis"],
        safetySteps: ["Matikan mesin dan aksesori", "Jangan menyentuhkan alat logam ke kedua kutub aki sekaligus"],
        instructionSteps: [
          {
            title: "Lihat kondisi fisik aki",
            body: "Periksa casing aki apakah retak, menggembung, atau basah.",
            safetyNote: "Jika casing rusak, jangan tangani sendiri bila cairan tampak keluar.",
            imageKey: "battery",
          },
          {
            title: "Periksa terminal",
            body: "Cari kerak putih atau biru, dan lihat apakah klem terminal tampak longgar.",
            safetyNote: "Korosi berat perlu dibersihkan dengan prosedur aman, bukan disiram sembarang.",
            imageKey: "battery-terminals",
          },
          {
            title: "Amati gejala start",
            body: "Catat apakah starter terasa lambat, lampu redup saat start, atau jam/reset sering berubah.",
            safetyNote: "Gejala berulang lebih penting daripada satu kejadian tunggal.",
            imageKey: "starter",
          },
        ],
        normalSigns: ["Casing rapi", "Terminal bersih", "Starter sekali putar"],
        warningSigns: ["Kerak di terminal", "Starter berat", "Lampu indikator aki menyala"],
        commonMistakes: ["Mengabaikan terminal longgar", "Memaksa start berulang tanpa cek aki", "Mengira aki selalu baik hanya karena lampu masih menyala"],
        nextActions: ["Bersihkan atau kencangkan terminal dengan prosedur aman", "Tes aki di bengkel bila starter mulai berat", "Ganti aki bila usia dan gejala sudah kuat"],
      },
      en: {
        title: "Battery",
        summary: "Visual battery checks for corrosion, loose terminals, and weak-start symptoms.",
        whyItMatters: ["The battery powers starting and key electrical systems.", "A weak battery often shows up right when you need the car."],
        whenToCheck: ["Every few weeks", "Before a long trip or if cranking starts to feel slow"],
        toolsNeeded: ["Flashlight", "Light gloves"],
        safetySteps: ["Turn off the engine and accessories", "Do not bridge both battery posts with metal tools"],
        instructionSteps: [
          {
            title: "Inspect the battery body",
            body: "Look for cracks, swelling, or damp areas on the battery casing.",
            safetyNote: "If the casing is damaged, avoid DIY handling if liquid is leaking.",
            imageKey: "battery",
          },
          {
            title: "Check the terminals",
            body: "Look for white or blue corrosion and see whether the terminal clamps feel loose.",
            safetyNote: "Heavy corrosion needs safe cleaning, not random rinsing.",
            imageKey: "battery-terminals",
          },
          {
            title: "Watch the starting behavior",
            body: "Notice slow cranking, dim lights during start, or frequent clock resets.",
            safetyNote: "Repeated symptoms matter more than one isolated event.",
            imageKey: "starter",
          },
        ],
        normalSigns: ["Clean casing", "Clean terminals", "Strong one-try start"],
        warningSigns: ["Terminal corrosion", "Slow cranking", "Battery warning light"],
        commonMistakes: ["Ignoring loose terminals", "Repeatedly forcing starts without inspection", "Assuming the battery is healthy just because lights still turn on"],
        nextActions: ["Clean or tighten terminals safely", "Test the battery at a workshop if starting weakens", "Replace the battery if age and symptoms line up"],
      },
    },
  }),
  module({
    id: "tire-pressure",
    category: "tires",
    estimatedMinutes: 4,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Jalan berlubang dan polisi tidur dapat membuat tekanan ban berubah dan pelek terkena benturan.",
        "Cek sebelum mudik saat mobil membawa penumpang dan barang lebih banyak.",
      ],
      [
        "Potholes and speed bumps can change tire pressure and damage wheels.",
        "Check before mudik trips when the car carries extra passengers and luggage.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Tekanan sesuai rekomendasi saat ban dingin.",
        monitor: "Pantau bila selisih kecil dan tidak ada gejala lain.",
        "service-soon": "Cari penyebab bila satu ban sering turun lebih cepat dibanding lainnya.",
        urgent: "Jangan lanjut kecepatan tinggi bila satu ban jauh di bawah rekomendasi atau terlihat kempis.",
      },
      {
        ok: "Pressure matches the recommended cold-tire range.",
        monitor: "Watch it if the difference is small and no other symptoms appear.",
        "service-soon": "Look for the cause if one tire keeps losing pressure faster than the others.",
        urgent: "Do not continue at speed if a tire is far below spec or visibly flat.",
      }
    ),
    locales: {
      id: {
        title: "Tekanan ban",
        summary: "Cara mengecek tekanan ban saat dingin dan membaca rekomendasi kendaraan.",
        whyItMatters: ["Tekanan ban memengaruhi grip, kenyamanan, dan konsumsi BBM.", "Ban kurang angin lebih mudah panas dan rusak."],
        whenToCheck: ["Pagi hari sebelum jalan", "Sebelum perjalanan jauh atau membawa beban penuh"],
        toolsNeeded: ["Pressure gauge atau pompa dengan meter", "Stiker rekomendasi tekanan kendaraan"],
        safetySteps: ["Cek saat ban dingin", "Parkir rata dan aman jauh dari arus lalu lintas"],
        instructionSteps: [
          {
            title: "Cari angka rekomendasi",
            body: "Lihat stiker di pilar pintu pengemudi atau buku manual untuk tekanan depan dan belakang.",
            safetyNote: "Jangan gunakan angka maksimum di dinding ban sebagai tekanan harian.",
            imageKey: "door-sticker",
          },
          {
            title: "Ukur satu per satu",
            body: "Buka tutup pentil dan tempelkan gauge sampai pembacaan stabil.",
            safetyNote: "Ulangi bila terdengar angin bocor saat alat dipasang.",
            imageKey: "gauge",
          },
          {
            title: "Samakan sesuai beban",
            body: "Sesuaikan tekanan untuk kondisi normal atau penuh muatan sesuai panduan kendaraan.",
            safetyNote: "Jangan lupa cek ban serep jika akan perjalanan jauh.",
            imageKey: "air-adjust",
          },
        ],
        normalSigns: ["Semua ban dekat angka rekomendasi", "Mobil terasa stabil lurus", "Tidak ada ban yang terlihat lebih gepeng"],
        warningSigns: ["Satu ban turun jauh", "Setir terasa berat ke satu sisi", "Ban cepat panas atau dinding ban terlihat tertekan"],
        commonMistakes: ["Mengisi saat ban panas lalu membandingkan dengan angka dingin", "Mengabaikan ban serep", "Mengikuti angka ban, bukan angka kendaraan"],
        nextActions: ["Isi atau kurangi tekanan sampai sesuai", "Periksa kebocoran bila satu ban sering turun", "Tambal atau ganti bila ditemukan kerusakan"],
      },
      en: {
        title: "Tire pressure",
        summary: "How to check cold tire pressure and follow the vehicle recommendation.",
        whyItMatters: ["Tire pressure affects grip, comfort, and fuel use.", "Underinflated tires run hotter and wear faster."],
        whenToCheck: ["In the morning before driving", "Before long trips or heavy loads"],
        toolsNeeded: ["Pressure gauge or inflator with a meter", "The vehicle tire-pressure sticker"],
        safetySteps: ["Check when the tires are cold", "Park safely on level ground away from traffic"],
        instructionSteps: [
          {
            title: "Find the recommended number",
            body: "Use the sticker on the driver-side pillar or the owner manual for front and rear pressures.",
            safetyNote: "Do not use the maximum number on the tire sidewall as your daily setting.",
            imageKey: "door-sticker",
          },
          {
            title: "Measure each tire",
            body: "Remove the valve cap and press the gauge firmly until the reading stabilizes.",
            safetyNote: "Repeat if you hear air escaping during measurement.",
            imageKey: "gauge",
          },
          {
            title: "Adjust for load",
            body: "Set the pressure for normal or fully loaded use based on the vehicle guide.",
            safetyNote: "Check the spare tire too before a long trip.",
            imageKey: "air-adjust",
          },
        ],
        normalSigns: ["All tires sit close to the recommended value", "The car tracks straight", "No tire looks visibly softer than the others"],
        warningSigns: ["One tire is much lower", "The steering pulls or feels heavy", "A tire runs hot or looks compressed"],
        commonMistakes: ["Inflating hot tires and comparing them to cold specs", "Ignoring the spare tire", "Using the tire-sidewall max instead of the vehicle spec"],
        nextActions: ["Adjust pressure to the proper value", "Inspect for leaks if one tire keeps dropping", "Repair or replace the tire if damage is found"],
      },
    },
  }),
  module({
    id: "tire-tread",
    category: "tires",
    estimatedMinutes: 6,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Permukaan jalan kasar dan hujan deras membuat kembangan ban sangat penting.",
        "Ban aus tidak rata sering muncul pada mobil yang sering menghantam lubang atau spooring belum rapi.",
      ],
      [
        "Rough roads and heavy rain make tread depth especially important.",
        "Uneven wear is common on cars that hit potholes often or need alignment work.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Kembangan masih dalam dan aus merata.",
        monitor: "Pantau bila ada sedikit keausan sisi luar atau dalam.",
        "service-soon": "Spooring dan balancing perlu dijadwalkan bila aus tidak rata terlihat jelas.",
        urgent: "Segera ganti ban jika benang terlihat, dinding retak parah, atau ban botak.",
      },
      {
        ok: "Tread depth is healthy and wear is even.",
        monitor: "Watch it if you only see slight outer or inner shoulder wear.",
        "service-soon": "Schedule alignment and balancing if uneven wear is clearly visible.",
        urgent: "Replace the tire immediately if cords show, sidewalls crack badly, or the tread is bald.",
      }
    ),
    locales: {
      id: {
        title: "Kembangan dan keausan ban",
        summary: "Periksa ketebalan kembangan, retak, benjol, dan keausan tidak rata.",
        whyItMatters: ["Kembangan membantu ban membuang air saat hujan.", "Keausan tidak rata memberi petunjuk masalah spooring, balancing, atau suspensi."],
        whenToCheck: ["Setiap cuci mobil atau isi angin", "Setelah menghantam lubang besar atau trotoar"],
        toolsNeeded: ["Senter", "Koin atau tread gauge bila ada"],
        safetySteps: ["Parkir rata dan putar roda bila perlu hanya saat aman", "Jangan meraba sisi ban saat kendaraan belum stabil"],
        instructionSteps: [
          {
            title: "Lihat pola aus",
            body: "Bandingkan bagian tengah, sisi dalam, dan sisi luar setiap ban.",
            safetyNote: "Aus di satu sisi sering berarti alignment perlu dicek.",
            imageKey: "tread-pattern",
          },
          {
            title: "Periksa dinding ban",
            body: "Cari benjol, retak, sobekan, atau bekas benturan.",
            safetyNote: "Benjol pada sidewall adalah alasan kuat untuk mengganti ban.",
            imageKey: "sidewall",
          },
          {
            title: "Nilai kedalaman kembangan",
            body: "Gunakan tread wear indicator atau alat ukur sederhana untuk memastikan kembangan masih layak.",
            safetyNote: "Musim hujan membutuhkan ban dengan alur yang masih baik, bukan sekadar legal minimum.",
            imageKey: "tread-depth",
          },
        ],
        normalSigns: ["Aus merata", "Tidak ada retak atau benjol", "Kembangan masih jelas"],
        warningSigns: ["Aus satu sisi", "Sidewall benjol", "Ban hampir botak"],
        commonMistakes: ["Hanya melihat satu ban depan", "Mengabaikan ban belakang", "Menunda ganti ban karena tapak tengah masih terlihat"],
        nextActions: ["Rotasi bila pola aus mulai berbeda", "Lakukan spooring/balancing bila aus tidak rata", "Ganti ban yang rusak atau aus berat"],
      },
      en: {
        title: "Tire tread and wear",
        summary: "Inspect tread depth, cracks, bulges, and uneven tire wear.",
        whyItMatters: ["Tread channels water away in heavy rain.", "Uneven wear can point to alignment, balancing, or suspension issues."],
        whenToCheck: ["During regular washes or air fills", "After hitting a major pothole or curb"],
        toolsNeeded: ["Flashlight", "Coin or tread gauge if available"],
        safetySteps: ["Park on level ground and rotate the wheels only when safe", "Do not reach around a wheel if the car is unstable"],
        instructionSteps: [
          {
            title: "Check the wear pattern",
            body: "Compare the center, inner shoulder, and outer shoulder of each tire.",
            safetyNote: "Wear on one side usually means alignment needs attention.",
            imageKey: "tread-pattern",
          },
          {
            title: "Inspect the sidewall",
            body: "Look for bulges, cracks, cuts, or impact marks.",
            safetyNote: "A sidewall bulge is a strong reason to replace the tire.",
            imageKey: "sidewall",
          },
          {
            title: "Assess tread depth",
            body: "Use the tread wear indicator or a simple gauge to confirm the grooves are still serviceable.",
            safetyNote: "Rainy season driving needs meaningful groove depth, not just the legal bare minimum.",
            imageKey: "tread-depth",
          },
        ],
        normalSigns: ["Even wear", "No cracks or bulges", "Tread grooves are still clear"],
        warningSigns: ["One-sided wear", "Sidewall bulge", "Tread nearly bald"],
        commonMistakes: ["Checking only one front tire", "Ignoring the rear tires", "Delaying replacement because the center still shows pattern"],
        nextActions: ["Rotate tires if wear starts to differ", "Get alignment and balancing if wear is uneven", "Replace badly worn or damaged tires"],
      },
    },
  }),
  module({
    id: "spare-tools",
    category: "tires",
    estimatedMinutes: 4,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Banyak perjalanan antarkota di Indonesia masih melewati area dengan bantuan derek terbatas.",
        "Ban serep dan dongkrak yang siap sangat penting saat mudik atau perjalanan malam.",
      ],
      [
        "Intercity travel in Indonesia still includes stretches with limited roadside support.",
        "A ready spare tire and jack matter even more for mudik and night driving.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Ban serep, dongkrak, dan kunci roda lengkap.",
        monitor: "Pantau tekanan ban serep dan karat pada alat.",
        "service-soon": "Lengkapi alat yang hilang sebelum perjalanan jauh.",
        urgent: "Jangan berangkat jauh bila ban serep kosong total atau alat pengganti roda tidak tersedia.",
      },
      {
        ok: "The spare tire, jack, and wheel tools are complete.",
        monitor: "Watch spare tire pressure and tool corrosion.",
        "service-soon": "Replace missing tools before a long trip.",
        urgent: "Do not start a long drive if the spare is flat or wheel-change tools are missing.",
      }
    ),
    locales: {
      id: {
        title: "Ban serep dan alat darurat",
        summary: "Pastikan ban serep, dongkrak, dan alat buka roda siap dipakai.",
        whyItMatters: ["Ban bocor bisa terjadi kapan saja.", "Alat yang tidak lengkap membuat situasi darurat jauh lebih berisiko."],
        whenToCheck: ["Sebelum mudik", "Minimal sekali sebulan"],
        toolsNeeded: ["Tidak perlu alat tambahan, hanya akses ke bagasi"],
        safetySteps: ["Parkir aman saat membuka bagasi", "Angkat barang berat dengan hati-hati bila alat berada di bawahnya"],
        instructionSteps: [
          {
            title: "Cek ban serep",
            body: "Pastikan ban serep ada, tidak retak, dan tekanan anginnya layak.",
            safetyNote: "Ban serep tipis tetap perlu cukup angin untuk dipakai darurat.",
            imageKey: "spare-wheel",
          },
          {
            title: "Cek dongkrak dan kunci roda",
            body: "Lihat apakah dongkrak, batang pemutar, dan kunci roda masih lengkap.",
            safetyNote: "Pastikan kunci sesuai ukuran mur roda mobil Anda.",
            imageKey: "jack-kit",
          },
          {
            title: "Cek segitiga dan alat bantu",
            body: "Tambahkan sarung tangan, senter, dan segitiga pengaman bila tersedia.",
            safetyNote: "Visibilitas sangat penting bila berhenti malam hari atau di bahu jalan.",
            imageKey: "warning-triangle",
          },
        ],
        normalSigns: ["Semua alat lengkap", "Ban serep bertekanan", "Tidak ada karat berat pada dongkrak"],
        warningSigns: ["Ban serep kempis", "Kunci roda hilang", "Dongkrak macet atau berkarat parah"],
        commonMistakes: ["Tidak pernah cek ban serep", "Menyimpan alat tanpa memastikan lengkap setelah servis", "Lupa segitiga pengaman"],
        nextActions: ["Isi angin ban serep", "Lengkapi alat darurat sebelum perjalanan", "Ganti alat yang rusak atau macet"],
      },
      en: {
        title: "Spare tire and emergency tools",
        summary: "Make sure the spare tire, jack, and wheel tools are ready to use.",
        whyItMatters: ["A puncture can happen anytime.", "Missing tools make an emergency much riskier."],
        whenToCheck: ["Before mudik trips", "At least once a month"],
        toolsNeeded: ["No extra tools, just access to the trunk"],
        safetySteps: ["Park safely before opening the trunk", "Lift heavy cargo carefully if the tool kit sits underneath"],
        instructionSteps: [
          {
            title: "Check the spare tire",
            body: "Confirm the spare is present, free of visible damage, and inflated enough for emergency use.",
            safetyNote: "Space-saver spares still need proper pressure.",
            imageKey: "spare-wheel",
          },
          {
            title: "Check the jack and wrench",
            body: "Make sure the jack, handle, and wheel wrench are still complete.",
            safetyNote: "Confirm the wrench fits your wheel nuts.",
            imageKey: "jack-kit",
          },
          {
            title: "Check warning gear",
            body: "Add gloves, a flashlight, and a warning triangle if you have them.",
            safetyNote: "Visibility matters greatly on night stops or road shoulders.",
            imageKey: "warning-triangle",
          },
        ],
        normalSigns: ["All tools are present", "Spare tire is inflated", "No heavy corrosion on the jack"],
        warningSigns: ["Flat spare tire", "Missing wheel wrench", "Jack seized or badly rusted"],
        commonMistakes: ["Never checking the spare tire", "Leaving service without confirming the tool kit is returned", "Forgetting a warning triangle"],
        nextActions: ["Inflate the spare", "Complete the emergency kit before travel", "Replace damaged or seized tools"],
      },
    },
  }),
  module({
    id: "wipers-washer",
    category: "safety",
    estimatedMinutes: 4,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Hujan deras dan cipratan lumpur membuat wiper serta washer fluid penting sepanjang musim hujan.",
        "Parkir panas berkepanjangan dapat membuat karet wiper cepat mengeras.",
      ],
      [
        "Heavy rain and muddy spray make wipers and washer fluid essential throughout the rainy season.",
        "Long exposure to sun can harden the wiper rubber faster.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Sapuan bersih dan washer masih berfungsi.",
        monitor: "Pantau jika mulai ada garis halus.",
        "service-soon": "Ganti karet wiper bila sapuan mulai berisik atau menyisakan area buram.",
        urgent: "Jangan menunda bila visibilitas buruk saat hujan. Wiper yang gagal adalah risiko keselamatan tinggi.",
      },
      {
        ok: "The wipe is clean and the washer still works.",
        monitor: "Watch it if faint streaks begin to appear.",
        "service-soon": "Replace the blades if they chatter or leave blurry patches.",
        urgent: "Do not delay if rain visibility is poor. Failed wipers are a high safety risk.",
      }
    ),
    locales: {
      id: {
        title: "Wiper dan air washer",
        summary: "Cek sapuan wiper, kondisi karet, dan cairan washer untuk visibilitas aman.",
        whyItMatters: ["Visibilitas adalah kebutuhan keselamatan utama.", "Karet wiper yang aus memperburuk pandangan saat hujan deras."],
        whenToCheck: ["Saat mulai musim hujan", "Sebelum perjalanan jauh atau bila sapuan mulai meninggalkan garis"],
        toolsNeeded: ["Air washer atau cairan pembersih kaca", "Lap microfiber bila perlu"],
        safetySteps: ["Matikan kontak sebelum mengangkat lengan wiper", "Pegang lengan wiper dengan hati-hati agar tidak membentur kaca"],
        instructionSteps: [
          {
            title: "Lihat karet wiper",
            body: "Periksa apakah karet sobek, mengeras, atau tidak rata.",
            safetyNote: "Jangan paksa menekuk karet terlalu jauh.",
            imageKey: "wiper-blade",
          },
          {
            title: "Uji sapuan",
            body: "Semprot washer lalu nyalakan wiper untuk melihat apakah kaca tersapu bersih.",
            safetyNote: "Jangan jalankan wiper di kaca yang kering dan kotor tebal terlalu lama.",
            imageKey: "windscreen",
          },
          {
            title: "Cek reservoir washer",
            body: "Pastikan cairan washer masih cukup, terutama sebelum musim hujan atau perjalanan antar kota.",
            safetyNote: "Gunakan cairan yang tidak meninggalkan residu berat pada kaca.",
            imageKey: "washer-tank",
          },
        ],
        normalSigns: ["Sapuan bersih", "Tidak ada suara berisik", "Washer menyemprot merata"],
        warningSigns: ["Garis-garis air", "Karet retak", "Nozzle washer macet"],
        commonMistakes: ["Menggunakan wiper pada kaca sangat kotor tanpa washer", "Mengabaikan suara bergetar", "Membiarkan reservoir washer kosong"],
        nextActions: ["Isi cairan washer", "Ganti blade bila karet rusak", "Bersihkan nozzle atau minta bengkel cek jika semprotan lemah"],
      },
      en: {
        title: "Wipers and washer fluid",
        summary: "Check wipe quality, blade condition, and washer fluid for safe visibility.",
        whyItMatters: ["Visibility is a core safety need.", "Worn wiper rubber makes heavy-rain driving much harder."],
        whenToCheck: ["At the start of rainy season", "Before long trips or when streaking begins"],
        toolsNeeded: ["Washer fluid or clean water for emergency use", "Microfiber cloth if needed"],
        safetySteps: ["Switch off the ignition before lifting the wiper arms", "Handle the arms carefully so they do not snap onto the glass"],
        instructionSteps: [
          {
            title: "Inspect the rubber",
            body: "Check whether the rubber is torn, hardened, or uneven.",
            safetyNote: "Do not bend the rubber too aggressively.",
            imageKey: "wiper-blade",
          },
          {
            title: "Test the wipe",
            body: "Spray washer fluid and run the wipers to see whether the glass clears cleanly.",
            safetyNote: "Do not run the wipers too long on a dry, heavily dirty windshield.",
            imageKey: "windscreen",
          },
          {
            title: "Check the washer reservoir",
            body: "Make sure there is enough washer fluid, especially before rainy travel.",
            safetyNote: "Use fluid that will not leave heavy residue on the glass.",
            imageKey: "washer-tank",
          },
        ],
        normalSigns: ["Clean wipe pattern", "No chatter", "Washer sprays evenly"],
        warningSigns: ["Visible streaks", "Cracked rubber", "Blocked washer nozzle"],
        commonMistakes: ["Using wipers on heavily dirty glass without washer fluid", "Ignoring chatter", "Leaving the washer tank empty"],
        nextActions: ["Refill the washer tank", "Replace the blades if the rubber is damaged", "Clean the nozzles or ask a workshop to inspect weak spray"],
      },
    },
  }),
  module({
    id: "lights",
    category: "electrical",
    estimatedMinutes: 4,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Jalan hujan, kabut, dan perjalanan malam antar kota membuat lampu sangat penting.",
        "Lampu rem dan sein yang mati sering baru ketahuan orang lain, jadi cek mandiri secara rutin.",
      ],
      [
        "Rain, mist, and night highway driving make lighting especially important.",
        "Brake and indicator failures are often first noticed by other people, so self-check regularly.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Semua lampu utama dan lampu rem bekerja baik.",
        monitor: "Pantau bila ada satu bohlam mulai redup.",
        "service-soon": "Ganti bohlam atau cek soket bila satu sisi mulai mati.",
        urgent: "Jangan menunda jika lampu rem, lampu utama malam, atau sein tidak berfungsi.",
      },
      {
        ok: "All main lights and brake lights work well.",
        monitor: "Watch it if one bulb begins to dim.",
        "service-soon": "Replace the bulb or inspect the socket if one side starts failing.",
        urgent: "Do not delay if brake lights, main night lights, or indicators fail.",
      }
    ),
    locales: {
      id: {
        title: "Lampu eksterior",
        summary: "Periksa lampu utama, lampu rem, sein, dan lampu mundur secara mandiri.",
        whyItMatters: ["Lampu membuat Anda terlihat dan membantu melihat jalan.", "Kegagalan lampu mengurangi keselamatan, terutama malam dan hujan."],
        whenToCheck: ["Mingguan", "Sebelum perjalanan malam atau hujan"],
        toolsNeeded: ["Dinding atau refleksi kaca untuk melihat lampu", "Bantuan orang lain bila ada"],
        safetySteps: ["Parkir aman dan gunakan rem tangan", "Jangan menatap langsung lampu jarak dekat terlalu lama"],
        instructionSteps: [
          {
            title: "Nyalakan lampu utama",
            body: "Periksa low beam dan high beam apakah sama terang kanan-kiri.",
            safetyNote: "Permukaan lampu yang kusam juga mengurangi pencahayaan.",
            imageKey: "headlights",
          },
          {
            title: "Cek sein dan hazard",
            body: "Aktifkan sein kanan, kiri, dan hazard lalu lihat ritmenya normal.",
            safetyNote: "Kedip terlalu cepat sering menandakan bohlam putus.",
            imageKey: "signal-lights",
          },
          {
            title: "Cek lampu rem dan mundur",
            body: "Gunakan bantuan orang lain atau refleksi untuk memastikan lampu rem dan lampu mundur menyala.",
            safetyNote: "Lampu rem yang mati adalah masalah keselamatan prioritas.",
            imageKey: "brake-lights",
          },
        ],
        normalSigns: ["Terang seimbang", "Semua fungsi menyala", "Lensa lampu tidak kusam parah"],
        warningSigns: ["Salah satu lampu mati", "Kedip sein tidak normal", "Lensa retak atau berembun berat"],
        commonMistakes: ["Hanya cek lampu depan", "Mengabaikan lampu rem", "Mengira bohlam mati kecil tidak penting"],
        nextActions: ["Ganti bohlam atau fuse sesuai kebutuhan", "Bersihkan lensa kusam", "Servis bila ada kelembapan atau soket bermasalah"],
      },
      en: {
        title: "Exterior lights",
        summary: "Check headlights, brake lights, turn signals, and reverse lights yourself.",
        whyItMatters: ["Lights help you see and help others see you.", "Lighting failures reduce safety, especially at night and in rain."],
        whenToCheck: ["Weekly", "Before night or rainy trips"],
        toolsNeeded: ["A wall or reflective surface", "Another person if available"],
        safetySteps: ["Park safely and set the handbrake", "Do not stare directly into bright lamps for long"],
        instructionSteps: [
          {
            title: "Turn on the headlights",
            body: "Check low beam and high beam brightness on both sides.",
            safetyNote: "Cloudy lenses also reduce usable light.",
            imageKey: "headlights",
          },
          {
            title: "Test indicators and hazards",
            body: "Activate left, right, and hazard signals and confirm the blink rhythm is normal.",
            safetyNote: "Very fast blinking often points to a failed bulb.",
            imageKey: "signal-lights",
          },
          {
            title: "Check brake and reverse lights",
            body: "Use a helper or a reflection to confirm brake and reverse lights illuminate.",
            safetyNote: "Failed brake lights are a priority safety issue.",
            imageKey: "brake-lights",
          },
        ],
        normalSigns: ["Balanced brightness", "All functions work", "Lenses are not heavily cloudy"],
        warningSigns: ["One lamp is out", "Indicator rhythm is abnormal", "Lens is cracked or heavily fogged"],
        commonMistakes: ["Checking only the front lights", "Ignoring brake lights", "Assuming a small bulb failure does not matter"],
        nextActions: ["Replace bulbs or fuses as needed", "Clean cloudy lenses", "Service sockets or moisture problems if needed"],
      },
    },
  }),
  module({
    id: "dashboard-warnings",
    category: "electrical",
    estimatedMinutes: 4,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Lampu indikator sering dianggap sepele saat mobil masih bisa jalan, padahal beberapa harus ditangani segera.",
        "Perjalanan jauh dan kemacetan panjang bisa memunculkan indikator suhu, aki, atau rem lebih cepat.",
      ],
      [
        "Warning lights are often ignored because the car still moves, but some need immediate action.",
        "Long trips and heavy traffic can trigger temperature, battery, or brake warnings sooner.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Tidak ada lampu peringatan aktif setelah mesin hidup stabil.",
        monitor: "Pantau indikator informasi yang sesekali muncul namun tidak menetap.",
        "service-soon": "Jadwalkan pengecekan bila lampu check engine atau ABS muncul tapi mobil masih terasa normal.",
        urgent: "Berhenti aman bila lampu oli, suhu mesin, rem, atau aki menyala merah dan disertai gejala lain.",
      },
      {
        ok: "No warning lights remain on once the engine settles.",
        monitor: "Watch informational lights that appear occasionally but do not stay on.",
        "service-soon": "Schedule inspection if check-engine or ABS lights appear while the car still feels normal.",
        urgent: "Stop safely if red oil, temperature, brake, or battery warnings appear together with symptoms.",
      }
    ),
    locales: {
      id: {
        title: "Lampu peringatan dashboard",
        summary: "Memahami indikator penting agar tahu mana yang bisa dipantau dan mana yang harus segera dihentikan.",
        whyItMatters: ["Dashboard memberi peringatan dini.", "Respon yang tepat dapat mencegah kerusakan lebih besar."],
        whenToCheck: ["Setiap menyalakan mobil", "Segera bila ada ikon yang tidak biasa"],
        toolsNeeded: ["Buku manual atau daftar arti indikator"],
        safetySteps: ["Jangan membaca terlalu lama saat mobil berjalan", "Fokus ke jalan, lalu berhenti aman untuk verifikasi"],
        instructionSteps: [
          {
            title: "Perhatikan lampu saat kontak ON",
            body: "Lampu indikator biasanya menyala sebentar lalu padam setelah mesin hidup.",
            safetyNote: "Lampu yang tidak padam perlu dicatat.",
            imageKey: "cluster",
          },
          {
            title: "Kenali warna prioritas",
            body: "Merah biasanya darurat, kuning perlu perhatian dan penjadwalan, hijau atau biru umumnya status sistem.",
            safetyNote: "Jangan anggap semua lampu setara tingkat risikonya.",
            imageKey: "warning-colors",
          },
          {
            title: "Cocokkan dengan gejala",
            body: "Gabungkan indikator dengan rasa kendaraan: tenaga turun, suhu naik, rem berubah, atau suara aneh.",
            safetyNote: "Indikator plus gejala fisik berarti prioritas lebih tinggi.",
            imageKey: "driver-view",
          },
        ],
        normalSigns: ["Semua lampu uji padam normal", "Tidak ada bunyi peringatan berulang", "Mobil terasa normal"],
        warningSigns: ["Lampu merah menetap", "Check engine menyala", "Indikator rem atau suhu muncul saat jalan"],
        commonMistakes: ["Menutup indikator dengan asumsi sensor error", "Terus memaksa jalan", "Tidak mencatat kapan lampu muncul"],
        nextActions: ["Foto indikator untuk referensi", "Jadwalkan scan atau inspeksi", "Berhenti aman untuk indikator kritis merah"],
      },
      en: {
        title: "Dashboard warning lights",
        summary: "Understand the key warning lights so you know what can wait and what requires an immediate stop.",
        whyItMatters: ["The dashboard gives early warning.", "The right response can prevent bigger failures."],
        whenToCheck: ["Every time you start the car", "Immediately when an unfamiliar icon appears"],
        toolsNeeded: ["Owner manual or a warning-light reference list"],
        safetySteps: ["Do not study the cluster for long while driving", "Focus on the road and verify after stopping safely"],
        instructionSteps: [
          {
            title: "Watch the cluster at startup",
            body: "Most warning lights appear briefly, then switch off after the engine starts.",
            safetyNote: "Anything that stays on should be noted.",
            imageKey: "cluster",
          },
          {
            title: "Know the color priority",
            body: "Red usually means urgent, yellow needs attention soon, and green or blue usually shows system status.",
            safetyNote: "Do not treat every light as the same level of risk.",
            imageKey: "warning-colors",
          },
          {
            title: "Match it with symptoms",
            body: "Connect the warning light to what the car feels like: low power, rising temperature, changed braking, or odd noises.",
            safetyNote: "A warning light plus physical symptoms raises the priority.",
            imageKey: "driver-view",
          },
        ],
        normalSigns: ["Startup test lights switch off normally", "No repeated warning chimes", "The car feels normal"],
        warningSigns: ["A red light stays on", "Check-engine light remains lit", "Brake or temperature warnings appear while driving"],
        commonMistakes: ["Assuming every light is just a bad sensor", "Driving on without a plan", "Failing to note when the light appeared"],
        nextActions: ["Photograph the warning for reference", "Schedule scanning or inspection", "Stop safely for critical red warnings"],
      },
    },
  }),
  module({
    id: "brake-feel",
    category: "safety",
    estimatedMinutes: 4,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Kemacetan berat membuat perubahan kecil pada pedal rem lebih cepat terasa.",
        "Setelah banjir atau hujan sangat deras, rem bisa butuh perhatian khusus.",
      ],
      [
        "Heavy traffic makes subtle brake-pedal changes easier to notice.",
        "After floodwater or very heavy rain, braking deserves extra attention.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Pedal mantap dan mobil berhenti lurus.",
        monitor: "Pantau bunyi kecil atau getaran ringan yang belum konsisten.",
        "service-soon": "Segera cek bila bunyi, getaran, atau jarak pengereman memburuk.",
        urgent: "Hentikan pemakaian bila mobil menarik kuat, pedal ambles, atau rem gagal menggigit normal.",
      },
      {
        ok: "The pedal feels firm and the car stops straight.",
        monitor: "Watch small noises or light vibration that is not yet consistent.",
        "service-soon": "Inspect soon if noise, vibration, or stopping distance gets worse.",
        urgent: "Stop using the car if it pulls hard, the pedal sinks, or braking performance drops sharply.",
      }
    ),
    locales: {
      id: {
        title: "Rasa pedal rem",
        summary: "Evaluasi cepat rasa pedal, bunyi, dan stabilitas saat pengereman ringan.",
        whyItMatters: ["Perubahan rasa rem sering muncul sebelum kegagalan besar.", "Deteksi dini membantu menjaga keselamatan."],
        whenToCheck: ["Saat pertama mulai jalan", "Setelah lewat banjir atau servis roda/rem"],
        toolsNeeded: ["Area aman dengan kecepatan rendah"],
        safetySteps: ["Lakukan uji rem ringan di area aman", "Jangan mencoba pengereman keras di jalan ramai"],
        instructionSteps: [
          {
            title: "Rasakan saat injak ringan",
            body: "Pedal seharusnya terasa mantap dan progresif, bukan kosong atau terlalu empuk.",
            safetyNote: "Jika pedal berubah drastis, hentikan rencana perjalanan jauh.",
            imageKey: "pedal",
          },
          {
            title: "Dengar bunyi dan getaran",
            body: "Catat bunyi gesek, bunyi besi, atau getaran di setir dan pedal.",
            safetyNote: "Suara besi beradu sering berarti kampas sudah sangat tipis.",
            imageKey: "brake-sound",
          },
          {
            title: "Lihat arah mobil saat berhenti",
            body: "Mobil harus berhenti lurus tanpa menarik ke satu sisi.",
            safetyNote: "Tarikan ke satu sisi bisa berarti rem tidak seimbang atau ban/suspensi bermasalah.",
            imageKey: "straight-stop",
          },
        ],
        normalSigns: ["Pedal mantap", "Mobil berhenti lurus", "Tidak ada suara kasar"],
        warningSigns: ["Pedal empuk", "Rem bergetar", "Mobil menarik ke satu sisi"],
        commonMistakes: ["Menganggap bunyi rem pagi hari selalu normal", "Terus berkendara walau rem berubah", "Tidak membedakan bunyi rem dengan bunyi suspensi"],
        nextActions: ["Jadwalkan inspeksi rem", "Periksa setelah terkena air besar", "Gunakan bantuan bengkel bila gejalanya konsisten"],
      },
      en: {
        title: "Brake feel basics",
        summary: "A quick check of pedal feel, noise, and stability under light braking.",
        whyItMatters: ["Brake feel often changes before major failure.", "Early detection improves safety."],
        whenToCheck: ["When first setting off", "After floodwater or brake/wheel service"],
        toolsNeeded: ["A safe low-speed area"],
        safetySteps: ["Test light braking only in a safe area", "Do not attempt hard-braking tests in traffic"],
        instructionSteps: [
          {
            title: "Feel the initial pedal press",
            body: "The pedal should feel firm and progressive, not empty or overly soft.",
            safetyNote: "If the feel changes sharply, pause any long-trip plan.",
            imageKey: "pedal",
          },
          {
            title: "Listen for noise and vibration",
            body: "Note scraping sounds, metal noise, or vibration in the pedal or steering wheel.",
            safetyNote: "Metal-on-metal noise often means the brake pads are very worn.",
            imageKey: "brake-sound",
          },
          {
            title: "Watch the stop direction",
            body: "The car should stop in a straight line without pulling strongly to one side.",
            safetyNote: "A pull can point to uneven braking, tire, or suspension issues.",
            imageKey: "straight-stop",
          },
        ],
        normalSigns: ["Firm pedal", "Straight stop", "No harsh noise"],
        warningSigns: ["Soft pedal", "Braking vibration", "Car pulls to one side"],
        commonMistakes: ["Assuming every morning brake noise is harmless", "Driving on despite changed brake feel", "Mixing up brake noise with suspension noise"],
        nextActions: ["Schedule a brake inspection", "Check the brakes after deep water exposure", "Use workshop support if the symptoms repeat"],
      },
    },
  }),
  module({
    id: "ac-basic",
    category: "comfort",
    estimatedMinutes: 4,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Iklim panas dan lembap membuat performa AC sangat penting untuk kenyamanan dan visibilitas kaca.",
        "Filter kabin kotor lebih cepat terasa saat mobil sering dipakai di kota berdebu.",
      ],
      [
        "A hot, humid climate makes AC performance important for comfort and windshield clarity.",
        "Dirty cabin filters show up sooner in dusty urban driving.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "AC dingin stabil dan tidak ada bau aneh.",
        monitor: "Pantau bila hawa dingin sedikit berkurang saat siang sangat panas.",
        "service-soon": "Servis bila hembusan lemah, bau lembap, atau pendinginan makin lambat.",
        urgent: "Segera cek bila AC mati total disertai bunyi keras, asap, atau embun kaca tak terkendali.",
      },
      {
        ok: "AC stays cold and no odd smell appears.",
        monitor: "Watch it if cooling drops slightly only in extreme midday heat.",
        "service-soon": "Service soon if airflow is weak, musty smells appear, or cooling becomes slower.",
        urgent: "Inspect immediately if AC fails completely with loud noise, smoke, or uncontrollable fogging.",
      }
    ),
    locales: {
      id: {
        title: "AC kabin",
        summary: "Pemeriksaan dasar suhu hembusan, kekuatan blower, dan bau dari sistem AC.",
        whyItMatters: ["AC membantu kenyamanan dan mencegah kaca berembun.", "Penurunan performa sering dimulai dari filter atau kebersihan sistem."],
        whenToCheck: ["Saat cuaca panas", "Jika kaca mudah berembun atau AC terasa kurang dingin"],
        toolsNeeded: ["Tidak wajib, cukup pengamatan langsung"],
        safetySteps: ["Lakukan saat mobil parkir atau di tempat aman", "Jangan memeriksa komponen AC bertekanan sendiri"],
        instructionSteps: [
          {
            title: "Nyalakan AC dan blower",
            body: "Periksa apakah udara keluar kuat dan merata dari kisi-kisi utama.",
            safetyNote: "Perubahan mendadak pada hembusan bisa menandakan filter atau blower bermasalah.",
            imageKey: "vents",
          },
          {
            title: "Rasakan suhu dan bau",
            body: "Udara harus mulai dingin dalam waktu wajar dan tidak berbau apek atau menyengat.",
            safetyNote: "Bau lembap menandakan sistem perlu dibersihkan.",
            imageKey: "ac-cool",
          },
          {
            title: "Cek respon mode kaca",
            body: "Pindahkan ke mode defogger dan pastikan aliran udara membantu membersihkan embun kaca.",
            safetyNote: "Masalah defogger penting untuk keselamatan saat hujan.",
            imageKey: "defogger",
          },
        ],
        normalSigns: ["Udara dingin stabil", "Blower kuat", "Tidak ada bau apek"],
        warningSigns: ["Kurang dingin", "Bau lembap", "Blower lemah atau berisik"],
        commonMistakes: ["Memaksa AC tanpa pernah ganti filter kabin", "Menganggap bau apek normal", "Menunda servis sampai AC mati total"],
        nextActions: ["Ganti filter kabin bila kotor", "Servis AC bila pendinginan menurun", "Segera cek bila ada bunyi atau gejala abnormal berat"],
      },
      en: {
        title: "Cabin AC basics",
        summary: "Basic checks for outlet temperature, blower strength, and smells from the AC system.",
        whyItMatters: ["AC improves comfort and helps stop the windows from fogging.", "Performance loss often begins with filters or system cleanliness."],
        whenToCheck: ["During hot weather", "If windows fog easily or cooling feels weak"],
        toolsNeeded: ["Direct observation is enough"],
        safetySteps: ["Check while parked or in a safe area", "Do not inspect pressurized AC components yourself"],
        instructionSteps: [
          {
            title: "Turn on the AC and blower",
            body: "Check whether air comes through strongly and evenly from the main vents.",
            safetyNote: "A sudden airflow change can point to blower or filter issues.",
            imageKey: "vents",
          },
          {
            title: "Check temperature and smell",
            body: "The air should cool within a reasonable time and should not smell musty or sharp.",
            safetyNote: "A damp smell often means the system needs cleaning.",
            imageKey: "ac-cool",
          },
          {
            title: "Test the defogger mode",
            body: "Switch to defog and make sure airflow helps clear windshield mist.",
            safetyNote: "Defogger performance matters for rainy-season safety.",
            imageKey: "defogger",
          },
        ],
        normalSigns: ["Stable cool air", "Strong blower", "No musty odor"],
        warningSigns: ["Weak cooling", "Damp smell", "Weak or noisy blower"],
        commonMistakes: ["Running AC for months without a cabin filter change", "Treating musty smells as normal", "Waiting until total failure to service"],
        nextActions: ["Replace the cabin filter if dirty", "Service the AC if cooling drops", "Inspect quickly if strong abnormal noises appear"],
      },
    },
  }),
  module({
    id: "pre-trip",
    category: "trip",
    estimatedMinutes: 8,
    difficulty: "beginner",
    localIndonesiaNotes: content(
      [
        "Modul ini dirancang untuk konteks perjalanan jauh seperti mudik, jalur tol, dan kota tujuan dengan bengkel tidak selalu dekat.",
        "Perhatikan beban penumpang dan barang karena MPV keluarga di Indonesia sering berangkat dalam kondisi penuh.",
      ],
      [
        "This module is designed for long drives such as mudik, toll-road runs, and destinations where workshops may not be close.",
        "Watch passenger and luggage load because Indonesian family MPVs often travel fully loaded.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Semua pemeriksaan utama siap dan kendaraan layak berangkat.",
        monitor: "Pantau item kecil namun masih aman bila segera ditangani sebelum berangkat.",
        "service-soon": "Tunda berangkat bila ada item penting yang belum siap seperti ban, rem, aki, atau lampu.",
        urgent: "Batalkan perjalanan sampai aman bila ada gejala overheat, rem buruk, ban rusak, atau indikator merah aktif.",
      },
      {
        ok: "The main checks are ready and the vehicle looks fit for departure.",
        monitor: "Watch minor items that are still safe if fixed before departure.",
        "service-soon": "Delay departure if important items such as tires, brakes, battery, or lights are not ready.",
        urgent: "Cancel the trip until safe if you see overheating, poor brakes, damaged tires, or critical red warnings.",
      }
    ),
    locales: {
      id: {
        title: "Pemeriksaan sebelum perjalanan",
        summary: "Checklist ringkas sebelum berangkat jauh agar mobil siap untuk tol, hujan, dan beban penuh.",
        whyItMatters: ["Perjalanan jauh memperbesar dampak masalah kecil.", "Pencegahan sederhana dapat mengurangi risiko mogok di perjalanan."],
        whenToCheck: ["Sehari sebelum berangkat", "Pagi hari sebelum start perjalanan"],
        toolsNeeded: ["Semua catatan servis, alat darurat, dan waktu 10 menit"],
        safetySteps: ["Lakukan saat mobil dingin jika memeriksa cairan", "Jangan terburu-buru mengecek hanya karena jadwal keberangkatan mepet"],
        instructionSteps: [
          {
            title: "Cek cairan dan aki",
            body: "Pastikan oli, coolant, dan aki tidak menunjukkan gejala masalah.",
            safetyNote: "Jika ada keraguan pada salah satu item inti, prioritaskan bengkel sebelum berangkat.",
            imageKey: "trip-engine-bay",
          },
          {
            title: "Cek ban, serep, dan lampu",
            body: "Atur tekanan ban sesuai beban, lalu pastikan ban serep dan semua lampu bekerja.",
            safetyNote: "Beban penuh sering butuh tekanan ban berbeda sesuai stiker kendaraan.",
            imageKey: "trip-tire-check",
          },
          {
            title: "Siapkan kabin dan dokumen",
            body: "Pastikan AC, wiper, segitiga, dokumen kendaraan, dan nomor bantuan darurat siap.",
            safetyNote: "Visibilitas dan kesiapan dokumen sama pentingnya dengan kondisi mesin.",
            imageKey: "trip-cabin",
          },
        ],
        normalSigns: ["Tidak ada lampu peringatan", "Ban dan rem terasa normal", "Alat darurat lengkap"],
        warningSigns: ["Ada gejala rem, ban, atau aki melemah", "Wiper/lampu tidak siap", "Cairan turun atau bocor"],
        commonMistakes: ["Hanya isi bensin tanpa cek kondisi mobil", "Mengabaikan beban tambahan keluarga", "Membawa ban serep kosong"],
        nextActions: ["Selesaikan item kecil sebelum berangkat", "Jadwalkan servis cepat jika ada temuan sedang", "Tunda keberangkatan jika ada risiko tinggi"],
      },
      en: {
        title: "Pre-trip inspection",
        summary: "A practical pre-departure checklist for toll roads, rain, and heavy family loads.",
        whyItMatters: ["Long trips amplify small issues.", "Simple prevention lowers the risk of breakdowns on the road."],
        whenToCheck: ["The day before departure", "Again on the morning of the trip"],
        toolsNeeded: ["Service records, emergency tools, and 10 focused minutes"],
        safetySteps: ["Check fluids while the car is cold", "Do not rush because the departure schedule is tight"],
        instructionSteps: [
          {
            title: "Check fluids and battery",
            body: "Make sure oil, coolant, and the battery show no warning signs.",
            safetyNote: "If one of these core items feels doubtful, prioritize workshop support before leaving.",
            imageKey: "trip-engine-bay",
          },
          {
            title: "Check tires, spare, and lights",
            body: "Set tire pressure for the load, then confirm the spare and all lights are ready.",
            safetyNote: "A fully loaded car often needs a different pressure setting from the door sticker guide.",
            imageKey: "trip-tire-check",
          },
          {
            title: "Prepare the cabin and documents",
            body: "Confirm the AC, wipers, warning triangle, vehicle documents, and emergency contacts are ready.",
            safetyNote: "Visibility and paperwork matter just as much as engine readiness.",
            imageKey: "trip-cabin",
          },
        ],
        normalSigns: ["No warning lights", "Tires and brakes feel normal", "Emergency kit is complete"],
        warningSigns: ["Brake, tire, or battery weakness", "Wipers or lights are not ready", "Fluids are dropping or leaking"],
        commonMistakes: ["Only refueling without checking vehicle condition", "Ignoring the extra family load", "Starting the trip with an empty spare"],
        nextActions: ["Fix minor items before departure", "Arrange quick service for medium findings", "Delay the trip if high-risk issues appear"],
      },
    },
  }),
  module({
    id: "post-flood",
    category: "weather",
    estimatedMinutes: 7,
    difficulty: "intermediate",
    localIndonesiaNotes: content(
      [
        "Banjir dan genangan jalan adalah risiko nyata di banyak kota Indonesia saat hujan lebat.",
        "Bila air sempat tinggi mendekati intake, jangan menyalakan ulang mesin sembarangan.",
      ],
      [
        "Floodwater and deep standing water are real risks in many Indonesian cities during heavy rain.",
        "If water reached near the intake, do not restart the engine casually.",
      ]
    ),
    urgencyRules: content(
      {
        ok: "Tidak ada gejala aneh setelah genangan ringan, namun tetap lanjutkan observasi.",
        monitor: "Pantau rem, bau lembap, dan kelistrikan setelah terkena air dangkal.",
        "service-soon": "Segera inspeksi bila kabin basah, rem berubah, atau sensor mulai error.",
        urgent: "Jangan hidupkan mesin bila dicurigai kemasukan air. Gunakan towing dan pemeriksaan profesional.",
      },
      {
        ok: "No odd symptoms appeared after light water exposure, but keep observing the car.",
        monitor: "Watch the brakes, damp smell, and electrics after shallow water exposure.",
        "service-soon": "Inspect soon if the cabin is wet, braking changes, or sensors start misbehaving.",
        urgent: "Do not start the engine if water ingestion is suspected. Use towing and professional inspection.",
      }
    ),
    locales: {
      id: {
        title: "Pemeriksaan pasca banjir",
        summary: "Checklist cepat setelah mobil melewati genangan atau banjir agar risiko lanjutan bisa dikenali lebih awal.",
        whyItMatters: ["Air dapat merusak rem, interior, sensor, dan bahkan mesin.", "Gejala tidak selalu muncul saat itu juga."],
        whenToCheck: ["Segera setelah melewati genangan signifikan", "Dalam 24 jam pertama setelah terpapar banjir"],
        toolsNeeded: ["Lap kering", "Senter", "Waktu observasi tambahan"],
        safetySteps: ["Jangan restart mesin jika ada indikasi water hammer", "Lakukan tes rem pelan di area aman saja"],
        instructionSteps: [
          {
            title: "Nilai ketinggian air yang dilewati",
            body: "Catat apakah air hanya mengenai ban, mencapai pintu bawah, atau mendekati intake mesin.",
            safetyNote: "Semakin tinggi air, semakin tinggi risiko kerusakan non-terlihat.",
            imageKey: "flood-depth",
          },
          {
            title: "Cek rem dan interior",
            body: "Lakukan pengereman ringan, lalu cek karpet, bau lembap, dan area bagasi apakah basah.",
            safetyNote: "Rem yang terasa berbeda setelah banjir perlu perhatian cepat.",
            imageKey: "flood-brake",
          },
          {
            title: "Cek indikator dan kelistrikan",
            body: "Perhatikan lampu dashboard, power window, lampu, dan bunyi aneh dari mesin atau kabin.",
            safetyNote: "Masalah sensor atau kelistrikan bisa muncul beberapa jam setelah terendam.",
            imageKey: "flood-electrical",
          },
        ],
        normalSigns: ["Rem kembali normal setelah pengeringan ringan", "Interior tetap kering", "Tidak ada indikator baru"],
        warningSigns: ["Mesin susah hidup", "Bau lembap kuat", "Sensor dan lampu error"],
        commonMistakes: ["Langsung menyalakan mesin lagi setelah mogok di banjir", "Menganggap aman hanya karena mobil masih berjalan", "Tidak mengeringkan interior yang basah"],
        nextActions: ["Observasi 1 sampai 2 hari untuk gejala susulan", "Bersihkan dan keringkan bagian dalam segera", "Gunakan towing bila air diduga masuk ke mesin"],
      },
      en: {
        title: "Post-flood inspection",
        summary: "A quick checklist after driving through standing water or flood conditions so you can spot follow-up risk early.",
        whyItMatters: ["Water can damage brakes, interior trim, sensors, and even the engine.", "Symptoms do not always appear immediately."],
        whenToCheck: ["Right after significant water exposure", "Again within the first 24 hours after flood contact"],
        toolsNeeded: ["Dry cloth", "Flashlight", "A little extra observation time"],
        safetySteps: ["Do not restart the engine if hydrolock is possible", "Test the brakes gently in a safe area only"],
        instructionSteps: [
          {
            title: "Assess the water depth",
            body: "Note whether the water touched only the tires, reached the lower doors, or came near the intake.",
            safetyNote: "The higher the water, the more hidden damage risk exists.",
            imageKey: "flood-depth",
          },
          {
            title: "Check brakes and cabin",
            body: "Try light braking, then inspect carpets, the trunk, and any strong damp smell.",
            safetyNote: "Changed brake feel after floodwater needs prompt attention.",
            imageKey: "flood-brake",
          },
          {
            title: "Check warnings and electrics",
            body: "Watch the dashboard, power windows, lights, and any unusual sounds from the engine bay or cabin.",
            safetyNote: "Electrical and sensor faults may appear hours later.",
            imageKey: "flood-electrical",
          },
        ],
        normalSigns: ["Brakes return to normal after light drying", "Cabin stays dry", "No new warning lights"],
        warningSigns: ["Hard starting", "Strong damp smell", "Sensor or lighting faults"],
        commonMistakes: ["Restarting a stalled engine immediately after deep water", "Assuming all is fine just because the car still moves", "Leaving the interior wet"],
        nextActions: ["Observe the car for 1 to 2 days for delayed symptoms", "Dry the interior quickly", "Use towing if engine water ingestion is suspected"],
      },
    },
  }),
];

export const SOURCE_LINKS = [
  {
    id: "honda-global-brio-2018",
    label: "Honda Global: 2nd Generation Brio (2018)",
    url: "https://global.honda/en/newsroom/worldnews/2018/4180802Brio-Indonesia-International-Auto-Show.html",
    note: {
      id: "Sumber profil model: All New Honda Brio generasi kedua diperkenalkan di Indonesia pada 2 Agustus 2018, memakai mesin 1.2-liter i-VTEC dan dikembangkan untuk konsumen Indonesia.",
      en: "Model profile source: the second-generation All New Honda Brio was introduced in Indonesia on August 2, 2018, uses a 1.2-liter i-VTEC engine, and was developed for Indonesian customers.",
    },
  },
  {
    id: "honda-indonesia-brio-brochure",
    label: "Honda Indonesia: All New Brio brochure",
    url: "https://www.honda-indonesia.com/uploads/documents/brochures/catalogue_all_new_brio__1592987297006.pdf",
    note: {
      id: "Sumber fitur dan karakter kendaraan: Honda menyoroti CVT with Earth Dreams Technology, standar emisi EURO 4, suspensi depan MacPherson Strut, suspensi belakang H-Shape Torsion Beam, serta fitur keselamatan ABS dan EBD.",
      en: "Feature and vehicle-character source: Honda highlights CVT with Earth Dreams Technology, EURO 4 compliance, MacPherson-strut front suspension, H-Shape torsion-beam rear suspension, and ABS/EBD safety features.",
    },
  },
  {
    id: "honda-indonesia-service",
    label: "Honda Indonesia: Honda Service",
    url: "https://www.honda-indonesia.com/honda-service",
    note: {
      id: "Sumber servis berkala lokal: Brio Satya DD1 termasuk dalam program perawatan berkala Honda, termasuk paket hingga 50.000 km / 4 tahun dan hingga 100.000 km / 8 tahun untuk kondisi yang memenuhi syarat.",
      en: "Local periodic-service source: the Brio Satya DD1 is included in Honda's periodic maintenance programs, including packages up to 50,000 km / 4 years and 100,000 km / 8 years for eligible vehicles.",
    },
  },
  {
    id: "honda-indonesia-tires",
    label: "Honda Indonesia: tire care tips",
    url: "https://www.honda-indonesia.com/news/jaga-kondisi-ban-mobil-anda-tetap-prima-simak-3-tips-perawatan-ban-berikut",
    note: {
      id: "Sumber ban: tekanan ban standar mengikuti stiker pilar pintu pengemudi atau buku manual, dan Honda menyarankan mengganti ban bila sisa alur sudah mencapai 3 mm.",
      en: "Tire source: recommended tire pressure should follow the driver-door-pillar sticker or the owner manual, and Honda advises replacement when remaining tread reaches 3 mm.",
    },
  },
  {
    id: "honda-indonesia-home-check",
    label: "Honda Indonesia: self-check at home",
    url: "https://www.honda-indonesia.com/news/ppkm-diperpanjang-begini-cara-pemeriksaan-mobil-di-rumah-secara-mandiri",
    note: {
      id: "Sumber pemeriksaan mandiri: Honda menjelaskan cek coolant via reservoir, cek level oli di antara batas bawah-atas, dan memeriksa ban serta ban cadangan secara rutin.",
      en: "Home-check source: Honda explains coolant checks through the reservoir, engine oil checks between lower and upper marks, and routine checks on all tires including the spare.",
    },
  },
  {
    id: "honda-indonesia-post-flood",
    label: "Honda Indonesia: post-flood handling",
    url: "https://www.honda-indonesia.com/trendsetter/edisi-januari-2020-1/banjir-telah-surut-simak-tips-berikut-untuk-penanganan-mobil-pasca-tergenang-banjir",
    note: {
      id: "Sumber pasca banjir: Honda menyarankan identifikasi level air, pindahkan mobil ke tempat aman, dan untuk genangan berat segera hubungi dealer resmi Honda.",
      en: "Post-flood source: Honda advises identifying water level, moving the car to a safe area, and contacting an authorized Honda dealer promptly after serious flood exposure.",
    },
  },
];

export const MODEL_PROFILES = [
  {
    id: "brio-satya-2018-id",
    matchers: {
      make: ["honda"],
      model: ["brio", "brio satya"],
      year: 2018,
    },
    label: {
      id: "2018 Honda Brio Satya",
      en: "2018 Honda Brio Satya",
    },
    facts: {
      id: [
        "Generasi kedua Brio diperkenalkan di Indonesia pada Agustus 2018 dan dikembangkan untuk konsumen Indonesia.",
        "Honda menyebut model ini memakai mesin 1.2-liter i-VTEC.",
        "Brochure Honda Indonesia menyoroti standar emisi EURO 4, suspensi MacPherson Strut di depan, serta H-Shape Torsion Beam di belakang.",
      ],
      en: [
        "The second-generation Brio was introduced in Indonesia in August 2018 and developed for Indonesian customers.",
        "Honda states that this model uses a 1.2-liter i-VTEC engine.",
        "Honda Indonesia's brochure highlights EURO 4 compliance, MacPherson-strut front suspension, and an H-Shape torsion-beam rear suspension.",
      ],
    },
    focusAreas: {
      id: [
        "Pantau oli dan coolant lebih disiplin untuk pola macet-kota dan cuaca panas.",
        "Prioritaskan ban, spooring, dan kondisi sidewall karena jalan berlubang dan polisi tidur di kota besar.",
        "Pertahankan kesiapan rem, wiper, dan lampu untuk hujan deras dan visibilitas rendah.",
      ],
      en: [
        "Stay disciplined with oil and coolant checks for hot weather and stop-go city use.",
        "Prioritize tires, alignment, and sidewall condition because potholes and speed bumps are common.",
        "Keep brakes, wipers, and lights ready for heavy rain and poor visibility.",
      ],
    },
    sourceIds: [
      "honda-global-brio-2018",
      "honda-indonesia-brio-brochure",
      "honda-indonesia-service",
      "honda-indonesia-tires",
      "honda-indonesia-home-check",
      "honda-indonesia-post-flood",
    ],
  },
];

export const DEFAULT_DASHBOARD_VEHICLE = {
  make: "Honda",
  model: "Brio Satya",
  year: 2018,
  fuelType: "pertamax",
  transmission: "automatic",
  bodyType: "lcgc",
  odometerKm: 68500,
};
