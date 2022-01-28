import Head from 'next/head';
import Header from '../components/Header';
// import Image from 'next/image';

export default function Home() {
  return (
    <div className='bg-gray-500 min-h-screen'>
      <Head>
        <title>Pountzas</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <h1>Start</h1>
    </div>
  );
}
