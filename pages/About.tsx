import Header from '../components/Header';
import { motion } from 'framer-motion';
import { staggerContainer, flipFromTop, flipFromBottom, flipFromLeft, flipFromRight, createStaggeredFlip, flipOut } from '../components/animations/pageAnimations';
import Link from 'next/link';

function About() {
  return (
    <motion.div
        className='max-w-4xl mx-auto px-4 py-8'
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          className='text-center mb-12'
          variants={flipFromTop}
        >
          <motion.h1
            className='text-4xl md:text-5xl font-bold text-textPrimary mb-4'
            variants={createStaggeredFlip(0.2, 0.1)(0)}
          >
            About Me
          </motion.h1>
          <motion.p
            className='text-lg text-textTertiary max-w-2xl mx-auto'
            variants={createStaggeredFlip(0.3, 0.1)(1)}
          >
            Passionate full-stack developer with a background in graphic design, creating beautiful and functional digital experiences.
          </motion.p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8 mb-12'>
          <motion.div
            className='bg-quaternary p-6 rounded-lg border border-borderSecondary'
            variants={flipFromLeft}
          >
            <motion.h2
              className='text-2xl font-semibold text-textPrimary mb-4'
              variants={createStaggeredFlip(0.4, 0.1)(0)}
            >
              Background
            </motion.h2>
            <motion.p
              className='text-textTertiary mb-3'
              variants={createStaggeredFlip(0.5, 0.1)(1)}
            >
              I{"'"}m Nikos Pountzas, a full-stack web developer from Greece with a unique blend of technical expertise and creative design skills.
            </motion.p>
            <motion.p
              className='text-textTertiary mb-3'
              variants={createStaggeredFlip(0.6, 0.1)(2)}
            >
              My journey began with graphic design studies, which gave me a strong foundation in visual communication and user experience principles.
            </motion.p>
            <motion.p
              className='text-textTertiary'
              variants={createStaggeredFlip(0.7, 0.1)(3)}
            >
              Today, I combine this creative background with modern web technologies to build engaging, user-centered applications.
            </motion.p>
          </motion.div>

          <motion.div
            className='bg-quaternary p-6 rounded-lg border border-borderSecondary'
            variants={flipFromRight}
          >
            <motion.h2
              className='text-2xl font-semibold text-textPrimary mb-4'
              variants={createStaggeredFlip(0.5, 0.1)(0)}
            >
              Expertise
            </motion.h2>
            <motion.div
              className='space-y-3'
              variants={staggerContainer}
            >
              <motion.div
                className='flex items-center'
                variants={createStaggeredFlip(0.6, 0.1)(1)}
              >
                <div className='w-2 h-2 bg-textPrimary rounded-full mr-3'></div>
                <span className='text-textTertiary'>JavaScript & TypeScript development</span>
              </motion.div>
              <motion.div
                className='flex items-center'
                variants={createStaggeredFlip(0.7, 0.1)(2)}
              >
                <div className='w-2 h-2 bg-textPrimary rounded-full mr-3'></div>
                <span className='text-textTertiary'>React & Next.js applications</span>
              </motion.div>
              <motion.div
                className='flex items-center'
                variants={createStaggeredFlip(0.8, 0.1)(3)}
              >
                <div className='w-2 h-2 bg-textPrimary rounded-full mr-3'></div>
                <span className='text-textTertiary'>Full-stack web development</span>
              </motion.div>
              <motion.div
                className='flex items-center'
                variants={createStaggeredFlip(0.9, 0.1)(4)}
              >
                <div className='w-2 h-2 bg-textPrimary rounded-full mr-3'></div>
                <span className='text-textTertiary'>UI/UX design & responsive layouts</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className='text-center bg-quaternary p-8 rounded-lg border border-borderSecondary'
          variants={flipFromBottom}
        >
          <motion.h2
            className='text-2xl font-semibold text-textPrimary mb-4'
            variants={createStaggeredFlip(1.0, 0.1)(0)}
          >
            Let{"'"}s Work Together
          </motion.h2>
          <motion.p
            className='text-textTertiary mb-6 max-w-2xl mx-auto'
            variants={createStaggeredFlip(1.1, 0.1)(1)}
          >
            I{"'"}m always excited to take on new challenges and collaborate on innovative projects.
            Whether you need a modern web application, a responsive website, or technical consultation,
            I{"'"}d love to hear about your ideas.
          </motion.p>
          <motion.div
            variants={createStaggeredFlip(1.2, 0.1)(2)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href='/Contact'
              className='inline-block bg-textPrimary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors'
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
  );
}

export default About;
