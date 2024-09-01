import { Show } from "solid-js";
import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import { PopulationMap, PopulationTable, PopulationChart, Title, Loading } from "@/components";
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
			<Show when={deptos.loading}>
				<Loading />
			</Show>
			<Show when={year()}>{(y) => (
				<>
					<Title backLink="/" text={`Depto. de ${depto()?.name || ""}`} />
					<div>
						<PopulationMap
							populationMaps={sortedProvs()}
							year={y()}
							onClickMapSection={onSelectProv}
						/>
						<PopulationTable populationMaps={sortedProvs()} type="Provincia" years={years()} />
						<PopulationChart populationMaps={sortedProvs()} years={years()} />
					</div>
				</>
			)}</Show>
		</div>
	);
}
