import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurah, setSearchTerm } from '../features/quranSlice';
import { Link } from 'react-router-dom';
import { SkeletonCard } from '../components/Skeleton';

const Home = () => {
  const dispatch = useDispatch();
  const { surahList, loading, searchTerm, bookmarks, lastRead } = useSelector((state) => state.quran);

  // LOGIKA DARK MODE
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    dispatch(getAllSurah());
  }, [dispatch]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const filteredSurah = surahList.filter((s) =>
    s.namaLatin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showBackToTop, setShowBackToTop] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    // Munculkan tombol jika sudah scroll lebih dari 600px
    setShowBackToTop(window.scrollY > 600);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
      
      {/* HERO SECTION - Warna diganti ke Royal Blue & Slate */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16 md:pt-24 pb-32 md:pb-40 overflow-hidden transition-all duration-500">
        
        {/* Dekorasi Latar Belakang - Soft Blue Glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          
          {/* TOP BAR - Dark Mode Toggle */}
          <div className="flex justify-end mb-8 md:mb-0">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-3 rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/30 shadow-2xl transition-all duration-300 group"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-300 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707-.707ZM12 5a7 7 0 100 14 7 7 0 000-14z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-100 group-hover:-rotate-12 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          <header className="flex flex-col md:flex-row justify-between items-center gap-10">
            {/* LEFT - Konten Teks */}
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-300 text-xs font-bold tracking-widest uppercase mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Al-Bayan V1.0
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
                Web Al-Qur'an <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">Digital</span>
              </h1>
              
              <p className="text-blue-100/70 text-base md:text-xl font-light max-w-lg leading-relaxed mb-8">
                "Sebaik-baik kalian adalah orang yang belajar <span className="text-blue-200 font-medium">Al-Qur'an</span> dan mengajarkannya."
              </p>

              {/* LAST READ - Blue Theme */}
              {lastRead && (
                <Link to={`/surat/${lastRead.nomorSurah}#ayat-${lastRead.nomorAyat}`} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl text-sm text-white flex items-center gap-3 hover:bg-white hover:text-blue-900 transition-all duration-300">
                    <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] uppercase font-bold tracking-tighter opacity-60">Lanjutkan</span>
                      <span className="font-semibold">{lastRead.namaSurah} • Ayat {lastRead.nomorAyat}</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* RIGHT - Bookmark Button */}
            <div className="relative group">
              <Link to="/bookmarks" className="relative flex items-center gap-4 bg-white dark:bg-slate-800 text-blue-900 dark:text-white px-8 py-4 rounded-2xl font-bold transition-all hover:shadow-[0_20px_40px_-15px_rgba(30,64,175,0.4)] active:scale-95 border-b-4 border-blue-700 dark:border-blue-500">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-blue-500 transition-all"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
                  {bookmarks.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ring-4 ring-white dark:ring-slate-800 animate-bounce">
                      {bookmarks.length}
                    </span>
                  )}
                </div>
                <span className="text-lg">Bookmark</span>
              </Link>
            </div>
          </header>
        </div>
      </div>

      {/* SEARCH BAR SECTION - Theme Blue */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari nama surah..."
              className="w-full pl-14 pr-6 py-4 md:py-5 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-2xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-base transition-all"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            [...Array(9)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            filteredSurah.map((surah) => (
              <Link to={`/surat/${surah.nomor}`} key={surah.nomor} className="group">
                <div className="h-full p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-900/10 group-hover:-translate-y-2 group-hover:border-blue-100 dark:group-hover:border-blue-900 flex flex-col justify-between overflow-hidden relative">
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rotate-45 rounded-xl opacity-70 group-hover:rotate-90 transition-transform duration-500"></div>
                        <span className="relative w-12 h-12 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-lg">
                          {surah.nomor}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-none mb-1">
                          {surah.namaLatin}
                        </h3>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{surah.arti}</p>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-500 font-arabic">{surah.nama}</h3>
                  </div>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-800">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600">{surah.tempatTurun}</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">{surah.jumlahAyat} Ayat</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      {/* BACK TO TOP - Royal Blue Style */}
<button
  onClick={scrollToTop}
  className={`fixed bottom-8 right-8 z-[100] p-4 rounded-2xl bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all duration-500 hover:bg-blue-700 hover:-translate-y-2 active:scale-95 ${
    showBackToTop 
      ? 'opacity-100 translate-y-0 scale-100' 
      : 'opacity-0 translate-y-20 scale-50 pointer-events-none'
  }`}
  aria-label="Kembali ke atas"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
</button>
    </div>
  );
};

export default Home;