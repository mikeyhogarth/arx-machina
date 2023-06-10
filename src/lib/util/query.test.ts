import { getName, getIdea, getIdeaIRIs } from './query';
import { describe, it, expect, beforeEach } from 'vitest';
import { Store, DataFactory } from 'n3';
import RDF from '$lib/nodes/rdf';
import RDFS from '$lib/nodes/rdfs';
import ARX from '$lib/nodes/arx';

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

describe('getIdeaIRIs', () => {
	it('returns things that are of type ARX:Idea', () => {
		const idea1 = namedNode('idea 1');
		const idea2 = namedNode('idea 2');

		store.addQuad(idea1, RDF.type, ARX.Idea);
		store.addQuad(idea2, RDF.type, ARX.Idea);

		const ideas = getIdeaIRIs(store);

		expect(ideas.length).toEqual(2);
		expect(ideas).toContainEqual(idea1);
		expect(ideas).toContainEqual(idea2);
	});
	it('returns things that are direct rdfs subclasses of ARX:Idea', () => {
		const idea1 = namedNode('idea 1');
		const idea2 = namedNode('idea 2');
		const ideaType1 = namedNode('idea type 1');

		store.addQuad(ideaType1, RDFS.subClassOf, ARX.Idea);

		store.addQuad(idea1, RDF.type, ideaType1);
		store.addQuad(idea2, RDF.type, ideaType1);

		const ideas = getIdeaIRIs(store);

		expect(ideas).toContainEqual(idea1);
		expect(ideas).toContainEqual(idea2);
		expect(ideas.length).toEqual(2);
	});

	it('returns things that are deep subclasses of ARX:Idea', () => {
		const idea1 = namedNode('idea 1');
		const idea2 = namedNode('idea 2');
		const idea3 = namedNode('idea 3');
		const ideaType1 = namedNode('idea type 1');
		const ideaType2 = namedNode('idea type 2');

		store.addQuad(ideaType1, RDFS.subClassOf, ARX.Idea);
		store.addQuad(ideaType2, RDFS.subClassOf, ideaType1);

		store.addQuad(idea1, RDF.type, ARX.Idea);
		store.addQuad(idea2, RDF.type, ideaType1);
		store.addQuad(idea3, RDF.type, ideaType2);

		const ideas = getIdeaIRIs(store);

		expect(ideas).toContainEqual(idea1);
		expect(ideas).toContainEqual(idea2);
		expect(ideas).toContainEqual(idea3);
		expect(ideas.length).toEqual(3);
	});
});
