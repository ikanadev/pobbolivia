import { Show } from "solid-js";
import { A } from "@solidjs/router";
import * as styles from "./Title.css";

interface Props {
	text: string;
	backLink?: string;
}
export default function Depto(props: Props) {
	return (
		<div class={styles.container}>
			<Show when={props.backLink}>{(link) => (
				<A href={link()} class={styles.backLink}>←</A>
			)}</Show>
			<h1 class={styles.title}>{props.text}</h1>
		</div>
	);
}
