import Form from '../../components/Form';
import prisma from '../../lib/prisma';
import Link from 'next/link';
import HeadBoy from '../../components/HeadBoy';
import { shapeResponse } from '../../utils/calculatePower';

function Edit({ item, categories }) {
  return (
    <main>
      <HeadBoy title="Edit" />
      <section className="container">
        <section className="columns mt-5 px-3">
          <section className="column is-offset-one-third is-one-third">
            <Link href="/dashboard">
              <a className="is-link">Back to Dashboard</a>
            </Link>
            <div className="mb-3" />
            <Form categories={categories} item={item} />
          </section>
        </section>
      </section>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  // grouped categories
  const categoryResults = await prisma.category.findMany();
  const itemResults = await prisma.appliance.findUnique({
    where: {
      id: parseInt(params?.id),
    },
  });

  const categories = categoryResults.map((category) => shapeResponse(category));
  const item = shapeResponse(itemResults);

  return {
    props: {
      categories,
      item,
    },
  };
}
export default Edit;
