import { Attribute, Classes, Edge, Entity, TAttribute } from '../types/elements.types.ts';
import { EntityJSON, InputJSON, ReferenceJSON } from '../types/json.types.ts';
import { ElementsDefinition, NodeDefinition } from 'cytoscape';
import { Template } from '../types/utils.types.ts';

const formatter: {
    referenceTypeFormatter: (
        type: string,
    ) => string;
    reverseReferenceTypeFormatter: (
        type: string,
    ) => string;
    JSONToElementFormatter: (
        json: InputJSON
    ) => ElementsDefinition;
    ElementToJSONFormatter: (
        elements: ElementsDefinition,
    ) => InputJSON;
    getPositionForEntity: (
        graph: ElementsDefinition,
    ) => Template[];
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
    reverseReferenceTypeFormatter: (type: string) => {
        let result = '';
        switch (type) {
            case '1:1':
                result = 'OneToOne';
                break;
            case '1:N':
                result = 'OneToMany';
                break;
            case 'N:1':
                result = 'ManyToOne';
                break;
            case 'N:N':
                result = 'ManyToMany';
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
                    id: `${ref.source.table}_${ref.source.field}_${ref.target.table}_${ref.target.field}`.toUpperCase(),
                    source: `${ref.source.table}_${ref.source.field}`.toUpperCase(),
                    target: `${ref.target.table}_${ref.target.field}`.toUpperCase(),
                    sourceTable: `${ref.source.table}`.toUpperCase(),
                    targetTable: `${ref.target.table}`.toUpperCase(),
                    sourceField: `${ref.source.field}`.toUpperCase(),
                    targetField: `${ref.target.field}`.toUpperCase(),
                    label: formatter.referenceTypeFormatter(ref.type),
                    type: ref.type,
                    isShow: true
                }
            });
        });

        const checkForDivKeyID = (attrName: string) => {
            return Boolean(edges.find(edge => edge.data.source === attrName) || edges.find(edge => edge.data.target === attrName));
        };

        json.entities.map(entity => {
            const columnsOfEntity = entity.columns.map(column => {
                const key = column.isPK ? 'PK' : json.references
                    .find(ref => {
                        if (ref.target.field.toUpperCase() === column.name.toUpperCase() && ref.target.table.toUpperCase() === entity.name.toUpperCase()) {
                            return ref;
                        }
                    }) ? 'FK' : null;
                return {
                    ...column,
                    key: key,
                }
            });

            entities.push({
                data: {
                    id: entity.name.toUpperCase(),
                    label: entity.name.toUpperCase(),
                    color: entity.color,
                    attributes: columnsOfEntity,
                    isShow: true
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
            const newEntityAttributes = entity.data.attributes.map((entAttr: TAttribute, index: number) => {
                return {
                    ...entAttr,
                    divKeyId: entAttr.key && checkForDivKeyID(`${entity.data.id}_${entAttr.name}`.toUpperCase()) ? attributes.filter(attr => attr.data.parent === entity.data.id)[index].data.id : null
                }
            });
            entity.data.attributes = newEntityAttributes;
        });

        let i = 0;
        entities.map((entity) => {
            entity.data.attributes.map((attr: TAttribute) => {
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
        // console.log(elements);
        return elements;
    },
    ElementToJSONFormatter: (elements: ElementsDefinition) => {
        const result: InputJSON = {
            entities: [] as EntityJSON[],
            references: [] as ReferenceJSON[]
        };

        const edges: Edge[] = elements.edges;
        const nodes: NodeDefinition[] = elements.nodes;

        edges.forEach(edge => {
            result.references.push({
                source: {
                    table: edge.data.sourceTable,
                    field: edge.data.sourceField,
                },
                target: {
                    table: edge.data.targetTable,
                    field: edge.data.targetField
                },
                type: edge.data.type
            });
        });

        nodes.forEach(node => {
            if (node.classes === Classes.ENTITY) {
                result.entities.push({
                    name: String(node.data.id),
                    columns: node.data.attributes.map((attr: TAttribute) => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { key, divKeyId, ...rest } = attr;
                        return rest;
                    }),
                    color: node.data.color,
                });
            }
        });

        return result;
    },
    getPositionForEntity: (graph: ElementsDefinition) => {
        const result: Template[] = [];
        const nodes = graph.nodes;
        nodes.forEach(node => {
            if (node.classes === Classes.ENTITY) {
                result.push({
                    name: String(node.data.id),
                    position: {
                        x: Number(node.position?.x),
                        y: Number(node.position?.y)
                    }
                });
            }
        });
        
        return result;
    }
};

export const useFormatter = () => {
    return formatter;
};