import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSurahDetail, toggleBookmark, setLastRead } from '../features/quranSlice';
import { SkeletonAyat } from '../components/Skeleton';

const Detail = () => {
  const { nomor } = useParams();
  const dispatch = useDispatch();
  const { hash } = useLocation();
  const { detailSurah, loading, bookmarks } = useSelector((state) => state.quran);
  
  const [isSticky, setIsSticky] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedQori, setSelectedQori] = useState('05'); // Default: Mishary Rashid


  useEffect(() => {
    dispatch(getSurahDetail(nomor));
  }, [dispatch, nomor]);

  useEffect(() => {
    const handleScroll = () => {
      // Logic untuk audio player melayang
      setIsSticky(window.scrollY > 400);
      // Logic untuk tombol back to top
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ... (Keep handleShare and isBookmarked functions as before) ...
  const isBookmarked = (nomorAyat) => {
    return bookmarks.some((b) => b.nomorAyat === nomorAyat && b.nomorSurah === parseInt(nomor));
  };

  const handleShare = (ayat) => {
    const text = `Surah ${detailSurah.namaLatin} Ayat ${ayat.nomorAyat}\n\n${ayat.teksArab}\n\n"${ayat.teksIndonesia}"\n\nBaca di: ${window.location.href}#ayat-${ayat.nomorAyat}`.trim();
    if (navigator.share) {
      navigator.share({ title: `Al-Bayan`, text: text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
      alert('Teks disalin!');
    }
  };

  if (loading) return <div className="container mx-auto p-10 dark:bg-slate-950 min-h-screen"><SkeletonAyat /></div>;

const listQori = [
  { id: '01', name: 'Al-Afasy', full: 'Mishary Rashid Al-Afasy' },
  { id: '02', name: 'Al-Matrud', full: 'Abdullah Al-Matrud' },
  { id: '03', name: 'Al-Ghamidi', full: 'Saad Al-Ghamidi' },
  { id: '04', name: 'As-Sudais', full: 'Abdurrahman As-Sudais' },
  { id: '05', name: 'Al-Shuraym', full: 'Saud Al-Shuraym' },
  { id: '06', name: 'Al-Mansary', full: 'Salah Al-Mansary' },
];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
      
      {/* 1. STICKY BACK BUTTON (Selalu ada di pojok kiri atas) */}
      <div className="fixed top-6 left-6 z-[100] pointer-events-none">
        <Link 
          to="/" 
          className="pointer-events-auto inline-flex items-center justify-center w-12 h-12 md:w-auto md:px-5 bg-white/10 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 text-white rounded-2xl shadow-2xl hover:bg-blue-600 transition-all duration-300 group"
          title="Kembali ke Beranda"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform text-[#020617] dark:text-[#F8FAFC]">←</span>
          <span className="hidden md:block ml-3 font-bold text-xs tracking-widest uppercase text-[#020617] dark:text-[#F8FAFC]">Beranda</span>
        </Link>
      </div>

      {/* FLOATING AUDIO CONSOLE */}
{detailSurah && (
  <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-gradient-to-t from-slate-950 via-slate-900/95 to-transparent backdrop-blur-md">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/5 dark:bg-slate-900/80 border border-white/10 p-3 md:p-4 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center gap-4 transition-all duration-500">
        
        {/* INFO QORI & SURAH */}
        <div className="flex items-center gap-3 w-full md:w-auto border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-6">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest text-blue-400 font-black">Memutar Surah</p>
            <p className="text-white font-bold truncate max-w-[120px]">{detailSurah.namaLatin}</p>
          </div>
        </div>

        {/* AUDIO ELEMENT */}
        <div className="flex-1 w-full">
          <audio 
            key={selectedQori} // Penting agar audio me-refresh saat ganti qori
            controls 
            className="w-full h-8 accent-blue-500 custom-audio"
          >
            <source src={detailSurah.audioFull[selectedQori]} type="audio/mpeg" />
          </audio>
        </div>

        {/* SELECT QORI (Dropdown Style) */}
        <div className="relative w-full md:w-auto">
          <select 
            value={selectedQori}
            onChange={(e) => setSelectedQori(e.target.value)}
            className="w-full md:w-40 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl appearance-none cursor-pointer transition-colors outline-none border-none shadow-lg"
          >
            {listQori.map((qori) => (
              <option key={qori.id} value={qori.id} className="bg-slate-900 text-white">
                {qori.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>

      </div>
    </div>
  </div>
)}

      {/* 2. BACK TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-[100] p-4 rounded-2xl bg-blue-600 text-white shadow-2xl transition-all duration-500 hover:bg-blue-700 hover:-translate-y-2 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      </button>

      
      {/* 4. HEADER SECTION */}
      <div className="bg-gradient-to-b from-slate-900 via-blue-900 to-blue-800 pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          {detailSurah && (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-300 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                Surah Ke-{detailSurah.nomor}
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-4">{detailSurah.namaLatin}</h1>
              <p className="text-blue-100/70 text-lg md:text-xl font-light italic">{detailSurah.arti} • {detailSurah.jumlahAyat} Ayat</p>
            </>
          )}
        </div>
      </div>

      {/* 5. DAFTAR AYAT SECTION */}
<div className="container mx-auto px-4 -mt-12 max-w-4xl relative z-20">
  <div className="space-y-8">
    {detailSurah?.ayat.map((ayat) => (
      <div 
        key={ayat.nomorAyat}
        id={`ayat-${ayat.nomorAyat}`}
        onClick={() => dispatch(setLastRead({
          nomorSurah: nomor, 
          nomorAyat: ayat.nomorAyat, 
          namaSurah: detailSurah.namaLatin
        }))}
        className="group bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-900 cursor-pointer"
      >
        <div className="flex flex-col md:flex-row-reverse justify-between items-start gap-8 mb-10">
          
          {/* TOOLBAR AYAT - Sekarang ada 3 Tombol */}
          <div className="flex md:flex-col items-center gap-3 w-full md:w-auto border-b md:border-b-0 md:border-l border-slate-50 dark:border-slate-800 pb-4 md:pb-0 md:pl-6">
            
            {/* Nomor Ayat */}
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center rounded-xl font-black text-sm rotate-45 group-hover:rotate-0 transition-all duration-500">
              <span className="-rotate-45 group-hover:rotate-0">{ayat.nomorAyat}</span>
            </div>
            
            {/* Tombol Bookmark */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleBookmark({ 
                  nomorSurah: detailSurah.nomor, 
                  namaSurah: detailSurah.namaLatin, 
                  nomorAyat: ayat.nomorAyat, 
                  teksArab: ayat.teksArab 
                }));
              }} 
              className={`p-3 rounded-xl transition-all duration-300 ${
                isBookmarked(ayat.nomorAyat) 
                  ? 'bg-amber-500 text-white shadow-lg scale-110' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              }`}
              title="Simpan Ayat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isBookmarked(ayat.nomorAyat) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
            </button>

            {/* Tombol Bagikan - DITAMBAHKAN KEMBALI */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(ayat);
              }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
              title="Bagikan Ayat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          </div>

          {/* TEKS ARAB */}
          <h2 className="text-4xl md:text-5xl font-amiri font-bold text-slate-800 dark:text-slate-100 text-right leading-[4.5rem] md:leading-[5.5rem] flex-1" dir="rtl">
            {ayat.teksArab}
          </h2>
        </div>

        {/* LATIN & TERJEMAHAN */}
        <div className="space-y-4">
          <p className="text-blue-700 dark:text-blue-400 font-bold text-sm md:text-base text-right italic opacity-80 leading-relaxed">
            {ayat.teksLatin}
          </p>
          <div className="bg-slate-50/50 dark:bg-slate-800/40 p-6 rounded-3xl border-l-4 border-blue-500 transition-colors group-hover:bg-blue-50/30 dark:group-hover:bg-blue-900/10">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-lg">
              {ayat.teksIndonesia}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default Detail;