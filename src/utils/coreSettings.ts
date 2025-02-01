import { LayoutOptions, Stylesheet } from 'cytoscape';

export const STYLE: Stylesheet[] = [
    {
        selector: 'node.entity',
        style: {
            'width': 150,
            'height': 40,
            'text-valign': 'center',
            'shape': 'rectangle',
            'border-width': 2,
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

export const LAYOUT: LayoutOptions = {
    name: 'dagre',
    rankDir: 'LR',
    animate: true
};