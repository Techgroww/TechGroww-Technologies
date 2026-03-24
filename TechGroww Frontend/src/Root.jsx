import { Outlet } from 'react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import ScrollToTop from './Components/ScrollToTop'; // ✅ Check case sensitivity

export function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A]">
      <ScrollToTop/>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}