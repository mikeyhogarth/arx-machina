// Core ontologies
import baseOntology from './ttl/ontology-core.ttl?raw';
import characterOntology from './ttl/character-core.ttl?raw';
import creatureOntology from './ttl/creature-core.ttl?raw';
import locationOntology from './ttl/location-core.ttl?raw';
import { Store, Parser, DataFactory } from 'n3';
const { namedNode } = DataFactory;

export const raw = [baseOntology, characterOntology, creatureOntology, locationOntology].join('\n');

export const store = new Store();
const parser = new Parser();

parser.parse(raw, (error, quad) => {
	if (error) console.error(error);
	if (quad) store.addQuad(quad.subject, quad.predicate, quad.object, namedNode('#ontology'));
});
