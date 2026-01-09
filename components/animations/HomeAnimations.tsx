"use client";

import { motion } from "framer-motion";
import {
  staggerContainer,
  flipFromTop,
  flipFromBottom,
  createStaggeredFlip
} from "./pageAnimations";
import Socials from "../Socials";
import Link from "next/link";

export default function HomeAnimations() {
  return (
    <motion.div
      className="max-w-xs grid-cols-1 py-4 mx-auto mt-24 space-y-5 border rounded-lg border-borderSecondary md:pt-8 bg-quaternary sm:max-w-md md:max-w-2xl xl:max-w-6xl"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit">
      <motion.div
        className="px-5 mb-8 space-y-10 text-lg font-semibold text-center text-textTertiary md:text-xl"
        variants={flipFromTop}>
        <motion.h1 className="text-center" variants={createStaggeredFlip(0.2, 0.1)(0)}>
          Hello I am Nikos.
        </motion.h1>
        <motion.h2 variants={createStaggeredFlip(0.3, 0.1)(1)}>
          I am a full-stack web developer
        </motion.h2>
        <motion.p variants={createStaggeredFlip(0.4, 0.1)(2)}>
          I am from Greece and I have studied Graphic Design and Web Development.
        </motion.p>
        <motion.p className="" variants={createStaggeredFlip(0.5, 0.1)(3)}>
          I specialize in JavaScript, React and NEXT.js
        </motion.p>
      </motion.div>
      <motion.div variants={flipFromBottom}>
        <motion.h3
          className="text-center text-textTertiary"
          variants={createStaggeredFlip(0.6, 0.1)(0)}>
          My Social Network
        </motion.h3>
        <motion.div
          className="flex items-center justify-center py-2 space-x-3 md:py-5"
          variants={staggerContainer}>
          {Socials.map((social, index) => (
            <motion.div
              className="pb-3 text-textTertiary hover:text-blue-50"
              key={social.id}
              variants={createStaggeredFlip(0.7, 0.1)(index)}
              whileHover={{ scale: 1.1, rotateY: 10 }}
              whileTap={{ scale: 0.95 }}>
              <Link
                target="_blank"
                href={social.path}
                rel="noopener noreferrer"
                aria-label={`Visit my ${social.name} profile`}
                className="text-3xl md:text-4xl">
                {social.icon}
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="flex items-center justify-center pb-8"
          variants={flipFromBottom}>
          <Link
            target="_blank"
            href="https://drive.google.com/file/d/1SycAJg1BXhDatjAuq1idZL9EOnV3tbSW/view?usp=sharing"
            rel="noopener noreferrer">
            <motion.div
              className="p-2 font-semibold text-center border-2 rounded-lg cursor-pointer text-textTertiary border-borderSecondary bg-secondary hover:text-blue-50"
              variants={createStaggeredFlip(1.0, 0.1)(0)}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.95 }}>
              My CV
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
