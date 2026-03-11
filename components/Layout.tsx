"use client";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  // Hide footer on home page, show on all other pages
  const showFooter = router.pathname !== "/";

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Nikos Pountzas" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://pountzas-portfolio.vercel.app/faviconnikos.ico"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div
        className="min-h-screen bg-tertiary h-screen overflow-y-clip scrollbar-hide"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
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
            className="flex-1">
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
              }}>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Layout;
