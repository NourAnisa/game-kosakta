// ============================================================
// NumberQuest Educational Database (Materi Berhitung Bahasa Inggris SMP)
// Tailored for Junior High School (Kelas 7 - 9)
// ============================================================

const REALMS_DATA = [
    {
        id: 1,
        title: "The Isle of Numbers",
        subtitle: "Cardinal & Ordinal Numbers",
        icon: "🏝️",
        theme: "emerald",
        description: "Pelajari angka biasa (cardinal) dan angka urutan/peringkat (ordinal) beserta jebakan ejaan bahasa Inggris yang sering mengecoh!"
    },
    {
        id: 2,
        title: "The Forest of Operations",
        subtitle: "Basic Arithmetic in English",
        icon: "🌲",
        theme: "cyan",
        description: "Kuasai operasi hitung: plus (+), minus (-), times/multiplied by (×), dan divided by (÷) dalam kalimat bahasa Inggris."
    },
    {
        id: 3,
        title: "The Valley of Fractions",
        subtitle: "Fractions, Decimals & Percent",
        icon: "🔮",
        theme: "violet",
        description: "Taklukkan pecahan (half, quarter, thirds), angka desimal (point), dan persentase (percent) dalam konteks internasional."
    },
    {
        id: 4,
        title: "The Cavern of Word Problems",
        subtitle: "Real-Life SMP Math Stories",
        icon: "🧭",
        theme: "amber",
        description: "Pecahkan soal cerita matematika kehidupan sehari-hari (belanja, waktu, pembagian, diskon) yang ditulis dalam bahasa Inggris."
    },
    {
        id: 5,
        title: "The Citadel of Masters",
        subtitle: "Ultimate Math-English Challenge",
        icon: "👑",
        theme: "rose",
        description: "Ujian para master: kombinasi soal berkecepatan tinggi untuk menguji kelincahan logika dan penguasaan bahasa Inggrismu!"
    }
];

