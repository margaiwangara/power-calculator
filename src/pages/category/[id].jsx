import Link from 'next/link';
import HeadBoy from '../../components/HeadBoy';
import Field from '../../components/Field';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { shapeResponse } from '../../utils/calculatePower';

function Edit({ category }) {
  const [values, setValues] = useState({
    name: category.name || '',
    icon: category.icon || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/categories/${category?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
        }),
      });

      setLoading(false);
      router.push('/dashboard');
    } catch (error) {
      setError(error?.message || 'An error was encountered');
      setLoading(false);
    }
  };

  const onChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <main>
      <HeadBoy title="Edit Category" />
      <section className="container">
        <section className="columns mt-5 px-3">
          <section className="column is-offset-one-third is-one-third">
            <Link href="/dashboard">
              <a className="is-link">Back to Dashboard</a>
            </Link>
            <div className="mb-3" />
            <form method="POST" onSubmit={onSubmit}>
              {error && <div className="notification is-danger">{error}</div>}
              <Field
                type="text"
                name="name"
                placeholder="Category Name"
                value={values.name}
                onChange={onChange}
                required={true}
              />
              <Field
                type="text"
                name="icon"
                placeholder="Category Icon"
                value={values.icon}
                onChange={onChange}
              />
              <button
                className={`button is-primary is-fullwidth${
                  loading ? ' is-loading' : ''
                }`}
                type="submit"
              >
                Submit
              </button>
            </form>
          </section>
        </section>
      </section>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(params?.id),
    },
  });

  return {
    props: {
      category: { ...shapeResponse(category) },
    },
  };
}
export default Edit;
