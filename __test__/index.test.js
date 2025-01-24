import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.json'),
    format: 'stylish',
    expected: readFile('resultStylish.txt'),
  },
  {
    file1: getFixturePath('file1.yml'),
    file2: getFixturePath('file2.yml'),
    format: 'plain',
    expected: readFile('resultPlain.txt'),
  },
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.json'),
    format: 'json',
    expected: readFile('resultJSON.txt'),
  },
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.yml'),
    expected: readFile('resultStylish.txt'),
  },
])('stylish, plain, JSON and stylish with json and yaml extensions', ({
  file1,
  file2,
  format,
  expected,
}) => {
  expect(genDiff(file1, file2, format)).toEqual(expected);
});
