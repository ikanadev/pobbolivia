import { For, Show } from "solid-js";
import type { PopulationMapBase } from "@/domain";
import { numberFormat } from "@/domain";

type PercentChangeProps = {
	start: number;
	end: number;
}
function PercentChange(props: PercentChangeProps) {
	const percent = () => {
		return ((props.end - props.start) / props.start) * 100;
	};
	return (
		<Show when={props.start > 0 && props.end > 0}>
			<span class="text-xs font-semibold" classList={{ "text-red-500": percent() < 0, "text-green-600": percent() > 0 }}>
				{percent().toFixed(2)}%
			</span>
		</Show>
	);
}

type Props = {
	populationMaps: PopulationMapBase[];
	years: string[];
	type: string;
};
export default function PopulationTable(props: Props) {
	return (
		<table class="mt-8 table-auto mx-auto text-sm md:text-base">
			<thead>
				<tr>
					<th class="py-1 px-2">Nro.</th>
					<th class="py-1 px-2 text-left">{props.type}</th>
					<For each={props.years}>{(y, idx) => (
						<>
							<th class="text-right py-1 px-2">{y}</th>
							<Show when={idx() > 0}>
								<th class="text-left py-1">Crec.</th>
							</Show>
						</>
					)}</For>
				</tr>
			</thead>
			<tbody>
				<For each={props.populationMaps}>{(depto, idx) => (
					<tr class="border-t border-slate-300">
						<td class="py-1 px-2">{idx() + 1}</td>
						<td class="py-1 px-2">{depto.name}</td>
						<For each={props.years}>{(y, idx) => (
							<>
								<td class="text-right py-1 px-2">
									{numberFormat(depto.population[y])}
								</td>
								<Show when={idx() > 0}>
									<td class="text-left py-1">
										<PercentChange
											start={depto.population[props.years[idx() - 1]]}
											end={depto.population[props.years[idx()]]}
										/>
									</td>
								</Show>
							</>
						)}</For>
					</tr>
				)}</For>
			</tbody>
		</table>
	);
}
