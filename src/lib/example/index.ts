import { Store, Parser, NamedNode } from 'n3';

// Example creation
import example from './example.ttl?raw';

const parser = new Parser();

function createExampleStore() {
	const store = new Store();
	parser.parse(example, (error, quad) => {
		if (error) console.error(error);
		if (quad)
			store.addQuad(quad.subject, quad.predicate, quad.object, new NamedNode('#exampleGraph'));
	});

	return { store };
}

export const { store } = createExampleStore();
