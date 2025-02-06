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
                elements: elements,
                style: style,
                layout: layout
            });

            // Дополнительные настройки и обработчики событий
            cyRef.current.on('tap', 'node', function(evt) {
                const node = evt.target;
                console.log('Выбран узел:', node.data());
            });

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
            className={cnMixSpace({ mH: 0, mV: 0, pH: 0, pV: 0 })}
        />
    );
};

export default CytoscapeComponent;