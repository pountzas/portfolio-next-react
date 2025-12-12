import Header from '../components/Header';
import { motion } from 'framer-motion';
import { staggerContainer, flipFromTop, flipFromBottom, flipFromLeft, flipFromRight, createStaggeredFlip, flipOut } from '../components/animations/pageAnimations';
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <motion.div
        className='max-w-4xl mx-auto px-4 py-8'
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
            Get In Touch
          </motion.h1>
          <motion.p
            className='text-lg text-textTertiary max-w-2xl mx-auto'
            variants={createStaggeredFlip(0.3, 0.1)(1)}
          >
            Have a project in mind or want to collaborate? I{"'"}d love to hear from you.
            Let{"'"}s create something amazing together.
          </motion.p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8'>
          <motion.div
            className='space-y-8'
            variants={flipFromLeft}
          >
            <motion.div
              variants={createStaggeredFlip(0.4, 0.1)(0)}
            >
              <h2 className='text-2xl font-semibold text-textPrimary mb-6'>Let{"'"}s Connect</h2>
              <div className='space-y-4'>
                <motion.div
                  className='flex items-center space-x-3'
                  variants={createStaggeredFlip(0.5, 0.1)(1)}
                >
                  <div className='w-10 h-10 bg-quaternary rounded-full flex items-center justify-center border border-borderSecondary'>
                    <span className='text-textPrimary'>📧</span>
                  </div>
                  <div>
                    <p className='text-textPrimary font-medium'>Email</p>
                    <p className='text-textTertiary'>nikos@pountzas.gr</p>
                  </div>
                </motion.div>

                <motion.div
                  className='flex items-center space-x-3'
                  variants={createStaggeredFlip(0.6, 0.1)(2)}
                >
                  <div className='w-10 h-10 bg-quaternary rounded-full flex items-center justify-center border border-borderSecondary'>
                    <span className='text-textPrimary'>📍</span>
                  </div>
                  <div>
                    <p className='text-textPrimary font-medium'>Location</p>
                    <p className='text-textTertiary'>Greece</p>
                  </div>
                </motion.div>

                <motion.div
                  className='flex items-center space-x-3'
                  variants={createStaggeredFlip(0.7, 0.1)(3)}
                >
                  <div className='w-10 h-10 bg-quaternary rounded-full flex items-center justify-center border border-borderSecondary'>
                    <span className='text-textPrimary'>💼</span>
                  </div>
                  <div>
                    <p className='text-textPrimary font-medium'>Availability</p>
                    <p className='text-textTertiary'>Open to new opportunities</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className='bg-quaternary p-6 rounded-lg border border-borderSecondary'
              variants={createStaggeredFlip(0.8, 0.1)(4)}
            >
              <h3 className='text-lg font-semibold text-textPrimary mb-3'>Quick Response</h3>
              <p className='text-textTertiary text-sm'>
                I typically respond to messages within 24 hours. For urgent inquiries,
                feel free to follow up or connect via social media.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className='bg-quaternary p-8 rounded-lg border border-borderSecondary'
            variants={flipFromRight}
          >
            <motion.form
              onSubmit={handleSubmit}
              className='space-y-6'
              variants={staggerContainer}
            >
              <motion.div
                variants={createStaggeredFlip(0.5, 0.1)(0)}
              >
                <label htmlFor='name' className='block text-textPrimary font-medium mb-2'>
                  Name
                </label>
                <motion.input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-4 py-3 bg-tertiary border border-borderSecondary rounded-lg text-textPrimary placeholder-textTertiary focus:outline-none focus:border-textPrimary transition-colors'
                  placeholder='Your name'
                  required
                  variants={createStaggeredFlip(0.6, 0.1)(1)}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                variants={createStaggeredFlip(0.6, 0.1)(2)}
              >
                <label htmlFor='email' className='block text-textPrimary font-medium mb-2'>
                  Email
                </label>
                <motion.input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-3 bg-tertiary border border-borderSecondary rounded-lg text-textPrimary placeholder-textTertiary focus:outline-none focus:border-textPrimary transition-colors'
                  placeholder='your.email@example.com'
                  required
                  variants={createStaggeredFlip(0.7, 0.1)(3)}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                variants={createStaggeredFlip(0.7, 0.1)(4)}
              >
                <label htmlFor='subject' className='block text-textPrimary font-medium mb-2'>
                  Subject
                </label>
                <motion.input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full px-4 py-3 bg-tertiary border border-borderSecondary rounded-lg text-textPrimary placeholder-textTertiary focus:outline-none focus:border-textPrimary transition-colors'
                  placeholder='Project inquiry'
                  required
                  variants={createStaggeredFlip(0.8, 0.1)(5)}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                variants={createStaggeredFlip(0.8, 0.1)(6)}
              >
                <label htmlFor='message' className='block text-textPrimary font-medium mb-2'>
                  Message
                </label>
                <motion.textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className='w-full px-4 py-3 bg-tertiary border border-borderSecondary rounded-lg text-textPrimary placeholder-textTertiary focus:outline-none focus:border-textPrimary transition-colors resize-none'
                  placeholder='Tell me about your project...'
                  required
                  variants={createStaggeredFlip(0.9, 0.1)(7)}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.button
                type='submit'
                className='w-full bg-textPrimary text-primary py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors'
                variants={createStaggeredFlip(1.0, 0.1)(8)}
                whileHover={{ scale: 1.02, rotateY: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
  );
}

export default Contact;
