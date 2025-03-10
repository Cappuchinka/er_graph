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
import InfoEntityModal from "../InfoEntityModal.tsx";

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
    tooltip: ReturnType<typeof useGetData>['tooltip'];
    isWithTemplate: ReturnType<typeof useGetData>['isWithTemplate'];
    template: ReturnType<typeof useGetData>['template'];
    isTemplateLoaded: ReturnType<typeof useGetData>['isTemplateLoaded'];
    initializeEntities: ReturnType<typeof useGetData>['initializeEntities'];
    initializeEdges: ReturnType<typeof useGetData>['initializeEdges'];
    destroyGraph: ReturnType<typeof useGetData>['destroyGraph'];
    isOpenInfoEntityModal: ReturnType<typeof useGetData>['isOpenInfoEntityModal'];
    onCancelInfoEntityModal: ReturnType<typeof useGetData>['onCancelInfoEntityModal'];
    nodeEntityInfo: ReturnType<typeof useGetData>['nodeEntityInfo'];
    style: Stylesheet[];
    layout: LayoutOptions;
    showFilter: boolean;
}

const CytoscapeComponent = ({
    elements,
    style,
    layout,
    cyRef,
    containerRef,
    tooltip,
    isWithTemplate,
    template,
    isTemplateLoaded,
    initializeEntities,
    initializeEdges,
    destroyGraph,
    showFilter,
    isOpenInfoEntityModal,
    onCancelInfoEntityModal,
    nodeEntityInfo
}: CytoscapeComponentProps) => {
    const nodes = elements.nodes;
    const edges = elements.edges;

    useEffect(() => {
        initializeEntities();
    }, [elements, style, layout, containerRef, cyRef, isWithTemplate, template, isTemplateLoaded, nodes, edges, initializeEntities]);

    useEffect(() => {
        initializeEdges();
    }, [cyRef, edges, initializeEdges, isTemplateLoaded, isWithTemplate, layout, template]);

    useEffect(() => {
        // Очистка при размонтировании компонента
        // console.log(cyRef.current?.elements().map(elem => elem.data()));

        // edges.forEach(edge => {
        //     const id = `${edge.data.sourceTable}_${edge.data.sourceField}_${edge.data.targetTable}_${edge.data.targetField}`;
        //     cyRef.current?.getElementById(id).remove();
        // });
        destroyGraph();
    }, [cyRef, destroyGraph, edges]);

    return (
        <>
            <div
                ref={containerRef}
                style={{
                    display: 'block',
                    width: showFilter ? '100vw' : '100vw',
                    height: showFilter ? '81vh' : '87vh'
                }}
                className={cnMixSpace({ m: 0, p: 0 })}
            />
            {tooltip && (
                <div
                    style={{
                        position: 'absolute',
                        left: tooltip.x + 10,
                        top: tooltip.y + 10,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        padding: '5px',
                        borderRadius: '3px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000
                    }}
                >
                    {tooltip.content}
                </div>
            )}
            <InfoEntityModal
                isOpen={isOpenInfoEntityModal}
                onCancel={onCancelInfoEntityModal}
                nodeEntityInfo={nodeEntityInfo}
            />
        </>
    );
};

export default CytoscapeComponent;