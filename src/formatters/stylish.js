import _ from 'lodash';

const symbols = {
  space: ' ',
  minus: '- ',
  plus: '+ ',
};

const setArea = (indent) => '  '.repeat(indent);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const innerValues = Object.entries(data).flatMap(([key, value]) => `${setArea(depth)}      ${key}: ${stringify(value, depth + 2)}`);
  return `{\n${innerValues.join('\n')}\n${setArea(depth)}  }`;
};

const types = {
  added: ({ key, value }, depth) => `${setArea(depth)}${symbols.plus}${key}: ${stringify(value, depth)}`,
  removed: ({ key, value }, depth) => `${setArea(depth)}${symbols.minus}${key}: ${stringify(value, depth)}`,
  nested: ({ key, children }, depth, render) => `${setArea(depth)}${symbols.space} ${key}: {\n${render(children, depth + 2)}\n${setArea(depth + 1)}}`,
  changed: ({ key, value1, value2 }, depth) => `${setArea(depth)}${symbols.minus}${key}: ${stringify(value1, depth)}\n${setArea(depth)}${symbols.plus}${key}: ${stringify(value2, depth)}`,
  unchanged: ({ key, value }, depth) => `${setArea(depth)}${symbols.space} ${key}: ${stringify(value, depth)}`,
};

const rendering = (tree) => {
  const iter = (nodes, depth) => (
    nodes.map((node) => types[node.type](node, depth, iter)).join('\n')
  );
  return iter(tree, 1);
};

export default (tree) => `{\n${rendering(tree)}\n}`;
