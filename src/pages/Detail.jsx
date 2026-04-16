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

  useEffect(() => {
    dispatch(getSurahDetail(nomor));
  }, [dispatch, nomor]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (!loading && hash && detailSurah) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-4', 'ring-emerald-400/50', 'dark:bg-emerald-900/30', 'bg-emerald-50/50');
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-emerald-400/50', 'dark:bg-emerald-900/30', 'bg-emerald-50/50');
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
      <div className="container mx-auto p-6 md:p-10 space-y-8 dark:bg-slate-950 min-h-screen">
        <SkeletonAyat />
      </div>
    );
  }

  const handleShare = (ayat) => {
  const text = `
Surah ${detailSurah.namaLatin} Ayat ${ayat.nomorAyat}

${ayat.teksArab}

"${ayat.teksIndonesia}"

Baca selengkapnya di: ${window.location.href}#ayat-${ayat.nomorAyat}
  `.trim();

  if (navigator.share) {
    navigator.share({
      title: `Al-Qur'an Digital - ${detailSurah.namaLatin}`,
      text: text,
      url: window.location.href,
    }).catch((error) => console.log('Error sharing', error));
  } else {
    // Fallback jika browser tidak mendukung Web Share API (Copy to Clipboard)
    navigator.clipboard.writeText(text);
    alert('Teks ayat berhasil disalin ke clipboard!');
  }
};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      
      {/* 1. FLOATING AUDIO PLAYER (Diletakkan paling luar agar z-index bekerja maksimal) */}
      {isSticky && detailSurah && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[999] bg-emerald-900/90 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="flex items-center gap-3">
            <audio controls className="h-8 flex-1 accent-emerald-400">
              <source src={detailSurah.audioFull['05']} type="audio/mpeg" />
            </audio>
            <div className="hidden sm:block">
               <p className="text-[8px] uppercase tracking-widest font-bold text-emerald-200 whitespace-nowrap">
                Mishary Rashid
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. HEADER SECTION */}
      <div className="bg-emerald-700 dark:bg-emerald-900 pt-8 md:pt-10 pb-24 md:pb-32 relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600 dark:bg-emerald-800 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-emerald-100 hover:text-white transition-colors mb-6 group"
          >
            <span className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all text-lg">←</span>
            <span className="font-medium text-xs md:text-sm tracking-wide uppercase text-white">Beranda</span>
          </Link>

          {detailSurah && (
            <div className="flex flex-col items-center text-center text-white">
              <h1 className="text-3xl md:text-6xl font-extrabold mb-3 drop-shadow-md">
                {detailSurah.namaLatin}
              </h1>
              <p className="text-emerald-100 text-base md:text-xl font-light mb-8 italic">
                {detailSurah.arti} • {detailSurah.jumlahAyat} Ayat
              </p>

              {/* AUDIO PLAYER - Versi Normal (Hanya muncul saat di atas) */}
              <div className={`
                w-full max-w-xl p-4 md:p-5 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-opacity duration-300
                ${isSticky ? 'opacity-0 pointer-events-none' : 'opacity-100'}
              `}>
                <audio controls className="w-full h-10 accent-emerald-400">
                  <source src={detailSurah.audioFull['05']} type="audio/mpeg" />
                </audio>
                <p className="text-[10px] uppercase tracking-widest text-emerald-200 mt-2 font-bold">
                  Murattal: Syaikh Mishary Rashid Al-Afasy
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. DAFTAR AYAT SECTION */}
      <div className="container mx-auto px-4 -mt-12 max-w-4xl relative z-20">
        <div className="space-y-6 md:space-y-10">
          {detailSurah?.ayat.map((ayat) => (
            <div 
              key={ayat.nomorAyat}
              onClick={() => dispatch(setLastRead({nomorSurah: nomor, nomorAyat: ayat.nomorAyat, namaSurah: detailSurah.namaLatin}))} 
              id={`ayat-${ayat.nomorAyat}`}
              className="group bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 transition-all duration-500 hover:shadow-2xl hover:border-emerald-100 dark:hover:border-emerald-900 cursor-pointer"
            >
              <div className="flex flex-row-reverse md:flex-row justify-between items-start gap-4 mb-8 md:mb-12">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center rounded-xl md:rounded-2xl font-bold text-base md:text-lg rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    <span className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">
                      {ayat.nomorAyat}
                    </span>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(toggleBookmark({
                        nomorSurah: detailSurah.nomor,
                        namaSurah: detailSurah.namaLatin,
                        nomorAyat: ayat.nomorAyat,
                        teksArab: ayat.teksArab
                      }))
                    }}
                    className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 ${
                      isBookmarked(ayat.nomorAyat) 
                        ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-500 scale-110 shadow-lg' 
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                    }`}
                  >
                    {isBookmarked(ayat.nomorAyat) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2a5 5 0 0 1 5 5v14a1 1 0 0 1 -1.555 .832l-5.445 -3.63l-5.444 3.63a1 1 0 0 1 -1.55 -.72l-.006 -.112v-14a5 5 0 0 1 5 -5h4z" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4" /></svg>
                    )}
                  </button>

                  {/* TOMBOL SHARE */}
<button
  onClick={(e) => {
    e.stopPropagation();
    handleShare(ayat);
  }}
  className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-500 transition-all duration-300"
  title="Bagikan Ayat"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M8.7 10.7l6.6 -3.4" />
    <path d="M8.7 13.3l6.6 3.4" />
  </svg>
</button>
                </div>

                <h2 className="text-3xl md:text-5xl font-arabic font-bold text-slate-800 dark:text-slate-100 text-right leading-[3.5rem] md:leading-[5rem] flex-1 md:pl-8" dir="rtl">
                  {ayat.teksArab}
                </h2>
              </div>
              
              <div className="space-y-4 border-t border-slate-50 dark:border-slate-800 pt-6 md:pt-8">
                <p className="text-emerald-700 dark:text-emerald-400 font-semibold text-base md:text-lg italic text-right leading-relaxed">
                  {ayat.teksLatin}
                </p>
                <div className="bg-slate-50/50 dark:bg-slate-800/50 p-5 md:p-6 rounded-2xl border-l-4 border-emerald-500">
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