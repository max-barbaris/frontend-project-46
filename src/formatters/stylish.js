import _ from 'lodash';

const [replacer, spaceCount] = [' ', 4];
const getIndent = (depth, space = 0) => replacer.repeat(depth * spaceCount - space);

const stringify = (currentData, depth) => {
  if (!_.isObject(currentData)) {
    return `${currentData}`;
  }

  const currentIndent = getIndent(depth, 2);
  const bracketIndent = getIndent(depth, 4);
  const lines = Object
    .entries(currentData)
    .map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`)
    .join('\n');

  return [
    '{',
    lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const getStylish = (data) => {
  const iter = (currentData, depth) => {
    const currentIndent = getIndent(depth, 2);
    const bracketIndent = getIndent(depth, 4);
    const lines = currentData
      .map((node) => {
        switch (node.type) {
          case 'unchanged':
            return `${currentIndent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
          case 'changed':
            return `${currentIndent}- ${node.key}: ${stringify(node.value1, depth + 1)}\n${currentIndent}+ ${node.key}: ${stringify(node.value2, depth + 1)}`;
          case 'deleted':
            return `${currentIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
          case 'added':
            return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
          case 'nested':
            return `${currentIndent}  ${node.key}: ${iter(node.value, depth + 1)}`;
          default:
            throw new Error(`Type is not defined - ${node.type}`);
        }
      })
      .join('\n');

    return [
      '{',
      lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default getStylish;
