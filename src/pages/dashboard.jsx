import HeadBoy from '../components/HeadBoy';
import prisma from '../lib/prisma';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Dashboard({ appliances }) {
  const router = useRouter();

  const deleteItem = async (id) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this item?',
    );

    if (!shouldDelete) {
      return;
    }
    try {
      await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      router.replace('/dashboard');
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <main>
      <HeadBoy title="Dashboard" />
      <section className="hero is-primary">
        <section className="hero-body">
          <h3 className="title">Power Calculator Dashboard</h3>
          <p className="subtitle">
            View, Add, Edit and Delete Appliances, Tools and Pumps and Air
            Conditioners
          </p>
          <Link href="/">
            <a className="button is-link mr-2">Go to App</a>
          </Link>
          <Link href="/item/create">
            <a className="button is-link">Add Item</a>
          </Link>
        </section>
      </section>
      <section className="container py-5">
        <div className="table-container">
          <table className="table is-bordered is-narrow is-fullwidth">
            <thead>
              <tr>
                <th>
                  <abbr title="Item Number">#</abbr>
                </th>
                <th>Title</th>
                <th>Watts</th>
                <th>Amps</th>
                <th>Volts</th>
                <th>Category</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {appliances.map((appliance) => (
                <tr key={appliance.id}>
                  <td>{appliance?.id}</td>
                  <td>{appliance?.name}</td>
                  <td>{appliance?.watts}</td>
                  <td>{appliance?.amps}</td>
                  <td>{appliance?.volts}</td>
                  <td className="is-capitalized">
                    {appliance?.category?.split('_').join(' ')}
                  </td>
                  <td>
                    <Link href={`/item/${appliance.id}`}>
                      <a className="button is-small is-primary mr-2">Edit</a>
                    </Link>
                    <button
                      className="button is-small is-danger"
                      onClick={() => deleteItem(appliance?.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const result = await prisma.appliance.findMany();

  const appliances = result.map((appliance) => ({
    ...appliance,
    createdAt: new Date(appliance?.created_at).toLocaleDateString(),
    updatedAt: new Date(appliance?.updated_at).toLocaleDateString(),
    volts: appliance?.amps * appliance?.watts,
  }));

  return {
    props: {
      appliances,
    },
  };
}

export default Dashboard;
