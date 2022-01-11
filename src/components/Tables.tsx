import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FullHistory } from '../services/types';
import { getFixed, getHour } from '../services/utils';
import clsx from 'clsx';
import { currencyCodes } from '../services/constants';

interface IProps {
  history: FullHistory[];
}

function Tables({ history: fullHistory }: IProps) {
  const c = useStyles();

  const getFirstOfDayTheme = (time: string) => {
    if (getHour(time) === '00') return c.startOfDay;
  };

  const getColor = (value: number) => {
    return value > 0 ? c.green : value < 0 ? c.red : c.gray;
  };

  const timeRow = (
    <tr>
      <td></td>
      {fullHistory.map(({ time }) => {
        const day = time.split(' ')[0].split('-');
        console.log('cal');

        return (
          <td key={time} className={clsx(c.time, getFirstOfDayTheme(time))}>
            {day.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
            <div>{getHour(time)}</div>
          </td>
        );
      })}
    </tr>
  );

  return (
    <div style={{ display: 'flex' }}>
      <table className={c.table}>
        <tbody>
          {timeRow}
          {/* rendering moving averages */}
          {currencyCodes.map((code) => (
            <tr key={code}>
              <td className={c.currencyCode}>{code}</td>
              {fullHistory.map(({ averageMove, time }) => (
                <td
                  key={time}
                  className={clsx(
                    getColor(averageMove[code].percentage),
                    getFirstOfDayTheme(time)
                  )}
                >
                  {Math.abs(averageMove[code].percentage)}
                  <div className={clsx(c.hypotheticalAmount)}>
                    {getFixed(averageMove[code].hypotheticalAmount, 2)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
          <tr style={{ height: '4rem' }} />
          {timeRow}
          {/* rendering currency prices */}
          {Object.keys(fullHistory[0].prices).map((currency) => (
            <tr key={currency}>
              <td className={c.pair}>{currency}</td>
              {fullHistory.map(({ prices, time }) => {
                const curr = prices[currency as keyof FullHistory['prices']];
                return (
                  <td
                    key={time}
                    className={clsx(c.price, getFirstOfDayTheme(time))}
                  >
                    <div>{curr.close}</div>
                    <div className={c.currencyDiff}>
                      <span>{getFixed(curr.diff, 1)}</span>
                      <span className={getColor(curr.diffInPercentage)}>
                        {Math.abs(getFixed(curr.diffInPercentage, 2))}
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
  );
}

export default React.memo(Tables, () => true);

const useStyles = makeStyles((theme) => ({
  table: {
    color: 'silver',
    marginRight: '20rem',
    border: 'solid 1px #555',
    borderRadius: 6,
    '& td': {
      border: 'solid 1px #555',
      padding: '9px 7px',
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
  hypotheticalAmount: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  startOfDay: {
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
