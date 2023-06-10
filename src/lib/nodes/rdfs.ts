import { RDFS as ns } from '../namespaces';
import { DataFactory } from 'n3';

const { namedNode } = DataFactory;

// TODO: probably an easier way than this haha
export default {
	label: namedNode(ns + 'label'),
	comment: namedNode(ns + 'comment')
};
