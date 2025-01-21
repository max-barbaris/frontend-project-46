import _ from 'lodash';

const compareData = (data1, data2) => {
  const data1keys = _.keys(data1);
  const data2keys = _.keys(data2);
  const keys = _.union(data1keys, data2keys);
  const sortedKeys = _.sortBy(keys);

  const distinctions = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 };
    }

    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: value1 };
    }

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', value: compareData(value1, value2) };
    }

    return {
      key, type: 'changed', oldValue: value1, newValue: value2,
    };
  });

  return distinctions;
};

export default compareData;
