import type { Depto, Coords } from "@/domain";

export async function fetchCoords(id: string): Promise<Coords> {
	const resp = await fetch(`/coords/${id}.json`);
	const json = await resp.json();
	return json;
}

export async function fetchCountryPopulation(): Promise<Depto[]> {
	const resp = await fetch("/departamentos.json");
	const json = await resp.json();
	return json;
}
