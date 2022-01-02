import { Prices } from './prices';

export type { Prices, InitialPrices } from './prices';

export type UpdatedResult = Record<
  keyof Prices,
  { close: number; diff: number; percentage: number }
>;
