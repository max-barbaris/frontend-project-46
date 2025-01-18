import fs from 'fs';
import path from 'path';
import process from 'process';
import fileParsing from './parsers.js';
import compareData from './compareData.js';
import selectFormat from './formatters/selectFormat.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const fileFormat = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, formatName) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const parsedData1 = fileParsing(data1, fileFormat(filepath1));
  const parsedData2 = fileParsing(data2, fileFormat(filepath2));
  const comparsion = compareData(parsedData1, parsedData2);

  return selectFormat(comparsion, formatName);
};

export default genDiff;
