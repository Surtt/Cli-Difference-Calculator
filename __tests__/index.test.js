import { test, expect, beforeAll } from '@jest/globals';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const extensions = ['json', 'yml'];
const formats = ['json', 'plain', 'stylish'];

/* eslint-disable */
let getResult;

beforeAll(() => {
  getResult = (format) => readFile(`${format}.txt`);
});
/* eslint-disable */

describe.each(extensions)('Test difference between %s files', (extname) => {
  test.each(formats)('Test %s format', (format) => {
    const filepath1 = getFixturePath(`file1.${extname}`);
    const filepath2 = getFixturePath(`file2.${extname}`);
    const result = getResult(format);
    expect(gendiff(filepath1, filepath2, format)).toEqual(result);
  });
});