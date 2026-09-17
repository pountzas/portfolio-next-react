"use client";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  // Hide footer on home page, show on all other pages
  const showFooter = router.pathname !== "/";
  const pageTransitionDuration = shouldReduceMotion ? 0 : 0.3;
  const footerTransitionDuration = shouldReduceMotion ? 0 : 0.4;

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
        className="min-h-screen bg-tertiary"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-textPrimary focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white">
          Skip to main content
        </a>
        <Header />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            id="main-content"
            tabIndex={-1}
            key={router.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: pageTransitionDuration,
              ease: "easeInOut",
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
                duration: footerTransitionDuration,
                ease: "easeInOut",
              }}>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
