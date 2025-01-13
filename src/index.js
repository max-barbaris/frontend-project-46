import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parse.js';
import compareData from './compareData.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const parsedData1 = parse(data1);
  const parsedData2 = parse(data2);
  const result = compareData(parsedData1, parsedData2);

  return result;
};

export default genDiff;
