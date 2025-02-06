export interface AttributeJSON {
    name: string;
    [key: string]: any;
}

export interface EntityJSON {
    name: string;
    columns: AttributeJSON[];
    [key: string]: any;
}

export interface SourceTargetJSON {
    table: string;
    field: string;
}

export interface ReferenceJSON {
    source: SourceTargetJSON;
    target: SourceTargetJSON;
    type: string;
}

export interface InputJSON {
    entities: EntityJSON[];
    references: ReferenceJSON[];
}