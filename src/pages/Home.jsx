import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurah, setSearchTerm } from '../features/quranSlice';
import { Link } from 'react-router-dom';
import { SkeletonCard } from '../components/Skeleton';

const Home = () => {
  const dispatch = useDispatch();
  const { surahList, loading, searchTerm, bookmarks } = useSelector((state) => state.quran);

  useEffect(() => {
    dispatch(getAllSurah());
  }, [dispatch]);

  const filteredSurah = surahList.filter((s) =>
    s.namaLatin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* HERO SECTION */}
      <div className="relative bg-emerald-700 pt-16 pb-32 overflow-hidden">
        {/* Dekorasi Abstract Background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-600 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-800 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <header className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                Al-Qur'an <span className="text-emerald-300">Digital</span>
              </h1>
              <p className="text-emerald-100 text-lg font-light max-w-md">
                "Sebaik-baik kali an adalah orang yang belajar Al-Qur'an dan mengajarkannya."
              </p>
            </div>

            <Link 
              to="/bookmarks" 
              className="group relative flex items-center gap-3 bg-white/90 backdrop-blur-md border border-white/20 text-[#0a1f44] px-8 py-3 rounded-2xl font-semibold transition-all hover:bg-white hover:text-emerald-800 hover:shadow-xl overflow-hidden"
            >
              <span className="text-xl group-hover:scale-125 transition-transform duration-300">⭐</span>
              <span>Bookmark</span>
              {bookmarks.length > 0 && (
                <span className="bg-emerald-400 hover:text-emerald-900 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-pulse text-[#0a1f44]">
                  {bookmarks.length}
                </span>
              )}
            </Link>
          </header>
        </div>
      </div>

      {/* SEARCH BAR SECTION (Floating) */}
      <div className="container mx-auto px-4 -mt-10 relative z-20 sticky top-3">
        <div className="max-w-2xl mx-auto shadow-2xl rounded-2xl bg-white">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari surah favoritmu di sini..."
              className="w-full pl-12 pr-4 py-5 bg-white border-none rounded-2xl shadow-2xl shadow-emerald-900/10 outline-none focus:ring-2 focus:ring-emerald-500 text-lg transition-all placeholder:text-gray-400"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(9)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            filteredSurah.map((surah) => (
              <Link to={`/surat/${surah.nomor}`} key={surah.nomor} className="group">
                <div className="h-full p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-emerald-900/5 group-hover:-translate-y-2 group-hover:border-emerald-200 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {/* Decorative Shape behind number */}
                        <div className="absolute inset-0 bg-[#3fc275] rotate-45 rounded-xl opacity-70 group-hover:rotate-90 transition-transform duration-500"></div>
                        <span className="relative w-12 h-12 flex items-center justify-center text-emerald-700 font-bold text-lg">
                          {surah.nomor}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {surah.namaLatin}
                        </h3>
                        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                          {surah.arti}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-emerald-700 drop-shadow-sm">
                        {surah.nama}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                      {surah.tempatTurun}
                    </span>
                    <span className="text-xs font-bold text-slate-300 group-hover:text-emerald-300 uppercase tracking-widest">
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
          <div className="text-center py-32 bg-white rounded-3xl shadow-inner border border-dashed border-slate-200">
            <div className="text-6xl mb-4">🔎</div>
            <h3 className="text-xl font-bold text-slate-700">Surah tidak ditemukan</h3>
            <p className="text-slate-400">Coba gunakan kata kunci lain, seperti "Al-Mulk" atau "Yasin"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;