import { FieldType } from '../models/fieldType';
import { FilterCondition, FilterConditionOption } from '../models';
import { testFilterCondition, mapDateFormatByFieldType } from './filterUtilities';
import * as moment_ from 'moment-mini';
const moment: any = (<any>moment_).default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

export const dateFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const filterSearchType = options.filterSearchType || FieldType.dateIso;
  const searchDateFormat = mapDateFormatByFieldType(filterSearchType);
  if (!moment(options.cellValue, moment.ISO_8601).isValid() || !moment(options.searchTerm, searchDateFormat, true).isValid()) {
    return true;
  }
  const dateCell = moment(options.cellValue);
  const dateSearch = moment(options.searchTerm);

  // run the filter condition with date in Unix Timestamp format
  return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
