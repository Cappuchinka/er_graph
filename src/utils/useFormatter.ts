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
                    sourceTable: `${ref.source.table}`.toUpperCase(),
                    targetTable: `${ref.target.table}`.toUpperCase(),
                    sourceField: `${ref.source.field}`.toUpperCase(),
                    targetField: `${ref.target.field}`.toUpperCase(),
                    label: formatter.referenceTypeFormatter(ref.type),
                    type: ref.type
                }
            });
        });

        json.entities.map(entity => {
            const columnsOfEntity = entity.columns.map(column => {
                const key = column.isPK ? 'PK' : json.references.find(ref => ref.target.field === column.name) ? 'FK' : null;
                return {
                    ...column,
                    key: key,
                }
            });

            entities.push({
                data: {
                    id: entity.name.toUpperCase(),
                    label: entity.name.toUpperCase(),
                    attributes: columnsOfEntity
                },
                classes: Classes.ENTITY,
                grabbable: true
            });

            entity.columns.map(attr => {
                attributes.push({
                    data: {
                        id: `${entity.name.toUpperCase()}_${attr.name.toUpperCase()}`,
                        label: attr.name.toUpperCase(),
                        parent: entity.name.toUpperCase()
                    },
                    classes: Classes.ATTRIBUTE,
                    grabbable: false,
                });
            });
        });

        entities.forEach((entity) => {
            const newEntityAttributes = entity.data.attributes.map((entAttr: any, index: number) => {
                return {
                    ...entAttr,
                    divKeyId: entAttr.key ? attributes.filter(attr => attr.data.parent === entity.data.id)[index].data.id : null
                }
            });
            entity.data.attributes = newEntityAttributes;
        });

        let i = 0;
        entities.map((entity) => {
            entity.data.attributes.map((attr) => {
                attributes[i].data.key = attr.key;
                i++;
            })
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
        console.log(elements);
        return elements;
    }
};

export const useFormatter = () => {
    return formatter;
};