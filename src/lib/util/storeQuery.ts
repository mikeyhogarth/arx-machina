// Probably better places for these functions

import type { Idea } from '$lib/types';

import type { Store as N3Store, NamedNode } from 'n3';
import RDF from '$lib/nodes/rdf';
import RDFS from '$lib/nodes/rdfs';

export function getName(store: N3Store, iri: NamedNode) {
	return [...store.getObjects(iri, RDFS.label, null)][0]?.value || iri.value;
}

export function getDescription(store: N3Store, iri: NamedNode) {
	return [...store.getObjects(iri, RDFS.comment, null)][0]?.value || undefined;
}

export function getTypes(store: N3Store, iri: NamedNode): NamedNode[] {
	return store.getObjects(iri, RDF.type, null) as NamedNode[];
}

// Return properties that are not name, description or type.
export function otherProperties(store: N3Store, iri: NamedNode) {
	return store
		.getQuads(iri, null, null, null)
		.filter(
			(q) =>
				!q.predicate.equals(RDF.type) &&
				!q.predicate.equals(RDFS.comment) &&
				!q.predicate.equals(RDFS.label)
		);
}

export function getIdea(store: N3Store, iri: NamedNode): Idea {
	return {
		iri,
		name: getName(store, iri),
		description: getDescription(store, iri),
		types: getTypes(store, iri),
		otherProperties: otherProperties(store, iri)
	};
}
