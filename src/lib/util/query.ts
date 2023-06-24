/* 
	Currently, this file is becoming a mixture of two things:

	- re-usable N3 functions (possibly for a seperate library?)
	- A client for the ARX N3 store

	Once more patterns start to emerge, need to look to seperate these out.
	Some of the functions that could actually be generic are currently a bit 
	arx-specific.
*/

import type { Idea } from '$lib/types';

import type { Store as N3Store, NamedNode } from 'n3';
import RDF from '$lib/nodes/rdf';
import RDFS from '$lib/nodes/rdfs';
import ARX from '$lib/nodes/arx';

export function getName(store: N3Store, iri: NamedNode): string {
	return getNames(store, iri)[0] || iri.value;
}

export function getNames(store: N3Store, iri: NamedNode) {
	const labelIris = subPropertiesOf(store, RDFS.label);
	return labelIris.flatMap((labelIri) => store.getObjects(iri, labelIri, null)).map((l) => l.value);
}

// This should be moved
export function subPropertiesOf(store: N3Store, propertyIri: NamedNode): NamedNode[] {
	const directSubProperties = store.getSubjects(
		RDFS.subPropertyOf,
		propertyIri,
		null
	) as NamedNode[];

	if (!directSubProperties.length) {
		return [propertyIri];
	} else {
		return [propertyIri, ...directSubProperties.flatMap((c) => subPropertiesOf(store, c))];
	}
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

// TODO: Write test for this.
export function getAllIdeas(store: N3Store): Idea[] {
	const ideaIris = getIdeaIRIs(store);
	return ideaIris.map((iri) => getIdea(store, iri));
}

export function getIrisForType(store: N3Store, type: NamedNode): NamedNode[] {
	return store.getSubjects(RDF.type, type, null) as NamedNode[];
}

export function getIdeaIRIs(store: N3Store, ideaClass: NamedNode = ARX.Idea): NamedNode[] {
	const directSubClasses = store.getSubjects(RDFS.subClassOf, ideaClass, null) as NamedNode[];

	if (!directSubClasses.length) {
		return getIrisForType(store, ideaClass);
	} else {
		return [
			...getIrisForType(store, ideaClass),
			...directSubClasses.flatMap((c) => getIdeaIRIs(store, c))
		];
	}
}
