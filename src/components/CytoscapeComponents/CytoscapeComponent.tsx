import { useEffect, useState } from 'react';
import cytoscape, { Stylesheet, LayoutOptions } from 'cytoscape';
import dagre from 'cytoscape-dagre';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cola from 'cytoscape-cola';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import fcose from 'cytoscape-fcose';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import coseBilkent from 'cytoscape-cose-bilkent';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cytoscapeDomNode from 'cytoscape-dom-node';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useGetData } from '../../hooks/useGetData.ts';
import { Classes } from '../../types/elements.types.ts';
import CytoscapeEntityComponent from './CytoscapeEntityComponent.tsx';
import { createRoot } from 'react-dom/client';
import EdgeHintComponent from '../EdgeHintComponent.tsx';
import { HintTooltip } from '../../types/utils.types.ts';

// Регистрация расширения для макета
cytoscape.use(dagre);
cytoscape.use(cola);
cytoscape.use(fcose);
cytoscape.use(coseBilkent);
cytoscape.use(cytoscapeDomNode);

export interface CytoscapeComponentProps {
    elements: ReturnType<typeof useGetData>['elements'];
    cyRef: ReturnType<typeof useGetData>['cyRef'];
    containerRef: ReturnType<typeof useGetData>['containerRef'];
    isWithTemplate: ReturnType<typeof useGetData>['isWithTemplate'];
    template: ReturnType<typeof useGetData>['template'];
    isTemplateLoaded: ReturnType<typeof useGetData>['isTemplateLoaded'];
    style: Stylesheet[];
    layout: LayoutOptions;
}

const CytoscapeComponent = ({
    elements,
    style,
    layout,
    cyRef,
    containerRef,
    isWithTemplate,
    template,
    isTemplateLoaded
}: CytoscapeComponentProps) => {
    const [tooltip, setTooltip] = useState<HintTooltip | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        if (elements.nodes.length > 0) {
            cyRef.current = cytoscape({
                container: containerRef.current,
                elements: [],
                style: style,
            });

            // подчёркивает красным, внимания не обращать
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            cyRef.current.domNode();

            const nodes = elements.nodes;
            const edges = elements.edges;

            nodes.forEach(node => {
                if (node.classes === Classes.ENTITY) {
                    const entityComponent = (
                        <CytoscapeEntityComponent
                            entityName={String(node.data.id)}
                            columns={node.data.attributes}
                            edges={edges.filter(edge => edge.data.sourceTable === node.data.id || edge.data.targetTable === node.data.id)}
                        />
                    );

                    const div = document.createElement("div");
                    div.id = String(node.data.id).toUpperCase();
                    const root = createRoot(div);
                    root.render(entityComponent);

                    if (cyRef.current) {
                        cyRef.current.add({
                            'data': {
                                'id': String(node.data.id).toUpperCase(),
                                'dom': div,
                            },
                            'classes': String(node.classes),
                            'position': {
                                'x': 0,
                                'y': 0,
                            }
                        });
                    }
                }
            });
        }
    }, [elements, style, layout, containerRef, cyRef, isWithTemplate, template, isTemplateLoaded]);

    useEffect(() => {
        elements.edges.forEach(edge => {
            if (cyRef.current) {
                cyRef.current.add({
                    data: {
                        'source': edge.data.sourceTable,
                        'target': edge.data.targetTable,
                        'sourceTable': edge.data.sourceTable,
                        'targetTable': edge.data.targetTable,
                        'sourceField': edge.data.sourceField,
                        'targetField': edge.data.targetField,
                        'sourceInfo': edge.data.source,
                        'targetInfo': edge.data.target,
                        'label': edge.data.label,
                        'type': edge.data.type
                    }
                });
            }
        });

        if (!isWithTemplate || !isTemplateLoaded) {
            cyRef.current?.layout(layout).run();
        } else if (isTemplateLoaded && isWithTemplate) {
            cyRef.current?.nodes().forEach(node => {
                const localTemplate = template.find(temp => temp.name === node.data().id);
                node.position().x = Number(localTemplate?.position.x);
                node.position().y = Number(localTemplate?.position.y);
            })
        }

        // Дополнительные настройки и обработчики событий
        if (cyRef.current) {
            // Обработчик события наведения на ребро
            cyRef.current.on('mouseover', 'edge', (event) => {
                const edge = event.target;
                const position = event.renderedPosition;
                const component = (
                    <EdgeHintComponent
                        sourceTable={edge.data().sourceTable}
                        sourceField={edge.data().sourceField}
                        targetTable={edge.data().targetTable}
                        targetField={edge.data().targetField}
                    />
                );
                setTooltip({
                    content: component,
                    x: position.x,
                    y: position.y
                });
            });

            // Обработчик события ухода с ребра
            cyRef.current.on('mouseout', 'edge', () => {
                setTooltip(null);
            });
        }
    }, [cyRef, elements.edges, isTemplateLoaded, isWithTemplate, layout, template]);

    useEffect(() => {
        // Очистка при размонтировании компонента
        return () => {
            if (cyRef.current) {
                cyRef.current.destroy();
            }
        };
    }, [cyRef]);

    return (
        <>
            <div
                ref={containerRef}
                style={{
                    width: '100vw',
                    height: '100vh'
                }}
                className={cnMixSpace({ m: 0, p: 0 })}
            />
            {tooltip && (
                <div
                    style={{
                        position: 'absolute',
                        left: tooltip.x + 10,
                        top: tooltip.y + 10,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        padding: '5px',
                        borderRadius: '3px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000
                    }}
                >
                    {tooltip.content}
                </div>
            )}
        </>
    );
};

export default CytoscapeComponent;