export type Coords = Array<Array<[number, number]>>;

export type Population = Record<string, number>;

export type Mun = {
	id: string;
	name: string;
	population: Population;
	surface: number;
};

export type Prov = {
	id: string;
	name: string;
	population: Population;
	surface: number;
	muns: Mun[];
};

export type Depto = {
	id: string;
	name: string;
	population: Population;
	surface: number;
	provs: Prov[];
};
