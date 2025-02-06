import { Attribute, Classes, Edge, Entity } from '../types/elements.types.ts';
import { InputJSON } from '../types/json.types.ts';
import { ElementsDefinition } from 'cytoscape';

const formatter: {
    referenceTypeFormatter: (
        type: string,
    ) => string;
    JSONToElementFormatter: (
        json: InputJSON
    ) => ElementsDefinition;
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
    JSONToElementFormatter: (json: InputJSON) => {
        const entities: Entity[] = [];
        const attributes: Attribute[] = [];
        const edges: Edge[] = [];

        json.references.map(ref => {
            edges.push({
                data: {
                    source: `${ref.source.table}_${ref.source.field}`.toUpperCase(),
                    target: `${ref.target.table}_${ref.target.field}`.toUpperCase(),
                    label: formatter.referenceTypeFormatter(ref.type)
                }
            });
        });

        json.entities.map(entity => {
            entities.push({
                data: {
                    id: entity.name.toUpperCase(),
                    label: entity.name,
                    attributes: entity.columns
                },
                classes: Classes.ENTITY,
                grabbable: true
            });

            entity.columns.map(attr => {
                attributes.push({
                    data: {
                        id: `${entity.name.toUpperCase()}_${attr.name.toUpperCase()}`,
                        label: attr.name,
                        parent: entity.name.toUpperCase()
                    },
                    classes: Classes.ATTRIBUTE,
                    grabbable: false,
                });
            });
        });

        const elements: ElementsDefinition = { nodes: [], edges: [] };
        entities.map(entity => {
            elements.nodes.push(entity);
        });
        attributes.map(attr => {
            elements.nodes.push(attr);
        });
        edges.map(edge => {
            elements.edges.push(edge);
        });
        // console.log(elements);
        return elements;
    }
};

export const useFormatter = () => {
    return formatter;
};