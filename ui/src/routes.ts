import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

export const routes: RouteDefinition[] = [
	{
		path: "/",
		component: lazy(() => import("./screens/Layout")),
		children: [
			{
				path: "/",
				component: lazy(() => import("./screens/Bolivia")),
			},
		],
	}
];
