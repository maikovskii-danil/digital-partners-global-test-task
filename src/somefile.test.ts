/* eslint-disable */

import { describe, expect, it } from 'vitest';

const graphSmoke = {
  A: { B: 7 },
  B: { A: 7 },
};

const graphMy = {
  A: { B: 6, C: 8, D: 12, F: 5 },
  B: { A: 6, G: 13 },
  C: { A: 8, E: 4 },
  D: { A: 12, E: 5 },
  E: { C: 4, D: 5 },
  F: { A: 5 },
  G: { B: 13 },
};

const graphMyWithZ = {
  A: { B: 6, C: 8, D: 12, F: 5, Z: 1 },
  B: { A: 6, G: 13 },
  C: { A: 8, E: 4 },
  D: { A: 12, E: 5 },
  E: { C: 4, D: 5 },
  F: { A: 5, Z: 1 },
  G: { B: 13 },
  Z: { A: 1, F: 1 },
};

const GRAPH_MIN_EDGES = 2;

const findLowestCostNode = (
  costs: Record<string, number>,
  processed: string[],
): string | null => {
  let lowestCost = Infinity;
  let lowestNode: string | null = null;

  for (const node in costs) {
    if (costs[node] < lowestCost && !processed.includes(node)) {
      lowestCost = costs[node];
      lowestNode = node;
    }
  }

  return lowestNode;
};

const findPath = <GraphObject extends Record<string, Record<string, number>>>(
  graph: GraphObject,
  start: keyof GraphObject & string,
  end: keyof GraphObject & string,
): string[] => {
  if (Object.keys(graph).length < GRAPH_MIN_EDGES) {
    throw new Error('Uncorrect graph');
  }

  const processed: Array<keyof GraphObject> = [];
  const parents = Object.keys(graph).reduce(
    (acc, key) => ({ ...acc, [key]: [] }),
    {} as Record<keyof GraphObject, Array<keyof GraphObject>>,
  );
  const costs = Object.keys(graph).reduce(
    (acc, key) => ({ ...acc, [key]: Infinity }),
    {} as Record<keyof GraphObject, number>,
  );

  // eslint-disable-next-line guard-for-in
  for (const neighbor in graph[start]) {
    costs[neighbor] = graph[start][neighbor];
    parents[neighbor] = [start];
  }
  processed.push(start);

  let node = findLowestCostNode(costs, processed as string[]);

  while (node) {
    const cost = costs[node];
    const neighbors = graph[node];

    // eslint-disable-next-line guard-for-in
    for (const neighbor in neighbors) {
      const newCost = cost + neighbors[neighbor];

      // console.log(node, 'newCost', newCost);

      if (newCost < costs[neighbor]) {
        costs[neighbor as keyof GraphObject] = newCost;
        console.log('neighbor', neighbor);
        console.log('costs[neighbor]', costs[neighbor]);
        console.log(node, 'newCost', newCost);
        console.log('costs', costs);
        console.log(costs[neighbor] === newCost);
        parents[neighbor as keyof GraphObject] = [...parents[node], node];
      }
    }

    processed.push(node);
    node = findLowestCostNode(costs, processed as string[]);
  }

  console.log('costs', costs);

  const path: string[] = [];
  let current = end;

  while (current !== start) {
    path.unshift(current);
    const parent = parents[current]?.[0];
    if (!parent) {
      break;
    }

    current = parent as string;
  }

  path.unshift(start);

  return path;
};

describe('graph', () => {
  // it('it works', () => {
  //   expect(graphSmoke).toEqual(graphSmoke);
  // });
  // it('findPath smoke', () => {
  //   expect(findPath(graphSmoke, 'A', 'B')).toEqual(['A', 'B']);
  // });
  // it('findPath graphMy A => F', () => {
  //   expect(findPath(graphMy, 'A', 'F')).toEqual(['A', 'F']);
  // });
  it('findPath graphMyWithZ A => F', () => {
    expect(findPath(graphMyWithZ, 'A', 'F')).toEqual(['A', 'Z', 'F']);
  });
});
