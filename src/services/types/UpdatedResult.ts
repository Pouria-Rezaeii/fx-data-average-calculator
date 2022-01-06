import { Prices } from '.';

export type UpdatedResult = Record<
  keyof Prices,
  {
    close: number;
    diff: number;
    percentage: number;
  }
>;
