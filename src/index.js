import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import parser from './parsers.js';
import generateDiff from './gendiff.js';
import formatter from './formatters/index.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const fullpath1 = resolve(filepath1);
  const fullpath2 = resolve(filepath2);

  const fileContent1 = readFileSync(fullpath1);
  const fileContent2 = readFileSync(fullpath2);

  const formatData1 = extname(fullpath1).slice(1);
  const formatData2 = extname(fullpath2).slice(1);

  const data1 = parser(fileContent1, formatData1);
  const data2 = parser(fileContent2, formatData2);

  const difference = generateDiff(data1, data2);
  return formatter(difference, format);
};

export default gendiff;
