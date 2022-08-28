import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Project Owl</title>
      </Head>
      <h1>
        Home page coming soon! For now, check out{' '}
        <Link href={'/create-review'}>/create-review</Link>.
      </h1>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default Index;
