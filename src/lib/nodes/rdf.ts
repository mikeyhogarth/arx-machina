import { RDF as ns } from '../namespaces';
import { NamedNode } from 'n3';

// TODO: probably an easier way than this haha
export default {
	type: new NamedNode(ns + `type`)
};
