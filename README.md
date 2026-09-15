# NutriPoint

Prototype aplikasi web edukasi dan pemantauan gizi seimbang berbasis gamifikasi.

**Subjudul proyek:** Pengembangan Aplikasi Berbasis Gamifikasi untuk Edukasi dan Pemantauan Gizi Seimbang Siswa SMPK2HARAPAN

**Target pengguna:** siswa SMP kelas 8

---

## 1. Cara menjalankan

### Cara cepat
Klik dua kali `index.html`. Semua fitur langsung jalan di browser.

Catatan: sebagian browser (terutama Safari, kadang Chrome) memblokir LocalStorage
kalau file dibuka langsung dari folder. Aplikasi tetap berfungsi, tapi data hilang
saat halaman ditutup. Aplikasi akan memberi tahu hal ini di halaman **Profil**.

### Cara yang disarankan untuk presentasi
Jalankan lewat server lokal supaya penyimpanan data benar-benar bekerja.

**Python** (biasanya sudah ada di laptop):

```bash
cd nutripoint
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

**Node.js** (alternatif):

```bash
cd nutripoint
npx serve .
```

Tidak perlu instalasi, tidak perlu database, tidak ada backend.

---

## 2. Struktur file

```
nutripoint/
├── index.html          Rangka semua halaman + navigasi + modal
├── README.md           Berkas ini
├── css/
│   └── style.css       Warna, tipografi, komponen, responsive
└── js/
    ├── data.js         Data statis: AKG, database makanan, label contoh,
    │                   materi belajar, challenge, badge, teman kelas
    ├── nutrition.js    Rumus gizi: skala porsi, total harian, persentase AKG
    ├── gamification.js Poin, streak, badge, progress challenge, papan aktivitas
    ├── storage.js      Helper tanggal + data contoh awal + LocalStorage
    ├── ocr.js          Simulasi pembacaan label kemasan
    ├── charts.js       Grafik (Chart.js, dengan cadangan canvas bila offline)
    ├── ui.js           Semua fungsi menggambar tampilan (render)
    └── app.js          Penghubung: klik → ubah data → simpan → gambar ulang
```

Satu file = satu tugas. Kalau guru bertanya "bagian mana yang menghitung gizi?",
jawabannya cukup satu file: `nutrition.js`.

**Urutan pemuatan** di `index.html` disusun dari yang paling dasar:
`data.js → nutrition.js → gamification.js → storage.js → ocr.js → charts.js → ui.js → app.js`

**Alur kerja aplikasi** (berlaku untuk semua fitur):

```
klik pengguna → fungsi di App (app.js) → ubah App.state
              → Store.save() (LocalStorage) → UI.renderAll() (ui.js)
```

---

## 3. Halaman dan fitur

| Halaman | Isi |
|---|---|
| **Dashboard** | Sapaan, kartu NutriPoint + streak + badge, tombol Tambah Makanan, 5 indikator gizi dengan progress bar, daftar Makanan Hari Ini |
| **Makanan** | Dua opsi input (manual & foto label), daftar 11 makanan siap pakai, riwayat hari ini |
| **Progress** | Grafik 7/30 hari, tab per zat gizi, ringkasan rata-rata, ringkasan hari ini |
| **Tantangan** | 3 weekly challenge dengan progress otomatis + papan aktivitas kelas |
| **Belajar** | 5 materi gizi + progress "x / 5 materi selesai" |
| **Profil** | Identitas, statistik, koleksi badge, alat demo, penjelasan batasan aplikasi |

### Fitur yang benar-benar berfungsi (bukan tombol hiasan)

- Tambah makanan manual, dengan pengisian cepat dari database makanan
- Edit dan hapus catatan makanan
- Progress gizi berubah langsung setelah makanan ditambah/diubah/dihapus
- NutriPoint bertambah: +5 mencatat makanan, +5 materi selesai, +10/+15/+20 challenge
- Streak dihitung dari hari mencatat berturut-turut, dan bisa disimulasikan
- Badge terbuka otomatis saat syaratnya terpenuhi
- Foto label dipilih dari kamera/galeri perangkat
- Simulasi OCR menampilkan langkah pembacaan lalu hasil bacaan label
- Serving size bisa diubah (½, 1, 1½, 2, 3, atau angka bebas), semua nilai gizi ikut terhitung
- Data tersimpan di LocalStorage
- Grafik berubah mengikuti data dan pilihan rentang/zat gizi
- Navigasi antar halaman di desktop dan mobile
- Responsive dan sudah diuji pada lebar 320px sampai 1440px

---

## 4. Inti perhitungan porsi

Ada di `nutrition.js`, fungsi `Nutrition.scale(base, servings)`:

```js
Nutrition.scale({energy:140, protein:2, carb:18, fat:7, fiber:1}, 0.5);
// → {energy:70, protein:1, carb:9, fat:3.5, fiber:0.5}   (semua 50%)

