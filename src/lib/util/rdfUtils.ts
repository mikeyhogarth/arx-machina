import type { Store, NamedNode } from 'n3';
import RDFS from '$lib/nodes/rdfs';

function getHeirachy(store: Store, root: NamedNode, relationship: NamedNode): NamedNode[] {
	const descendents = store.getSubjects(relationship, root, null) as NamedNode[];

	if (!descendents.length) {
		return [root];
	} else {
		return [root, ...descendents.flatMap((c) => getHeirachy(store, c, relationship))];
	}
}

/**
 * subPropertiesOf
 * @param store
 * @param propertyIri
 * @returns all sub properties of a given property, including the proprety itself.
 */
export function subPropertiesOf(store: Store, propertyIri: NamedNode): NamedNode[] {
	return getHeirachy(store, propertyIri, RDFS.subPropertyOf);
}

/**
 * subClassesOf
 * @param store
 * @param propertyIri
 * @returns all subclasses of a given class, including the class itself.
 */
export function subClassesOf(store: Store, iri: NamedNode): NamedNode[] {
	return getHeirachy(store, iri, RDFS.subClassOf);
}
