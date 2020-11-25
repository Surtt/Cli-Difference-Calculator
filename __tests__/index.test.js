import { test, expect, beforeEach } from '@jest/globals';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const format = {
  stylish: 'stylish.txt',
  plain: 'plain.txt',
};

let getFixturePath;
let readFile;

beforeEach(() => {
  getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
  readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
});

test.each([
  ['json', 'stylish'], ['yml', 'stylish'],
  ['json', 'plain'], ['yml', 'plain'],
])('%s format %s', (extname, formatter) => {
  const getFormat = format[formatter];
  const result = readFile(`${getFormat}`);
  const filepath1 = getFixturePath(`file1.${extname}`);
  const filepath2 = getFixturePath(`file2.${extname}`);
  expect(gendiff(filepath1, filepath2, formatter)).toEqual(result);
});
