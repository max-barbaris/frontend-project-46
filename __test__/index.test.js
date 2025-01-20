import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import fileParsing from '../src/parsers.js';
import selectFormat from '../src/formatters/index.js';
import getStylish from '../src/formatters/stylish.js';
import getPlain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('test stylish format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('resultStylish.txt');

  expect(genDiff(file1, file2)).toEqual(expected);
});

test('test plain format', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = readFile('resultPlain.txt');

  expect(genDiff(file1, file2, 'plain')).toEqual(expected);
});

test('test JSON format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('resultJSON.txt');

  expect(genDiff(file1, file2, 'json')).toEqual(expected);
});

test('test stylish format with json and yaml extensions', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yml');
  const expected = readFile('resultStylish.txt');

  expect(genDiff(file1, file2)).toEqual(expected);
});

test('test throw new Error', () => {
  const data = { common: { follow: { value: test, type: test } } };

  expect(() => {
    fileParsing(data, '.txt');
  }).toThrow();

  expect(() => {
    selectFormat(data, 'plein');
  }).toThrow();

  expect(() => {
    getStylish(data);
  }).toThrow();

  expect(() => {
    getPlain(data);
  }).toThrow();
});
