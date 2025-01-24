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
    const lines = currentData
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const property = parent ? `${parent}.${node.key}` : `${node.key}`;
        switch (node.type) {
          case 'nested':
            return iter(node.value, property);
          case 'changed':
            return `Property '${property}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
          case 'deleted':
            return `Property '${property}' was removed`;
          case 'added':
            return `Property '${property}' was added with value: ${stringify(node.value)}`;
          default:
            throw new Error(`Type is not defined - ${node.type}`);
        }
      })
      .join('\n');

    return lines;
  };

  return iter(data, 0);
};

export default getPlain;
