import {
	getName,
	getDescription,
	getDescriptions,
	getNames,
	getIdea,
	getIdeaIRIs,
	getAllIdeas
} from './query';
import { describe, it, expect, beforeEach } from 'vitest';
import { Store, DataFactory } from 'n3';

import RDF from '$lib/nodes/rdf';
import RDFS from '$lib/nodes/rdfs';
import ARX from '$lib/nodes/arx';
import { store as coreOntology } from '$lib/ontology';

const { namedNode, literal, quad } = DataFactory;

let store: Store;
beforeEach(() => {
	store = new Store(coreOntology.getQuads(null, null, null, null));
});

describe('getName', () => {
	it('Returns one of the names', () => {
		const iri = '#foo';
		const label = 'Foo';

		store.addQuad(namedNode(iri), RDFS.label, literal(label));
		store.addQuad(namedNode(iri), ARX.name, literal(label));

		expect(getName(store, namedNode(iri))).toEqual(label);
	});

	describe('when there is no name', () => {
		it('returns the iri itself', () => {
			const iri = '#foo';
			expect(getName(store, namedNode(iri))).toEqual(iri);
		});
	});
});

describe('getNames', () => {
	describe('when there is an RDFS label', () => {
		it('uses that for the name', () => {
			const iri = '#foo';
			const label = 'Foo';

			store.addQuad(namedNode(iri), RDFS.label, literal(label));
			expect(getNames(store, namedNode(iri))).toEqual([label]);
		});
	});

	describe('when there is an ARX.name', () => {
		it('uses that for the name', () => {
			const iri = '#foo';
			const label = 'Foo';

			store.addQuad(namedNode(iri), ARX.name, literal(label));
			expect(getNames(store, namedNode(iri))).toEqual([label]);
		});
	});

	describe('when there are multiple names', () => {
		it('returns them all', () => {
			const iri = '#foo';
			const label1 = 'Foo1';
			const label2 = 'Foo2';
			const label3 = 'Foo3';

			store.addQuad(namedNode(iri), ARX.name, literal(label1));
			store.addQuad(namedNode(iri), RDFS.label, literal(label2));
			store.addQuad(namedNode(iri), ARX.name, literal(label3));

			const names = getNames(store, namedNode(iri));

			expect(names).toContainEqual(label1);
			expect(names).toContainEqual(label2);
			expect(names).toContainEqual(label3);
		});
	});
});

describe('getDescription', () => {
	describe('when there is an ARX description', () => {
		it('returns that description', () => {
			// Arrange
			const iri = '#foo';
			const description = 'Foo';

			// Act
			store.addQuad(namedNode(iri), ARX.description, literal(description));

			// Assert
			expect(getDescription(store, namedNode(iri))).toEqual(description);
		});
	});

	describe('when there is no description', () => {
		it('returns falsey', () => {
			const iri = '#foo';
			expect(getDescription(store, namedNode(iri))).toBeFalsy();
		});
	});
});

describe('getDescriptions', () => {
	describe('returns all descriptions', () => {
		it('returns that description', () => {
			// Arrange
			const iri = '#foo';
			const description1 = 'Foo';
			const description2 = 'Bar';

			// Act
			store.addQuad(namedNode(iri), ARX.description, literal(description1));
			store.addQuad(namedNode(iri), RDFS.comment, literal(description2));

			// Assert
			const descriptions = getDescriptions(store, namedNode(iri));
			expect(descriptions).toContainEqual(description1);
			expect(descriptions).toContainEqual(description2);
		});
	});

	describe('when there is no description', () => {
		it('returns falsey', () => {
			const iri = '#foo';
			expect(getDescription(store, namedNode(iri))).toBeFalsy();
		});
	});
});

describe('getAllIdeas', () => {
	it('returns all ideas from the graph', () => {
		// Arrange
		const idea1 = namedNode('idea 1');
		const idea2 = namedNode('idea 2');
		store.addQuad(idea1, RDF.type, ARX.Idea);
		store.addQuad(idea2, RDF.type, ARX.Idea);

		// Act
		const ideas = getAllIdeas(store);

		// Assert
		expect(ideas.length).toEqual(2);
		expect(ideas[0].name).toEqual('idea 1');
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
		const flavourText = 'Flavour Text';
		const property1 = quad(namedNode(iri), namedNode('Property 1'), namedNode('Property Value 1'));
		const property2 = quad(namedNode(iri), namedNode('Property 2'), namedNode('Property Value 2'));

		store.addQuad(namedNode(iri), ARX.name, literal(name));
		store.addQuad(namedNode(iri), ARX.description, literal(description));
		store.addQuad(namedNode(iri), RDF.type, namedNode(type1));
		store.addQuad(namedNode(iri), RDF.type, namedNode(type2));
		store.addQuad(namedNode(iri), ARX.flavourText, literal(flavourText));
		store.addQuad(property1);
		store.addQuad(property2);

		// Act
		const idea = getIdea(store, namedNode(iri));

		// Assert
		expect(idea.iri).toEqual(namedNode(iri));
		expect(idea.name).toEqual(name);
		expect(idea.description).toEqual(description);
		expect(idea.flavourText).toEqual('Flavour Text');
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
