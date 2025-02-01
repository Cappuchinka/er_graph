import {Attribute, Classes, Edge, Entity} from '../types/elements.types.ts';
import {inputJSON} from "../types/json.types.ts";
import {ElementDefinition} from "cytoscape";

const formatter: {
    referenceTypeFormatter: (
        type: string,
    ) => string;
    JSONToElementFormatter: (
        json: inputJSON
    ) => ElementDefinition[];
} = {
    referenceTypeFormatter: (type: string) => {
        let result = '';
        switch (type) {
            case 'OneToOne':
                result = '1:1';
                break;
            case 'OneToMany':
                result = '1:N';
                break;
            case 'ManyToOne':
                result = 'N:1';
                break;
            case 'ManyToMany':
                result = 'N:N';
                break;
        }
        return result;
    },
    JSONToElementFormatter: (json: inputJSON) => {
        const entities: Entity[] = [];
        const attributes: Attribute[] = [];
        const edges: Edge[] = [];

        json.entities.map(entity => {
            entities.push({
                data: {
                    id: entity.name.toLowerCase(),
                    label: entity.name
                },
                classes: Classes.ENTITY,
                grabbable: true,
            });

            entity.columns.map(attr => {
                attributes.push({
                    data: {
                        id: `${entity.name.toLowerCase()}_${attr.name.toLowerCase()}`,
                        label: attr.name,
                        parent: entity.name.toLowerCase()
                    },
                    classes: Classes.ATTRIBUTE,
                    grabbable: false,
                });
            });
        });

        json.references.map(ref => {
            edges.push({
                data: {
                    source: `${ref.source.table}_${ref.source.field}`,
                    target: `${ref.target.table}_${ref.target.field}`,
                    label: formatter.referenceTypeFormatter(ref.type)
                }
            });
        });

        const elements: ElementDefinition[] = [];
        entities.map(entity => {
            elements.push(entity);
        });
        attributes.map(attr => {
            elements.push(attr);
        });
        edges.map(edge => {
            elements.push(edge);
        });
        return elements;
    }
};

export const useFormatter = () => {
    return formatter;
};