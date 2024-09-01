import { createResource, Show } from "solid-js";
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
	const [coords] = createResource(() => props.popMap.id, fetchCoords, {
		initialValue: [],
	});

	const feature = () => buildFeature(coords());
	const centroid = () => pathGenerator.centroid(feature());

	return (
		<Show when={coords().length > 0}>
			{(_) => (
				<text
					x={centroid()[0]}
					y={centroid()[1]}
					style="user-select: none; cursor: pointer;"
					fill="currentColor"
					text-anchor="middle"
					dominant-baseline="central"
					font-size={props.fontSize.toString()}
					onClick={() => props.onClickText(props.popMap.id)}
				>
					{props.idx + 1}
				</text>
			)}
		</Show>
	);
}
