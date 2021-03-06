import { FilterCondition, FilterConditionOption } from '../models';
import { testFilterCondition } from './filterUtilities';
import * as moment_ from 'moment-mini';
const moment: any = (<any>moment_).default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const DATE_FORMAT = 'YYYY-MM-DD';

export const dateIsoFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  if (!moment(options.cellValue, DATE_FORMAT, true).isValid() || !moment(options.searchTerm, DATE_FORMAT, true).isValid()) {
    return true;
  }
  const dateCell = moment(options.cellValue, DATE_FORMAT, true);
  const dateSearch = moment(options.searchTerm, DATE_FORMAT, true);

  // run the filter condition with date in Unix Timestamp format
  return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
