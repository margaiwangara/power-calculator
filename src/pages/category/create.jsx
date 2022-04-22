import Form from '../../components/Form';
import Link from 'next/link';
import HeadBoy from '../../components/HeadBoy';
import Field from '../../components/Field';
import { useState } from 'react';
import { useRouter } from 'next/router';

function Create() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (data?.error) {
        setError(data.error);
      }
      setLoading(false);
      router.push('/dashboard');
    } catch (error) {
      setError(error?.message || 'An error was encountered');
      setLoading(false);
    }
  };

  return (
    <main>
      <HeadBoy title="Create Category" />
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
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
                name="name"
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

export default Create;
