import {
  indexedTools,
  indexedAppliances,
  indexPumpAndAirConditioners,
} from '../utils/data';
import { APPLIANCE, TOOL, PACS } from '../utils/types';
import { useState, useEffect } from 'react';
import styles from '../css/Home.module.css';

const DEFAULT_INFO = {
  power: 0,
  current: 0,
  voltage: 0,
  amount: 1,
  hoursPerDay: 0.5,
  daysOffGrid: 1,
};
function Home() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [chosenItem, setChosenItem] = useState({});
  const [value, setValue] = useState('');
  const [active, setActive] = useState(APPLIANCE);
  const [info, setInfo] = useState(DEFAULT_INFO);
  const [calculation, setCalculation] = useState({
    total: 0,
    single: 0,
  });

  const populateItems = () =>
    setItems([
      ...indexedAppliances.map((appl) => ({ ...appl, info })),
      ...indexedTools.map((tls) => ({ ...tls, info })),
      ...indexPumpAndAirConditioners.map((pac) => ({ ...pac, info })),
    ]);

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

    const modifiedArray = selectedItems?.map((si, index, arr) => {
      if (index === arr?.length - 1) {
        return {
          ...si,
          info,
        };
      }

      return si;
    });

    setInfo(DEFAULT_INFO);
    setSelectedItems([...modifiedArray, item]);
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
    setInfo({ ...info, [e.target.name]: parseFloat(e.target.value) });

    if (e.target.name === 'current') {
      setInfo({
        ...info,
        current: parseFloat(e.target.value),
        power: e.target.value * info?.voltage,
      });
    } else if (e.target.name === 'voltage') {
      setInfo({
        ...info,
        voltage: parseFloat(e.target.value),
        power: e.target.value * info?.current,
      });
    }
  };

  useEffect(() => {
    let isMounted = true;

    const { power, hoursPerDay, amount, current, voltage } = info;

    setCalculation({ ...info, total: power * hoursPerDay * amount });
    // setChosenItem({ ...chosenItem, totalPower: power * hoursPerDay * amount });

    return () => {
      isMounted = false;
    };
  }, [info?.power, info?.hoursPerDay, info?.amount]);

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
        <div className={styles.selectContainer}>
          <label htmlFor="category">Select a category:</label>
          <select
            name="category"
            id="category"
            onChange={(e) => setActive(e.target.value)}
          >
            <option value={APPLIANCE}>Appliances</option>
            <option value={TOOL}>Tools</option>
            <option value={PACS}>Pumps and Air Conditioners</option>
          </select>
        </div>
        <div className="appliances-container">
          {items.map(
            (item, index) =>
              item?.type === active && (
                <button
                  className="appliance-container"
                  key={item.id}
                  onClick={(e) => populatePlayground(e, item.id)}
                >
                  <div className="appliance"></div>
                  <h5 className="text-sm">{itemTypeHandler(item)}</h5>
                </button>
              ),
          )}
        </div>
      </section>
      <section className="box playground">
        <section className="box-title-container">
          <h4 className="box-title">My Appliances</h4>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              setSelectedItems([]);
              setChosenItem({});
            }}
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
                <span>Watts:</span>
                <span className="specs-value"> 1515 </span>
                <span>W</span>
              </div>
              <div className="specs">
                <span>Amps:</span>
                <span className="specs-value"> 13.75 </span>
                <span>A</span>
              </div>
              <div className="specs">
                <span>Volts:</span>
                <span className="specs-value"> 110 </span>
                <span>V</span>
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
                  step={0.1}
                  min={0}
                />
              </div>
            </div>
            <div className="specs-box">
              <div className="specs total-specs">
                <span>Total Power Consumption:</span>
                <span className="total">
                  {selectedItems?.reduce((acc, curr) => {
                    const { info } = curr;
                    acc += info?.power * info?.hoursPerDay * info?.amount;
                    return acc;
                  }, 0)}{' '}
                  Wh
                </span>
              </div>
              <div className="specs">
                <ul className="list-of-items">
                  {selectedItems?.map((s) => {
                    const { info } = s;
                    return (
                      <li key={s.id}>
                        <span>{itemTypeHandler(s)} - </span>
                        <span>
                          {info?.power * info?.hoursPerDay * info?.amount} Wh
                        </span>
                      </li>
                    );
                  })}
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
