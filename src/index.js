import path from 'path';
import fs from 'fs';
import process from 'process';
import _ from 'lodash';

// const fs = require('fs');
// const process = require('process');
// const path = require('path');

const getData = (filename) => {
  const data = fs.readFileSync(filename, 'utf-8');
  return data;
};

const gendiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(getData(filepath1));
  const data2 = JSON.parse(getData(filepath2));

  const keys = _.union(Object.keys(data1), Object.keys(data2));

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
  return result.join('\n');
};

export default gendiff;