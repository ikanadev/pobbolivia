import * as styles from "./Loading.css";

export default function GeneralSkeleton() {
	return (
		<div class={styles.loaderCont}>
			<div class={styles.loader} />
		</div>
	);
}
