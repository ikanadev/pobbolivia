import { createResource, Show, For, createEffect, createSignal } from "solid-js";
import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import { fetchCountryPopulation } from "@/api";
import { PopulationMap } from "@/components";

export default function(_: RouteSectionProps) {
	const navigate = useNavigate();
	const [deptos] = createResource(fetchCountryPopulation, { initialValue: [] });
	const [years, setYears] = createSignal<string[]>([]);
	const [year, setYear] = createSignal<string | null>(null);

	const sortedDeptos = () => {
		const selectedYear = year();
		if (!selectedYear) return deptos();
		return [...deptos()].sort((a, b) => b.population[selectedYear] - a.population[selectedYear]);
	};

	const onSelectDepto = (id: string) => {
		navigate(`/${id}`);
	};

	createEffect(() => {
		if (deptos().length > 0) {
			const years = Object.keys(deptos()[0].population);
			setYears(years);
			setYear(years[years.length - 1]);
		}
	});

	return (
		<div class="pb-8">
			<Show when={year()} fallback={<p>Cargando...</p>}>{(y) => (
				<>
					<h1 class="text-center text-3xl font-bold">Bolivia</h1>
					<div class="max-w-lg mx-auto mt-4">
						<PopulationMap
							onClickMapSection={onSelectDepto}
							populationMaps={sortedDeptos()}
							year={y()}
						/>
						<table class="mt-8 table-auto mx-auto">
							<thead>
								<tr>
									<th class="py-1 px-2">Departamento</th>
									<For each={years()}>{(y) => (
										<th class="text-right py-1 px-4">{y}</th>
									)}</For>
								</tr>
							</thead>
							<tbody>
								<For each={sortedDeptos()}>{(depto, idx) => (
									<tr
										class=""
										classList={{ "bg-slate-200": idx() % 2 === 0 }}
									>
										<td class="rounded-l-lg py-1 px-2">{depto.name}</td>
										<For each={years()}>{(y, idx) => (
											<td
												class="text-right py-1 px-4"
												classList={{ "rounded-r-lg": idx() === years().length - 1 }}
											>
												{depto.population[y]}
											</td>
										)}</For>
									</tr>
								)}</For>
							</tbody>
						</table>
					</div>
				</>
			)}</Show>
		</div>
	);
}
