export interface AttributeJSON {
    name: string;
    type: string;
}

export interface EntityJSON {
    name: string;
    columns: AttributeJSON[];
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