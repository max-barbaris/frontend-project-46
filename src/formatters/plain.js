import _ from 'lodash';

const stringify = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }

  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

const getPlain = (data) => {
  const iter = (currentData, parent) => {
    const lines = Object
      .entries(currentData)
      .filter(([, val]) => val.type !== 'unchanged')
      .map(([key, val]) => {
        const property = parent ? `${parent}.${key}` : `${key}`;
        switch (val.type) {
          case undefined:
            return iter(val, property);
          case 'changed':
            return `Property '${property}' was updated. From ${stringify(val.oldValue)} to ${stringify(val.newValue)}`;
          case 'deleted':
            return `Property '${property}' was removed`;
          case 'added':
            return `Property '${property}' was added with value: ${stringify(val.value)}`;
          default:
            throw new Error('Type is not defined');
        }
      })
      .join('\n');

    return lines;
  };

  return iter(data, 0);
};

export default getPlain;
