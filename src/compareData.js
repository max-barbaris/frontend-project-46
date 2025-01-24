import _ from 'lodash';

const compareData = (data1, data2) => {
  const data1keys = _.keys(data1);
  const data2keys = _.keys(data2);
  const keys = _.union(data1keys, data2keys);
  const sortedKeys = _.sortBy(keys);

  const distinctions = sortedKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'unchanged', value: data1[key] };
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', value: compareData(data1[key], data2[key]) };
    }

    return {
      key, type: 'changed', value1: data1[key], value2: data2[key],
    };
  });

  return distinctions;
};

export default compareData;
