import HeadBoy from '../components/HeadBoy';
import prisma from '../lib/prisma';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { shapeResponse } from '../utils/calculatePower';

const ITEMS = 'items';
const CATEGORIES = 'categories';

function Dashboard({ appliances, categories }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(ITEMS);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const deleteItem = async (id, name, isItem) => {
    setLoading(true);
    const shouldDelete = window.confirm(
      `Are you sure you want to delete: ${name}?`,
    );

    if (!shouldDelete) {
      setLoading(false);
      return;
    }
    try {
      await fetch(`/api/${isItem ? 'items' : 'categories'}/${id}`, {
        method: 'DELETE',
      });
      setLoading(false);
      router.replace('/dashboard');
    } catch (error) {
      setLoading(false);
      setError(error?.message || 'An error was encountered');
    }
  };

  const changeTab = (e, tab) => {
    e.preventDefault();

    setActiveTab(tab);
  };

  return (
    <main>
      {loading && (
        <div
          className="is-flex is-justify-content-center is-align-items-center has-background-light"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100%',
            zIndex: 1000,
          }}
        >
          <h3 className="has-size-3 has-text-color-primary">Deleting...</h3>
        </div>
      )}
      <HeadBoy title="Dashboard" />
      <section className="hero is-primary">
        <section className="hero-body">
          <h3 className="title">Power Calculator Dashboard</h3>
          <p className="subtitle">
            View, Add, Edit and Delete Appliances, Tools and Pumps and Air
            Conditioners
          </p>
          <Link href="/">
            <a className="button is-link">Go to App</a>
          </Link>
          <Link href="/item/create">
            <a className="button is-link mx-2">Add Item</a>
          </Link>
          <Link href="/category/create">
            <a className="button is-link">Add Category</a>
          </Link>
        </section>
      </section>
      <section className="container py-5">
        <div className="tabs is-boxed">
          <ul>
            <li className={activeTab === ITEMS ? 'is-active' : ''}>
              <a href="#" onClick={(e) => changeTab(e, ITEMS)}>
                <span>Items</span>
              </a>
            </li>
            <li className={activeTab === CATEGORIES ? 'is-active' : ''}>
              <a href="#" onClick={(e) => changeTab(e, CATEGORIES)}>
                <span>Categories</span>
              </a>
            </li>
          </ul>
        </div>
        {error && <div className="notification is-danger">{error}</div>}
        {activeTab === ITEMS && (
          <div className="table-container">
            <table className="table is-bordered is-narrow is-fullwidth">
              <thead>
                <tr>
                  <th>
                    <abbr title="Item ID">#</abbr>
                  </th>
                  <th>Title</th>
                  <th>Watts</th>
                  <th>Amps</th>
                  <th>Volts</th>
                  <th>Hours Per Day</th>
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
                    <td>{appliance?.hpd}</td>
                    <td className="is-capitalized">
                      {appliance?.category?.name}
                    </td>
                    <td>
                      <Link href={`/item/${appliance.id}`}>
                        <a className="button is-small is-primary mr-2">Edit</a>
                      </Link>
                      <button
                        className="button is-small is-danger"
                        onClick={() =>
                          deleteItem(appliance?.id, appliance?.name, true)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === CATEGORIES && (
          <div className="table-container">
            <table className="table is-narrow is-bordered is-fullwidth">
              <thead>
                <tr>
                  <th>
                    <abbr title="Category ID">#</abbr>
                  </th>
                  <th>Name</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <tr key={c?.id}>
                    <td>{c?.id}</td>
                    <td>{c?.name}</td>
                    <td>
                      <Link href={`/category/${c?.id}`}>
                        <a className="button is-small is-primary mr-2">Edit</a>
                      </Link>
                      <button
                        className="button is-small is-danger"
                        onClick={() => deleteItem(c?.id, c?.name, false)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const applianceResults = await prisma.appliance.findMany({
    include: {
      category: true,
    },
  });
  const categoryResults = await prisma.category.findMany();

  const appliances = applianceResults.map((appliance) =>
    shapeResponse({
      ...appliance,
      category: {
        ...shapeResponse(appliance.category),
      },
    }),
  );
  const categories = categoryResults.map((category) => shapeResponse(category));

  return {
    props: {
      appliances,
      categories,
    },
  };
}

export default Dashboard;
