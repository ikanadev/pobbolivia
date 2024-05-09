import { createResource, createEffect } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import { fetchCoords } from "@/api";
import type { SvgBox, PopulationMapBase } from "@/domain";
import { buildFeature, pathGenerator } from "@/utils";


type Props = {
	popMap: PopulationMapBase;
	onClickMapSection: (id: string) => void;
	fill: string;
	setBox: SetStoreFunction<SvgBox>;
	box: SvgBox;
};
export default function MapPath(props: Props) {
	const [coords] = createResource(() => props.popMap.id, fetchCoords, { initialValue: [] });

	const feature = () => buildFeature(coords());

	createEffect(() => {
		if (coords().length > 0) {
			const bounds = pathGenerator.bounds(feature());
			if (bounds[0][0] < props.box.x0) {
				props.setBox('x0', Math.floor(bounds[0][0]));
			}
			if (bounds[0][1] < props.box.y0) {
				props.setBox('y0', Math.floor(bounds[0][1]));
			}
			if (bounds[1][0] > props.box.x1) {
				props.setBox('x1', Math.ceil(bounds[1][0]));
			}
			if (bounds[1][1] > props.box.y1) {
				props.setBox('y1', Math.ceil(bounds[1][1]));
			}
		}
	});

	return (
		<path
			onClick={() => props.onClickMapSection(props.popMap.id)}
			d={pathGenerator(feature()) ?? ""}
			fill={props.fill}
			class="cursor-pointer z-10"
			stroke="#fff"
			stroke-width="0.2"
		/>
	);
};