Nutrition.scale({energy:140, protein:2, carb:18, fat:7, fiber:1}, 2);
// → {energy:280, protein:4, carb:36, fat:14, fiber:2}    (semua ×2)
```

Setiap catatan makanan menyimpan dua hal: `base` (nilai untuk satu porsi) dan
`servings` (jumlah yang dimakan). Jadi kalau pengguna mengedit jumlah porsi,
perhitungan diulang dari nilai aslinya, bukan dari hasil kali sebelumnya.

---

## 5. Data contoh dan hal yang perlu divalidasi

Saat pertama dibuka, aplikasi mengisi diri dengan data contoh supaya langsung
enak dipakai presentasi: 145 poin, streak 3 hari, 9 makanan hari ini,
3 dari 5 materi selesai, dan riwayat 29 hari untuk grafik.

**Yang wajib disebut saat presentasi:**

1. Semua nilai gizi di `data.js` adalah data dummy/ilustratif. Sebelum dipakai
   pada penelitian sebenarnya, nilainya harus divalidasi dengan sumber resmi
   (misalnya Tabel Komposisi Pangan Indonesia atau label kemasan asli).
2. Angka AKG (2.400 kcal, 70 g protein, 350 g karbohidrat, 80 g lemak, 34 g serat)
   dipakai sebagai **perkiraan pemenuhan untuk belajar**, bukan target medis
   perorangan. Label ini juga ditampilkan di aplikasi.
3. Pembacaan label masih **disimulasikan**. Aplikasi tidak menebak nilai gizi dari
   bentuk makanan pada foto; yang dibaca adalah angka yang tercetak pada tabel
   Nutrition Facts, dan hasilnya selalu dikonfirmasi pengguna.

Untuk mengganti simulasi dengan OCR sungguhan, cukup ganti isi fungsi
`OCR.read()` di `ocr.js` (misalnya dengan Tesseract.js). Bagian lain aplikasi
tidak perlu diubah.

---

## 6. Batasan desain yang dijaga

NutriPoint adalah aplikasi **edukasi dan pemantauan gizi**, bukan aplikasi diet.
Yang sengaja tidak ada di aplikasi ini:

- target atau pencatatan berat badan
- pembatasan kalori dan anjuran makan sesedikit mungkin
- perbandingan tubuh antar siswa
- peringkat berdasarkan kalori atau kedekatan dengan angka AKG

Papan aktivitas kelas hanya menghitung: materi yang diselesaikan (×5),
hari mencatat dalam 7 hari terakhir (×5), dan challenge yang tuntas (×10).
Challenge pun berfokus pada kebiasaan dan pengetahuan, misalnya mencatat
makanan dengan variasi kelompok pangan.

---

## 7. Alat bantu presentasi

Di halaman **Profil** ada tiga tombol:

- **🔥 Simulasi +1 hari mencatat** — menambah satu hari pencatatan sehingga streak
  bertambah tanpa perlu menunggu hari berikutnya
- **↺ Kembalikan data contoh** — mengembalikan semua data ke kondisi awal, berguna
  kalau ingin mengulang demo dari awal
- **🗑️ Mulai dari kosong** — menghapus semua data, berguna untuk menunjukkan
  tampilan aplikasi saat belum ada catatan sama sekali

### Urutan demo yang disarankan (sekitar 4 menit)

1. Dashboard: tunjukkan poin, streak, dan 5 progress bar, lalu sebutkan label
   "perkiraan pemenuhan berdasarkan AKG, bukan target medis individu"
2. Tambah Makanan → Input manual → pilih "Nasi putih" dari chip cepat →
   ubah porsi jadi 2× → tunjukkan angka di kotak perkiraan ikut berubah → Simpan
3. Tunjukkan progress bar dan poin di dashboard yang langsung berubah
4. Tambah Makanan → Foto label → pilih foto → tunjukkan langkah pembacaan →
   hasil bacaan → Konfirmasi → pilih ½ serving → tunjukkan semua nilai jadi 50% → Simpan
5. Progress: ganti 7 Days ke 30 Days, ganti tab ke Protein
6. Belajar: buka satu materi, tandai selesai, tunjukkan poin bertambah
7. Tantangan: klaim challenge yang sudah tuntas, jelaskan dasar papan aktivitas
8. Profil: tunjukkan badge dan tombol simulasi streak
9. Tutup dengan bagian "Tentang NutriPoint" di halaman Profil (batasan aplikasi)

---

## 8. Teknologi

- HTML, CSS, dan JavaScript murni (vanilla) — tanpa framework dan tanpa backend
- LocalStorage untuk menyimpan data
- Chart.js (lewat CDN) untuk grafik; kalau internet mati, grafik digambar sendiri
  dengan Canvas API sehingga halaman Progress tetap berfungsi saat presentasi
- Font Google: Baloo 2 (judul) dan Plus Jakarta Sans (isi); bila internet mati,
  browser memakai font sistem dan tata letak tetap rapi

### Hasil pengujian

Diuji dengan browser otomatis (Chromium headless):

| Yang diuji | Hasil |
|---|---|
| Input manual + porsi 2× | 180 → 360 kcal, poin 145 → 150 |
| Edit makanan | total energi ikut berubah |
| Hapus makanan | total gizi kembali turun |
| Simulasi OCR + ½ serving | 120 → 60 kcal, protein 1,5 → 0,8 g |
| Materi belajar | 3/5 → 4/5, poin bertambah |
| Klaim challenge | poin bertambah sesuai reward |
| Simulasi streak | 3 → 4 hari |
| LocalStorage | data tetap setelah halaman dimuat ulang |
| Grafik 7/30 hari + ganti zat gizi | data mengikuti pilihan |
| Lebar layar 320–1440px | tidak ada scroll ke samping |
| Error di konsol browser | tidak ada |
