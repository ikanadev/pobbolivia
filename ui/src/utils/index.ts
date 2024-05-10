import type { Coords } from "@/domain";
import * as d3 from "d3";

export function populationColor(max: number, value: number) {
	const minColor = "#f1f5f9";
	const maxColor = "#94a3b8";
	const interpolationValue = value / max;
	return d3.interpolateRgb(minColor, maxColor)(interpolationValue);
}

export function buildFeature(coords: Coords): d3.ExtendedFeature {
	return {
		type: "Feature",
		properties: {},
		geometry: {
			type: "MultiPolygon",
			coordinates: coords,
		},
	};
}

export const projection = d3.geoEquirectangular().scale(2000);
export const pathGenerator = d3.geoPath().projection(projection);
