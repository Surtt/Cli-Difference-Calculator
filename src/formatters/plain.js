import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const types = {
  added: ({ key, value }, acc) => `Property '${acc}${key}' was added with value: ${formatValue(value)}`,
  removed: ({ key }, acc) => `Property '${acc}${key}' was removed`,
  nested: ({ key, children }, acc, render) => render(children, `${acc}${key}.`),
  changed: ({ key, value1, value2 }, acc) => `Property '${acc}${key}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`,
  unchanged: () => null,
};

const rendering = (tree, acc = '') => tree.map((node) => types[node.type](node, acc, rendering)).filter((node) => node !== null).join('\n');
const makeTree = (tree) => rendering(tree);

export default makeTree;
