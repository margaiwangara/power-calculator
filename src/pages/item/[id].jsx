import Form from '../../components/Form';
import prisma from '../../lib/prisma';
import Link from 'next/link';
import HeadBoy from '../../components/HeadBoy';

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
  const results = await prisma.appliance.groupBy({
    by: ['category'],
  });
  const item = await prisma.appliance.findUnique({
    where: {
      id: parseInt(params?.id),
    },
  });

  const categories = results.map((result) => result?.category);

  const updatedItem = {
    ...item,
    createdAt: new Date(item?.created_at).toLocaleDateString(),
    updatedAt: new Date(item?.updated_at).toLocaleDateString(),
  };

  return {
    props: {
      categories,
      item: updatedItem,
    },
  };
}
export default Edit;
