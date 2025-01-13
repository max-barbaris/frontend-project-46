import _ from 'lodash';

const compareData = (data1, data2) => {
  const data1keys = _.keys(data1);
  const data2keys = _.keys(data2);
  const keys = _.union(data1keys, data2keys);
  const sortedKeys = _.sortBy(keys);

  const distinctions = sortedKeys.reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        acc[`  ${key}`] = data1[key];
      } else {
        acc[`- ${key}`] = data1[key];
        acc[`+ ${key}`] = data2[key];
      }
    } else if (_.has(data1, key) && !_.has(data2, key)) {
      acc[`- ${key}`] = data1[key];
    } else {
      acc[`+ ${key}`] = data2[key];
    }

    return acc;
  }, {});

  return distinctions;
};

export default compareData;
