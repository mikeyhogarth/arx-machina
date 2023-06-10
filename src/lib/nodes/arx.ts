import { ARX as ns } from '../namespaces';
import { DataFactory } from 'n3';
const { namedNode } = DataFactory;

// TODO: probably an easier way than this haha
export default {
	name: namedNode(ns + `name`),
	description: namedNode(ns + `description`),
	Idea: namedNode(ns + `Idea`),
	Location: namedNode(ns + `Location`)
};
