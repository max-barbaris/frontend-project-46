import getStylish from './stylish.js';
import getPlain from './plain.js';

const selectFormat = (data, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return getStylish(data);
    case 'plain':
      return getPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Format is not defined - ${formatName}`);
  }
};

export default selectFormat;
