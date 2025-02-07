import { ElementDefinition, LayoutOptions, Stylesheet } from 'cytoscape';

export const STYLE: Stylesheet[] = [
    {
        selector: 'node.entity',
        style: {
            'width': 400,
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
            'width': 400,
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
    // name: 'dagre',
    // name: 'cola',
    // name: 'fcose',
    name: 'cose-bilkent',
    rankDir: 'LR',
    idealEdgeLength: 750,
    nodeRepulsion: 50000000, // Увеличиваем отталкивание узлов
    nodeOverlap: 0, // Уменьшаем перекрытие узлов
    padding: 100, // Отступы вокруг графа
    animate: false, // Анимация
    randomize: true, // Не рандомизировать позиции
    componentSpacing: 100, // Расстояние между компонентами
};

export const ELEMENTS: ElementDefinition[] = [
    { data: { id: 'user', label: 'User' }, classes: 'entity', grabbable: true },
    { data: { id: 'order', label: 'Order' }, classes: 'entity', grabbable: true },

    { data: { id: 'user_id', label: 'user_id (PK)', parent: 'user' }, classes: 'attribute', grabbable: false },
    { data: { id: 'user_name', label: 'name', parent: 'user' }, classes: 'attribute', grabbable: false },
    { data: { id: 'user_email', label: 'email', parent: 'user' }, classes: 'attribute', grabbable: false },
    { data: { id: 'order_id', label: 'order_id (PK)', parent: 'order' }, classes: 'attribute', grabbable: false },
    { data: { id: 'order_user_id', label: 'user_id (FK)', parent: 'order' }, classes: 'attribute', grabbable: false },

    { data: { source: 'user_id', target: 'order_user_id', label: '1:N' } }
];