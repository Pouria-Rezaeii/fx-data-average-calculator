import { getFixed } from '.';
import { CurrencyCode, Prices, PricesWithDifferences } from '../types';

export const getAverageMove = (
  result: PricesWithDifferences,
  currencyCode: CurrencyCode
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
            ? result[name].diffInPercentage
            : -result[name].diffInPercentage
        )
        .reduce((acc, current) => acc + current, 0) / 7,
      2
    ),
    pips: getFixed(
      relatedCurrencies
        .map((name) =>
          name.startsWith(currencyCode) ? result[name].diff : -result[name].diff
        )
        .reduce((acc, current) => acc + current, 0) / 7,
      1
    ),
    hypotheticalAmount: 0,
  };
};
