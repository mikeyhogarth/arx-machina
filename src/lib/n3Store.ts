import { Store, Parser, DataFactory } from 'n3';
import coreOntology from './ontology';
import axios from 'axios';
import type { DefaultGraph, Quad_Graph } from 'n3';
import { writable } from 'svelte/store';

const { namedNode, defaultGraph } = DataFactory;

function createN3Store() {
	const store = new Store();
	const parser = new Parser();
	const { subscribe, set } = writable(store);

	return {
		subscribe,
		async fetchDocument(url: string, graph: Quad_Graph | DefaultGraph) {
			try {
				const response = await axios.get(url);
				this.importDocument(response.data, graph);
			} catch (error) {
				console.error(error);
			} finally {
				set(store);
			}
		},
		importDocument(document: string, graph: Quad_Graph | DefaultGraph) {
			parser.parse(document, (error, quad) => {
				if (error) console.error(error);
				if (quad) store.addQuad(quad.subject, quad.predicate, quad.object, graph);
				if (!quad) set(store);
			});
		}
	};
}

// Temporarily import core ontology and example package here.
const store = createN3Store();
store.importDocument(coreOntology, namedNode('#ontology'));
store.fetchDocument('http://localhost:5173/example.ttl', defaultGraph());

export default store;
