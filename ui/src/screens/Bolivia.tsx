import { Show } from "solid-js";
import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import { PopulationMap, PopulationTable } from "@/components";
import { usePopulationData } from "./usePopulationData";

export default function(_: RouteSectionProps) {
	const navigate = useNavigate();
	const { year, years, deptos } = usePopulationData();

	const sortedDeptos = () => {
		const selectedYear = year();
		if (!selectedYear) return deptos();
		return [...deptos()].sort((a, b) => b.population[selectedYear] - a.population[selectedYear]);
	};

	const onSelectDepto = (id: string) => {
		navigate(`/${id}`);
	};

	return (
		<div class="pb-8">
			<Show when={year()} fallback={<p>Cargando...</p>}>{(y) => (
				<>
					<h1 class="text-center text-3xl font-bold">Bolivia</h1>
					<div class="mx-auto mt-4 flex flex-wrap justify-center items-center">
						<PopulationMap
							onClickMapSection={onSelectDepto}
							populationMaps={sortedDeptos()}
							year={y()}
						/>
						<PopulationTable populationMaps={sortedDeptos()} type="Departamento" years={years()} />
					</div>
				</>
			)}</Show>
		</div>
	);
}
