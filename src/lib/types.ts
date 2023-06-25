import type { NamedNode, Quad } from 'n3';

export interface Idea {
	iri: NamedNode;
	name: string;
	description?: string;
	flavourText?: string;
	types: NamedNode[];
	otherProperties: Quad[];
}
