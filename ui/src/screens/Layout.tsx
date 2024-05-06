import type { ParentProps } from "solid-js";

export default function Layout(props: ParentProps) {
	return (
		<div class="mx-auto w-6xl p-4">
			{props.children}
		</div>
	);
}
