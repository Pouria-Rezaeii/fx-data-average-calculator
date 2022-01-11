import React from 'react';
import {
  getFixed,
  generateAllPrices,
  getAverageMove,
  getHour,
} from './services/utils';
import { data as initialData } from './services/data';
import { Prices, FullHistory, CurrencyCode } from './services/types';
import { makeStyles } from '@material-ui/styles';
import { currencyCodes } from './services/constants';
import LineChart from './components/LineChart';
import Tables from './components/Tables';
import Checkbox from './components/Checkbox';
import clsx from 'clsx';

export default function App() {
  const [currencyCodeState, setCurrencyCodeState] =
    React.useState<CurrencyCode>('aud');
  const [showTables, setShowTables] = React.useState<boolean>(false);
  const c = useStyles();
  // validator(initialData);

  // add remaining pairs
  // change time format from '21-10-25 T=04:00:00' to '10-25 T=04'
  const history = initialData.map(({ time, prices }) => ({
    time: time.slice(3, 13),
    prices: generateAllPrices(prices),
  }));

  let fullHistory: FullHistory[] = history.map(({ time, prices }, index) => {
    const pricesWithDifferences = {} as FullHistory['prices'];
    // change this => audcad: number
    // to this => audcad: { close: number; diff: number; diffInPercentage:number }
    Object.keys(prices).forEach((_pair) => {
      const pair = _pair as keyof Prices;
      const current = prices[pair];
      const prev = index !== 0 ? history[index - 1].prices[pair] : undefined;

      pricesWithDifferences[pair] = {
        close: current,
        diff: !prev ? 0 : getFixed((current - prev) * 10000, 1),
        diffInPercentage: !prev
          ? 0
          : getFixed(((current - prev) / prev) * 100, 3),
      };
    });

    const averageMove = {} as FullHistory['averageMove'];
    // using new prices format to calculate average moves (with the help of "diffInPercentage" and "diff")
    currencyCodes.forEach((code) => {
      averageMove[code] = getAverageMove(pricesWithDifferences, code);
    });

    return {
      time,
      prices: pricesWithDifferences,
      averageMove: averageMove,
    };
  });

  // add hypothetical amount to average moves (before this it was 0(returned from getAverageMove))
  fullHistory.forEach((item, index) => {
    let averageMoveWithHypotheticalAmount = {} as FullHistory['averageMove'];
    currencyCodes.forEach((code) => {
      const lastHypotheticalAmount =
        index === 0
          ? 100
          : fullHistory[index - 1].averageMove[code].hypotheticalAmount;

      averageMoveWithHypotheticalAmount[code] = {
        ...item.averageMove[code],
        hypotheticalAmount: getFixed(
          lastHypotheticalAmount +
            (lastHypotheticalAmount * item.averageMove[code].percentage) / 100,
          3
        ),
      };
    });
    fullHistory[index] = {
      ...item,
      averageMove: averageMoveWithHypotheticalAmount,
    };
  });

  console.log(fullHistory);

  return (
    <div className={c.container}>
      <div className={c.controls}>
        <div className={c.radios}>
          {currencyCodes.map((code) => (
            <span
              className={clsx(c.radio, code === currencyCodeState && c.active)}
              onClick={() => setCurrencyCodeState(code)}
            >
              {code}
            </span>
          ))}
        </div>
        <Checkbox
          label="Show Tables"
          name="tables"
          checked={showTables}
          onChange={(c) => setShowTables(c)}
        />
      </div>
      <div className={c.chartBox}>
        <div style={{ marginBottom: '1.5rem' }}>
          <LineChart
            label={currencyCodeState}
            data={[{ value: 1 }, { value: -1 }].concat(
              fullHistory.map(({ time, averageMove }) => ({
                // decreasing 100 from hypotheticalAmount to scale the differences
                value: averageMove[currencyCodeState].hypotheticalAmount - 100,
                time, // time example '10-25 T=12'
                label:
                  getHour(time) === '00'
                    ? `${time.split(' ')[0]}`
                    : getHour(time) === '08' || getHour(time) === '16'
                    ? getHour(time)
                    : '',
              }))
            )}
          />
        </div>
      </div>
      {showTables && (
        <div className={c.tablesBox}>
          <Tables history={fullHistory} />
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    minHeight: '100vh',
    padding: '2rem 4rem 0',
  },
  controls: {
    padding: '.5rem',
    borderRadius: 4,
    backgroundColor: 'white',
    display: 'flex',
    gap: '2rem',
  },
  radios: {
    display: 'flex',
    gap: '.1rem',
    textTransform: 'uppercase',
  },
  radio: {
    display: 'inline-block',
    padding: '7px 1rem',
    borderRadius: 4,
    cursor: 'pointer',
    backgroundColor: '#d3d3d3',
    transition: '.1s ease-in',
  },
  active: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
  chartBox: {
    marginTop: '2rem',
    marginBottom: '4rem',
  },
  tablesBox: {
    width: '100%',
    overflowX: 'scroll',
  },
}));
