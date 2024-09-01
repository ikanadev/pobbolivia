import { type ParentProps, createSignal, Show, onMount, For } from "solid-js";
import { lightTheme, darkTheme } from "@/theme.css";
import { themeStatus } from "@/domain";
import * as styles from "./layout.css";

const notes = [
	"El municipio Gutiérrez (prov. Cordillera, Santa Cruz) cambió de nombre a Kereimba Iyaambae, pero en el mapa se muestra como Gutiérrez",
	"El municipio San Pedro de Macha (prov. Chayanta, Potosí) con 20933 hab., no se encuentra en el mapa al ser un municipio nuevo. La población de su municipio padre (Colquechaca) se vió reducida para el 2024.",
	"El municipio Jatun Ayllu (prov. Antonio Quijarro, Potosi) con 5013 hab., no se encuentra en el mapa al ser un municipio nuevo. La población de su municipio padre (Tomave) se vió reducida para el 2024.",
	"El Territorio Indígena Multiétnico T.I.M. (Beni) con 3950 hab., no se encuentra en el mapa debido al ser un municipio nuevo.",
	"El territorio indígena originario campesino de Raqaypampa (prov. Mizque, Cochabamba) con 8007 hab., no se encuentra en el mapa al ser un municipio nuevo. La población de su municipio padre (Mizque) se vió reducida para el 2024.",
];

const themeKey = "theme";
enum Theme {
	LIGHT = "light",
	DARK = "dark",
}

export default function Layout(props: ParentProps) {
	// const [isDark, setIsDark] = createSignal(true);
	const { isDark, setIsDark } = themeStatus;
	const [isOpen, setIsOpen] = createSignal(false);

	const toggleTheme = () => {
		setIsDark(!isDark());
		setAndSaveDocumentTheme();
	};

	const setAndSaveDocumentTheme = () => {
		const root = document.documentElement;
		root.className = isDark() ? darkTheme : lightTheme;
		localStorage.setItem(themeKey, isDark() ? Theme.DARK : Theme.LIGHT);
	};

	onMount(() => {
		const storedTheme = localStorage.getItem(themeKey);
		setIsDark(storedTheme === Theme.LIGHT ? false : true);
		setAndSaveDocumentTheme();
	});
	return (
		<>
			<Show when={isOpen()}>
				<div class={styles.modalBackdrop}>
					<div class={styles.modal}>
						<h2>Notas a considerar</h2>
						<ul class={styles.list}>
							<For each={notes}>{(note) => <li>{note}</li>}</For>
						</ul>
						<button
							type="button"
							class={styles.modalBtn}
							onClick={() => setIsOpen(false)}
						>
							Cerrar
						</button>
					</div>
				</div>
			</Show>
			<div class={styles.container}>
				<div class={styles.nav}>
					<button
						class={styles.navBtn}
						type="button"
						onClick={() => setIsOpen(true)}
					>
						Notas
					</button>
					<button
						class={styles.navThemeBtn}
						type="button"
						onClick={toggleTheme}
					>
						<Show
							when={isDark()}
							fallback={
								<svg
									class="nav__theme-icon"
									width="32"
									height="32"
									viewBox="0 0 256 256"
								>
									<title>Modo claro</title>
									<path
										fill="currentColor"
										d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0m8 24a64 64 0 1 0 64 64a64.07 64.07 0 0 0-64-64m-69.66 5.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8m80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8m112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16"
									/>
								</svg>
							}
						>
							<svg
								class="nav__theme-icon"
								width="32"
								height="32"
								viewBox="0 0 256 256"
							>
								<title>Modo oscuro</title>
								<path
									fill="currentColor"
									d="M235.54 150.21a104.84 104.84 0 0 1-37 52.91A104 104 0 0 1 32 120a103.1 103.1 0 0 1 20.88-62.52a104.84 104.84 0 0 1 52.91-37a8 8 0 0 1 10 10a88.08 88.08 0 0 0 109.8 109.8a8 8 0 0 1 10 10Z"
								/>
							</svg>
						</Show>
					</button>
				</div>
				{props.children}
			</div>
			<div class={styles.footerCont}>
				<footer class={styles.footer}>
					<p>
						Creado por{" "}
						<a
							class={styles.footerLink}
							href="https://github.com/ikanadev"
							target="_blank"
							rel="noreferrer"
						>
							ikana
						</a>
					</p>
					<p>
						Datos extraídos de{" "}
						<a
							class={styles.footerLink}
							href="https://geonodeiigeo.umsa.bo/layers/?title__icontains=censo&abstract__icontains=censo&purpose__icontains=censo&f_method=or&limit=5&offset=0"
							target="_blank"
							rel="noreferrer"
						>
							IIGEO-UMSA
						</a>
					</p>
				</footer>
			</div>
		</>
	);
}
