import type { NamedNode, Quad } from 'n3';

export interface Idea {
	iri: NamedNode;
	name: string;
	description?: string;
	types: NamedNode[];
	otherProperties: Quad[];
}
