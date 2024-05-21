import { Show } from "solid-js";
import { type RouteSectionProps, A } from "@solidjs/router";
import { PopulationMap, PopulationTable, PopulationChart } from "@/components";
import type { Mun } from "@/domain";
import { usePopulationData } from "./usePopulationData";

export default function Provincia(props: RouteSectionProps) {
	const { year, years, deptos } = usePopulationData();
	const depto = () => deptos().find((d) => d.id === props.params.deptoId);
	const prov = () => depto()?.provs.find((p) => p.id === props.params.provId);

	const sortedMuns = (): Mun[] => {
		const selectedYear = year();
		const pr = prov();
		if (!selectedYear) return [];
		if (!pr) return [];
		return [...pr.muns].sort((a, b) => b.population[selectedYear] - a.population[selectedYear]);
	};

	const onSelectMun = (_: string) => { };

	return (
		<div class="pb-8">
			<Show when={year()} fallback={<p>Cargando...</p>}>{(y) => (
				<>
					<A href={`/${props.params.deptoId}`} class="text-4xl">←</A>
					<Show when={prov()}>{(p) => (
						<h1 class="text-center text-3xl font-bold">{p().name}</h1>
					)}</Show>
					<div class="mx-auto mt-4 flex flex-wrap justify-center items-center">
						<PopulationMap
							populationMaps={sortedMuns()}
							year={y()}
							onClickMapSection={onSelectMun}
						/>
						<PopulationTable populationMaps={sortedMuns()} type="Municipio" years={years()} />
						<PopulationChart populationMaps={sortedMuns()} years={years()} />
					</div>
				</>
			)}</Show>
		</div>
	);
}
