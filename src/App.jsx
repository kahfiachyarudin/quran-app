import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Bookmarks from './pages/Bookmark';
import Layout from './layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Layout sebagai parent */}
        <Route path="/" element={<Layout />}>

          {/* Child routes */}
          <Route path='/' element={<Home />} />
          <Route path="surat/:nomor" element={<Detail />} />
          <Route path="bookmarks" element={<Bookmarks />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;