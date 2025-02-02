import { useEffect } from 'react';
import cytoscape, { Core, Stylesheet, LayoutOptions } from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useGetData } from '../hooks/useGetData.ts';

// Регистрация расширения для макета
cytoscape.use(dagre);

export interface CytoscapeComponentProps {
    elements: ReturnType<typeof useGetData>['elements'];
    containerRef: ReturnType<typeof useGetData>['containerRef'];
    style: Stylesheet[];
    layout: LayoutOptions;
}

const CytoscapeComponent = ({
    elements,
    style,
    layout,
    containerRef
}: CytoscapeComponentProps) => {
    // const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (elements.nodes.length > 0) {
            const cy: Core = cytoscape({
                container: document.getElementById('cy'),
                elements: elements,
                style: style,
                layout: layout
            });

            // Дополнительные настройки и обработчики событий
            cy.on('tap', 'node', function(evt) {
                const node = evt.target;
                console.log('Выбран узел:', node.data());
            });

            containerRef.current = cy;

            // Очистка при размонтировании компонента
            return () => {
                cy.destroy();
            };
        }
    }, [elements, style, layout, containerRef]);

    return (
        <div
            id="cy"
            style={{
                width: '100vw',
                height: '100vw'
            }}
            className={cnMixSpace({ mH: 0, mV: 0, pH: 0, pV: 0 })}
        />
    );
};

export default CytoscapeComponent;