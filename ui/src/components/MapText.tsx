import { createResource } from "solid-js";
import { fetchCoords } from "@/api";
import type { PopulationMapBase } from "@/domain";
import { buildFeature, pathGenerator } from "@/utils";

type Props = {
	popMap: PopulationMapBase;
	onClickText: (id: string) => void;
	fontSize: number;
	idx: number;
};
export default function MapText(props: Props) {
	const [coords] = createResource(() => props.popMap.id, fetchCoords, { initialValue: [] });

	const feature = () => buildFeature(coords());
	const centroid = () => pathGenerator.centroid(feature());

	return (
		<text
			x={centroid()[0]}
			y={centroid()[1]}
			class="cursor-pointer"
			fill="#1e293b"
			text-anchor="middle"
			dominant-baseline="central"
			font-size={props.fontSize.toString()}
			onClick={() => props.onClickText(props.popMap.id)}
		>
			{props.idx + 1}
		</text>
	);
};
