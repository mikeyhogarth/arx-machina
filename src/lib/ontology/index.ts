import { Store, Parser, NamedNode } from 'n3';

// Core ontologies
import baseOntology from './ontology-core.ttl?raw';
import characterOntology from './character-core.ttl?raw';
import creatureOntology from './creature-core.ttl?raw';
import locationOntology from './location-core.ttl?raw';

const coreOntology = [baseOntology, characterOntology, creatureOntology, locationOntology].join(
	'\n'
);
const parser = new Parser();

function createCoreOntology() {
	const store = new Store();
	parser.parse(coreOntology, (error, quad) => {
		if (error) console.error(error);
		if (quad) store.addQuad(quad.subject, quad.predicate, quad.object, new NamedNode('#ontology'));
	});
	return { store };
}

export const { store } = createCoreOntology();
