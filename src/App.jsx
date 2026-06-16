import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Compare from './pages/Compare';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0d1117]
        text-gray-900 dark:text-gray-100 font-sans transition-colors">
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
