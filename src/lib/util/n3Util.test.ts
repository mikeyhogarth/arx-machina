import { getName } from './n3Util';
import { describe, it, expect, beforeEach } from 'vitest';
import { Store, DataFactory } from 'n3';
import RDFS from '$lib/nodes/rdfs';
import type { l } from 'vitest/dist/index-5aad25c1';

const { namedNode, literal } = DataFactory;

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
