import Timeline from '@/components/Timeline';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>SNS</title>
      </Head>

      <div>
        <Timeline />
      </div>
    </>
  );
}
