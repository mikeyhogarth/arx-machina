import type { PageLoad } from './$types';
import { DataFactory } from 'n3';
import { error } from '@sveltejs/kit';

const { namedNode } = DataFactory;

export const load = (({ params }) => {
	const iri = params.iri;
	if (iri) {
		return {
			iri: namedNode(iri)
		};
	} else {
		throw error(404);
	}
}) satisfies PageLoad;
