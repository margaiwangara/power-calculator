import Head from 'next/head';

function HeadBoy({ title }) {
  return (
    <Head>
      <title>
        Power Calculator |{' '}
        {title || 'Find out how much power you need to run your house'}
      </title>
    </Head>
  );
}

export default HeadBoy;
