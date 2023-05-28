import { writable } from 'svelte/store';

interface Vision {
    href: string;
}

function createVisionStore() {
	const { subscribe, set, update } = writable<Vision[]>([]);

	return {
		subscribe,
        addVision: (href: string) => update(curr => [...curr, { href }]),
		removeVision: (href: string) => update(curr => curr.filter(v => v.href != href)),
		reset: () => set([])
	};
}

export default createVisionStore();