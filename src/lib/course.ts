export type Lesson = {
  id: number;
  day: number;
  title: string;
  description: string | null;
  theory_video_url: string | null;
  practice_video_url: string | null;
  pdf_notes_url: string | null;
  theory_minutes: number;
  practice_minutes: number;
  preview: boolean;
};

// Supabase ulanmaganda demo uchun fallback ma'lumotlar
export const FALLBACK_LESSONS: Lesson[] = [
  { id: 1, day: 1, title: "Tanishuv: Saksafon turlari va tuzilishi", description: "Alto, Tenor, Soprano va Baritone — qaysi biridan boshlash kerak.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: true },
  { id: 2, day: 2, title: "Mundshtuk va qamish sozlamalari", description: "To'g'ri o'rnatish, qamish tanlash va parvarish.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 3, day: 3, title: "To'g'ri pozitsiya va nafas olish", description: "Diafragma nafasi va tana holati.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 4, day: 4, title: "Birinchi tovush: Embouchure", description: "Lab pozitsiyasi va sof tovush hosil qilish.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 5, day: 5, title: "Qo'l holati va barmoq joylashuvi", description: "Klapanlar bilan tanishuv.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 6, day: 6, title: "Birinchi notalar: Si, La, Sol", description: "Eng oddiy notalar va mashq.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 7, day: 7, title: "Nota o'qish asoslari", description: "Skripka kaliti, ritm va o'lchov.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 8, day: 8, title: "Do major gammasi", description: "Birinchi gamma — har kuni mashq.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 9, day: 9, title: "Stakkato va legato", description: "Tovushlar orasidagi bog'lanish.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 10, day: 10, title: "Birinchi kuy: Mary Had a Little Lamb", description: "Oddiy melodiya bilan amaliyot.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 11, day: 11, title: "Ritm va metronom bilan ishlash", description: "Tempo, BPM va doimiy mashq.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 12, day: 12, title: "Sol major gammasi", description: "Yangi gamma va arpedjio.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 13, day: 13, title: "Dinamika: piano va forte", description: "Tovushni boshqarish.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 14, day: 14, title: "Vibrato texnikasi", description: "Diafragma va lab vibratosi.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 15, day: 15, title: "Klassik kuy: Ode to Joy", description: "Bethoven asari moslashgan.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 16, day: 16, title: "Fa major va Re major gammalari", description: "Yangi tonalliklar.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 17, day: 17, title: "Blues skala asoslari", description: "Jazz va blues uchun zamin.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 18, day: 18, title: "Birinchi improvizatsiya", description: "Pentatonika asosida solo.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 19, day: 19, title: "Swing ritmi", description: "Jazz ritmining asosi.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 20, day: 20, title: "Jazz standart: Autumn Leaves", description: "Mashhur standart bilan tanishuv.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 21, day: 21, title: "Akkord progressiyalari", description: "ii-V-I bog'lamasi.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 22, day: 22, title: "Bebop frazalari", description: "Klassik jazz tilini o'rganish.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 23, day: 23, title: "Ballada o'ynash", description: "Sekin kuylarda ifoda.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 24, day: 24, title: "Funk va R&B uslubi", description: "Zamonaviy janrlar.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 25, day: 25, title: "Altissimo registr", description: "Yuqori notalarga chiqish.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 26, day: 26, title: "Mikrofon bilan ishlash", description: "Sahna va studiya uchun.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 27, day: 27, title: "Auditsiya tayyorgarligi", description: "Asar tanlash va tayyorlanish.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 28, day: 28, title: "Ansambl bilan chalish", description: "Boshqa cholg'ular bilan.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 29, day: 29, title: "Yakuniy asar — repetitsiya", description: "Barcha texnikalarni birlashtirish.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
  { id: 30, day: 30, title: "Yakuniy konsert va sertifikat", description: "Yakuniy chiqish va keyingi qadamlar.", theory_video_url: null, practice_video_url: null, pdf_notes_url: null, theory_minutes: 60, practice_minutes: 120, preview: false },
];

export const COURSE_PRICE = 1_490_000; // UZS
export const COURSE_OLD_PRICE = 2_990_000;
