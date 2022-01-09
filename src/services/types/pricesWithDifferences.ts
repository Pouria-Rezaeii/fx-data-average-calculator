import { Pairs } from '.';

export type PricesWithDifferences = {
  [key in Pairs]: {
    close: number;
    diff: number;
    diffInPercentage: number;
  };
};
