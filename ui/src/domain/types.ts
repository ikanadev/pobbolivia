export type Coords = Array<Array<Array<[number, number]>>>;

export type Population = Record<string, number>;

export type SvgBox = {
	x0: number;
	y0: number;
	x1: number;
	y1: number;
};

export type PopulationMapBase = {
	id: string;
	name: string;
	population: Population;
	surface: number;
};

export type Mun = PopulationMapBase;

export type Prov = PopulationMapBase & { muns: Mun[]; };

export type Depto = PopulationMapBase & { provs: Prov[]; };
