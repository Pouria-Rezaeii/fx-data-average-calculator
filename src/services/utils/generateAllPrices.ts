import { Prices, InitialPrices } from '../types/prices';

export const generateAllPrices = (initial: InitialPrices) => {
  let prices: Prices = {
    audcad: 0,
    audchf: 0,
    audjpy: 0,
    audnzd: initial.audnzd,
    audusd: 0,
    cadchf: initial.cadchf,
    cadjpy: 0,
    chfjpy: initial.chfjpy,
    euraud: 0,
    eurcad: 0,
    eurchf: 0,
    eurgbp: initial.eurgbp,
    eurjpy: 0,
    eurnzd: 0,
    eurusd: 0,
    gbpaud: initial.gbpaud,
    gbpcad: 0,
    gbpchf: 0,
    gbpjpy: 0,
    gbpnzd: 0,
    gbpusd: 0,
    nzdcad: 0,
    nzdchf: 0,
    nzdjpy: 0,
    nzdusd: initial.nzdusd,
    usdcad: initial.usdcad,
    usdchf: 0,
    usdjpy: 0,
  };
  prices = {
    ...prices,
    euraud: prices.eurgbp * prices.gbpaud,
    gbpnzd: prices.gbpaud * prices.audnzd,
    audusd: prices.audnzd * prices.nzdusd,
    nzdcad: prices.nzdusd * prices.usdcad,
    usdchf: prices.usdcad * prices.cadchf,
    cadjpy: prices.cadchf * prices.chfjpy,
  };
  prices = {
    ...prices,
    eurnzd: prices.eurgbp * prices.gbpnzd,
    nzdchf: prices.nzdcad * prices.cadchf,
    nzdjpy: prices.nzdcad * prices.cadjpy,
  };
  prices = {
    ...prices,
    audcad: prices.audnzd * prices.nzdcad,
    audchf: prices.audnzd * prices.nzdchf,
    audjpy: prices.audnzd * prices.nzdjpy,
    eurcad: prices.eurnzd * prices.nzdcad,
    eurchf: prices.eurnzd * prices.nzdchf,
    eurjpy: prices.eurnzd * prices.nzdjpy,
    eurusd: prices.eurnzd * prices.nzdusd,
    gbpcad: prices.gbpnzd * prices.nzdcad,
    gbpchf: prices.gbpnzd * prices.nzdchf,
    gbpjpy: prices.gbpnzd * prices.nzdjpy,
    gbpusd: prices.gbpnzd * prices.nzdusd,
    usdjpy: prices.usdcad * prices.cadjpy,
  };
  for (const key in prices) {
    prices = {
      ...prices,
      [key]: Number(prices[key as keyof typeof prices].toFixed(5)),
    };
  }
  return prices;
};
