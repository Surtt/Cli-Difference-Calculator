import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import parser from './parsers.js';
import generateDiff from './gendiff.js';
import formatter from './formatters/index.js';

const gendiff = (filepath1, filepath2, format) => {
  const fullpath1 = resolve(filepath1);
  const fullpath2 = resolve(filepath2);

  const fileContent1 = readFileSync(fullpath1);
  const fileContent2 = readFileSync(fullpath2);

  const extnameData1 = extname(fullpath1).slice(1);
  const extnameData2 = extname(fullpath2).slice(1);

  const data1 = parser(fileContent1, extnameData1);
  const data2 = parser(fileContent2, extnameData2);

  const difference = generateDiff(data1, data2);
  return formatter(difference, format);
};

export default gendiff;
