import { useCallback, useEffect, useRef, useState } from 'react';
import cytoscape, {Core, EdgeDefinition, ElementsDefinition, NodeDefinition} from 'cytoscape';
import { useFormatter } from '../utils/useFormatter.ts';
import { HintTooltip, Template } from '../types/utils.types.ts';
import { Classes } from '../types/elements.types.ts';
import CytoscapeEntityComponent from '../components/CytoscapeComponents/CytoscapeEntityComponent.tsx';
import { createRoot } from 'react-dom/client';
import { LAYOUT, STYLE } from '../utils/coreSettings.ts';
import EdgeHintComponent from '../components/EdgeHintComponent.tsx';
import html2canvas from 'html2canvas';
import {jsPDF, jsPDFOptions} from 'jspdf';

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
    const [isOpenDownloadPDFModal, setIsOpenDownloadPDFModal] = useState<boolean>(false);
    const [downloadFileName, setDownloadFileName] = useState<string | null>(null);
    const [fileJSONName, setFileJSONName] = useState<string | null>(null);
    const [fileTemplateName, setFileTemplateName] = useState<string | null>(null);

    const [tooltip, setTooltip] = useState<HintTooltip | null>(null);

    const [isOpenInfoEntityModal, setIsOpenInfoEntityModal] = useState<boolean>(false);
    const [nodeEntityInfo, setNodeEntityInfo] = useState<NodeDefinition | null>(null);

    const onOpenInfoEntityModal = useCallback((node: NodeDefinition) => {
        setNodeEntityInfo(node);
        setIsOpenInfoEntityModal(true);
    }, []);

    const onCancelInfoEntityModal = useCallback(() => {
        setNodeEntityInfo(null);
        setIsOpenInfoEntityModal(false);
    }, []);

    useEffect(() => {
        if (elements.nodes.length === 0 || elements.edges.length === 0) {
            setUpdateFlag(false);
        }
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
                                    'attributes': node.data.attributes,
                                    'isShow': node.data.isShow,
                                    'color': node.data.color ? node.data.color : '#FFFFFF',
                                    'sources': node.data.sources,
                                    'targets': node.data.targets,
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

    const handleHoverMouseToEdge = useCallback(() => {
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
    }, []);

    const handleClickEntity = useCallback(() => {
        if (cyRef.current) {
            cyRef.current.on('tap', 'node', (event) => {
                const node = event.target;
                const isCtrlPush = event.originalEvent.ctrlKey;

                if (isCtrlPush) {
                    onOpenInfoEntityModal(node);
                }
            });
        }
    }, [onOpenInfoEntityModal]);

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
        handleHoverMouseToEdge();

        handleClickEntity();
    }, [edges, handleClickEntity, handleHoverMouseToEdge, isTemplateLoaded, isWithTemplate, template]);

    const destroyGraph = useCallback(() => {
        return () => {
            if (cyRef.current) {
                cyRef.current.destroy();
            }
        };
    }, []);

    const handleFileUpload = useCallback(() => {
        const filesInput = document.getElementById('fileInput') as HTMLInputElement;
        if (filesInput.files && filesInput.files.length > 0) {
            if (filesInput.files.length == 1) {
                const file = filesInput.files[0];
                if (file.type === 'application/json') {
                    setFileJSONName(file.name);
                    setTemplate([]);
                    setIsTemplateLoaded(false);
                    setIsWithTemplate(false);
                    setIsTemplateLoaded(false);
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
                    reader.readAsText(file);
                    onCancelInfoEntityModal();
                } else {
                    if (fileJSONName) {
                        setFileTemplateName(file.name);
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const content = e.target?.result as string;
                            try {
                                const parsedElements = JSON.parse(content);
                                setTemplate(parsedElements);
                                setIsTemplateLoaded(true);
                                setIsWithTemplate(true);
                            } catch (error) {
                                console.error('Ошибка при парсинге JSON:', error);
                            }
                        };
                        reader.readAsText(file);
                    } else {
                        return
                    }
                }
            } else {
                for (let i = 0; i < filesInput.files.length; i++) {
                    switch (filesInput.files[i].type) {
                        case 'application/json': {
                            setFileJSONName(filesInput.files[i].name);
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
                            reader.readAsText(filesInput.files[i]);
                            onCancelInfoEntityModal();
                            break;
                        }
                        default: {
                            setFileTemplateName(filesInput.files[i].name);
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const content = e.target?.result as string;
                                try {
                                    const parsedElements = JSON.parse(content);
                                    setTemplate(parsedElements);
                                    setIsTemplateLoaded(true);
                                    setIsWithTemplate(true);
                                } catch (error) {
                                    console.error('Ошибка при парсинге JSON:', error);
                                }
                            };
                            reader.readAsText(filesInput.files[i]);
                        }
                    }
                }
            }
        }
    }, [JSONToElementFormatter, fileJSONName, onCancelInfoEntityModal]);

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

    const handlePDFDownload = useCallback(async () => {
        const element = document.getElementById("content");

        if (!element) return;

        const originalOverflow = element.style.overflow;
        const originalHeight = element.style.height;
        element.style.overflow = 'visible';
        element.style.height = 'auto';

        const opt = {
            margin: 0,
            filename: `${downloadFileName}.pdf`,
            image: { type: 'svg', quality: 100.00 },
            html2canvas: { scale: 100 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'l' } as jsPDFOptions
        };

        const canvas = await html2canvas(element, {
            scale: 2,
            width: element.scrollWidth,
            height: element.scrollHeight,
            scrollX: 0,
            scrollY: 0,
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#FFFFFF'
        });

        element.style.overflow = originalOverflow;
        element.style.height = originalHeight;

        const imgData = canvas.toDataURL('image/' + opt.image.type, opt.image.quality);
        const pdf = new jsPDF(opt.jsPDF);

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, opt.image.type, opt.margin, opt.margin, pdfWidth, pdfHeight);
        pdf.save(opt.filename);
    }, [downloadFileName]);

    const handleSwitch = useCallback(() => {
        setIsWithTemplate(!isWithTemplate)
    }, [isWithTemplate]);

    const onOpenJSONDownloadModal = useCallback(() => {
        setDownloadFileName(null);
        setIsOpenDownloadJSONModal(true);
    }, []);

    const onOpenPDFDownloadModal = useCallback(() => {
        setDownloadFileName(null);
        setIsOpenDownloadPDFModal(true);
    }, []);

    const onCancel = useCallback(() => {
        setDownloadFileName(null);
        if (isOpenDownloadJSONModal) {
            setIsOpenDownloadJSONModal(false);
        } else if (isOpenDownloadPDFModal) {
            setIsOpenDownloadPDFModal(false);
        }
    }, [isOpenDownloadJSONModal, isOpenDownloadPDFModal]);

    const onAccept = useCallback(() => {
        if (isOpenDownloadJSONModal) {
            handleJSONDownload();
        } else if (isOpenDownloadPDFModal) {
            void handlePDFDownload();
        }
        onCancel();
    }, [handleJSONDownload, handlePDFDownload, isOpenDownloadJSONModal, isOpenDownloadPDFModal, onCancel]);

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

    const [entitiesStroke, setEntitiesStroke] = useState<string | null>(null);

    const removeDuplicatesById = useCallback((array: EdgeDefinition[]): EdgeDefinition[] => {
        const uniqueMap = new Map<string, EdgeDefinition>();

        array.forEach(item => {
            const id = item.data.id;
            if (id) {
                if (!uniqueMap.has(id)) {
                    uniqueMap.set(id, item);
                }
            }
        });

        return Array.from(uniqueMap.values());
    }, []);

    const handleFiltration = useCallback(() => {
        if (!entitiesStroke) {
            const localNodes = elements.nodes.map((node) => {
                return { ...node, data: { ...node.data, isShow: true } };
            });
            const localEdges = elements.edges.map((edge) => {
                return { ...edge, data: { ...edge.data, isShow: true } }
            });
            setElements({ nodes: localNodes, edges: localEdges });
        } else {
            const entities = entitiesStroke.split(/[\s,;]+/).filter(Boolean);
            const localNodes = elements.nodes.map((node) => {
                if (entities.find(entity => entity.toUpperCase() === node.data.id?.toUpperCase())) {
                    return { ...node, data: { ...node.data, isShow: true } };
                } else {
                    return { ...node, data: { ...node.data, isShow: false } };
                }
            });
            let localEdges: EdgeDefinition[] = [];

            elements.edges.map((edge) => {
                entities.forEach(entity => {
                    const item = localNodes.find(localNode => localNode.data.id === entity.toUpperCase());
                    if (item && item.data.isShow) {
                        if (checkExistNodeForFiltration(localNodes, item, edge)) {
                            localEdges.push({ ...edge, data: { ...edge.data, isShow: true } });
                        } else {
                            localEdges.push({ ...edge, data: { ...edge.data, isShow: false } });
                        }
                    } else {
                        localEdges.push({ ...edge, data: { ...edge.data, isShow: false } });
                    }
                });
            });

            localEdges = removeDuplicatesById(localEdges);
            setElements({ nodes: localNodes, edges: localEdges });
        }
    }, [checkExistNodeForFiltration, elements.edges, elements.nodes, entitiesStroke, removeDuplicatesById]);

    return {
        elements,
        cyRef,
        containerRef,
        tooltip,
        initializeEntities,
        initializeEdges,
        destroyGraph,
        handleFileUpload,
        handleJSONDownload,
        handlePDFDownload,
        updateFlag,
        isOpenDownloadJSONModal,
        isOpenDownloadPDFModal,
        downloadFileName,
        setDownloadFileName,
        onOpenJSONDownloadModal,
        onOpenPDFDownloadModal,
        onCancel,
        onAccept,
        isWithTemplate,
        handleSwitch,
        template,
        isTemplateLoaded,
        fileJSONName,
        fileTemplateName,
        handleCheckbox,
        entitiesStroke,
        setEntitiesStroke,
        handleFiltration,
        isOpenInfoEntityModal,
        onOpenInfoEntityModal,
        onCancelInfoEntityModal,
        nodeEntityInfo
    }
};