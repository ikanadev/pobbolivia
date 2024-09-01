import type { Coords } from "@/domain";
import * as d3 from "d3";
import { themeStatus } from "@/domain";

export function populationColor(max: number, value: number) {
	const isDark = themeStatus.isDark();
	const minColor = isDark ? "#0b0b8a20" : "#0b0baf40";
	const maxColor = isDark ? "#7b7bff80" : "#0b0baf90";
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
