import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleBookmark } from '../features/quranSlice';

const Bookmarks = () => {
  const { bookmarks } = useSelector((state) => state.quran);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="bg-slate-900 pt-16 pb-24 md:pt-20 md:pb-32 relative overflow-hidden">
        {/* Dekorasi Cahaya */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight">Bookmark <span className="text-blue-400">Saya</span></h1>
              </div>
              <p className="text-slate-400 text-lg font-light">
                Kumpulan ayat suci yang telah Anda simpan.
              </p>
            </div>

            <Link to="/">
              <button className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 font-bold shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Kembali
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="container mx-auto px-4 -mt-12 relative z-20 max-w-5xl">
        
        {bookmarks.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-16 text-center shadow-2xl shadow-blue-900/5 border border-slate-100 dark:border-slate-800">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
               <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /><line x1="9" y1="10" x2="15" y2="10" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Belum ada ayat tersimpan</h3>
            <p className="text-slate-400 max-w-sm mx-auto">Cari ayat favorit Anda di halaman detail surah dan klik ikon bookmark untuk menyimpannya di sini.</p>
          </div>
        ) : (
          /* LIST BOOKMARK */
          <div className="grid gap-6">
            {bookmarks.map((item, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    {/* Header Card */}
                    <div className="flex items-center justify-between mb-6">
                      <Link
                        to={`/surat/${item.nomorSurah}#ayat-${item.nomorAyat}`}
                        className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl group-hover:bg-blue-600 transition-colors duration-300"
                      >
                        <span className="text-sm font-bold text-blue-700 dark:text-blue-400 group-hover:text-white">
                          {item.namaSurah} • {item.nomorAyat}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-blue-400 group-hover:text-white"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                      </Link>

                      <button
                        onClick={() => dispatch(toggleBookmark(item))}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                        title="Hapus Bookmark"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>

                    {/* Arab Text */}
                    <p
                      className="text-right text-3xl md:text-4xl font-bold mb-8 leading-[2.5] text-slate-800 dark:text-white font-arabic transition-all"
                      dir="rtl"
                    >
                      {item.teksArab}
                    </p>

                    {/* Translation */}
                    {item.teksIndonesia && (
                      <div className="relative pl-6 border-l-2 border-blue-100 dark:border-slate-800">
                        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed italic">
                          "{item.teksIndonesia}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;