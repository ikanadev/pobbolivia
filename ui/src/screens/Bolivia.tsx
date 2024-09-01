import { Show } from "solid-js";
import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import {
	PopulationMap,
	PopulationTable,
	PopulationChart,
	Loading,
	Title,
} from "@/components";
import { usePopulationData } from "./usePopulationData";

export default function(_: RouteSectionProps) {
	const navigate = useNavigate();
	const { year, years, deptos } = usePopulationData();

	const sortedDeptos = () => {
		const selectedYear = year();
		if (!selectedYear) return deptos();
		return [...deptos()].sort(
			(a, b) => b.population[selectedYear] - a.population[selectedYear],
		);
	};

	const onSelectDepto = (id: string) => {
		navigate(`/${id}`);
	};

	return (
		<div class="pb-8">
			<Show when={deptos.loading}>
				<Loading />
			</Show>
			<Title text="Bolivia" />
			<Show when={year()}>
				{(y) => (
					<>
						<div>
							<PopulationMap
								onClickMapSection={onSelectDepto}
								populationMaps={sortedDeptos()}
								year={y()}
							/>
							<PopulationTable
								populationMaps={sortedDeptos()}
								type="Departamento"
								years={years()}
							/>
							<PopulationChart
								populationMaps={sortedDeptos()}
								years={years()}
							/>
						</div>
					</>
				)}
			</Show>
		</div>
	);
}
