export interface Prices {
  audcad: number;
  audchf: number;
  audjpy: number;
  audnzd: number;
  audusd: number;
  cadchf: number;
  cadjpy: number;
  chfjpy: number;
  euraud: number;
  eurcad: number;
  eurchf: number;
  eurgbp: number;
  eurjpy: number;
  eurnzd: number;
  eurusd: number;
  gbpaud: number;
  gbpcad: number;
  gbpchf: number;
  gbpjpy: number;
  gbpnzd: number;
  gbpusd: number;
  nzdcad: number;
  nzdchf: number;
  nzdjpy: number;
  nzdusd: number;
  usdcad: number;
  usdchf: number;
  usdjpy: number;
}

export type InitialPrices = Pick<
  Prices,
  'eurgbp' | 'gbpaud' | 'audnzd' | 'nzdusd' | 'usdcad' | 'cadchf' | 'chfjpy'
>;
