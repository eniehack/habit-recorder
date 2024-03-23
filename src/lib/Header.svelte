<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { base } from '$app/paths';
</script>

<header>
	<Navbar>
		<NavBrand href="{base}/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>habit recorder</span
			>
		</NavBrand>
		<NavHamburger />
		<NavUl>
			<NavLi href="{base}/account">アカウント設定</NavLi>
			<NavLi href="{base}/graph/new">グラフの新規作成</NavLi>
		</NavUl>
	</Navbar>
</header>
