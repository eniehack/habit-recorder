<script lang="ts">
	import { account, graph, type GraphInfo } from '$lib/store';
	import { onMount } from 'svelte';
	let username: string;
	let token: string;

	const submit = async () => {
		account.set({ name: username, token });
		const resp = await fetch(`https://pixe.la/v1/users/${username}/graphs`, {
			headers: {
				'X-USER-TOKEN': token
			}
		});
		if (!resp.ok) {
			console.error(resp.ok, await resp.json());
			return;
		}
		const json = (await resp.json()) satisfies { graphs: { id: string; name: string }[] };
		const graphs: GraphInfo = [];
		for (const graph of json['graphs']) {
			graphs.push({ id: graph['id'], name: graph['name'] });
		}
    $graph = graphs;
		window.alert('ok');
	};

	onMount(() => {
		if (typeof $account !== 'undefined') {
			username = $account.name;
			token = $account.token;
		}
	});
</script>

<label for="username">ユーザID</label>
<input type="text" name="username" bind:value={username} />
<label for="usertoken">トークン</label>
<input type="password" name="usertoken" bind:value={token} />
<button type="submit" on:click={submit}>保存</button>