const QUESTIONS_DATABASE = [
    // ============================================================
    // REALM 1: CARDINAL & ORDINAL NUMBERS
    // ============================================================
    {
        id: 101,
        realm: 1,
        category: "Spelling Trap",
        question: "How do you spell the number 40 in correct English?",
        clue: "Petunjuk: Angka ini sering salah dieja karena berbeda dengan angka 4 (four).",
        options: ["Fourty", "Forty", "Fourti", "Fourtie"],
        correct: 1,
        explanation: "Angka 40 dieja 'FORTY' (tanpa huruf 'u'). Huruf 'u' hanya ada pada four (4) dan fourteen (14). Ini adalah salah satu jebakan ejaan paling umum dalam bahasa Inggris!",
        pronounce: "Forty"
    },
    {
        id: 102,
        realm: 1,
        category: "Ordinal Numbers",
        question: "What is the ordinal number for '12' (urutan ke-12)?",
        clue: "Petunjuk: Huruf 've' berubah menjadi 'f' sebelum ditambah akhiran 'th'.",
        options: ["Twelveth", "Twelfth", "Twelvth", "Twelveeth"],
        correct: 1,
        explanation: "Urutan ke-12 adalah 'TWELFTH'. Huruf 've' pada twelve berubah menjadi 'f', lalu ditambah 'th'. Bukan twelveth!",
        pronounce: "Twelfth"
    },
    {
        id: 103,
        realm: 1,
        category: "Ordinal Numbers",
        question: "Budi won the 1st prize in the English speech contest. How is '1st' pronounced?",
        clue: "Petunjuk: Angka urutan pertama.",
        options: ["First", "One-th", "Onest", "Frist"],
        correct: 0,
        explanation: "1st dibaca 'FIRST'. Urutan 1, 2, 3 memiliki akhiran khusus: 1st (first), 2nd (second), dan 3rd (third).",
        pronounce: "First"
    },
    {
        id: 104,
        realm: 1,
        category: "Spelling Trap",
        question: "Which of the following is the correct spelling for the number 90?",
        clue: "Petunjuk: Angka sembilan puluh.",
        options: ["Ninty", "Ninety", "Ninete", "Nintey"],
        correct: 1,
        explanation: "Angka 90 dieja 'NINETY' (huruf 'e' tetap dipertahankan). Berbeda dengan urutan ke-9 yang menjadi 'NINTH' (tanpa 'e').",
        pronounce: "Ninety"
    },
    {
        id: 105,
        realm: 1,
        category: "Cardinal Numbers",
        question: "How do you write '375' in English words?",
        clue: "Petunjuk: Tiga ratus tujuh puluh lima.",
        options: [
            "Three hundred seventy-five",
            "Three hundreds seventy-five",
            "Three hundred seven five",
            "Thirty hundred seventy-five"
        ],
        correct: 0,
        explanation: "'Hundred' tidak menggunakan akhiran 's' jika didahului angka spesifik (three hundred, bukan three hundreds). Jangan lupa tanda hubung pada 'seventy-five'.",
        pronounce: "Three hundred seventy-five"
    },
    {
        id: 106,
        realm: 1,
        category: "Ordinal Numbers",
        question: "Today is the 31st of October. What is '31st' in words?",
        clue: "Petunjuk: Tiga puluh satu (dalam bentuk urutan tanggal).",
        options: [
            "Thirty-first",
            "Thirty-oneth",
            "Thirtieth-one",
            "Thirty-one"
        ],
        correct: 0,
        explanation: "Untuk tanggal atau urutan ke-31, kata terakhirnya diubah menjadi ordinal: 'THIRTY-FIRST' (31st).",
        pronounce: "Thirty-first"
    },
    {
        id: 107,
        realm: 1,
        category: "Spelling Trap",
        question: "What is the correct ordinal for the number 9 (urutan ke-9)?",
        clue: "Petunjuk: Perhatikan huruf 'e' pada kata nine.",
        options: ["Nineth", "Ninth", "Nineths", "Ninthe"],
        correct: 1,
        explanation: "Urutan ke-9 ditulis 'NINTH'. Huruf 'e' pada nine dihilangkan sebelum ditambahkan akhiran 'th'.",
        pronounce: "Ninth"
    },
    {
        id: 108,
        realm: 1,
        category: "Cardinal Numbers",
        question: "What comes immediately after 'ninety-nine'?",
        clue: "Petunjuk: Seratus.",
        options: ["One thousand", "One hundred", "Ten tens", "One million"],
        correct: 1,
        explanation: "Setelah ninety-nine (99) adalah 'ONE HUNDRED' (100).",
        pronounce: "One hundred"
    },

    // ============================================================
    // REALM 2: BASIC ARITHMETIC IN ENGLISH
    // ============================================================
    {
        id: 201,
        realm: 2,
        category: "Addition",
        question: "What is fifteen plus twenty-seven?",
        clue: "Petunjuk: 15 + 27 = ...",
        options: ["Forty-two", "Thirty-two", "Forty-four", "Fifty-two"],
        correct: 0,
        explanation: "15 + 27 = 42. Dalam bahasa Inggris: 'Fifteen plus twenty-seven is forty-two'.",
        pronounce: "Fifteen plus twenty-seven equals forty-two"
    },
    {
        id: 202,
        realm: 2,
        category: "Subtraction",
        question: "What is eighty minus twenty-four?",
        clue: "Petunjuk: 80 - 24 = ...",
        options: ["Fifty-six", "Fifty-four", "Sixty-six", "Forty-six"],
        correct: 0,
        explanation: "80 - 24 = 56. Dalam bahasa Inggris: 'Eighty minus twenty-four is fifty-six'.",
        pronounce: "Eighty minus twenty-four equals fifty-six"
    },
    {
        id: 203,
        realm: 2,
        category: "Multiplication",
        question: "What is twelve times eight?",
        clue: "Petunjuk: 12 × 8 = ...",
        options: ["Eighty-six", "Ninety-six", "One hundred and six", "Ninety-four"],
        correct: 1,
        explanation: "12 × 8 = 96. Kata 'times' atau 'multiplied by' bermakna perkalian. 'Twelve times eight is ninety-six'.",
        pronounce: "Twelve times eight equals ninety-six"
    },
    {
        id: 204,
        realm: 2,
        category: "Division",
        question: "What is seventy-two divided by nine?",
        clue: "Petunjuk: 72 ÷ 9 = ...",
        options: ["Six", "Seven", "Eight", "Nine"],
        correct: 2,
        explanation: "72 ÷ 9 = 8. 'Divided by' berarti dibagi. 'Seventy-two divided by nine is eight'.",
        pronounce: "Seventy-two divided by nine equals eight"
    },
    {
        id: 205,
        realm: 2,
        category: "Math Vocabulary",
        question: "In English mathematics, what is the 'product' of two numbers?",
        clue: "Petunjuk: Istilah hasil operasi hitung (sum, difference, product, quotient).",
        options: [
            "The result of addition",
            "The result of multiplication",
            "The result of subtraction",
            "The result of division"
        ],
        correct: 1,
        explanation: "'Product' adalah hasil perkalian. Sementara: sum = hasil penjumlahan, difference = selisih (pengurangan), dan quotient = hasil pembagian.",
        pronounce: "The product is the result of multiplication"
    },
    {
        id: 206,
        realm: 2,
        category: "Combined Arithmetic",
        question: "Calculate: Ten plus five times two. (Remember order of operations!)",
        clue: "Petunjuk: 10 + (5 × 2) = ... Dahulukan perkalian!",
        options: ["Thirty", "Twenty", "Twenty-five", "Fifteen"],
        correct: 1,
        explanation: "Sesuai aturan PEMDAS/Kabataku: 5 × 2 = 10, lalu 10 + 10 = 20 (twenty). Jika menghitung dari kiri tanpa aturan akan salah jadi (10+5)×2 = 30.",
        pronounce: "Ten plus five times two equals twenty"
    },
    {
        id: 207,
        realm: 2,
        category: "Subtraction Vocabulary",
        question: "What is the difference between sixty-five and thirty-two?",
        clue: "Petunjuk: Selisih antara 65 dan 32 (65 - 32).",
        options: ["Thirty-three", "Thirty-five", "Twenty-three", "Forty-three"],
        correct: 0,
        explanation: "'Difference' berarti selisih atau hasil pengurangan: 65 - 32 = 33 (thirty-three).",
        pronounce: "The difference between sixty-five and thirty-two is thirty-three"
    },
    {
        id: 208,
        realm: 2,
        category: "Multiplication",
        question: "What is seven squared (7²)?",
        clue: "Petunjuk: Seven times seven.",
        options: ["Fourteen", "Forty-nine", "Forty-seven", "Twenty-one"],
        correct: 1,
        explanation: "Dalam bahasa Inggris, pangkat dua disebut 'squared'. Seven squared = 7 × 7 = 49 (forty-nine).",
        pronounce: "Seven squared is forty-nine"
    },

    // ============================================================
    // REALM 3: FRACTIONS, DECIMALS & PERCENTAGES
    // ============================================================
    {
        id: 301,
        realm: 3,
        category: "Fractions",
        question: "How do you read the fraction '3/4' in English?",
        clue: "Petunjuk: Tiga perempat.",
        options: [
            "Three fourth",
            "Three quarters",
            "Three four",
            "Thirds fourth"
        ],
        correct: 1,
        explanation: "Pecahan 3/4 lazim dibaca 'THREE QUARTERS' atau 'three fourths'. Karena pembilangnya (3) jamak, kata quarter/fourth berakhiran 's'.",
        pronounce: "Three quarters"
    },
    {
        id: 302,
        realm: 3,
        category: "Fractions",
        question: "How do you say '1/2' in English?",
        clue: "Petunjuk: Setengah atau satu per dua.",
        options: ["One second", "A half", "One two", "A halves"],
        correct: 1,
        explanation: "1/2 disebut 'A HALF' atau 'one half'. Bentuk jamaknya adalah 'halves' (misal: two halves).",
        pronounce: "A half"
    },
    {
        id: 303,
        realm: 3,
        category: "Decimals",
        question: "How should you correctly pronounce the decimal number '3.14'?",
        clue: "Petunjuk: Nilai Pi (π). Perhatikan cara membaca angka di belakang koma (point).",
        options: [
            "Three point fourteen",
            "Three point one four",
            "Three comma one four",
            "Thirty-one point four"
        ],
        correct: 1,
        explanation: "Dalam bahasa Inggris, tanda titik desimal dibaca 'POINT', dan angka di belakang titik dibaca satu per satu: 'THREE POINT ONE FOUR', bukan fourteen!",
        pronounce: "Three point one four"
    },
    {
        id: 304,
        realm: 3,
        category: "Percentages",
        question: "What is 25% written as a fraction in its simplest form?",
        clue: "Petunjuk: 25/100 disederhanakan.",
        options: ["One third", "One quarter", "One fifth", "Two quarters"],
        correct: 1,
        explanation: "25% = 25/100 = 1/4. Dalam bahasa Inggris 1/4 adalah 'ONE QUARTER' atau 'a quarter'.",
        pronounce: "Twenty-five percent is one quarter"
    },
    {
        id: 305,
        realm: 3,
        category: "Fractions",
        question: "How do you express '2/3' in English words?",
        clue: "Petunjuk: Dua pertiga.",
        options: ["Two thirds", "Two third", "Second thirds", "Two three"],
        correct: 0,
        explanation: "Pecahan 2/3 dibaca 'TWO THIRDS'. Pembilangnya angka cardinal (two), dan penyebutnya angka ordinal jamak (thirds) karena pembilang lebih dari 1.",
        pronounce: "Two thirds"
    },
    {
        id: 306,
        realm: 3,
        category: "Decimals & Percentage",
        question: "Convert 0.5 into a percentage.",
        clue: "Petunjuk: Setengah sama dengan berapa persen?",
        options: ["Five percent", "Fifty percent", "Zero point five percent", "Five hundred percent"],
        correct: 1,
        explanation: "0.5 = 50/100 = 50% (FIFTY PERCENT). Jangan tertukar dengan 0.05 yang bernilai 5% (five percent).",
        pronounce: "Zero point five is fifty percent"
    },
    {
        id: 307,
        realm: 3,
        category: "Fractions",
        question: "What is one quarter plus one quarter (1/4 + 1/4)?",
        clue: "Petunjuk: Seperempat ditambah seperempat.",
        options: ["A half", "Three quarters", "Two fourths only", "One whole"],
        correct: 0,
        explanation: "1/4 + 1/4 = 2/4 = 1/2. Dalam bahasa Inggris bentuk paling sederhananya adalah 'A HALF' (setengah).",
        pronounce: "One quarter plus one quarter equals a half"
    },

    // ============================================================
    // REALM 4: REAL-WORLD WORD PROBLEMS (SMP LEVEL)
    // ============================================================
    {
        id: 401,
        realm: 4,
        category: "Shopping & Money",
        question: "A book costs $12. Dika buys 3 books and pays with a $50 bill. How much change does he get?",
        clue: "Petunjuk: Biaya total = 3 × $12 = $36. Uang kembalian (change) = $50 - $36.",
        options: ["Fourteen dollars", "Sixteen dollars", "Twelve dollars", "Eighteen dollars"],
        correct: 0,
        explanation: "3 × $12 = $36. Uang kembalian (change): $50 - $36 = $14 ('FOURTEEN DOLLARS').",
        pronounce: "Dika gets fourteen dollars in change"
    },
    {
        id: 402,
        realm: 4,
        category: "Time & Schedule",
        question: "An English class starts at 07:15 AM and lasts for 90 minutes. What time does it finish?",
        clue: "Petunjuk: 90 menit = 1 jam 30 menit. 07:15 + 1 jam 30 menit = ...",
        options: [
            "A quarter to nine (08:45)",
            "Half past eight (08:30)",
            "A quarter past eight (08:15)",
            "Nine o'clock (09:00)"
        ],
        correct: 0,
        explanation: "07:15 + 90 menit (1 jam 30 menit) = 08:45. Pukul 08:45 dalam bahasa Inggris disebut 'A QUARTER TO NINE' (kurang 15 menit menuju jam 9).",
        pronounce: "The class finishes at a quarter to nine"
    },
    {
        id: 403,
        realm: 4,
        category: "Sharing & Fractions",
        question: "A pizza has 8 equal slices. Sarah eats 2 slices and David eats 3 slices. What fraction of the pizza is left?",
        clue: "Petunjuk: Total dimakan = 2 + 3 = 5 potong. Sisa = 8 - 5 = 3 potong.",
        options: ["Three eighths", "Five eighths", "Half", "Two eighths"],
        correct: 0,
        explanation: "Total irisan = 8. Sarah + David makan 5 irisan (5/8). Sisa irisan = 8 - 5 = 3 irisan, yaitu 'THREE EIGHTHS' (3/8).",
        pronounce: "Three eighths of the pizza is left"
    },
    {
        id: 404,
        realm: 4,
        category: "Distance & Speed",
        question: "Rian rides his bicycle at an average speed of 15 kilometers per hour. How far does he travel in 3 hours?",
        clue: "Petunjuk: Distance = Speed × Time = 15 km/h × 3 h.",
        options: ["Thirty km", "Forty-five km", "Fifty km", "Thirty-five km"],
        correct: 1,
        explanation: "Distance = 15 × 3 = 45 km ('FORTY-FIVE KILOMETERS'). Ingat ejaan forty tanpa huruf 'u'!",
        pronounce: "He travels forty-five kilometers"
    },
    {
        id: 405,
        realm: 4,
        category: "Discount & Math",
        question: "A school bag costs Rp 200,000. There is a 20% discount. What is the price after the discount?",
        clue: "Petunjuk: Diskon = 20% dari 200.000 = 40.000. Harga akhir = 200.000 - 40.000.",
        options: [
            "One hundred sixty thousand rupiah",
            "One hundred eighty thousand rupiah",
            "One hundred forty thousand rupiah",
            "Forty thousand rupiah"
        ],
        correct: 0,
        explanation: "Besar diskon 20% × Rp 200.000 = Rp 40.000. Harga setelah diskon: Rp 200.000 - Rp 40.000 = Rp 160.000 ('ONE HUNDRED SIXTY THOUSAND RUPIAH').",
        pronounce: "One hundred sixty thousand rupiah"
    },
    {
        id: 406,
        realm: 4,
        category: "Age Problem",
        question: "Maya is 14 years old. Her younger brother is 4 years younger than her. How old will her brother be in 6 years?",
        clue: "Petunjuk: Umur adik sekarang = 14 - 4 = 10 tahun. 6 tahun lagi umurnya = ...",
        options: ["Sixteen", "Eighteen", "Fourteen", "Twelve"],
        correct: 0,
        explanation: "Umur adik saat ini: 14 - 4 = 10 tahun. Dalam 6 tahun mendatang: 10 + 6 = 16 tahun ('SIXTEEN').",
        pronounce: "Her brother will be sixteen years old"
    },

    // ============================================================
    // REALM 5: CITADEL OF GRAND MASTERS (CHALLENGE)
    // ============================================================
    {
        id: 501,
        realm: 5,
        category: "Master Challenge",
        question: "If a rectangular classroom is 8 meters wide and 12 meters long, what is its perimeter?",
        clue: "Petunjuk: Perimeter (keliling) persegi panjang = 2 × (length + width) = 2 × (12 + 8).",
        options: ["Forty meters", "Ninety-six meters", "Twenty meters", "Thirty-six meters"],
        correct: 0,
        explanation: "Keliling (perimeter) = 2 × (12 + 8) = 2 × 20 = 40 meters ('FORTY METERS'). Hati-hati dengan 'area' (luas) yang bernilai 12 × 8 = 96.",
        pronounce: "The perimeter is forty meters"
    },
    {
        id: 502,
        realm: 5,
        category: "Master Challenge",
        question: "What is three cubed (3³) divided by nine?",
        clue: "Petunjuk: 3 cubed = 3 × 3 × 3 = 27. 27 ÷ 9 = ...",
        options: ["Three", "Six", "Nine", "Twenty-seven"],
        correct: 0,
        explanation: "3³ = 3 × 3 × 3 = 27. Lalu 27 ÷ 9 = 3 ('THREE'). Dalam bahasa Inggris pangkat 3 disebut 'cubed'.",
        pronounce: "Three cubed divided by nine equals three"
    },
    {
        id: 503,
        realm: 5,
        category: "Master Challenge",
        question: "There are 40 students in 7A. 60% of them are girls. How many boys are there?",
        clue: "Petunjuk: Persentase laki-laki = 100% - 60% = 40%. Jumlah laki-laki = 40% × 40 siswa.",
        options: ["Sixteen", "Twenty-four", "Fourteen", "Twenty"],
        correct: 0,
        explanation: "Jika perempuan 60% (24 orang), maka laki-laki adalah 40% dari 40 siswa: 0.4 × 40 = 16 orang ('SIXTEEN').",
        pronounce: "There are sixteen boys"
    },
    {
        id: 504,
        realm: 5,
        category: "Master Challenge",
        question: "Which of the following is an ODD number?",
        clue: "Petunjuk: Bilangan ganjil (odd) vs genap (even).",
        options: ["Forty-two", "Sixty-eight", "Seventy-seven", "Ninety-four"],
        correct: 2,
        explanation: "'ODD number' berarti bilangan ganjil. 77 ('SEVENTY-SEVEN') adalah bilangan ganjil, sedangkan angka berakhiran 2, 8, dan 4 adalah 'EVEN numbers' (genap).",
        pronounce: "Seventy-seven is an odd number"
    },
    {
        id: 505,
        realm: 5,
        category: "Master Challenge",
        question: "What is the sum of the first four prime numbers?",
        clue: "Petunjuk: Empat bilangan prima pertama adalah 2, 3, 5, 7. Berapakah jumlahnya?",
        options: ["Seventeen", "Sixteen", "Eighteen", "Fifteen"],
        correct: 0,
        explanation: "Bilangan prima pertama adalah 2, 3, 5, dan 7. Jumlahnya (sum): 2 + 3 + 5 + 7 = 17 ('SEVENTEEN').",
        pronounce: "The sum of the first four prime numbers is seventeen"
    }
];

