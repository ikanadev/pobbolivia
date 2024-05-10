import { Show } from "solid-js";
import { type RouteSectionProps, useNavigate, A } from "@solidjs/router";
import { PopulationMap, PopulationTable } from "@/components";
import type { Prov } from "@/domain";
import { usePopulationData } from "./usePopulationData";

export default function Depto(props: RouteSectionProps) {
	const navigate = useNavigate();
	const { year, years, deptos } = usePopulationData();
	const depto = () => deptos().find((d) => d.id === props.params.deptoId);

	const sortedProvs = (): Prov[] => {
		const selectedYear = year();
		const dep = depto();
		if (!selectedYear) return [];
		if (!dep) return [];
		return [...dep.provs].sort((a, b) => b.population[selectedYear] - a.population[selectedYear]);
	};

	const onSelectProv = (id: string) => {
		navigate(`/${props.params.deptoId}/${id}`);
	};

	return (
		<div class="pb-8">
			<Show when={year()} fallback={<p>Cargando...</p>}>{(y) => (
				<>
					<A href="/" class="text-4xl">←</A>
					<Show when={depto()}>{(d) => (
						<h1 class="text-center text-3xl font-bold">{d().name}</h1>
					)}</Show>
					<div class="mx-auto mt-4 flex flex-wrap justify-center items-center">
						<PopulationMap
							populationMaps={sortedProvs()}
							year={y()}
							onClickMapSection={onSelectProv}
						/>
						<PopulationTable populationMaps={sortedProvs()} type="Provincia" years={years()} />
					</div>
				</>
			)}</Show>
		</div>
	);
}
