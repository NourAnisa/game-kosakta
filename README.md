# ⚔️ NumberQuest: English Math Learning Adventure
### Game Interaktif Gamifikasi Belajar Bahasa Inggris Berhitung untuk Siswa SMP (Kelas 7, 8, & 9)

**NumberQuest** adalah media pembelajaran interaktif berbasis web (gamifikasi) yang dirancang khusus untuk membantu siswa Sekolah Menengah Pertama (SMP) menguasai kosakata angka, operasi hitung, pecahan, desimal, hingga pemecahan soal cerita matematika dalam bahasa Inggris secara seru dan menantang.

---

## 🌟 Fitur Utama Gamifikasi

1. **Sistem XP dan Leveling (RPG Progression)**
   - Pemain mengumpulkan Experience Points (XP) dari setiap jawaban benar dan kecepatan menjawab.
   - Peringkat level berkembang dari *Level 1: Novice Counter* hingga *Level 10: Grand Archmage*.
   - Animasi dinamis XP bar dan notifikasi pencapaian level baru.

2. **Timer dan Skor Dinamis**
   - Hitung mundur waktu (20 detik per quest) dengan indikator warna visual (Hijau, Kuning, Merah).
   - Bonus kecepatan: Semakin cepat menjawab, semakin besar tambahan skor dan XP yang diperoleh.
   - Sistem *Combo Streak* (2x hingga 5x combo multiplier) saat menjawab benar secara beruntun.

3. **Nyawa (Lives / Hearts System)**
   - Pemain dibekali 3 hati (lives).
   - Jawaban salah atau waktu habis akan mengurangi 1 hati disertai efek suara kesalahan.
   - Tampilan *Game Over* dengan statistik pencapaian dan opsi *Retry* (coba lagi).

4. **Feedback Pembelajaran & Pronunciation (Web Speech API)**
   - Setiap quest dilengkapi pembahasan edukatif komprehensif dalam bahasa Indonesia:
     - Penjelasan tata bahasa dan aturan ejaan (misal: perbedaan *forty* vs *fourteen*, urutan *ninth*, dll).
     - Langkah-langkah penyelesaian hitungan secara runtut.
   - Tombol **Dengarkan Audio (TTS)** menggunakan native Web Speech API sehingga siswa dapat mendengarkan pengucapan angka dan kalimat matematika dalam aksen native English secara langsung.

5. **Badge Pencapaian (Achievements / Medals)**
   - Terdapat 8 lencana prestasi yang dapat dibuka:
     - *First Step*: Menjawab 1 soal pertama dengan benar.
     - *Lightning Math*: Menjawab cepat dengan sisa waktu di atas 10 detik.
     - *On Fire!*: Mencapai 5 kali kombo benar berturut-turut.
     - *Isle Explorer*: Menuntaskan seluruh quest di Realm 1.
     - *Calculation Knight*: Mencapai Level 5.
     - *Flawless Adventurer*: Menyelesaikan 1 realm tanpa kehilangan nyawa sama sekali.
     - *Century Club*: Mengumpulkan 1.000 XP.
     - *Grand Archmage*: Menuntaskan seluruh 5 Realm petualangan.

6. **Papan Peringkat (Leaderboard)**
   - Tersimpan otomatis di `localStorage` peramban.
   - Menampilkan Top 10 petualang matematika terbaik lengkap dengan peringkat (Medali Emas, Perak, Perunggu), nama pemain, skor total, level, dan realm yang dicapai.

7. **Synthesizer Suara Orisinal (Web Audio API)**
   - Tanpa file MP3 eksternal yang berat atau risiko broken links. Seluruh sound effect (klik, jawaban benar, jawaban salah, level up fanfare, alarm waktu, game over) di-sintesis secara prosedural menggunakan Web Audio API.

---

## 🗺️ Peta Petualangan Pembelajaran (5 Realms)

| Realm | Judul Wilayah | Fokus Materi Pembelajaran SMP |
|---|---|---|
| **Realm 01** | **The Isle of Numbers** | Cardinal Numbers (1 - 1.000.000), Ordinal Numbers (1st - 31st), serta jebakan ejaan (*forty* vs *fourteen*, *twelfth*, *ninth*). |
| **Realm 02** | **The Forest of Operations** | Operasi hitung dasar bahasa Inggris: *plus* (+), *minus* (-), *times / multiplied by* (×), *divided by* (÷), serta istilah *sum, difference, product, quotient*. |
| **Realm 03** | **The Valley of Fractions** | Pecahan (*half, quarter, two thirds*), desimal (*three point one four*), dan persentase (*percent*). |
| **Realm 04** | **The Cavern of Word Problems** | Soal cerita kontekstual kehidupan sehari-hari (belanja & uang kembalian, perhitungan waktu & jam, pembagian makanan, jarak & kecepatan, potongan diskon). |
| **Realm 05** | **The Citadel of Masters** | Ujian Boss Rush: kombinasi soal keliling/luas, bilangan prima, bilangan ganjil/genap, dan logika matematika campuran. |

