import type { ParentProps } from "solid-js";

export default function Layout(props: ParentProps) {
	return (
		<div class="mx-auto w-6xl max-w-full py-4 px-1">
			{props.children}
			<div class="mt-8 w-full border-t border-slate-400 flex justify-between">
				<p>
					Creado por <a class="text-blue-600" href="https://github.com/ikanadev" target="_blank" rel="noreferrer">ikana</a>
				</p>
				<p>
					Datos extraídos de <a
						class="text-blue-600"
						href="https://geonodeiigeo.umsa.bo/layers/?title__icontains=censo&abstract__icontains=censo&purpose__icontains=censo&f_method=or&limit=5&offset=0"
						target="_blank"
						rel="noreferrer"
					>IIGEO-UMSA</a>
				</p>
			</div>
		</div>
	);
}
