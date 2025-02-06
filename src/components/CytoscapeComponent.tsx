import { useEffect, useRef } from 'react';
import cytoscape, { Stylesheet, LayoutOptions } from 'cytoscape';
import dagre from 'cytoscape-dagre';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cola from 'cytoscape-cola';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cytoscapeDomNode from 'cytoscape-dom-node';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useGetData } from '../hooks/useGetData.ts';
import { Classes } from '../types/elements.types.ts';
import EntityComponent from './EntityComponent.tsx';
import { createRoot } from 'react-dom/client';

// Регистрация расширения для макета
cytoscape.use(dagre);
cytoscape.use(cola);
cytoscape.use(cytoscapeDomNode);

export interface CytoscapeComponentProps {
    elements: ReturnType<typeof useGetData>['elements'];
    cyRef: ReturnType<typeof useGetData>['cyRef'];
    style: Stylesheet[];
    layout: LayoutOptions;
}

const CytoscapeComponent = ({
    elements,
    style,
    layout,
    cyRef
}: CytoscapeComponentProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        if (elements.nodes.length > 0) {
            cyRef.current = cytoscape({
                container: containerRef.current,
                elements: [],
                style: style,
                layout: layout
            });

            cyRef.current.domNode();

            const nodes = elements.nodes;

            nodes.forEach(node => {
                if (node.classes === Classes.ENTITY) {
                    const entityComponent = <EntityComponent entityName={String(node.data.id)} columns={node.data.attributes} />

                    const div = document.createElement("div");
                    const root = createRoot(div);
                    root.render(entityComponent);

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    cyRef.current.add({
                        'data': {
                            'id': String(node.data.id),
                            'dom': div,
                        },
                    });
                }
            })

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