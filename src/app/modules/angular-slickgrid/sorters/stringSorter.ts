import { Sorter } from './../models';

export const stringSorter: Sorter = (value1, value2, sortDirection) => {
  return sortDirection * (value1 === value2 ? 0 : (value1 > value2 ? 1 : -1));
};
