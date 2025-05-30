import { EdgeDefinition, NodeDefinition } from 'cytoscape';

export enum Classes {
    ENTITY = 'entity',
    ATTRIBUTE = 'attribute',
}

export interface Attribute extends NodeDefinition {
    classes: Classes;
    grabbable: boolean;
}

export interface TAttribute {
    name: string;
    type: string;
    isPK: boolean;
    divKeyId: string | null;
    key: string | null;
    desc?: string;
    [key: string]: any;
}

export interface TAttributeRow extends TAttribute {
    rowNumber: number;
}

export interface Entity extends NodeDefinition {
    classes: Classes;
    grabbable?: boolean;
}

export interface Edge extends EdgeDefinition {}

export interface InfoRelation {
    sources: EdgeDefinition | null;
    targets: EdgeDefinition | null;
}
