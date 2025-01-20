import yaml from 'js-yaml';

const fileParsing = (data, fileFormat) => {
  switch (fileFormat) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Format is not defined - ${fileFormat}`);
  }
};

export default fileParsing;
