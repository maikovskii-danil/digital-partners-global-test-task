export type Coord = [number, number];
export type Graph = Record<string, { coord: Coord; neighbors: string[] }>;
