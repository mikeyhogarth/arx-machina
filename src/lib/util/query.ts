/* 
	Currently, this file is becoming a mixture of two things:

	- re-usable N3 functions (possibly for a seperate library?)
	- A client for the ARX N3 store

	Once more patterns start to emerge, need to look to seperate these out.
	Some of the functions that could actually be generic are currently a bit 
	arx-specific.
*/

import type { Idea } from '$lib/types';
import { subPropertiesOf } from './rdfUtils';
import type { Store as N3Store, NamedNode } from 'n3';
import RDF from '$lib/nodes/rdf';
import RDFS from '$lib/nodes/rdfs';
import ARX from '$lib/nodes/arx';

export function getName(store: N3Store, iri: NamedNode): string {
	return getNames(store, iri)[0] || iri.value;
}

export function getNames(store: N3Store, iri: NamedNode): string[] {
	return getValuesForProperties(store, iri, subPropertiesOf(store, RDFS.label));
}

export function getDescriptions(store: N3Store, iri: NamedNode): string[] {
	return getValuesForProperties(store, iri, subPropertiesOf(store, RDFS.comment));
}

export function getDescription(store: N3Store, iri: NamedNode): string {
	return getDescriptions(store, iri)[0];
}

export function getTypes(store: N3Store, iri: NamedNode): NamedNode[] {
	return store.getObjects(iri, RDF.type, null) as NamedNode[];
}

// Extract to generic place
export function getValuesForProperties(store: N3Store, iri: NamedNode, properties: NamedNode[]) {
	return properties.flatMap((p) => store.getObjects(iri, p, null)).map((o) => o.value);
}

// Extract to generic place
export function getValueForProperties(store: N3Store, iri: NamedNode, properties: NamedNode[]) {
	return getValuesForProperties(store, iri, properties)[0];
}

export function getIdea(store: N3Store, iri: NamedNode): Idea {
	return {
		iri,
		name: getName(store, iri),
		description: getDescription(store, iri),
		flavourText: getValueForProperties(store, iri, [ARX.flavourText]),
		types: getTypes(store, iri),
		otherProperties: otherProperties(store, iri)
	};
}

// Return properties that are not name, description or type.
export function otherProperties(store: N3Store, iri: NamedNode) {
	const keyProps = [
		RDF.type,
		RDFS.subClassOf,
		RDFS.subPropertyOf,
		ARX.flavourText,
		...subPropertiesOf(store, RDFS.comment),
		...subPropertiesOf(store, RDFS.label)
	];

	return store
		.getQuads(iri, null, null, null)
		.filter((q) => !keyProps.map((p) => p.value).includes(q.predicate.value));
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
