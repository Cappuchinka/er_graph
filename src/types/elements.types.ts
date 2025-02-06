export enum Classes {
    ENTITY = 'entity',
    ATTRIBUTE = 'attribute',
}

export interface NodeData {
    id: string;
    parent?: string;
    [key: string]: any;
}

export interface Attribute {
    data: NodeData
    classes: Classes;
    grabbable: boolean;
}

export interface TAttribute {
    [key: string]: any;
}

export interface Entity {
    data: NodeData;
    classes: Classes;
    grabbable?: boolean;
}

export interface EdgeData {
    source: string;
    target: string;
    label: string;
}

export interface Edge {
    data: EdgeData;
}