import { test, expect, beforeAll } from '@jest/globals';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const format = {
  stylish: 'stylish.txt',
  plain: 'plain.txt',
  json: 'json.txt',
};

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

/* eslint-disable */
let readFile;

beforeAll(() => {
  readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
});
/* eslint-disable */

test.each([
  ['json', 'stylish'], ['yml', 'stylish'],
  ['json', 'plain'], ['yml', 'plain'],
  ['json', 'json'], ['yml', 'json'],
])('%s format %s', (extname, formatter) => {
  const getFormat = format[formatter];
  const result = readFile(`${getFormat}`);
  const filepath1 = getFixturePath(`file1.${extname}`);
  const filepath2 = getFixturePath(`file2.${extname}`);
  expect(gendiff(filepath1, filepath2, formatter)).toEqual(result);
});
