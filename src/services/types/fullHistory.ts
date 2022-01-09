import { CurrencyCode, PricesWithDifferences } from '.';

export interface FullHistory {
  time: string;
  prices: PricesWithDifferences;
  averageMove: {
    [key in CurrencyCode]: {
      percentage: number;
      pips: number;
      hypotheticalAmount: number;
    };
  };
}
