import { Pairs } from '.';

export type Prices = {
  [key in Pairs]: number;
};

export type InitialPrices = Pick<
  Prices,
  'eurgbp' | 'gbpaud' | 'audnzd' | 'nzdusd' | 'usdcad' | 'cadchf' | 'chfjpy'
>;
