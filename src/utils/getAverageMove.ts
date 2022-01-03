import { getFixed } from '.';
import { Prices, UpdatedResult } from '../types';

export const getAverageMove = (
  result: UpdatedResult,
  currencyCode: 'eur' | 'gbp' | 'aud' | 'nzd' | 'usd' | 'cad' | 'chf' | 'jpy'
) => {
  const relatedCurrencies = Object.keys(result).filter((currencyName) =>
    currencyName.includes(currencyCode)
  ) as (keyof Prices)[];
  // example for cad => [audcad, cadchf, cadjpy, eurcad,...]

  return {
    percentage: getFixed(
      relatedCurrencies
        .map((name) =>
          name.startsWith(currencyCode)
            ? result[name].percentage
            : -result[name].percentage
        )
        .reduce((acc, current) => acc + current, 0),
      2
    ),
    pips: getFixed(
      relatedCurrencies
        .map((name) =>
          name.startsWith(currencyCode) ? result[name].diff : -result[name].diff
        )
        .reduce((acc, current) => acc + current, 0),
      1
    ),
  };
};