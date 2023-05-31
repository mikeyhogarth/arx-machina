import { RDFS as ns } from '../namespaces';
import { NamedNode } from 'n3';

// TODO: probably an easier way than this haha
export default {
	label: new NamedNode(ns + `label`)
};
