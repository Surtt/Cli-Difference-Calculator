import getStylish from './stylish.js';
import getPlain from './plain.js';

const formatter = {
  stylish: getStylish,
  plain: getPlain,
  json: JSON.stringify,
};

export default (content, format) => formatter[format](content);
