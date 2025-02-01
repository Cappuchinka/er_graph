import React from 'react';
import CytoscapeComponent from './components/CytoscapeComponent';
import { ElementDefinition, Stylesheet, LayoutOptions } from 'cytoscape';
import { JSON } from './mockData/mockData.ts';
import { JSONToElementFormatter } from "./utils/useFormatter.ts";

const App: React.FC = () => {
    const elements: ElementDefinition[] = [
        { data: { id: 'user', label: 'User' }, classes: 'entity', grabbable: true },
        { data: { id: 'order', label: 'Order' }, classes: 'entity', grabbable: true },

        { data: { id: 'user_id', label: 'user_id (PK)', parent: 'user' }, classes: 'attribute', grabbable: false },
        { data: { id: 'user_name', label: 'name', parent: 'user' }, classes: 'attribute', grabbable: false },
        { data: { id: 'user_email', label: 'email', parent: 'user' }, classes: 'attribute', grabbable: false },
        { data: { id: 'order_id', label: 'order_id (PK)', parent: 'order' }, classes: 'attribute', grabbable: false },
        { data: { id: 'order_user_id', label: 'user_id (FK)', parent: 'order' }, classes: 'attribute', grabbable: false },

        { data: { source: 'user_id', target: 'order_user_id', label: '1:N' } }
    ];

    const elements2 = JSONToElementFormatter(JSON);

    console.log(elements2);

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