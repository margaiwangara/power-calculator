import prisma from '../../lib/prisma';
import Link from 'next/link';
import HeadBoy from '../../components/HeadBoy';
import Form from '../../components/Form';
import { shapeResponse } from '../../utils/calculatePower';

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
            <Form categories={categories} />
          </section>
        </section>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const results = await prisma.category.findMany();

  const categories = results.map((category) => shapeResponse(category));

  return {
    props: {
      categories,
    },
  };
}
export default Create;
