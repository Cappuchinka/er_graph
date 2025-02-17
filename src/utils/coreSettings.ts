import { LayoutOptions, Stylesheet } from 'cytoscape';

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
            'curve-style': 'taxi',
            'target-arrow-shape': 'triangle'
        }
    }
];

export const LAYOUT: LayoutOptions = {
    // name: 'dagre',
    // name: 'cola',
    // name: 'fcose',
    name: 'cose-bilkent',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    rankDir: 'LR',
    idealEdgeLength: 750,
    nodeRepulsion: 50000000, // Увеличиваем отталкивание узлов
    nodeOverlap: 0, // Уменьшаем перекрытие узлов
    padding: 100, // Отступы вокруг графа
    animate: false, // Анимация
    randomize: true, // Не рандомизировать позиции
    componentSpacing: 100, // Расстояние между компонентами
};
