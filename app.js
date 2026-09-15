/* ============================================================
   NutriPoint — data.js
   Berisi SEMUA data statis aplikasi (tidak ada logika di sini).
   Semua nilai gizi di file ini adalah DATA DUMMY/ILUSTRATIF
   untuk keperluan prototype dan WAJIB divalidasi dengan sumber
   resmi (mis. TKPI Kemenkes / label kemasan asli) sebelum
   dipakai pada penelitian sebenarnya.
   ============================================================ */

const NP_DATA = {

  /* ---------- Identitas aplikasi ---------- */
  app: {
    name: 'NutriPoint',
    subtitle:
      'Pengembangan Aplikasi Berbasis Gamifikasi untuk Edukasi dan Pemantauan ' +
      'Gizi Seimbang Siswa SMPK2HARAPAN',
    dataNote:
      'Nilai gizi pada prototype ini adalah data contoh (dummy) dan harus ' +
      'divalidasi dengan sumber gizi resmi sebelum digunakan dalam penelitian.'
  },

  /* ---------- Acuan AKG (contoh, remaja 13–15 tahun) ----------
     Dipakai hanya sebagai PERKIRAAN pemenuhan, bukan target medis. */
  akg: {
    energy:  { label: 'Energi',       unit: 'kcal', icon: '🔥', target: 2400 },
    protein: { label: 'Protein',      unit: 'g',    icon: '💪', target: 70   },
    carb:    { label: 'Karbohidrat',  unit: 'g',    icon: '🍚', target: 350  },
    fat:     { label: 'Lemak',        unit: 'g',    icon: '🥑', target: 80   },
    fiber:   { label: 'Serat',        unit: 'g',    icon: '🌾', target: 34   }
  },

  /* ---------- Database makanan dummy ----------
     Nilai = untuk 1 porsi seperti yang tertulis di "portion". */
  foods: [
    { id: 'f01', emoji: '🍚', name: 'Nasi putih',        portion: '1 porsi (200 g)',   energy: 260, protein: 4.8,  carb: 57,   fat: 0.6,  fiber: 0.8 },
    { id: 'f02', emoji: '🥚', name: 'Telur rebus',       portion: '1 butir (55 g)',    energy: 78,  protein: 6.3,  carb: 0.6,  fat: 5.3,  fiber: 0   },
    { id: 'f03', emoji: '🍗', name: 'Ayam goreng',       portion: '1 potong (100 g)',  energy: 260, protein: 26,   carb: 8,    fat: 14,   fiber: 0.5 },
    { id: 'f04', emoji: '🍢', name: 'Sate ayam',         portion: '5 tusuk',           energy: 175, protein: 16,   carb: 4,    fat: 10,   fiber: 0.4 },
    { id: 'f05', emoji: '🟫', name: 'Tempe goreng',      portion: '2 potong (50 g)',   energy: 170, protein: 10,   carb: 7,    fat: 11,   fiber: 1.8 },
    { id: 'f06', emoji: '⬜', name: 'Tahu goreng',       portion: '2 potong (50 g)',   energy: 115, protein: 8,    carb: 3,    fat: 8,    fiber: 0.8 },
    { id: 'f07', emoji: '🍌', name: 'Pisang',            portion: '1 buah sedang',     energy: 92,  protein: 1.2,  carb: 24,   fat: 0.3,  fiber: 2.6 },
    { id: 'f08', emoji: '🍎', name: 'Apel',              portion: '1 buah sedang',     energy: 78,  protein: 0.4,  carb: 21,   fat: 0.3,  fiber: 3.6 },
    { id: 'f09', emoji: '🥛', name: 'Susu sapi',         portion: '1 gelas (200 ml)',  energy: 122, protein: 6.4,  carb: 9.6,  fat: 6.6,  fiber: 0   },
    { id: 'f10', emoji: '🥬', name: 'Sayur bening bayam',portion: '1 porsi (100 g)',   energy: 45,  protein: 2.5,  carb: 5,    fat: 1.5,  fiber: 2.2 },
    { id: 'f11', emoji: '💧', name: 'Air mineral',       portion: '1 gelas (200 ml)',  energy: 0,   protein: 0,    carb: 0,    fat: 0,    fiber: 0   }
  ],

  /* ---------- Contoh label kemasan untuk simulasi OCR ----------
     Nilai di bawah meniru angka yang TERCETAK pada Nutrition Facts,
     yaitu nilai per 1 serving. */
  labels: [
    { product: 'Doritos Nacho Cheese', servingSize: '28 g',        energy: 140, protein: 2,   carb: 18, fat: 7,   fiber: 1   },
    { product: 'Teh Kemasan Botol',    servingSize: '250 ml',      energy: 110, protein: 0,   carb: 27, fat: 0,   fiber: 0   },
    { product: 'Susu UHT Cokelat',     servingSize: '200 ml',      energy: 150, protein: 6,   carb: 21, fat: 5,   fiber: 0   },
    { product: 'Biskuit Sandwich',     servingSize: '2 pcs (25 g)',energy: 120, protein: 1.5, carb: 17, fat: 5,   fiber: 0.5 },
    { product: 'Wafer Cokelat',        servingSize: '20 g',        energy: 105, protein: 1,   carb: 13, fat: 5.5, fiber: 0.4 }
  ],

  /* ---------- Materi edukasi ---------- */
  learn: [
    {
      id: 'l1',
      icon: '🍽️',
      title: 'Apa itu gizi seimbang?',
      teaser: 'Satu piring, empat kelompok pangan.',
      body: [
        'Gizi seimbang artinya tubuhmu mendapat semua zat gizi yang dibutuhkan dalam jumlah yang cukup — tidak kurang, tidak berlebihan.',
        'Cara paling mudah membayangkannya adalah lewat isi piringmu: sekitar sepertiga makanan pokok (nasi, jagung, ubi), sepertiga sayur dan buah, dan sisanya lauk sumber protein. Jangan lupa air putih.',
        'Tidak ada satu makanan pun yang lengkap zat gizinya. Karena itu kuncinya bukan "makan sedikit", tapi makan beragam setiap hari.'
      ]
    },
    {
      id: 'l2',
      icon: '💪',
      title: 'Kenapa protein penting?',
      teaser: 'Bahan bangunan tubuh saat masa pertumbuhan.',
      body: [
        'Protein dipakai tubuh untuk membangun dan memperbaiki sel: otot, kulit, rambut, sampai sel darah. Pada usia SMP, tubuh sedang tumbuh cepat, jadi kebutuhan protein relatif tinggi.',
        'Sumber protein hewani: telur, ayam, ikan, daging, susu. Sumber protein nabati: tempe, tahu, kacang-kacangan.',
        'Menggabungkan keduanya dalam sehari biasanya lebih baik daripada mengandalkan satu sumber saja.'
      ]
    },
    {
      id: 'l3',
      icon: '🍚',
      title: 'Karbohidrat itu apa?',
      teaser: 'Sumber energi utama untuk belajar dan bergerak.',
      body: [
        'Karbohidrat adalah zat gizi yang diubah tubuh menjadi glukosa, bahan bakar utama otak dan otot. Otakmu memakai glukosa terus-menerus, termasuk saat ujian.',
        'Sumbernya: nasi, kentang, ubi, jagung, mi, roti, dan sereal.',
        'Karbohidrat dari sumber utuh (ubi, jagung, beras merah) dicerna lebih lambat sehingga energinya terasa lebih stabil dibanding makanan dan minuman yang sangat manis.'
      ]
    },
    {
      id: 'l4',
      icon: '🌾',
      title: 'Apa fungsi serat?',
      teaser: 'Bikin pencernaan lancar dan perut nyaman.',
      body: [
        'Serat adalah bagian tumbuhan yang tidak dicerna tubuh. Justru karena itu ia berguna: serat membantu sisa makanan bergerak lancar di saluran cerna sehingga tidak mudah sembelit.',
        'Serat juga membuat rasa kenyang bertahan lebih lama dan menjadi "makanan" bagi bakteri baik di usus.',
        'Sumbernya: sayur, buah (terutama yang dimakan dengan kulitnya), kacang-kacangan, dan biji-bijian utuh.'
      ]
    },
    {
      id: 'l5',
      icon: '🔎',
      title: 'Cara membaca Nutrition Facts',
      teaser: 'Enam baris yang perlu kamu cek di kemasan.',
      body: [
        'Serving size (takaran saji) — jumlah makanan yang jadi dasar semua angka di tabel. Kalau kamu makan dua kali takaran saji, semua angka ikut dikali dua.',
        'Energy (energi/kalori) — jumlah energi per takaran saji, biasanya dalam kkal.',
        'Protein — gram protein per takaran saji.',
        'Carbohydrate (karbohidrat) — total karbohidrat; sering ada rincian gula di bawahnya.',
        'Total fat (lemak total) — gram lemak per takaran saji.',
        'Fiber (serat pangan) — gram serat per takaran saji.',
        'Trik penting: cek dulu "sajian per kemasan". Satu bungkus snack bisa berisi 2–3 takaran saji, jadi angkanya belum tentu untuk seluruh bungkus.'
      ]
    }
  ],

  /* ---------- Challenge mingguan ----------
     metric = cara progress dihitung otomatis di gamification.js */
  challenges: [
    {
      id: 'c1',
      icon: '🌈',
      title: 'Color Your Plate',
      desc: 'Catat makanan dengan variasi kelompok pangan selama minggu ini.',
      hint: 'Terhitung pada hari saat kamu mencatat minimal 3 makanan berbeda.',
      metric: 'variedDays7',
      goal: 5,
      unit: 'hari',
      reward: 20
    },
    {
      id: 'c2',
      icon: '📚',
      title: 'Kelas Gizi Tuntas',
      desc: 'Selesaikan semua materi di halaman Belajar.',
      hint: 'Progress naik setiap kali satu materi ditandai selesai.',
      metric: 'learnDone',
      goal: 5,
      unit: 'materi',
      reward: 15
    },
    {
      id: 'c3',
      icon: '📝',
      title: 'Tiga Hari Berturut',
      desc: 'Catat makananmu tiga hari berturut-turut.',
      hint: 'Progress mengikuti streak pencatatanmu.',
      metric: 'streak',
      goal: 3,
      unit: 'hari',
      reward: 10
    }
  ],

  /* ---------- Badge ---------- */
  badges: [
    { id: 'b1', icon: '🏅', title: 'First Log',         desc: 'Mencatat makanan pertamamu',            metric: 'totalEntries', goal: 1  },
    { id: 'b2', icon: '🔥', title: '3 Day Streak',      desc: 'Mencatat 3 hari berturut-turut',        metric: 'streak',       goal: 3  },
    { id: 'b3', icon: '📚', title: 'Nutrition Learner', desc: 'Menyelesaikan 3 materi edukasi',        metric: 'learnDone',    goal: 3  },
    { id: 'b4', icon: '🌱', title: 'Healthy Habit',     desc: 'Mencatat pada 5 hari berbeda',          metric: 'logDays',      goal: 5  },
    { id: 'b5', icon: '⭐', title: 'Bintang NutriPoint',desc: 'Mengumpulkan 500 NutriPoint',           metric: 'points',       goal: 500 }
  ],

  /* ---------- Poin per aktivitas ---------- */
  points: {
    logFood: 5,
    learnMaterial: 5,
    challengeDefault: 10
  },

  /* ---------- Teman sekelas untuk papan aktivitas (data contoh) ----------
     Skor HANYA dari aktivitas belajar, konsistensi mencatat, dan challenge. */
  classmates: [
    { name: 'Kadek A.',  avatar: '🐢', learnDone: 5, logDays: 6, challenges: 2 },
    { name: 'Putu R.',   avatar: '🦊', learnDone: 4, logDays: 5, challenges: 2 },
    { name: 'Made S.',   avatar: '🐬', learnDone: 3, logDays: 5, challenges: 1 },
    { name: 'Nyoman D.', avatar: '🦉', learnDone: 2, logDays: 4, challenges: 1 },
    { name: 'Gede P.',   avatar: '🐝', learnDone: 2, logDays: 3, challenges: 0 },
    { name: 'Luh Ayu',   avatar: '🦋', learnDone: 1, logDays: 2, challenges: 0 }
  ]
};
