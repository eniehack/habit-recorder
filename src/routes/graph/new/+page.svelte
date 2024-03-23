<script lang="ts">
	import { account } from '$lib/store';

	let graphId: string;
	let graphName: string;

	const submit = async () => {
		if (typeof $account === 'undefined') return;
		const resp = await fetch(`https://pixe.la/v1/users/${$account.name}/graphs`, {
			method: 'POST',
			headers: {
				'X-USER-TOKEN': $account.token
			},
			body: JSON.stringify({
				id: graphId,
				name: graphName,
				type: 'int',
				unit: 'commit',
				color: 'shibafu'
			})
		});
		if (!resp.ok) {
			console.error(resp.ok, await resp.json());
			return;
		}
		window.alert('ok');
	};
</script>

<h1>グラフの新規作成</h1>
<label for="graph_id">グラフのID</label>
<input type="text" name="graph_id" bind:value={graphId} />
<label for="graph_name">名前</label>
<input type="text" name="graph_name" bind:value={graphName} />
<button type="submit" on:click={submit}>作成</button>
