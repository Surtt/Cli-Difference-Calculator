import { test, expect, beforeEach } from '@jest/globals';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let getFixturePath;
let readFile;

beforeEach(() => {
  getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
  readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
});

test('yaml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const result = readFile('result.txt');
  expect(gendiff(filepath1, filepath2)).toEqual(result);
});

test('json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const result = readFile('result.txt');
  expect(gendiff(filepath1, filepath2)).toEqual(result);
});
