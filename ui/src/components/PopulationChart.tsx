import { For, onMount } from "solid-js";
import { type PopulationMapBase, numberAbbr } from "@/domain";
import {
	scaleLinear,
	scaleBand,
	axisBottom,
	axisLeft,
	select,
} from "d3";
import * as styles from "./PopulationChart.css";

const margin = { top: 10, right: 0, bottom: 200, left: 100 };
const size = {
	width: 1000,
	height: document.documentElement.clientWidth < 768 ? 500 : 600,
};

type Props = {
	populationMaps: PopulationMapBase[];
	years: string[];
};
export default function AgesBar(props: Props) {

	let gx: SVGGElement | undefined;
	let gy: SVGGElement | undefined;

	const max = props.populationMaps
		.reduce((sum, d) => {
			return Math.max(
				sum,
				props.years.reduce((max, year) => Math.max(max, d.population[year]), 0),
			);
		}, 0);

	const y = scaleLinear()
		.domain([0, max + max * 0.1])
		.range([size.height - margin.bottom, margin.top]);

	const x = scaleBand()
		.domain(props.populationMaps.map(m => m.name))
		.range([margin.left, size.width - margin.right])
		.padding(props.populationMaps.length > 5 ? 0.1 : 0.3);

	const xGroup = scaleBand()
		.domain(props.years)
		.range([0, x.bandwidth()]).padding(0.05);

	onMount(() => {
		if (!gy) return;
		select(gy).call(axisLeft(y).tickFormat(numberAbbr).tickSizeOuter(0));
		select(gy).selectAll(".domain").style("stroke-width", 1);
	});
	onMount(() => {
		if (!gx) return;
		select(gx).call(axisBottom(x).tickSizeOuter(3));
		select(gx).selectAll(".domain").style("stroke-width", 1);
		select(gx).selectAll("text").attr("transform", "translate(-5,0)rotate(-35)").style("text-anchor", "end");
	});

	return (
		<div class={styles.container}>
			<h2 class={styles.title}>Población ({props.years.join(", ")})</h2>
			<div class={styles.svgCont}>
				<svg
					class={styles.svg}
					viewBox={`0 0 ${size.width} ${size.height}`}
				>
					<title>Población</title>
					<For each={y.ticks()}>{(tick) => (
						<line
							y1={y(tick)}
							y2={y(tick)}
							x1={margin.left}
							x2={size.width - margin.right}
							stroke="currentColor"
							stroke-width="0.4"
							stroke-dasharray="20 6"
						/>
					)}</For>
					<For each={props.populationMaps}>
						{(popMap) => (
							<g transform={`translate(${x(popMap.name)}, 0)`}>
								<For each={props.years}>{(year) => (
									<rect
										y={y(popMap.population[year])}
										x={xGroup(year)}
										height={size.height - y(popMap.population[year]) - margin.bottom}
										width={xGroup.bandwidth()}
										fill="currentColor"
										rx={2}
									/>
								)}</For>
							</g>
						)}
					</For>
					<g class={styles.labelLeft} ref={gy} transform={`translate(${margin.left}, 0)`} />
					<g class={styles.labelBot} ref={gx} transform={`translate(0, ${size.height - margin.bottom})`} />
				</svg>
			</div>
		</div>
	);
}
