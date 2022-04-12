import {
  indexedTools,
  indexedAppliances,
  indexPumpAndAirConditioners,
} from '../utils/data';
import { APPLIANCE, TOOL, PACS } from '../utils/types';
import { useState, useEffect, useCallback } from 'react';

const DEFAULT_INFO = {
  power: 0,
  current: 0,
  voltage: 0,
  amount: 1,
  hoursPerDay: 1,
  daysOffGrid: 1,
};
function Home() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [chosenItem, setChosenItem] = useState({});
  const [value, setValue] = useState('');
  const [info, setInfo] = useState(DEFAULT_INFO);
  const [calculation, setCalculation] = useState({
    total: 0,
    single: 0,
  });

  const populateItems = () =>
    setItems(
      [...indexedAppliances.map((appl) => ({ ...appl }))],
      ...indexedTools.map((tls) => ({ ...tls })),
      ...indexPumpAndAirConditioners.map((pac) => ({ ...pac })),
    );

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      populateItems();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const populatePlayground = (e, id) => {
    const item = items.find((it) => it?.id === id);

    // check if id exists in selected items
    const exists = selectedItems.some((si) => si?.id === id);

    if (exists) return;

    setSelectedItems([...selectedItems, item]);
    setChosenItem(item);
  };

  const itemTypeHandler = (itemParam) =>
    itemParam?.type === APPLIANCE
      ? itemParam?.household_appliances
      : itemParam?.type === TOOL
      ? itemParam?.common_tools
      : itemParam?.type === PACS
      ? itemParam?.pumps_and_air_conditioners
      : '';

  const deleteSelectedItem = (id) => {
    setSelectedItems(selectedItems.filter((s) => s?.id !== id));
  };

  const searchItem = (keyword) => {
    if (!keyword) {
      populateItems();
      return;
    }

    setItems(
      items.filter(
        (i) =>
          itemTypeHandler(i).toLowerCase().indexOf(keyword.toLowerCase()) > -1,
      ),
    );
  };

  const populateInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let isMounted = true;

    const { power, hoursPerDay, amount, current, voltage } = info;

    setInfo({ ...info, power: current * voltage });

    setCalculation({ ...info, total: power * hoursPerDay * amount });
    // setChosenItem({ ...chosenItem, totalPower: power * hoursPerDay * amount });

    return () => {
      isMounted = false;
    };
  }, [
    info?.power,
    info?.hoursPerDay,
    info?.amount,
    info?.current,
    info?.voltage,
  ]);

  return (
    <main id="wrapper">
      <section className="box appliances">
        <h4 className="box-title">Appliances</h4>
        <div className="input-box">
          <input
            type="text"
            className="input"
            onChange={(e) => {
              setValue(e.target.value);
              searchItem(e.target.value);
            }}
            value={value}
          />
          <button className="btn btn-primary" onClick={() => searchItem(value)}>
            Search
          </button>
        </div>
        <div className="appliances-container">
          {items.map((item, index) => (
            <button
              className="appliance-container"
              key={item.id}
              onClick={(e) => populatePlayground(e, item.id)}
            >
              <div className="appliance"></div>
              <h5 className="text-sm">{itemTypeHandler(item)}</h5>
            </button>
          ))}
        </div>
      </section>
      <section className="box playground">
        <section className="box-title-container">
          <h4 className="box-title">My Appliances</h4>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setSelectedItems([])}
          >
            Clear
          </button>
        </section>
        <div className="appliances-container">
          {selectedItems.map((selected) => (
            <button
              className="appliance-container"
              type="button"
              key={selected?.id}
            >
              <div className="appliance">
                <span
                  className="del-btn"
                  onClick={() => deleteSelectedItem(selected?.id)}
                >
                  &times;
                </span>
              </div>
              <h5 className="text-sm">{itemTypeHandler(selected)}</h5>
            </button>
          ))}
        </div>
      </section>
      {Object.keys(chosenItem).length ? (
        <section className="box info">
          <h4 className="box-title">Info</h4>
          <section className="info-inner">
            <div className="appliance"></div>
            <div className="appliance-badge">{itemTypeHandler(chosenItem)}</div>
            <div className="specs-box">
              <h6 className="title">Specification</h6>
              <div className="specs">
                <span>Power:</span>
                <input
                  type="number"
                  className="specs-value"
                  value={info.power}
                  onChange={populateInfo}
                  name="power"
                />
                {/* <span className="specs-value"> 1515 </span> */}
                <span>W</span>
              </div>
              <div className="specs">
                <span>Current:</span>
                <input
                  type="number"
                  className="specs-value"
                  value={info.current}
                  onChange={populateInfo}
                  name="current"
                />
                {/* <span className="specs-value"> 13.75 </span> */}
                <span>A</span>
              </div>
              <div className="specs">
                <span>Voltage:</span>
                <input
                  type="number"
                  className="specs-value"
                  value={info.voltage}
                  onChange={populateInfo}
                  name="voltage"
                />
                {/* <span className="specs-value"> 110 </span> */}
                <span>V</span>
              </div>
            </div>
            <div className="specs-box">
              <div className="specs">
                <span>Amount:</span>
                <input
                  type="number"
                  className="specs-value"
                  value={info.amount}
                  onChange={populateInfo}
                  name="amount"
                />
                {/* <span className="specs-value">4</span> */}
              </div>
            </div>
            <div className="specs-box">
              <div className="specs">
                <span>Hours Per Day:</span>
                <input
                  type="number"
                  className="specs-value"
                  value={info.hoursPerDay}
                  onChange={populateInfo}
                  name="hoursPerDay"
                />
                {/* <span className="specs-value">1</span> */}
              </div>
            </div>
            <div className="specs-box">
              <div className="specs">
                <span>Days Of Off-Grid:</span>
                <input
                  type="number"
                  className="specs-value"
                  value={info.daysOffGrid}
                  onChange={populateInfo}
                  name="daysOffGrid"
                />
                {/* <span className="specs-value">1</span> */}
              </div>
              <div className="specs total-specs">
                <span>Total Power Consumption:</span>
                <span className="total">{calculation?.total} Wh</span>
              </div>
              <div className="specs">
                <ul className="list-of-items">
                  {selectedItems?.map((s) => (
                    <li key={s.id}>
                      <span>{itemTypeHandler(s)} - </span>
                      <span>3000 Wh</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </section>
      ) : (
        <></>
      )}
    </main>
  );
}

export default Home;
