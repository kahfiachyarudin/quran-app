import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllSurah, fetchDetailSurah } from '../services/quranApi.js';

// ============ ASYNC THUNK ============
export const getAllSurah = createAsyncThunk(
  'quran/getAllSurah',
  async () => {
    const response = await fetchAllSurah();
    return response.data.data;
  }
);

export const getSurahDetail = createAsyncThunk(
  'quran/getDetail',
  async (nomor) => {
    const response = await fetchDetailSurah(nomor);
    return response.data.data;
  }
);

// ============ INITIAL STATE ============
const initialState = {
  surahList: [],
  detailSurah: null,
  loading: false,
  error: null,
  searchTerm: '',
  // Tambahkan state bookmarks
  // Mengambil dari localStorage agar data tidak hilang saat refresh
  bookmarks: JSON.parse(localStorage.getItem('quran_bookmarks')) || [],
  lastRead: JSON.parse(localStorage.getItem('lastRead')) || null, // Menyimpan data terakhir dibaca
    darkMode: JSON.parse(localStorage.getItem('darkMode')) || false, // Menyimpan preferensi mode gelap
};

// ============ SLICE ============
const quranSlice = createSlice({
  name: 'quran',
  initialState,
  
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    // --- FUNGSI BOOKMARK BARU ---
    
    // Menambah atau menghapus bookmark (Toggle)
    toggleBookmark: (state, action) => {
      const ayat = action.payload; // Data ayat yang dikirim dari komponen
      const index = state.bookmarks.findIndex(
        (item) => item.nomorAyat === ayat.nomorAyat && item.surahName === ayat.surahName
      );

      if (index >= 0) {
        // Jika sudah ada, hapus dari bookmark
        state.bookmarks.splice(index, 1);
      } else {
        // Jika belum ada, tambahkan ke bookmark
        state.bookmarks.push(ayat);
      }

      // Simpan ke localStorage
      localStorage.setItem('quran_bookmarks', JSON.stringify(state.bookmarks));
    },

    // Menghapus semua bookmark sekaligus
    clearAllBookmarks: (state) => {
      state.bookmarks = [];
      localStorage.removeItem('quran_bookmarks');
    },

    setLastRead: (state, action) => {
  state.lastRead = action.payload;
  localStorage.setItem('lastRead', JSON.stringify(action.payload));
},
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getAllSurah.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSurah.fulfilled, (state, action) => {
        state.loading = false;
        state.surahList = action.payload;
      })
      .addCase(getAllSurah.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSurahDetail.pending, (state) => {
        state.loading = true;
        state.detailSurah = null;
      })
      .addCase(getSurahDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detailSurah = action.payload;
      })
      .addCase(getSurahDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions baru
export const { setSearchTerm, toggleBookmark, clearAllBookmarks, setLastRead } = quranSlice.actions;

export default quranSlice.reducer;