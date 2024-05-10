import { createResource, createEffect, createSignal } from "solid-js";
import { fetchCountryPopulation } from "@/api";

export function usePopulationData() {
	const [deptos] = createResource(fetchCountryPopulation, { initialValue: [] });

	const [years, setYears] = createSignal<string[]>([]);
	const [year, setYear] = createSignal<string | null>(null);

	createEffect(() => {
		if (deptos().length > 0) {
			const years = Object.keys(deptos()[0].population);
			setYears(years);
			setYear(years[years.length - 1]);
		}
	});

	return { year, years, deptos } as const;
}
