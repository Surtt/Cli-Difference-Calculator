import stylish from './stylish.js';
import plain from './plain.js';

export default (elements, format = 'stylish') => {
  switch (format) {
    case 'plain':
      return plain(elements);
    case 'json':
      return JSON.stringify(elements);
    case 'stylish':
      return stylish(elements);
    default:
      throw new Error('error');
  }
};
