import { CurrencyCode, UpdatedResult } from '.';

export interface FullHistory {
  time: string;
  prices: UpdatedResult;
  averageMove: {
    [key in CurrencyCode]: {
      percentage: number;
      pips: number;
      hypotheticalAmount?: number;
    };
  };
}
