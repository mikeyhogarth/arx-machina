// Core ontologies
import baseOntology from './ttl/ontology-core.ttl?raw';
import characterOntology from './ttl/character-core.ttl?raw';
import creatureOntology from './ttl/creature-core.ttl?raw';
import locationOntology from './ttl/location-core.ttl?raw';

export default [baseOntology, characterOntology, creatureOntology, locationOntology].join('\n');
