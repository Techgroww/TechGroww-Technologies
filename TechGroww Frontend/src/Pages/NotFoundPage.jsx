import { Link } from 'react-router';
import { Home } from 'lucide-react';
import { motion } from 'motion/react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-[#00D4FF] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-[#0A1F44] mb-4">Page Not Found</h2>
          <p className="text-[#718096] mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 h-12 bg-[#00D4FF] text-white rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
