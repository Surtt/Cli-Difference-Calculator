import _ from 'lodash';

const indent = 4;
const setArea = (depth, spaces = 2) => ' '.repeat(depth * indent - spaces);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const result = Object.entries(data)
    .map(([key, value]) => {
      const formattedValue = stringify(value, depth + 1);
      return `${setArea(depth)}  ${key}: ${formattedValue}`;
    }).join('\n');

  return `{\n${result}\n${setArea(depth, indent)}}`;
};

export default (tree) => {
  const iter = (nodes, depth) => {
    const result = nodes.flatMap(({
      type, key, value, children, value1, value2,
    }) => {
      switch (type) {
        case 'added':
          return `${setArea(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'removed':
          return `${setArea(depth)}- ${key}: ${stringify(value, depth + 1)}`;
        case 'nested':
          return `${setArea(depth)}  ${key}: ${iter(children, depth + 1)}`;
        case 'changed':
          return [
            `${setArea(depth)}- ${key}: ${stringify(value1, depth + 1)}`,
            `${setArea(depth)}+ ${key}: ${stringify(value2, depth + 1)}`,
          ];
        case 'unchanged':
          return `${setArea(depth)}  ${key}: ${stringify(value, depth + 1)}`;
        default:
          throw new Error(`Unknown type '${type}'.`);
      }
    });
    return `{\n${result.join('\n')}\n${setArea(depth, indent)}}`;
  };
  return iter(tree, 1);
};
