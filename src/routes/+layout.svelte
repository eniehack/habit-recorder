<script lang="ts">
	import { browser } from '$app/environment';
	import { account, graph } from '$lib/store';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import Header from '$lib/Header.svelte';
	import '../app.css';

	let accountSubscriber: Unsubscriber | null = null;
	let graphSubscriber: Unsubscriber | null = null;
	if (browser) {
		account.update((_acc) => {
			const pixelaObj = localStorage.getItem('pixela_account');
			if (pixelaObj === null) {
				return { name: undefined, token: undefined };
			}
			return JSON.parse(pixelaObj);
		});
		graph.update((_g) => {
			const pixelaObj = localStorage.getItem('pixela_graph');
			if (pixelaObj === null) {
				return [];
			}
			return JSON.parse(pixelaObj);
		});
		accountSubscriber = account.subscribe((acc) => {
			localStorage.setItem('pixela_account', JSON.stringify(acc));
		});
		graphSubscriber = graph.subscribe((g) => {
			localStorage.setItem('pixela_graph', JSON.stringify(g));
		});
	}

	onDestroy(() => {
		if (accountSubscriber !== null) {
			accountSubscriber();
		}
		if (graphSubscriber !== null) {
			graphSubscriber();
		}
	});
</script>

<Header />
<main>
	<div class="container mx-auto">
		<slot />
	</div>
</main>
