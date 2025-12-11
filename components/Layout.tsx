import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    // Hide footer on home page, show on all other pages
    setShowFooter(router.pathname !== '/');
  }, [router.pathname]);

  return (
    <div className="min-h-screen bg-tertiary h-screen overflow-y-hidden scrollbar-hide">
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={router.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <AnimatePresence>
        {showFooter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
