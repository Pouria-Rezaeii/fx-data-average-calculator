import { Data, InitialPrices } from '../types';

export const validator = (data: Data) => {
  data.forEach(({ prices, time }, index) => {
    Object.keys(prices).forEach((_pair) => {
      const pair = _pair as keyof InitialPrices;
      const current = data[index].prices[pair];
      const prev = index !== 0 ? data[index - 1].prices[pair] : undefined;

      if (false) {
        alert('Validation error, check console');
        console.log({
          '1_type': 'Time validator',
          '2_time': time,
          pair,
          prices: prices[pair],
        });
      }

      if (false) {
        alert('Validation error, check console');
        console.log({
          '1_type': 'Max possible diff for close related to previous close',
          '2_time': time,
          pair,
          prices: prices[pair],
        });
      }
    });
  });
};