const ACHIEVEMENTS_DATA = [
    {
        id: "first_blood",
        title: "First Step",
        icon: "🌱",
        desc: "Jawab 1 soal pertama dengan benar",
        unlocked: false
    },
    {
        id: "speed_demon",
        title: "Lightning Math",
        icon: "⚡",
        desc: "Jawab soal dengan sisa waktu di atas 10 detik",
        unlocked: false
    },
    {
        id: "combo_5",
        title: "On Fire!",
        icon: "🔥",
        desc: "Capai 5 kali jawaban benar berturut-turut",
        unlocked: false
    },
    {
        id: "realm1_clear",
        title: "Isle Explorer",
        icon: "🏝️",
        desc: "Selesaikan semua soal di Realm 1",
        unlocked: false
    },
    {
        id: "level_5",
        title: "Calculation Knight",
        icon: "⚔️",
        desc: "Capai Level 5 dalam petualangan",
        unlocked: false
    },
    {
        id: "no_mistake",
        title: "Flawless Adventurer",
        icon: "🛡️",
        desc: "Selesaikan 1 realm tanpa kehilangan nyawa",
        unlocked: false
    },
    {
        id: "xp_1000",
        title: "Century Club",
        icon: "💎",
        desc: "Kumpulkan total 1.000 XP",
        unlocked: false
    },
    {
        id: "master_archmage",
        title: "Grand Archmage",
        icon: "👑",
        desc: "Selesaikan seluruh 5 Realm petualangan",
        unlocked: false
    }
];
