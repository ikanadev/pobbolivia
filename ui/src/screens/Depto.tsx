import { createResource, Show, For, createEffect, createSignal } from "solid-js";
import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import { fetchCountryPopulation } from "@/api";
import { PopulationMap } from "@/components";
import type { Prov } from "@/domain";

export default function Depto(props: RouteSectionProps) {
	const navigate = useNavigate();
	const [deptos] = createResource(fetchCountryPopulation, { initialValue: [] });
	const depto = () => deptos().find((d) => d.id === props.params.deptoId);

	const [years, setYears] = createSignal<string[]>([]);
	const [year, setYear] = createSignal<string | null>(null);

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
					<Show when={depto()}>{(d) => (
						<h1 class="text-center text-3xl font-bold">{d().name}</h1>
					)}</Show>
					<div class="max-w-lg mx-auto mt-4">
						<PopulationMap
							populationMaps={sortedProvs()}
							year={y()}
							onClickMapSection={onSelectProv}
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
								<For each={sortedProvs()}>{(depto, idx) => (
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
