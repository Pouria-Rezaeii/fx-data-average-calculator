import React from 'react';
import { getFixed, generateAllPrices, getAverageMove } from './utils';
import { data } from './data';
import { Prices, UpdatedResult } from './types';
import { makeStyles } from '@material-ui/styles';

export default function App() {
  const c = useStyles();
  //
  const history = data.map(({ time, prices }) => ({
    time: time.slice(3, 13),
    prices: generateAllPrices(prices),
  }));

  const historyWithExtraInfo = history.map(({ time, prices }, index) => {
    // @ts-ignore
    const updatedResult: UpdatedResult = {};
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
    return {
      '--time': time,
      prices: updatedResult,
      averageMove: {
        eur: getAverageMove(updatedResult, 'eur'),
        gbp: getAverageMove(updatedResult, 'gbp'),
        aud: getAverageMove(updatedResult, 'aud'),
        nzd: getAverageMove(updatedResult, 'nzd'),
        usd: getAverageMove(updatedResult, 'usd'),
        cad: getAverageMove(updatedResult, 'cad'),
        chf: getAverageMove(updatedResult, 'chf'),
        jpy: getAverageMove(updatedResult, 'jpy'),
      },
    };
  });

  console.log(historyWithExtraInfo);

  return <div className={c.container}></div>;
}

const useStyles = makeStyles((theme) => ({
  container: {},
}));
