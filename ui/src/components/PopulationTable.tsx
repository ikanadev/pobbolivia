import { For, Show } from "solid-js";
import type { PopulationMapBase } from "@/domain";
import { numberFormat } from "@/domain";
import * as styles from "./PopulationTable.css";

type PercentChangeProps = {
	start: number;
	end: number;
};
function PercentChange(props: PercentChangeProps) {
	const percent = () => {
		return ((props.end - props.start) / props.start) * 100;
	};
	return (
		<Show when={props.start > 0 && props.end > 0}>
			<span
				class={styles.percent}
				classList={{
					[styles.percentNegative]: percent() < 0,
					[styles.percentPositive]: percent() > 0,
				}}
			>
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
		<div class={styles.container}>
			<table class={styles.table}>
				<thead>
					<tr>
						<th class={styles.tHeadCell}>Nro.</th>
						<th class={styles.tHeadCell}>{props.type}</th>
						<For each={props.years}>
							{(y, idx) => (
								<>
									<th class={styles.tHeadCellYear}>{y}</th>
									<Show when={idx() > 0}>
										<th class={styles.tHeadCellCrec}>%Crec.</th>
									</Show>
								</>
							)}
						</For>
					</tr>
				</thead>
				<tbody>
					<For each={props.populationMaps}>
						{(depto, idx) => (
							<tr class="">
								<td class={styles.tBodyCell}>{idx() + 1}</td>
								<td class={styles.tBodyCell}>{depto.name}</td>
								<For each={props.years}>
									{(y, idx) => (
										<>
											<td class={styles.tBodyCellPop}>
												{numberFormat(depto.population[y])}
											</td>
											<Show when={idx() > 0}>
												<td class={styles.tBodyCellCrec}>
													<PercentChange
														start={depto.population[props.years[idx() - 1]]}
														end={depto.population[props.years[idx()]]}
													/>
												</td>
											</Show>
										</>
									)}
								</For>
							</tr>
						)}
					</For>
				</tbody>
			</table>
		</div>
	);
}
