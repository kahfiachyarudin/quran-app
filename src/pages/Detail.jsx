import { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSurahDetail, toggleBookmark } from '../features/quranSlice';
import { SkeletonAyat } from '../components/Skeleton';

const Detail = () => {
  const { nomor } = useParams();
  const dispatch = useDispatch();
  const { hash } = useLocation();

  const { detailSurah, loading, bookmarks } = useSelector((state) => state.quran);

  useEffect(() => {
    dispatch(getSurahDetail(nomor));
  }, [dispatch, nomor]);
  
  useEffect(() => {
    if (!loading && hash && detailSurah) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-4', 'ring-emerald-400/50', 'bg-emerald-50/50');
          
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-emerald-400/50', 'bg-emerald-50/50');
          }, 3000);
        }, 500);
      }
    }
  }, [loading, hash, detailSurah]);

  const isBookmarked = (nomorAyat) => {
    return bookmarks.some(
      (b) => b.nomorAyat === nomorAyat && b.nomorSurah === parseInt(nomor)
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto p-10 space-y-8">
        <SkeletonAyat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* HEADER SECTION */}
      <div className="bg-emerald-700 pt-10 pb-24 relative overflow-hidden">
        {/* Dekorasi Bulatan */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-emerald-100 hover:text-white transition-colors mb-6 group"
          >
            <span className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all">←</span>
            <span className="font-medium text-sm tracking-wide uppercase">Kembali ke Beranda</span>
          </Link>

          {detailSurah && (
            <div className="flex flex-col items-center text-center text-white">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-md">
                {detailSurah.namaLatin}
              </h1>
              <p className="text-emerald-100 text-lg md:text-xl font-light mb-8 italic">
                {detailSurah.arti} • {detailSurah.jumlahAyat} Ayat
              </p>

              {/* AUDIO PLAYER GLASSMORPHISM */}
              <div className="w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-2xl">
                <audio controls className="w-full h-10 accent-emerald-400">
                  <source src={detailSurah.audioFull['05']} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <p className="text-[10px] uppercase tracking-widest text-emerald-200 mt-2 font-bold">
                  Audio Murattal: Syaikh Mishary Rashid Al-Afasy
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DAFTAR AYAT SECTION */}
      <div className="container mx-auto px-4 -mt-12 max-w-4xl relative z-20">
        <div className="space-y-8">
          {detailSurah?.ayat.map((ayat) => (
            <div 
              key={ayat.nomorAyat} 
              id={`ayat-${ayat.nomorAyat}`}
              className="group bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:border-emerald-100"
            >
              {/* CONTROL BAR (Nomor & Bookmark) */}
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 flex items-center justify-center rounded-2xl font-bold text-lg rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    <span className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">
                      {ayat.nomorAyat}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => dispatch(toggleBookmark({
                      nomorSurah: detailSurah.nomor,
                      namaSurah: detailSurah.namaLatin,
                      nomorAyat: ayat.nomorAyat,
                      teksArab: ayat.teksArab
                    }))}
                    className={`p-3 rounded-2xl transition-all duration-300 ${
                      isBookmarked(ayat.nomorAyat) 
                        ? 'bg-amber-50 text-amber-500 scale-110 shadow-lg shadow-amber-200/50' 
                        : 'bg-slate-50 text-slate-300 hover:text-emerald-500 hover:bg-emerald-50'
                    }`}
                    title="Simpan Ayat"
                  >
                    <span className="text-xl">⭐</span>
                  </button>
                </div>

                {/* TEKS ARAB */}
                <h2 className="text-4xl md:text-5xl font-arabic font-bold text-slate-800 text-right leading-[4.5rem] md:leading-[5rem] flex-1 pl-8" dir="rtl">
                  {ayat.teksArab}
                </h2>
              </div>
              
              {/* TEKS LATIN & TERJEMAHAN */}
              <div className="space-y-4 border-t border-slate-50 pt-8">
                <p className="text-emerald-700 font-semibold text-lg italic text-right leading-relaxed">
                  {ayat.teksLatin}
                </p>
                
                <div className="bg-slate-50/50 p-6 rounded-2xl border-l-4 border-emerald-500">
                  <p className="text-slate-600 leading-relaxed text-base md:text-lg">
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