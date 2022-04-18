import { useState } from 'react';
import Field from './Field';
import { useRouter } from 'next/router';

function Form({ categories, item }) {
  const [values, setValues] = useState({
    name: item?.name || '',
    watts: item?.watts || 0.0,
    amps: item?.amps || 0.0,
    category: item?.category || categories?.[0],
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const onChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/items${item ? '/' + item.id : ''}`, {
        method: item ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          amps: parseFloat(values.amps),
          watts: parseFloat(values.watts),
        }),
      });
      const data = await response.json();
      if (data?.error) {
        setError(data?.error);
        return;
      }

      router.push('/dashboard');
    } catch (error) {
      alert(JSON.stringify(error));
      setError(error?.message);
    }
  };
  return (
    <form method="POST" onSubmit={onSubmit}>
      <Field
        type="text"
        placeholder="Title"
        label="Title"
        value={values?.name || ''}
        onChange={onChange}
        required={true}
        name="name"
      />
      <Field
        type="number"
        placeholder="Amps"
        label="Amps"
        value={values?.amps || ''}
        onChange={onChange}
        required={true}
        name="amps"
      />
      <Field
        type="number"
        placeholder="Watts"
        label="Watts"
        value={values?.watts || ''}
        onChange={onChange}
        required={true}
        name="watts"
      />
      <div className="field">
        <label className="label" id="category">
          Category
        </label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              name="category"
              id="category"
              className="is-capitalized"
              onChange={onChange}
              defaultValue={values?.category}
            >
              {categories?.map((category) => (
                <option value={category} key={category}>
                  {category?.split('_').join(' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button className="button is-primary is-fullwidth" type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;
