import { EdgeDefinition, NodeDataDefinition, NodeDefinition } from 'cytoscape';

export enum Classes {
    ENTITY = 'entity',
    ATTRIBUTE = 'attribute',
}

export interface NodeData extends NodeDataDefinition {
}

export interface Attribute extends NodeDefinition {
    classes: Classes;
    grabbable: boolean;
}

export interface TAttribute {
    [key: string]: any;
}

export interface Entity extends NodeDefinition {
    classes: Classes;
    grabbable?: boolean;
}

export interface Edge extends EdgeDefinition {
}