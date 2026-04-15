import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleBookmark } from '../features/quranSlice';

const Bookmarks = () => {
  const { bookmarks } = useSelector((state) => state.quran);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4 max-w-4xl">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-emerald-600">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bookmark"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4" /></svg></span> 
            <span>Bookmark Saya</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Ayat yang kamu simpan akan muncul di sini
          </p>
        </div>

        <Link to="/">
          <button className="px-5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition shadow-sm">
            ← Beranda
          </button>
        </Link>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {bookmarks.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <p className="text-gray-400 text-lg mb-2">
            Belum ada ayat tersimpan
          </p>
          <p className="text-gray-300 text-sm">
            Tambahkan bookmark dari halaman detail surah
          </p>
        </div>
      ) : (

        /* ================= LIST BOOKMARK ================= */
        <div className="grid gap-5">
          {bookmarks.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.01]"
            >
              <div className="flex justify-between items-start gap-4">
                
                {/* LEFT CONTENT */}
                <div className="flex-1">
                  <Link
                    to={`/surat/${item.nomorSurah}#ayat-${item.nomorAyat}`}
                    className="group"
                  >
                    <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 group-hover:underline">
                      {item.namaSurah}
                      <span className="text-gray-400 font-normal">
                        {" "}• Ayat {item.nomorAyat}
                      </span>
                    </h3>
                  </Link>

                  {/* ARAB */}
                  <p
                    className="text-right text-2xl md:text-3xl font-bold my-4 leading-loose text-gray-800 dark:text-white"
                    dir="rtl"
                  >
                    {item.teksArab}
                  </p>

                  {/* TERJEMAHAN */}
                  {item.teksIndonesia && (
                    <p className="text-gray-500 dark:text-gray-300 text-sm leading-relaxed">
                      {item.teksIndonesia}
                    </p>
                  )}
                </div>

                {/* ACTION */}
                <button
                  onClick={() => dispatch(toggleBookmark(item))}
                  className="text-gray-300 hover:text-red-500 transition p-2 text-lg"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;