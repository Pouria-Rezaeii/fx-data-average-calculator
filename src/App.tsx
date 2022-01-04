import React from 'react';
import { getFixed, generateAllPrices, getAverageMove } from './services/utils';
import { data } from './services/data';
import { Prices, UpdatedResult, FullHistory } from './services/types';
import { makeStyles } from '@material-ui/styles';
import { currencyCodes } from './services/constants';
import clsx from 'clsx';

export default function App() {
  const c = useStyles();

  const history = data.map(({ time, prices }) => ({
    time: time.slice(3, 13),
    prices: generateAllPrices(prices),
  }));

  const fullHistory: FullHistory[] = history.map(({ time, prices }, index) => {
    const updatedResult: Partial<UpdatedResult> = {};
    Object.keys(prices).forEach((_currency) => {
      const currency = _currency as keyof Prices;
      const current = prices[currency];
      const prev = index !== 0 ? history[index - 1].prices[currency] : null;

      updatedResult[currency] = {
        close: current,
        diff: !prev ? 0 : getFixed((current - prev) * 10000, 1),
        percentage: !prev ? 0 : getFixed(((current - prev) / prev) * 100, 3),
      };
    });

    const averageMove: Partial<FullHistory['averageMove']> = {};
    currencyCodes.forEach((code) => {
      averageMove[code] = getAverageMove(updatedResult as UpdatedResult, code);
    });

    return {
      time,
      prices: updatedResult as UpdatedResult,
      averageMove: averageMove as FullHistory['averageMove'],
    };
  });

  const getHour = (time: string) => time.split('=')[1].split(':')[0];
  const getFirstOfWeekTheme = (time: string) => {
    if (getHour(time) === '00') return c.startOfWeek;
  };
  const getColorize = (value: number) => {
    return value > 0 ? c.green : value < 0 ? c.red : c.gray;
  };

  const renderTimes = () => (
    <tr>
      <td></td>
      {fullHistory.map(({ time }) => {
        const day = time.split(' ')[0].split('-');
        console.log(time.split(' '));
        return (
          <td key={time} className={clsx(c.time, getFirstOfWeekTheme(time))}>
            {day.map((item) => (
              <div key={item}>{item}</div>
            ))}
            <div>{getHour(time)}</div>
          </td>
        );
      })}
    </tr>
  );

  console.log(fullHistory);

  return (
    <div className={c.container}>
      <div style={{ display: 'flex' }}>
        <table className={c.table}>
          <tbody>
            {renderTimes()}
            {/* rendering moving averages */}
            {currencyCodes.map((code) => (
              <tr key={code}>
                <td className={c.currencyCode}>{code}</td>
                {fullHistory.map(({ averageMove, time }) => {
                  return (
                    <td
                      key={time}
                      className={clsx(
                        getColorize(averageMove[code].percentage),
                        getFirstOfWeekTheme(time)
                      )}
                    >
                      {Math.abs(averageMove[code].percentage)}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr style={{ height: '4rem' }} />
            {renderTimes()}
            {/* rendering currency prices */}
            {Object.keys(history[0].prices).map((currency) => (
              <tr key={currency}>
                <td className={c.pair}>{currency}</td>
                {fullHistory.map(({ prices, time }) => {
                  const curr = prices[currency as keyof Prices];
                  return (
                    <td
                      key={time}
                      className={clsx(c.price, getFirstOfWeekTheme(time))}
                    >
                      <div>{curr.close}</div>
                      <div className={c.currencyDiff}>
                        <span>{getFixed(curr.diff, 1)}</span>
                        <span className={getColorize(curr.percentage)}>
                          {Math.abs(getFixed(curr.percentage, 2))}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ width: 1, flexShrink: 0 }} />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    minHeight: '100vh',
    padding: '4rem 20rem 0 1rem',
  },
  table: {
    color: 'silver',
    marginRight: '20rem',
    border: 'solid 1px #555',
    borderRadius: 6,
    '& td': {
      border: 'solid 1px #555',
      padding: '9px 11px',
      textAlign: 'center',
    },
  },
  time: {
    fontWeight: 300,
    color: '#e9c46a',
    fontSize: 14,
    '& > *': {
      maxWidth: 20,
      margin: '0 auto',
      padding: '2px 0',
    },
    '& > *:first-of-type': {
      borderBottom: '1px solid #3a5a40',
    },
    '& > *:nth-of-type(2)': {
      borderBottom: '1px solid #937027',
    },
  },
  startOfWeek: {
    backgroundColor: '#0F1523',
  },
  currencyCode: {
    color: '#ddd',
    fontWeight: 500,
    padding: '9px 20px !important',
  },
  green: {
    color: '#469d89',
  },
  red: {
    color: '#bd4749',
  },
  gray: {
    color: '#888',
  },
  pair: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: 500,
    padding: '3px 15px !important',
  },
  price: {
    padding: '3px 7px !important',
    fontSize: 13,
    color: '#888',
  },
  currencyDiff: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 10,
  },
}));
