import '../styles/globals.css'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [showFooter, setShowFooter] = useState(true)

  useEffect(() => {
    // Hide footer on home page, show on all other pages
    setShowFooter(router.pathname !== '/')
  }, [router.pathname])

  return (
    <>
      <Component {...pageProps} />
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
    </>
  )
}

export default MyApp
