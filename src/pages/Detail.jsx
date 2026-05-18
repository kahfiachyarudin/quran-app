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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 transition-colors duration-500">
      
      {/* 1. STICKY BACK BUTTON (Glass Style) */}
      <div className="fixed top-6 left-6 z-[100]">
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 px-4 py-2.5 bg-slate-900/90 dark:bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 hover:bg-blue-600 hover:scale-105 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span className="hidden md:block font-bold text-xs tracking-widest uppercase">Beranda</span>
        </Link>
      </div>

      {/* 2. FLOATING AUDIO CONSOLE (Premium Redesign) */}
      {detailSurah && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-3xl">
          <div className="bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-5 transition-all duration-500">
            
            {/* Play Button Decor & Info */}
            <div className="flex items-center gap-4 w-full md:w-auto md:border-r border-white/10 md:pr-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/40 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-black text-blue-400 tracking-tighter">Now Playing</p>
                <p className="text-white font-bold truncate max-w-[150px]">{detailSurah.namaLatin}</p>
              </div>
            </div>

            {/* Audio Player Interface */}
            <div className="flex-1 w-full">
              <audio 
                key={selectedQori} 
                controls 
                className="w-full h-10 accent-blue-500 custom-audio"
              >
                <source src={detailSurah.audioFull[selectedQori]} type="audio/mpeg" />
              </audio>
            </div>

            {/* Qori Selector Dropdown */}
            <div className="relative w-full md:w-auto">
              <select 
                value={selectedQori}
                onChange={(e) => setSelectedQori(e.target.value)}
                className="w-full md:w-44 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold py-3 px-5 rounded-2xl appearance-none cursor-pointer transition-all outline-none border border-white/5"
              >
                {listQori.map((qori) => (
                  <option key={qori.id} value={qori.id} className="bg-slate-900 text-white">
                    {qori.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. HERO HEADER SECTION */}
      <div className="relative bg-slate-900 pt-28 pb-40 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-blue-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          {detailSurah && (
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
                Surah Ke-{detailSurah.nomor}
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter transition-all">
                {detailSurah.namaLatin}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-4 text-blue-100/60 font-medium md:text-lg">
                <span className="px-4 py-1 bg-white/5 rounded-lg border border-white/5 uppercase text-xs tracking-widest">{detailSurah.tempatTurun}</span>
                <span className="text-2xl opacity-20">•</span>
                <span>{detailSurah.arti}</span>
                <span className="text-2xl opacity-20">•</span>
                <span className="text-blue-300 font-bold">{detailSurah.jumlahAyat} Ayat</span>
              </div>
            </div>
          )}
        </div>

        {/* Slanted Bottom Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden line-height-0 transform">
          <svg className="relative block w-full h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 120 307.75 0 1200 120z" className="fill-slate-50 dark:fill-slate-950"></path>
          </svg>
        </div>
      </div>

      {/* 4. DAFTAR AYAT SECTION */}
      <div className="container mx-auto px-4 -mt-20 max-w-4xl relative z-20">
        <div className="grid gap-10">
          {detailSurah?.ayat.map((ayat) => (
            <div 
              key={ayat.nomorAyat}
              id={`ayat-${ayat.nomorAyat}`}
              onClick={() => dispatch(setLastRead({
                nomorSurah: nomor, 
                nomorAyat: ayat.nomorAyat, 
                namaSurah: detailSurah.namaLatin
              }))}
              className="group bg-white dark:bg-slate-900/60 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row-reverse justify-between items-start gap-10 mb-12">
                
                {/* TOOLBAR AYAT */}
                <div className="flex md:flex-col items-center gap-4 w-full md:w-auto md:border-l border-slate-100 dark:border-slate-800 md:pl-8">
                  {/* Nomor Ayat Hexagon/Square */}
                  <div className="w-12 h-12 bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center rounded-2xl font-black text-lg rotate-12 group-hover:rotate-0 transition-all duration-500 shadow-lg">
                    {ayat.nomorAyat}
                  </div>
                  
                  {/* Bookmark Button */}
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
                    className={`p-3.5 rounded-2xl transition-all duration-300 ${
                      isBookmarked(ayat.nomorAyat) 
                        ? 'bg-amber-500 text-white shadow-lg' 
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isBookmarked(ayat.nomorAyat) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleShare(ayat); }}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                  </button>
                </div>

                {/* TEKS ARAB (Big & Clear) */}
                <h2 className="text-4xl md:text-5xl font-arabic font-bold text-slate-800 dark:text-white text-right leading-[4.5rem] md:leading-[5.5rem] flex-1 transition-all group-hover:text-blue-600 dark:group-hover:text-blue-400" dir="rtl">
                  {ayat.teksArab}
                </h2>
              </div>

              {/* LATIN & TERJEMAHAN */}
              <div className="space-y-6 relative">
                <p className="text-blue-600 dark:text-blue-400 font-bold text-sm md:text-base italic opacity-90 leading-relaxed border-l-2 border-blue-500/20 pl-4">
                  {ayat.teksLatin}
                </p>
                <div className="bg-slate-50/50 dark:bg-slate-800/30 p-8 rounded-[2rem] transition-colors">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-xl font-medium">
                    {ayat.teksIndonesia}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SCROLL TO TOP */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-28 right-6 z-[100] p-4 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
          showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      </button>
    </div>
  );
};

export default Detail;