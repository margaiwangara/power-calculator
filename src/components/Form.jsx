import { useState } from 'react';
import Field from './Field';
import { useRouter } from 'next/router';

function Form({ categories, item }) {
  const [values, setValues] = useState({
    name: item?.name || '',
    watts: item?.watts?.toFixed(1) || 0.0,
    volts: item?.volts?.toFixed(1) || 0.0,
    amps: item?.amps?.toFixed(1) || 0.0,
    category: item?.categoryId || categories?.[0]?.id,
    hoursPerDay: item?.hpd || 1,
    runsPerHour: item?.rph || 0,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const calculateWAV = () => {
    const { watts, volts, amps } = values;

    const w = parseFloat(watts);
    const a = parseFloat(amps);
    const v = parseFloat(volts);

    if (w === 0) {
      return {
        watts: a * v,
        amps: a,
        volts: v,
      };
    }

    if (a === 0) {
      return {
        watts: w,
        amps: w / v,
        volts: v,
      };
    }

    if (v === 0) {
      return {
        watts: w,
        amps: a,
        volts: w / a,
      };
    }

    return {
      watts: w,
      amps: a,
      volts: v,
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/items${item ? '/' + item.id : ''}`, {
        method: item ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          ...calculateWAV(),
          hpd: parseFloat(values.hoursPerDay),
          rph: parseFloat(values.runsPerHour),
          category: parseInt(values.category),
          runsPerHour: undefined,
          hoursPerDay: undefined,
        }),
      });
      const data = await response.json();
      if (data?.error) {
        setError(data?.error);
        setLoading(false);
        return;
      }

      setLoading(false);
      router.push('/dashboard');
    } catch (error) {
      setLoading(false);
      setError(error?.message || 'An error was encountered');
    }
  };
  return (
    <form method="POST" onSubmit={onSubmit}>
      {error && <div className="notification is-danger">{error}</div>}
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
        placeholder="Watts"
        label="Watts"
        value={values?.watts || 0.0}
        onChange={onChange}
        required={true}
        name="watts"
      />
      <Field
        type="number"
        placeholder="Amps"
        label="Amps"
        value={values?.amps || 0.0}
        onChange={onChange}
        required={true}
        name="amps"
      />
      <Field
        type="number"
        placeholder="Volts"
        label="Volts"
        value={values?.volts || 0.0}
        onChange={onChange}
        required={true}
        name="volts"
      />
      <Field
        type="number"
        placeholder="Hours Per Day"
        label="Hours Per Day"
        value={values?.hoursPerDay || 0.0}
        onChange={onChange}
        name="hoursPerDay"
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
                <option value={category?.id} key={category?.id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Field
        type="number"
        placeholder="Runs Per Hour in Seconds"
        label="Runs Per Hour in Seconds"
        value={values?.runsPerHour || 0}
        onChange={onChange}
        name="runsPerHour"
        hasDecimal={false}
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
  );
}

export default Form;
