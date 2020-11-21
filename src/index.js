import { readFileSync } from 'fs';
import _ from 'lodash';
import { resolve, extname } from 'path';
import parser from './parsers.js';

const gendiff = (filepath1, filepath2) => {
  const fullpath1 = resolve(filepath1);
  const fullpath2 = resolve(filepath2);

  const readData1 = readFileSync(fullpath1);
  const readData2 = readFileSync(fullpath2);

  const extnameData1 = extname(fullpath1).slice(1);
  const extnameData2 = extname(fullpath2).slice(1);

  const data1 = parser(readData1, extnameData1);
  const data2 = parser(readData2, extnameData2);

  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const result = keys.reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return [...acc, `  ${key}: ${data2[key]}`];
      }
      return [...acc, `- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`];
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return [...acc, `- ${key}: ${data1[key]}`];
    }

    return [...acc, `+ ${key}: ${data2[key]}`];
  }, []);
  const output = result.join('\n');
  return `{\n${output}\n}`;
};

export default gendiff;
