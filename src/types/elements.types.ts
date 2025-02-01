export enum Classes {
    ENTITY = 'entity',
    ATTRIBUTE = 'attribute',
}

export interface NodeData {
    id: string;
    label: string;
}

export interface Entity {
    data: NodeData;
    classes: Classes;
    grabbable?: boolean;
}

export interface Attribute {
    data: NodeData & { parent: string }
    classes: Classes;
    grabbable: boolean;
}

export interface EdgeData {
    source: string;
    target: string;
    label: string;
}

export interface Edge {
    data: EdgeData;
}