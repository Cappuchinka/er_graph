import React from 'react';
import CytoscapeComponent from './components/CytoscapeComponent';
import { Stylesheet, LayoutOptions } from 'cytoscape';
import { JSON } from './mockData/mockData.ts';
import { useFormatter } from "./utils/useFormatter.ts";

const App: React.FC = () => {
    const { JSONToElementFormatter } = useFormatter();
    const elements2 = JSONToElementFormatter(JSON);

    const style: Stylesheet[] = [
        {
            selector: 'node.entity',
            style: {
                'width': 150,
                'height': 40,
                'text-valign': 'center',
                'shape': 'rectangle',
                'border-width': 2
            }
        },
        {
            selector: 'node.attribute',
            style: {
                'label': 'data(label)',
                'width': 120,
                'height': 25,
                'text-valign': 'center',
                'shape': 'round-rectangle',
                'border-width': 1,
                'border-color': '#333',
            }
        },
        {
            selector: 'edge',
            style: {
                'label': 'data(label)',
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle'
            }
        }
    ];

    const layout: LayoutOptions = {
        name: 'dagre',
        rankDir: 'LR',
        animate: true
    };

    return (
        <div>
            <h1>Пример Cytoscape в React с TypeScript</h1>
            <CytoscapeComponent elements={elements2} style={style} layout={layout} />
        </div>
    );
};

export default App;