// import { Currency } from '../data/types';

// type Curr = Currency['values'][number];

// export const generate4hoursPrices = (currency: Currency) => {
//   const reversedArray = currency.values.slice().reverse();
//   return reversedArray.reduce(
//     (prev: Omit<Curr, 'high' | 'low'>[], curr, index) => {
//       const t = curr.datetime.split(' ')[1];
//       if (
//         t.startsWith('00') ||
//         t.startsWith('04') ||
//         t.startsWith('08') ||
//         t.startsWith('12') ||
//         t.startsWith('16') ||
//         t.startsWith('20')
//       ) {
//         const bar = {
//           datetime: curr.datetime,
//           open: curr.open,
//           close: reversedArray[index + 3].close,
//         };
//         prev.push(bar);
//       }
//       return prev;
//     },
//     []
//   );
// };

export const generate4hoursPrices = () => {};
