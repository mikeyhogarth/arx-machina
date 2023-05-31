import { writable } from 'svelte/store';

interface Package {
	href: string;
}

function createPackageStore() {
	const { subscribe, set, update } = writable<Package[]>([]);

	return {
		subscribe,
		addPackage: (href: string) => update((curr) => [...curr, { href }]),
		removePackage: (href: string) => update((curr) => curr.filter((v) => v.href != href)),
		reset: () => set([])
	};
}

export default createPackageStore();
