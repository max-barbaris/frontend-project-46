import _ from 'lodash';

const compareData = (data1, data2) => {
  const data1keys = _.keys(data1);
  const data2keys = _.keys(data2);
  const keys = _.union(data1keys, data2keys);
  const sortedKeys = _.sortBy(keys);

  const distinctions = sortedKeys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.has(data1, key) && _.has(data2, key)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        acc[key] = compareData(value1, value2);
      } else if (value1 === value2) {
        acc[key] = { value: value1, type: 'unchanged' };
      } else {
        acc[key] = { oldValue: value1, newValue: value2, type: 'changed' };
      }
    }

    if (!_.has(data2, key)) {
      acc[key] = { value: value1, type: 'deleted' };
    }

    if (!_.has(data1, key)) {
      acc[key] = { value: value2, type: 'added' };
    }

    return acc;
  }, {});

  return distinctions;
};

export default compareData;
