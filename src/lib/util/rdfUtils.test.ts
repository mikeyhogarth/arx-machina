import { subPropertiesOf, subClassesOf } from './rdfUtils';
import { describe, it, expect, beforeEach } from 'vitest';
import { Store, DataFactory } from 'n3';
import RDFS from '$lib/nodes/rdfs';

const { namedNode } = DataFactory;

let store: Store;

beforeEach(() => {
	store = new Store();
});

describe('subPropertiesOf', () => {
	it('returns all subproperties of a given property', () => {
		store.addQuad(namedNode('foo'), RDFS.subPropertyOf, namedNode('bar'));
		store.addQuad(namedNode('bar'), RDFS.subPropertyOf, namedNode('baz'));

		const subProperties = subPropertiesOf(store, namedNode('baz'));

		expect(subProperties).toContainEqual(namedNode('foo'));
		expect(subProperties).toContainEqual(namedNode('bar'));
		expect(subProperties).toContainEqual(namedNode('baz'));
	});
});

describe('subClassesOf', () => {
	it('returns all subClasses of a given class', () => {
		store.addQuad(namedNode('foo'), RDFS.subClassOf, namedNode('bar'));
		store.addQuad(namedNode('bar'), RDFS.subClassOf, namedNode('baz'));

		const subClasses = subClassesOf(store, namedNode('baz'));

		expect(subClasses).toContainEqual(namedNode('foo'));
		expect(subClasses).toContainEqual(namedNode('bar'));
		expect(subClasses).toContainEqual(namedNode('baz'));
	});
});
