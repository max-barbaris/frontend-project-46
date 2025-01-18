import _ from 'lodash';

const getStylish = (data, replacer = ' ', spaceCount = 4) => {
  const iter = (currentData, depth) => {
    if (!_.isObject(currentData)) {
      return `${currentData}`;
    }

    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount);
    const indentBefore = replacer.repeat(indentSize - 2);
    const lines = Object
      .entries(currentData)
      .map(([key, val]) => {
        switch (val.type) {
          case 'unchanged':
            return `${currentIndent}${key}: ${iter(val.value, depth + 1)}`;
          case 'changed':
            return `${indentBefore}- ${key}: ${iter(val.oldValue, depth + 1)}\n${indentBefore}+ ${key}: ${iter(val.newValue, depth + 1)}`;
          case 'deleted':
            return `${indentBefore}- ${key}: ${iter(val.value, depth + 1)}`;
          case 'added':
            return `${indentBefore}+ ${key}: ${iter(val.value, depth + 1)}`;
          case undefined:
            return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
          default:
            throw new Error('Error');
        }
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default getStylish;
