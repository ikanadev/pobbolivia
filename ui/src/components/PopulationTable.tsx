import { For } from "solid-js";
import type { PopulationMapBase } from "@/domain";
import { numberFormat } from "@/domain";

type Props = {
	populationMaps: PopulationMapBase[];
	years: string[];
	type: string;
};
export default function PopulationTable(props: Props) {

	return (
		<table class="mt-8 table-auto mx-auto">
			<thead>
				<tr>
					<th class="py-1 px-4">Nro.</th>
					<th class="py-1 px-4">{props.type}</th>
					<For each={props.years}>{(y) => (
						<th class="text-right py-1 px-4">{y}</th>
					)}</For>
				</tr>
			</thead>
			<tbody>
				<For each={props.populationMaps}>{(depto, idx) => (
					<tr
						class=""
						classList={{ "bg-slate-200": idx() % 2 === 0 }}
					>
						<td class="rounded-l-lg py-1 px-4">{idx() + 1}</td>
						<td class="py-1 px-4">{depto.name}</td>
						<For each={props.years}>{(y, idx) => (
							<td
								class="text-right py-1 px-4"
								classList={{ "rounded-r-lg": idx() === props.years.length - 1 }}
							>
								{numberFormat(depto.population[y])}
							</td>
						)}</For>
					</tr>
				)}</For>
			</tbody>
		</table>
	);
}
