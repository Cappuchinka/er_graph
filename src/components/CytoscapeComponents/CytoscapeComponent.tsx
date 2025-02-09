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
import { useGetData } from '../../hooks/useGetData.ts';
import { Classes } from '../../types/elements.types.ts';
import { createRoot } from 'react-dom/client';
import CytoscapeAttributeRow from "./CytoscapeAttributeRow.tsx";
import { CytoscapeEntityComponent } from "./CytoscapeEntityComponent.tsx";

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

            const entities = elements.nodes.filter(node => node.classes === Classes.ENTITY);
            const attributes = elements.nodes.filter(node => node.classes === Classes.ATTRIBUTE);
            const edges = elements.edges;

            entities.forEach(entity => {
                const entityNode = (<CytoscapeEntityComponent/>);
                const div = document.createElement('div');
                const root = createRoot(div);
                root.render(entityNode);

                if (cyRef.current) {
                    cyRef.current.add({
                        'data': {
                            'id': String(entity.data.id).toUpperCase(),
                            'dom': div,
                        },
                        'classes': String(entity.classes),
                    });
                }
            });

            attributes.forEach((attribute) => {
                const attributeRow = (<CytoscapeAttributeRow attribute={attribute}/>);
                const div = document.createElement('div');
                const root = createRoot(div);
                root.render(attributeRow);

                if (cyRef.current) {
                    cyRef.current.add({
                        'data': {
                            'id': String(attribute.data.id).toUpperCase(),
                            'parent': String(attribute.data.parent),
                            'dom': div,
                        },
                        'classes': String(attribute.classes),
                        // 'grabbable': false
                    });
                }
            });

            edges.forEach(edge => {
                if (cyRef.current) {
                    cyRef.current.add({
                        data: {
                            'source': edge.data.source,
                            'target': edge.data.target,
                            // 'source': edge.data.sourceTable,
                            // 'target': edge.data.targetTable,
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