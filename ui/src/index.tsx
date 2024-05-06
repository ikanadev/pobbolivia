import { Router } from "@solidjs/router";
/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';
import App from './App';
import { routes } from './routes';

const root = document.getElementById('root')

if (!root) {
	throw new Error('No root element found')
}

render(() => (
	<Router root={App}>{routes}</Router>
), root)
