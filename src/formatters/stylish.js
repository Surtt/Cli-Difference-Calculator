import _ from 'lodash';

const setArea = (indent) => '  '.repeat(indent);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const innerValues = Object.entries(data).flatMap(([key, value]) => `${setArea(depth)}      ${key}: ${stringify(value, depth + 2)}`);
  return `{\n${innerValues.join('\n')}\n${setArea(depth)}  }`;
};

const types = {
  added: ({ key, value }, depth) => `${setArea(depth)}+ ${key}: ${stringify(value, depth)}`,
  removed: ({ key, value }, depth) => `${setArea(depth)}- ${key}: ${stringify(value, depth)}`,
  nested: ({ key, children }, depth, render) => `${setArea(depth)}  ${key}: {\n${render(children, depth + 2)}\n${setArea(depth + 1)}}`,
  changed: ({ key, value1, value2 }, depth) => `${setArea(depth)}- ${key}: ${stringify(value1, depth)}\n${setArea(depth)}+ ${key}: ${stringify(value2, depth)}`,
  unchanged: ({ key, value }, depth) => `${setArea(depth)}  ${key}: ${stringify(value, depth)}`,
};

const rendering = (tree, depth = 1) => tree.map((node) => types[node.type](node, depth, rendering)).join('\n');
const makeTree = (tree) => `{\n${rendering(tree)}\n}`;

export default makeTree;
