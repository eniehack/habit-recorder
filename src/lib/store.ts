import { type Writable, writable } from 'svelte/store';
import z from 'zod';

const userInfo = z.object({
	name: z.string(),
	token: z.string()
});
export type UserInfo = z.infer<typeof userInfo>;

const graphInfo = z.array(
	z.object({
		id: z.string(),
		name: z.string()
	})
);
export type GraphInfo = z.infer<typeof graphInfo>;

export const account: Writable<UserInfo | undefined> = writable();
export const graph: Writable<GraphInfo | undefined> = writable();
