import { getName, getIdea } from './storeQuery';
import { describe, it, expect, beforeEach } from 'vitest';
import { Store, DataFactory } from 'n3';
import RDF from '$lib/nodes/rdf';
import RDFS from '$lib/nodes/rdfs';

const { namedNode, literal, quad } = DataFactory;

let store: Store;
beforeEach(() => {
	store = new Store();
});

describe('getName', () => {
	describe('when there is a name', () => {
		it('gets the name', () => {
			const iri = '#foo';
			const label = 'Foo';

			store.addQuad(namedNode(iri), RDFS.label, literal(label));
			expect(getName(store, namedNode(iri))).toEqual(label);
		});
	});
	describe('when there is no name', () => {
		it('returns the iri itself', () => {
			const iri = '#foo';
			expect(getName(store, namedNode(iri))).toEqual(iri);
		});
	});
});

describe('getIdea', () => {
	it('retrieves an idea from the store', () => {
		// Arrange
		const iri = '#idea';
		const name = 'Idea name';
		const description = 'Idea Description';
		const type1 = 'Idea type 1';
		const type2 = 'Idea type 2';
		const property1 = quad(namedNode(iri), namedNode('Property 1'), namedNode('Property Value 1'));
		const property2 = quad(namedNode(iri), namedNode('Property 2'), namedNode('Property Value 2'));

		store.addQuad(namedNode(iri), RDFS.label, literal(name));
		store.addQuad(namedNode(iri), RDFS.comment, literal(description));
		store.addQuad(namedNode(iri), RDF.type, namedNode(type1));
		store.addQuad(namedNode(iri), RDF.type, namedNode(type2));
		store.addQuad(property1);
		store.addQuad(property2);

		// Act
		const idea = getIdea(store, namedNode(iri));

		// Assert
		expect(idea.iri).toEqual(namedNode(iri));
		expect(idea.name).toEqual(name);
		expect(idea.description).toEqual(description);
		expect(idea.types.length).toEqual(2);
		expect(idea.types).toContainEqual(namedNode(type1));
		expect(idea.types).toContainEqual(namedNode(type2));
		expect(idea.otherProperties.length).toEqual(2);
		expect(idea.otherProperties).toContainEqual(property1);
		expect(idea.otherProperties).toContainEqual(property2);
	});
});
