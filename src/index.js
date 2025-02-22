import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';
import compareData from './compareData.js';
import selectFormat from './formatters/index.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const fileFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const parsedData1 = parse(data1, fileFormat(filepath1));
  const parsedData2 = parse(data2, fileFormat(filepath2));
  const comparsion = compareData(parsedData1, parsedData2);

  return selectFormat(comparsion, formatName);
};

export default genDiff;
