import { useState, useEffect } from 'react';
import HeadBoy from '../components/HeadBoy';
import prisma from '../lib/prisma';
import Wrapper from '../components/Wrapper';
import { shapeResponse } from '../utils/calculatePower';

function Home({ appliances, categories }) {
  const [activeTab, setActiveTab] = useState(categories?.[0]?.id);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const [hoursPerDay, setHoursPerDay] = useState(1.0);
  const [items, setItems] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const populateSelected = (item) => {
    const findSelected = selectedItems.find((i) => i.id === item.id);

    if (findSelected) {
      return;
    }

    setSelectedItems([...selectedItems, item]);
  };

  const deleteItem = (id) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    let isMounted = true;

    setActiveItem(selectedItems?.[selectedItems?.length - 1] || {});

    return () => {
      isMounted = false;
    };
  }, [selectedItems]);

  useEffect(() => {
    setHoursPerDay(activeItem?.hpd || 1.0);
  }, [activeItem]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setItems(appliances);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const modifyHoursPerDay = (e) => {
    setHoursPerDay(parseFloat(e.target.value));
    setSelectedItems(
      selectedItems?.map((si) => {
        if (si?.id === activeItem?.id) {
          return {
            ...si,
            hpd: parseFloat(e.target.value),
          };
        }

        return si;
      }) || [],
    );
  };

  const searchItem = (keyword) => {
    if (!keyword) {
      setSearchWord('');
      setItems(appliances?.filter((a) => a.categoryId === activeTab));
      return;
    }

    setItems(
      items.filter(
        (i) => i?.name?.toLowerCase().indexOf(keyword.toLowerCase()) > -1,
      ),
    );
  };

  return (
    <main className="has-background-light" id="wrapper">
      <HeadBoy title="Home" />
      <section className="container py-5">
        <section className="item-section">
          <Wrapper title="Appliances" className="appliances">
            <form
              className="my-2"
              onSubmit={(e) => {
                e.preventDefault();
                searchItem(searchWord);
              }}
            >
              <div className="field">
                <div className="control is-flex">
                  {/* <input
                    type="text"
                    className="input"
                    value={searchWord}
                    onChange={(e) => {
                      setSearchWord(e.target.value);
                      searchItem(e.target.value);
                    }}
                  />
                  <button className="button is-primary">Search</button> */}
                </div>
              </div>
            </form>

            <section className="appliance-items">
              <div className="field mb-3">
                <label htmlFor="category" className="label">
                  Select Category:
                </label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      name="category"
                      id="category"
                      className="is-capitalized"
                      defaultValue={activeTab}
                      onChange={(e) => setActiveTab(parseInt(e.target.value))}
                    >
                      {categories?.map((c) => (
                        <option value={c?.id} key={c?.id}>
                          {c?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <section className="appliance-items-box">
                {items?.map(
                  (a) =>
                    a?.categoryId === activeTab && (
                      <button
                        className="item is-flex is-flex-direction-column"
                        key={a?.id}
                        onClick={() => populateSelected(a)}
                      >
                        <div className="image">
                          {a?.category?.icon && (
                            <img
                              src={a?.category?.icon}
                              alt="icon"
                              style={{
                                height: 50,
                                width: 50,
                                objectFit: 'cover',
                              }}
                            />
                          )}
                        </div>
                        <h6 className="is-size-7 is-capitalized">{a?.name}</h6>
                      </button>
                    ),
                )}
              </section>
            </section>
          </Wrapper>

          <section className="column is-two-quarters has-background-white p-4 playground">
            <div className="columns">
              <div className="column is-three-quarter">
                <h4 className="is-size-5 has-text-weight-semibold px-2 playground-title">
                  My Appliances
                </h4>
              </div>
              <div className="column is-one-quarter has-text-right">
                <button
                  className="button is-primary"
                  onClick={() => setSelectedItems([])}
                >
                  Clear
                </button>
              </div>
            </div>
            <section className="playground-box is-flex">
              {selectedItems?.map((i) => (
                <div
                  className="item is-flex is-flex-direction-column"
                  key={i?.id}
                >
                  <button
                    className="del has-background-danger has-text-white"
                    onClick={() => deleteItem(i?.id)}
                  >
                    x
                  </button>
                  <div className="image">
                    {i?.category?.icon && (
                      <img
                        src={i?.category?.icon}
                        alt="icon"
                        style={{
                          height: 50,
                          width: 50,
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </div>
                  <h6 className="is-size-7 is-capitalized">{i?.name}</h6>
                </div>
              ))}
            </section>
          </section>
          {Object.keys(activeItem).length > 0 && (
            <Wrapper title="Info" className="info">
              <div className="info-image">
                {activeItem?.category?.icon && (
                  <img
                    src={activeItem?.category?.icon}
                    alt="icon"
                    style={{
                      height: 50,
                      width: 50,
                      objectFit: 'cover',
                    }}
                  />
                )}
              </div>
              <h4 className="info-title p-2 has-background-black has-text-centered has-text-white">
                {activeItem?.name}
              </h4>
              <div className="specs-box has-background-light p-3">
                <h6 className="is-size-7 is-capitalized has-text-weight-semibold mb-3">
                  Specification
                </h6>
                <div className="columns is-vcentered">
                  <div className="column is-one-half">
                    <p className="is-size-7 has-text-weight-normal">Watts:</p>
                  </div>
                  <div className="column is-one-half">
                    <h5 className="is-size-7 has-text-white p-2 has-text-centered has-background-black has-text-weight-semibold">
                      {activeItem?.watts}
                    </h5>
                  </div>
                </div>
                <div className="columns is-vcentered">
                  <div className="column is-one-half">
                    <p className="is-size-7 has-text-weight-normal">Amps:</p>
                  </div>
                  <div className="column is-one-half">
                    <h5 className="is-size-7 has-text-white p-2 has-text-centered has-background-black has-text-weight-semibold">
                      {activeItem?.amps}
                    </h5>
                  </div>
                </div>
                <div className="columns is-vcentered">
                  <div className="column is-one-half">
                    <p className="is-size-7 has-text-weight-normal">Volts:</p>
                  </div>
                  <div className="column is-one-half">
                    <h5 className="is-size-7 has-text-white p-2 has-text-centered has-background-black has-text-weight-semibold">
                      {activeItem?.volts}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="specs-box has-background-light p-3">
                <div className="columns is-vcentered">
                  <div className="column is-one-half">
                    <p className="is-size-7 has-text-weight-normal">
                      Hours Per Day:
                    </p>
                  </div>
                  <div className="column is-one-half">
                    <input
                      type="number"
                      className="is-size-7 has-text-white p-2 has-text-centered has-background-black has-text-weight-semibold is-fullwidth"
                      name="hpd"
                      value={hoursPerDay}
                      onChange={modifyHoursPerDay}
                      step={0.1}
                      min={0}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        border: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="specs-box has-background-light p-3">
                <div className="is-flex is-align-items-center is-flex-wrap mb-2">
                  <p className="is-size-7 has-text-weight-normal mr-1">
                    Total Power Consumption
                  </p>
                  <p className="is-size-6 has-text-weight-medium has-text-primary has-text-right is-flex-grow-1">
                    {selectedItems
                      ?.reduce((acc, curr) => acc + curr?.volts * curr?.hpd, 0)
                      .toFixed(1)}{' '}
                    Wh
                  </p>
                </div>
                <div className="columns">
                  <div className="column">
                    <div className="table-container">
                      <table className="table is-bordered is-narrow is-fullwidth has-background-light">
                        <tbody>
                          {selectedItems?.map((si) => (
                            <tr key={si?.id}>
                              <td className="is-size-7">{si?.name}</td>
                              <td className="is-size-7">
                                {(si?.volts * si?.hpd).toFixed(1)} Wh
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Wrapper>
          )}
        </section>
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

export default Home;
