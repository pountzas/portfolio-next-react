import Head from "next/head";
import HomeAnimations from "../components/animations/HomeAnimations";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Nikos Pountzas - Full-Stack Web Developer | React, Next.js, TypeScript
        </title>
        <meta
          name="description"
          content="Nikos Pountzas - Full-stack web developer specializing in React, Next.js, TypeScript, and modern web technologies. Based in Greece, creating exceptional digital experiences."
        />
        <meta
          name="keywords"
          content="Nikos Pountzas, full-stack developer, React, Next.js, TypeScript, JavaScript, web development, portfolio"
        />
        <meta property="og:title" content="Nikos Pountzas - Full-Stack Web Developer" />
        <meta
          property="og:description"
          content="Full-stack web developer specializing in React, Next.js, and modern web technologies. Creating exceptional digital experiences."
        />
        <meta property="og:url" content="https://pountzas-portfolio.vercel.app" />
        <meta name="twitter:title" content="Nikos Pountzas - Full-Stack Web Developer" />
        <meta
          name="twitter:description"
          content="Full-stack web developer specializing in React, Next.js, and modern web technologies."
        />
        <link rel="icon" href="/faviconnikos.ico" />
        <link rel="canonical" href="https://pountzas-portfolio.vercel.app" />
      </Head>

      <HomeAnimations />
    </>
  );
}
