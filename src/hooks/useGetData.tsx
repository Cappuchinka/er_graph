import { useCallback, useEffect, useRef, useState } from 'react';
import cytoscape, {Core, EdgeDefinition, ElementsDefinition, NodeDefinition} from 'cytoscape';
import { useFormatter } from '../utils/useFormatter.ts';
import { HintTooltip, Template } from '../types/utils.types.ts';
import { Classes } from '../types/elements.types.ts';
import CytoscapeEntityComponent from '../components/CytoscapeComponents/CytoscapeEntityComponent.tsx';
import { createRoot } from 'react-dom/client';
import { LAYOUT, STYLE } from '../utils/coreSettings.ts';
import EdgeHintComponent from '../components/EdgeHintComponent.tsx';

export const useGetData = () => {
    const { JSONToElementFormatter, ElementToJSONFormatter, getPositionForEntity } = useFormatter();

    const cyRef = useRef<Core | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [elements, setElements] = useState<ElementsDefinition>({ nodes: [], edges: [] });
    const [template, setTemplate] = useState<Template[]>([]);
    const [isTemplateLoaded, setIsTemplateLoaded] = useState<boolean>(false);
    const [isWithTemplate, setIsWithTemplate] = useState<boolean>(false);
    const [updateFlag, setUpdateFlag] = useState<boolean>(false);

    const [isOpenDownloadJSONModal, setIsOpenDownloadJSONModal] = useState<boolean>(false);
    const [downloadFileName, setDownloadFileName] = useState<string | null>(null);
    const [fileJSONName, setFileJSONName] = useState<string | null>(null);
    const [fileTemplateName, setFileTemplateName] = useState<string | null>(null);

    const [tooltip, setTooltip] = useState<HintTooltip | null>(null);

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        if (elements.nodes.length === 0 || elements.edges.length === 0) {
            setUpdateFlag(false);
        }

        let count: number = 0;

        elements.nodes
            .filter(node => node.classes === Classes.ENTITY)
            .forEach(node => {
                if (node.data.isShow) count++;
            });
        setCount(count);
    }, [elements]);

    const nodes = elements.nodes;
    const edges = elements.edges;

    const initializeEntities = useCallback(() => {
        if (!containerRef.current) return;

        if (nodes.length > 0) {
            cyRef.current = cytoscape({
                container: containerRef.current,
                elements: [],
                style: STYLE,
            });

            // подчёркивает красным, внимания не обращать
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            cyRef.current.domNode();

            nodes.forEach(node => {
                if (node.classes === Classes.ENTITY) {
                    if (node.data.isShow) {
                        const entityComponent = (
                            <CytoscapeEntityComponent
                                entityName={String(node.data.id)}
                                color={node.data.color}
                                columns={node.data.attributes}
                                edges={edges.filter(edge => edge.data.sourceTable === node.data.id || edge.data.targetTable === node.data.id)}
                            />
                        );

                        const div = document.createElement("div");
                        div.id = String(node.data.id).toUpperCase();
                        const root = createRoot(div);
                        root.render(entityComponent);

                        if (cyRef.current) {
                            cyRef.current.add({
                                'data': {
                                    'id': String(node.data.id).toUpperCase(),
                                    'label': String(node.data.label).toUpperCase(),
                                    'isShow': node.data.isShow,
                                    'dom': div,
                                },
                                'classes': String(node.classes),
                                'position': {
                                    'x': 0,
                                    'y': 0,
                                }
                            });
                        }
                    }
                }
            });
        }
    }, [edges, nodes]);

    const initializeEdges = useCallback(() => {
        edges.forEach(edge => {
            if (edge.data.isShow) {
                if (cyRef.current) {
                    cyRef.current.add({
                        data: {
                            'id': edge.data.id,
                            'source': edge.data.sourceTable,
                            'target': edge.data.targetTable,
                            'sourceTable': edge.data.sourceTable,
                            'targetTable': edge.data.targetTable,
                            'sourceField': edge.data.sourceField,
                            'targetField': edge.data.targetField,
                            'sourceInfo': edge.data.source,
                            'targetInfo': edge.data.target,
                            'label': edge.data.label,
                            'type': edge.data.type,
                            'isShow': edge.data.isShow
                        }
                    });
                }
            }
        });

        if (!isWithTemplate || !isTemplateLoaded) {
            cyRef.current?.layout(LAYOUT).run();
        } else if (isTemplateLoaded && isWithTemplate) {
            cyRef.current?.nodes().forEach(node => {
                const localTemplate = template.find(temp => temp.name === node.data().id);
                node.position().x = Number(localTemplate?.position.x);
                node.position().y = Number(localTemplate?.position.y);
            })
        }

        // Дополнительные настройки и обработчики событий
        if (cyRef.current) {
            // Обработчик события наведения на ребро
            cyRef.current.on('mouseover', 'edge', (event) => {
                const edge = event.target;
                const position = event.renderedPosition;
                const component = (
                    <EdgeHintComponent
                        sourceTable={edge.data().sourceTable}
                        sourceField={edge.data().sourceField}
                        targetTable={edge.data().targetTable}
                        targetField={edge.data().targetField}
                        type={edge.data().type}
                    />
                );
                setTooltip({
                    content: component,
                    x: position.x,
                    y: position.y
                });
            });

            // Обработчик события ухода с ребра
            cyRef.current.on('mouseout', 'edge', () => {
                setTooltip(null);
            });
        }

        if (cyRef.current) {
            cyRef.current.on('tap', (event) => {
                const edge = event.target;

                cyRef.current?.nodes().forEach(node => {
                    node?.style('border-color', '#000000');
                    node?.style('border-width', 2);
                });

                if (edge !== cyRef.current) {
                    const sourceTable = edge.data().sourceTable;
                    const targetTable = edge.data().targetTable;
                    const sourceNode = cyRef.current?.$(`#${sourceTable}`);
                    const targetNode = cyRef.current?.$(`#${targetTable}`);

                    sourceNode?.style('border-color', '#FF0000');
                    targetNode?.style('border-color', '#FF0000');

                    sourceNode?.style('border-width', 15);
                    targetNode?.style('border-width', 15);
                }
            });
        }
    }, [edges, isTemplateLoaded, isWithTemplate, template]);

    const destroyGraph = useCallback(() => {
        return () => {
            if (cyRef.current) {
                cyRef.current.destroy();
            }
        };
    }, []);

    const handleJSONFileUpload = useCallback(() => {
        const jsonFileInput = document.getElementById('jsonFileInput') as HTMLInputElement;
        if (jsonFileInput.files && jsonFileInput.files.length > 0) {
            const jsonFile = jsonFileInput.files[0];
            setFileJSONName(jsonFile.name);
            setTemplate([]);
            setIsTemplateLoaded(false);
            setIsWithTemplate(false);
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                try {
                    const parsedElements = JSON.parse(content);
                    setElements(JSONToElementFormatter(parsedElements));
                    setUpdateFlag(true);
                } catch (error) {
                    console.error('Ошибка при парсинге JSON:', error);
                }
            };
            reader.readAsText(jsonFile);
        }
    }, [JSONToElementFormatter]);

    const handleTemplateFileUpload = useCallback(() => {
        const templateFileInput = document.getElementById('templateFileInput') as HTMLInputElement;
        if (templateFileInput.files && templateFileInput.files.length > 0) {
            const templateFile = templateFileInput.files[0];
            setFileTemplateName(templateFile.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                try {
                    const parsedElements = JSON.parse(content);
                    setTemplate(parsedElements);
                    setIsTemplateLoaded(true);
                } catch (error) {
                    console.error('Ошибка при парсинге JSON:', error);
                }
            };
            reader.readAsText(templateFile);
        }
    }, []);

    const handleJSONDownload = useCallback(() => {
        if (cyRef.current) {
            const elementToJSON = ElementToJSONFormatter(elements);
            const outputJson = JSON.stringify(elementToJSON);

            const blobJSON = new Blob([outputJson], { type: 'application/json' });
            const urlJSON = URL.createObjectURL(blobJSON);

            // Создаем ссылку для скачивания
            const aJSON = document.createElement('a');
            aJSON.href = urlJSON;
            aJSON.download = `${downloadFileName}.json`; // Имя файла
            aJSON.click();

            // Освобождаем память
            URL.revokeObjectURL(urlJSON);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const template = getPositionForEntity(cyRef.current.json().elements);
            const outputTemplate = JSON.stringify(template);

            const blobTemplate = new Blob([outputTemplate], { type: 'template' });
            const urlTemplate = URL.createObjectURL(blobTemplate);

            // Создаем ссылку для скачивания
            const aTemplate = document.createElement('a');
            aTemplate.href = urlTemplate;
            aTemplate.download = `${downloadFileName}.template`; // Имя файла
            aTemplate.click();

            // Освобождаем память
            URL.revokeObjectURL(urlTemplate);
        }
    }, [ElementToJSONFormatter, downloadFileName, elements, getPositionForEntity]);

    const handleSwitch = useCallback(() => {
        setIsWithTemplate(!isWithTemplate)
    }, [isWithTemplate]);

    const onOpen = useCallback(() => {
        setDownloadFileName(null);
        setIsOpenDownloadJSONModal(true);
    }, []);

    const onCancel = useCallback(() => {
        setDownloadFileName(null);
        setIsOpenDownloadJSONModal(false);
    }, []);

    const onAccept = useCallback(() => {
        handleJSONDownload();
        onCancel();
    }, [handleJSONDownload, onCancel]);

    const checkExistNodeForFiltration = useCallback((localNodes:NodeDefinition[], item: NodeDefinition, edge: EdgeDefinition) => {
        return (
                    edge.data.sourceTable === item.data.id
                    && localNodes.find((localNode) => { if (localNode.data.id === edge.data.targetTable) return localNode; })?.data.isShow
                )
                ||
                (
                    edge.data.targetTable === item.data.id
                    && localNodes.find((localNode) => { if (localNode.data.id === edge.data.sourceTable) return localNode; })?.data.isShow
                );
    }, []);

    const handleCheckbox = useCallback((item: NodeDefinition) => {
        const localNodes = elements.nodes.map((node) => {
            if (node.data.id === item.data.id) {
                return { ...node, data: { ...node.data, isShow: !node.data.isShow} };
            } else {
                return node;
            }
        });
        const localEdges = elements.edges.map((edge) => {
            if (checkExistNodeForFiltration(localNodes, item, edge)) {
                return { ...edge, data: { ...edge.data, isShow: !edge.data.isShow} }
            } else {
                return edge;
            }
        });
        setElements({ nodes: localNodes, edges: localEdges });
    }, [checkExistNodeForFiltration, elements.edges, elements.nodes]);

    return {
        elements,
        cyRef,
        containerRef,
        tooltip,
        initializeEntities,
        initializeEdges,
        destroyGraph,
        handleJSONFileUpload,
        handleTemplateFileUpload,
        handleJSONDownload,
        updateFlag,
        isOpenDownloadJSONModal,
        downloadFileName,
        setDownloadFileName,
        onOpen,
        onCancel,
        onAccept,
        isWithTemplate,
        handleSwitch,
        template,
        isTemplateLoaded,
        fileJSONName,
        fileTemplateName,
        handleCheckbox,
        count
    }
};