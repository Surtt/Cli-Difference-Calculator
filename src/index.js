import { readFileSync } from 'fs';
import _ from 'lodash';
import { resolve } from 'path';

const getData = (filename) => {
  const data = readFileSync(resolve(filename));
  return data;
};

const gendiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(getData(filepath1));
  const data2 = JSON.parse(getData(filepath2));

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
