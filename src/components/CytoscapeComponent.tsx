import { useEffect } from 'react';
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
import { useGetData } from '../hooks/useGetData.ts';
import { Classes } from '../types/elements.types.ts';
import EntityComponent from './EntityComponent.tsx';
import { createRoot } from 'react-dom/client';
import { CytoscapeAttributeKeyComponent } from './CytoscapeAttributeKeyComponent.tsx';

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
    style: Stylesheet[];
    layout: LayoutOptions;
}

const CytoscapeComponent = ({
    elements,
    style,
    layout,
    cyRef,
    containerRef,
}: CytoscapeComponentProps) => {

    useEffect(() => {
        if (!containerRef.current) return;

        if (elements.nodes.length > 0) {
            cyRef.current = cytoscape({
                container: containerRef.current,
                elements: [],
            });

            // подчёркивает красным, внимания не обращать
            cyRef.current.domNode();

            const nodes = elements.nodes;
            const edges = elements.edges;

            nodes.forEach(node => {
                if (node.classes === Classes.ENTITY) {
                    const entityComponent = <EntityComponent entityName={String(node.data.id)} columns={node.data.attributes} />

                    const div = document.createElement("div");
                    const root = createRoot(div);
                    root.render(entityComponent);

                    if (cyRef.current) {
                        cyRef.current.add({
                            'data': {
                                'id': String(node.data.id).toUpperCase(),
                                'classes': String(node.classes),
                                'dom': div,
                            },
                        });
                    }
                }
            });

            nodes.forEach(node => {
                if (node.classes === Classes.ATTRIBUTE) {
                    if (!node.data.id) return;
                    const attributeComponent = <CytoscapeAttributeKeyComponent divKey={node.data.id.toUpperCase()} value={node.data.key ? node.data.key : node.data.key} />

                    const div = document.getElementById(node.data.id);
                    if (div) {
                        const root = createRoot(div);
                        root.render(attributeComponent);
                        console.log('A');

                        if (cyRef.current) {
                            cyRef.current.add({
                                'data': {
                                    'id': String(node.data.id).toUpperCase(),
                                    'parent': String(node.data.parent).toUpperCase(),
                                    'dom': div,
                                },
                            });
                        }
                    }
                }
            });

            edges.forEach(edge => {
                if (cyRef.current) {
                    cyRef.current.add({
                        data: {
                            'source': edge.data.sourceTable,
                            'target': edge.data.targetTable,
                            'label': edge.data.label,
                        }
                    });
                }
            });

            cyRef.current?.style(style);
            cyRef.current?.layout(layout).run();

            // Очистка при размонтировании компонента
            return () => {
                if (cyRef.current) {
                    cyRef.current.destroy();
                }
            };
        }
    }, [elements, style, layout, containerRef, cyRef]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100vw',
                height: '100vw'
            }}
            className={cnMixSpace({ m: 0, p: 0 })}
        />
    );
};

export default CytoscapeComponent;