---

## 🎮 Mode Permainan

- **Adventure Mode**: Petualangan cerita berjenjang melalui 5 Realm pulau angka. Pemain harus menyelesaikan setiap realm untuk membuka realm berikutnya.
- **Survival Arena**: Mode tanpa henti (*endless waves*) dengan soal acak dan tingkat kesulitan meningkat untuk mencetak rekor skor tertinggi di Leaderboard.

---

## 💻 Pintasan Keyboard (Controls)

- **Angka 1 / 2 / 3 / 4**: Memilih opsi jawaban A, B, C, atau D secara cepat.
- **Tombol Spasi (Spacebar)**: Melanjutkan ke quest berikutnya saat jendela feedback terbuka.

---

## 🚀 Cara Menjalankan Game Secara Lokal

Game ini dibangun secara *clean*, mandiri (*zero-dependency build step*), dan dapat langsung dimainkan di peramban web modern manapun:

1. Clone repositori ini:
   ```bash
   git clone https://github.com/NourAnisa/game-kosakta.git
   ```
2. Masuk ke direktori:
   ```bash
   cd game-kosakta
   ```
3. Buka file `index.html` langsung di peramban web (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari) atau jalankan live server lokal:
   ```bash
   python -m http.server 8000
   ```
4. Buka `http://localhost:8000` pada peramban Anda.

---

## 🌐 Publikasi ke GitHub Pages

Agar game ini dapat diakses secara publik oleh seluruh siswa melalui tautan web:
1. Buka repositori di GitHub: `https://github.com/NourAnisa/game-kosakta`
2. Masuk ke menu **Settings** > **Pages**.
3. Pada bagian **Build and deployment** > **Branch**, pilih cabang `main` (atau `master`) dan folder `/ (root)`.
4. Klik **Save**.
5. Game akan aktif dan dapat diakses di:
   `https://nouranisa.github.io/game-kosakta/`

---

## 👩‍🏫 Lisensi & Peruntukan Edukasi

Dikembangkan oleh **Ir. Nor Anisa, S.Kom., M.Kom.** untuk mendukung transformasi media pembelajaran digital interaktif, peningkatan literasi numerasi dalam bahasa Inggris, serta akreditasi pembelajaran berbasis teknologi (APT Kriteria 2).


---

## ⚡ Arsitektur Multiplayer & Database Cloud (Supabase Realtime)

Game ini kini telah terintegrasi dengan **Supabase Cloud PostgreSQL & Realtime Engine** (Region: Singapore / `ap-southeast-1`):

### 1. Struktur Database Supabase

1. **`game_rooms`**
   - `id`: UUID (Primary Key)
   - `room_code`: VARCHAR(10) (Kode unik room kelas, e.g. `EDU88`)
   - `host_name`: VARCHAR(100) (Nama Guru / Host pembuat room)
   - `status`: `waiting`, `playing`, `finished`
   - `realm`: Tema pulau soal
   - `created_at` & `updated_at`: Timestamp

2. **`room_players`**
   - `id`: UUID (Primary Key)
   - `room_code`: Relasi ke `game_rooms(room_code)` (Cascade Delete)
   - `player_name`: Nama siswa
   - `is_host`: Boolean (Penanda host)
   - `score`: Live score siswa saat ini
   - `combo`: Streak combo aktif
   - `lives`: Sisa nyawa (3 hearts)
   - `last_active`: Heartbeat timestamp

3. **`leaderboard`**
   - `id`: UUID (Primary Key)
   - `player_name`: Nama petualang
   - `score`: Skor tertinggi
   - `level`: Level yang dicapai (1 - 10)
   - `accuracy`: Persentase ketepatan jawaban
   - `realm_reached`: Pulau terakhir yang diselesaikan

### 2. Cara Kerja Realtime Sinkronisasi di GitHub Pages
- **Client-Side SDK:** Menghubungkan browser siswa dan guru secara langsung ke WebSocket Supabase Realtime (`@supabase/supabase-js`).
- **Postgres Replication:** Setiap kali siswa menjawab atau skor berubah, event dipancarkan otomatis ke seluruh pemain dalam room dalam waktu <100ms.
- **Zero Backend Maintenance:** 100% serverless, berjalan mulus langsung di atas GitHub Pages tanpa memerlukan sewa server VM.
