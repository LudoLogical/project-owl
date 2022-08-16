import type { NextPage } from 'next';
import Head from 'next/head';
import ReviewWizard from '../components/review-wizard/review-wizard';
import NavBar from '../components/nav-bar';

const CreateReview: NextPage = () => {
  return (
    <>
      <Head>
        <title>New Review | Project Owl</title>
      </Head>
      <div className={'flex flex-col flex-nowrap w-screen h-screen'}>
        <NavBar />
        <ReviewWizard />
      </div>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default CreateReview;
