import Form from '../../components/Form';
import prisma from '../../lib/prisma';
import Link from 'next/link';
import HeadBoy from '../../components/HeadBoy';

function Create({ categories }) {
  return (
    <main>
      <HeadBoy title="Create" />
      <section className="container">
        <section className="columns mt-5 px-3">
          <section className="column is-offset-one-third is-one-third">
            <Link href="/dashboard">
              <a className="is-link">Back to Dashboard</a>
            </Link>
            <div className="mb-3" />
            <Form categories={categories} item={null} />
          </section>
        </section>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  // grouped categories
  const results = await prisma.appliance.groupBy({
    by: ['category'],
  });

  const categories = results.map((result) => result?.category);

  return {
    props: {
      categories,
    },
  };
}
export default Create;
