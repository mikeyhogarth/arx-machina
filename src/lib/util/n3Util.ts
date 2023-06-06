// Probably better places for these functions

import type { Store as N3Store, NamedNode } from 'n3';
import ARX from '$lib/nodes/arx';
import RDFS from '$lib/nodes/rdfs';

export function getName(store: N3Store, iri: NamedNode) {
	return (
		[...store.getObjects(iri, ARX.name, null), ...store.getObjects(iri, RDFS.label, null)][0]
			?.value || iri.value
	);
}
