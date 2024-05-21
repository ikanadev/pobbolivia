import { MapPath, MapText } from "@/components";
import type { PopulationMapBase, SvgBox } from "@/domain";
import { populationColor } from "@/utils";
import { For, createMemo } from "solid-js";
import { createStore } from "solid-js/store";

const initialBox = () => ({
	x0: Number.POSITIVE_INFINITY,
	y0: Number.POSITIVE_INFINITY,
	x1: Number.NEGATIVE_INFINITY,
	y1: Number.NEGATIVE_INFINITY,
});

type Props = {
	populationMaps: PopulationMapBase[];
	onClickMapSection: (id: string) => void;
	year: string;
};
export default function PopulationMap(props: Props) {
	const [box, setBox] = createStore<SvgBox>(initialBox());

	const svgBox = () => `${box.x0} ${box.y0} ${box.x1 - box.x0} ${box.y1 - box.y0}`;

	const max = createMemo(() => {
		let max = 0;
		for (const popMap of props.populationMaps) {
			max = Math.max(max, popMap.population[props.year]);
		}
		return max;
	});

	return (
		<svg viewBox={svgBox()} class="w-full max-w-xl max-h-3xl" style="">
			<title>Bolivia</title>
			<For each={props.populationMaps}>{(popMap) => (
				<MapPath
					popMap={popMap}
					setBox={setBox}
					box={box}
					fill={populationColor(max(), popMap.population[props.year])}
					onClickMapSection={props.onClickMapSection}
				/>
			)}</For>
			<For each={props.populationMaps}>{(popMap, idx) => (
				<MapText
					popMap={popMap}
					fontSize={(box.x1 - box.x0) / 20}
					onClickText={props.onClickMapSection}
					idx={idx()}
				/>
			)}</For>
		</svg>
	);
}
