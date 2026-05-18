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
      
      {/* NEW HERO SECTION */}
      <div className="relative overflow-hidden bg-slate-900 dark:bg-black">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-8 pb-24 md:pt-12 md:pb-32">
          
          {/* NAVBAR-STYLE TOP BAR */}
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">Al-Bayan</span>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/bookmarks" className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-white transition-colors mr-4 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                Tersimpan ({bookmarks.length})
              </Link>
              
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all"
              >
                {isDark ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707-.707ZM12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE: Heading */}
            <div className="text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20">
                <span className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">Digital Quran Experience</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                Baca Quran <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">Lebih Mudah.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
                Akses seluruh surah dengan terjemahan bahasa Indonesia, navigasi cepat, dan fitur bookmark yang sinkron.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                 {/* Tombol Cepat ke Bookmark Mobile */}
                 <Link to="/bookmarks" className="sm:hidden flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold">
                    Bookmarks
                 </Link>
              </div>
            </div>

            {/* RIGHT SIDE: Last Read Card */}
            <div className="flex justify-center lg:justify-end">
              {lastRead ? (
                <div className="relative w-full max-w-sm group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative bg-slate-800/50 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem]">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Terakhir Dibaca</p>
                        <h2 className="text-2xl font-bold text-white">{lastRead.namaSurah}</h2>
                        <p className="text-slate-400 text-sm">Ayat ke-{lastRead.nomorAyat}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                      </div>
                    </div>
                    <Link 
                      to={`/surat/${lastRead.nomorSurah}#ayat-${lastRead.nomorAyat}`}
                      className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                    >
                      Lanjutkan Membaca
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center lg:text-right hidden md:block">
                   <div className="text-8xl font-arabic text-white/5 select-none">القرآن الكريم</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slanted Bottom Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden line-height-0 transform">
            <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 120L0 120 307.75 0 1200 120z" className="fill-slate-50 dark:fill-slate-950"></path>
            </svg>
        </div>
      </div>

      {/* SEARCH BAR SECTION - Theme Blue */}
     {/* SEARCH BAR SECTION - Floating & Premium */}
      <div className="container mx-auto px-4 -mt-10 relative z-30">
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari surah (contoh: Al-Kahfi)..."
              className="w-full pl-16 pr-8 py-5 md:py-6 bg-white dark:bg-slate-900 border-none rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] outline-none focus:ring-4 focus:ring-blue-500/20 dark:text-white text-lg transition-all placeholder:text-slate-400"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            {/* Dekorasi kecil di ujung input */}
            <div className="absolute right-4 inset-y-4 hidden md:flex items-center px-4 border-l border-slate-100 dark:border-slate-800 text-slate-300 text-xs font-bold tracking-tighter uppercase">
              {filteredSurah.length} SurahFound
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT GRID - Clean & Modern Card */}
      <div className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [...Array(9)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            filteredSurah.map((surah) => (
              <Link to={`/surat/${surah.nomor}`} key={surah.nomor} className="group">
                <div className="h-full p-8 bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(30,64,175,0.15)] group-hover:-translate-y-3 group-hover:border-blue-200 dark:group-hover:border-blue-900 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Glassy Background Effect on Hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-[3] transition-transform duration-700"></div>

                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <div className="w-14 h-14 flex items-center justify-center">
                          {/* Octagon-like shape for number */}
                          <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/30 rotate-45 rounded-xl group-hover:rotate-90 group-hover:bg-blue-600 transition-all duration-500"></div>
                          <span className="relative z-10 text-blue-700 dark:text-blue-400 group-hover:text-white font-black text-xl transition-colors">
                            {surah.nomor}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight mb-1">
                          {surah.namaLatin}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium tracking-wide italic">{surah.arti}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <h3 className="text-3xl font-bold text-slate-800 dark:text-white font-arabic transition-transform group-hover:scale-110 duration-500">
                        {surah.nama}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-50 dark:border-slate-800 relative z-10">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-800 text-slate-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 transition-colors">
                        {surah.tempatTurun}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        {surah.jumlahAyat} Ayat
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* BACK TO TOP - Minimalist Royal Blue */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 z-[100] w-14 h-14 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white shadow-2xl transition-all duration-500 hover:-translate-y-2 active:scale-90 flex items-center justify-center border border-white/10 ${
          showBackToTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll ke atas"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
    </div>
  );
};

export default Home;