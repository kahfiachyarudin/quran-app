import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurah, setSearchTerm } from '../features/quranSlice';
import { Link } from 'react-router-dom';
import { SkeletonCard } from '../components/Skeleton';

const Home = () => {
  const dispatch = useDispatch();
  const { surahList, loading, searchTerm, bookmarks, lastRead } = useSelector((state) => state.quran);

  useEffect(() => {
    dispatch(getAllSurah());
  }, [dispatch]);

  const filteredSurah = surahList.filter((s) =>
    s.namaLatin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <div className="relative bg-emerald-700 dark:bg-emerald-900 pt-12 md:pt-16 pb-28 md:pb-32 overflow-hidden">
        {/* Dekorasi Abstract - Hidden on small mobile for cleaner look */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-600 dark:bg-emerald-800 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-800 dark:bg-emerald-950 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <header className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6 px-4">

            {/* LEFT - Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                Al-Qur'an <span className="text-emerald-300">Digital</span>
              </h1>
              <p className="text-emerald-100/80 text-base md:text-lg font-light max-w-md leading-relaxed">
                "Sebaik-baik kalian adalah orang yang belajar Al-Qur'an dan mengajarkannya."
              </p>

              {/* LAST READ - Responsive positioning */}
              {lastRead && (
                <Link
                  to={`/surat/${lastRead.nomorSurah}#ayat-${lastRead.nomorAyat}`}
                  className="inline-block mt-6 group"
                >
                  <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl text-sm text-white hover:bg-white hover:text-emerald-900 transition-all shadow-lg flex items-center gap-2">
                    <span className="group-hover:rotate-12 transition-transform">📖</span>
                    <span>Lanjut: <span className="font-bold">{lastRead.namaSurah}</span> • Ayat {lastRead.nomorAyat}</span>
                  </div>
                </Link>
              )}
            </div>

            {/* RIGHT - Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/bookmarks"
                className="group flex items-center gap-3 bg-white dark:bg-slate-800 text-emerald-900 dark:text-emerald-400 px-6 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-900/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="group-hover:fill-emerald-400 group-hover:stroke-emerald-400 transition-all"
                >
                  <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                <span>Bookmark</span>
                {bookmarks.length > 0 && (
                  <span className="bg-emerald-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                    {bookmarks.length}
                  </span>
                )}
              </Link>
            </div>
          </header>
        </div>
      </div>

      {/* SEARCH BAR SECTION - Sticky with better mobile padding */}
      <div className="container mx-auto px-4 -mt-8 md:-mt-10 relative z-20 sticky top-4">
        <div className="max-w-2xl mx-auto shadow-2xl rounded-2xl">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari nama surah (misal: Al-Kahfi)..."
              className="w-full pl-14 pr-6 py-4 md:py-5 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-2xl shadow-emerald-900/10 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white text-base md:text-lg transition-all placeholder:text-slate-400"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* CONTENT GRID - Optimized for all screens */}
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 md:gap-8">
          {loading ? (
            [...Array(9)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            filteredSurah.map((surah) => (
              <Link to={`/surat/${surah.nomor}`} key={surah.nomor} className="group">
                <div className="h-full p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-emerald-900/10 group-hover:-translate-y-2 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 flex flex-col justify-between overflow-hidden relative">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/50 rotate-45 rounded-xl opacity-70 group-hover:rotate-90 transition-transform duration-500"></div>
                        <span className="relative w-12 h-12 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-lg">
                          {surah.nomor}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {surah.namaLatin}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                          {surah.arti}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-500 drop-shadow-sm font-arabic">
                        {surah.nama}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-800">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 group-hover:text-emerald-600 transition-colors">
                      {surah.tempatTurun}
                    </span>
                    <span className="text-xs font-bold text-slate-300 dark:text-slate-700 group-hover:text-emerald-300 transition-colors uppercase tracking-widest">
                      {surah.jumlahAyat} Ayat
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* EMPTY STATE */}
        {!loading && filteredSurah.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl shadow-inner border-2 border-dashed border-slate-100 dark:border-slate-800">
            <span className="text-6xl block mb-6 animate-bounce">🔍</span>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">Surah tidak ditemukan</h3>
            <p className="text-slate-400 dark:text-slate-500 mt-2">Coba kata kunci lain, misal: "Ar-Rahman"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;