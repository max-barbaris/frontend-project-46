import getStylish from './stylish.js';

const selectFormat = (data, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return getStylish(data);
    default:
      throw new Error('unknown format');
  }
};

export default selectFormat;
