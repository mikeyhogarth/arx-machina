import { ARX as ns } from '../namespaces';
import { NamedNode } from 'n3';

// TODO: probably an easier way than this haha
export default {
	name: new NamedNode(ns + `name`),
	description: new NamedNode(ns + `description`),
	Location: new NamedNode(ns + `Location`)
};
