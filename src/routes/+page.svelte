<script lang="ts">
	import { account, graph } from '$lib/store';

  const done = async (graphId: string) => {
    if (typeof $account === 'undefined') return;
	  const recordEndpoint = new URL(`/v1/users/${$account.name}/graphs/${graphId}/increment`);
	  const resp = await fetch(recordEndpoint, {
	  	method: 'POST',
	  	headers: {
	  		'X-USER-TOKEN': $account.token,
	  		'Content-Length': "0",
	  	}
	  });
    if (!resp.ok) {
        console.error(resp)
    }
    window.alert("ok");
  }
</script>

{#if typeof $account === 'undefined'}
<p>
    アカウント設定が完了していません。
    <a href="/account">ここから</a>アカウント設定を行ってください。
</p>
{:else}
<p>{$account.name}</p>
{#if typeof $graph !== "undefined" && $graph.length !== 0}
	{#each $graph as graph}
		<div>
        <p>{graph.name}</p>
        <button on:click={() => done(graph.id)}>やった</button>
    </div>
	{/each}
{:else}
	<p>まだ何もありません。</p>
	<a href="/graph/new">グラフの新規作成</a>
{/if}

<a href="/account">pixe.laアカウント設定</a>
{/if}
