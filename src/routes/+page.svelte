<script lang="ts">
	import { account, graph } from '$lib/store';
	import { base } from '$app/paths';
	import { Button, Card } from 'flowbite-svelte';

	const done = async (graphId: string) => {
		if (typeof $account === 'undefined') return;
		const recordEndpoint = new URL(`/v1/users/${$account.name}/graphs/${graphId}/increment`);
		const resp = await fetch(recordEndpoint, {
			method: 'POST',
			headers: {
				'X-USER-TOKEN': $account.token,
				'Content-Length': '0'
			}
		});
		if (!resp.ok) {
			console.error(resp);
		}
		window.alert('ok');
	};
</script>

{#if typeof $account === 'undefined'}
	<p>
		アカウント設定が完了していません。
		<a href="{base}/account">ここから</a>アカウント設定を行ってください。
	</p>
{:else if typeof $graph !== 'undefined' && $graph.length !== 0}
	{#each $graph as graph}
		<Card class="space-y-4">
			<h2>{graph.name}</h2>
			<a
				class="inline-flex items-center text-primary-600 hover:underline"
				href={`https://pixe.la/v1/users/${$account.name}/graphs/${graph.id}.html`}
				rel="noopener noreferer">heatmapを見る</a
			>
			<Button on:click={() => done(graph.id)}>やった</Button>
		</Card>
	{/each}
{:else}
	<p>まだ何もありません。</p>
	<a href="{base}/graph/new">グラフの新規作成</a>
{/if}
