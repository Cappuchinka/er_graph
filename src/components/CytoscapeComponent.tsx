import React, { useEffect, useRef } from 'react';
import cytoscape, { Core, ElementDefinition, Stylesheet, LayoutOptions } from 'cytoscape';
import dagre from 'cytoscape-dagre';

// Регистрация расширения для макета
cytoscape.use(dagre);

interface CytoscapeComponentProps {
    elements: ElementDefinition[];
    style: Stylesheet[];
    layout: LayoutOptions;
}

const CytoscapeComponent: React.FC<CytoscapeComponentProps> = ({ elements, style, layout }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            const cy: Core = cytoscape({
                container: containerRef.current,
                elements: elements,
                style: style,
                layout: layout
            });

            // Дополнительные настройки и обработчики событий
            cy.on('tap', 'node', function(evt) {
                const node = evt.target;
                console.log('Выбран узел:', node.data());
            });

            // Очистка при размонтировании компонента
            return () => {
                cy.destroy();
            };
        }
    }, [elements, style, layout]);

    return <div ref={containerRef} style={{ width: '100%', height: '600px' }} />;
};

export default CytoscapeComponent;