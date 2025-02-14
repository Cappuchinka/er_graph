import {useCallback, useEffect, useRef, useState} from 'react';
import { Core, ElementsDefinition } from 'cytoscape';
import { useFormatter } from '../utils/useFormatter.ts';
// import { validateInputJSON } from '../utils/utils.ts';

export const useGetData = () => {
    const { JSONToElementFormatter, ElementToJSONFormatter, getPositionForEntity } = useFormatter();

    const cyRef = useRef<Core | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [elements, setElements] = useState<ElementsDefinition>({ nodes: [], edges: [] });
    const [updateFlag, setUpdateFlag] = useState<boolean>(false);

    useEffect(() => {
        if (elements.nodes.length === 0 || elements.edges.length === 0) {
            setUpdateFlag(false);
        }
    }, [elements]);

    const handleFileUpload = useCallback(() => {
        // setUpdateFlag(false);
        const jsonFileInput = document.getElementById('jsonFileInput') as HTMLInputElement;
        if (jsonFileInput.files && jsonFileInput.files.length > 0) {
            const file = jsonFileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                try {
                    const parsedElements = JSON.parse(content);
                    setElements(JSONToElementFormatter(parsedElements));
                    setUpdateFlag(true);
                    // TODO: валидация на разные JSON продумать
                    // if (validateInputJSON(parsedElements)) {
                    //     setElements(JSONToElementFormatter(parsedElements));
                    //     setUpdateFlag(true);
                    // } else {
                    //     if (parsedElements.elements) {
                    //         const nodes = parsedElements.elements.nodes;
                    //         const edges = parsedElements.elements.edges;
                    //         setElements({ nodes: nodes, edges: edges });
                    //         setUpdateFlag(true);
                    //     }
                    // }
                } catch (error) {
                    console.error('Ошибка при парсинге JSON:', error);
                }
            };
            reader.readAsText(file);
        }
    }, [JSONToElementFormatter]);

    const handleJSONDownload = useCallback(() => {
        if (cyRef.current) {
            const elementToJSON = ElementToJSONFormatter(elements);
            const outputJson = JSON.stringify(elementToJSON);

            const blobJSON = new Blob([outputJson], { type: 'application/json' });
            const urlJSON = URL.createObjectURL(blobJSON);

            // Создаем ссылку для скачивания
            const aJSON = document.createElement('a');
            aJSON.href = urlJSON;
            aJSON.download = 'graph.json'; // Имя файла
            aJSON.click();

            // Освобождаем память
            URL.revokeObjectURL(urlJSON);

            const template = getPositionForEntity(cyRef.current.json().elements);
            const outputTemplate = JSON.stringify(template);

            const blobTemplate = new Blob([outputTemplate], { type: 'template' });
            const urlTemplate = URL.createObjectURL(blobTemplate);

            // Создаем ссылку для скачивания
            const aTemplate = document.createElement('a');
            aTemplate.href = urlTemplate;
            aTemplate.download = 'graph.template'; // Имя файла
            aTemplate.click();

            // Освобождаем память
            URL.revokeObjectURL(urlTemplate);
        }
    }, [ElementToJSONFormatter, elements, getPositionForEntity]);

    return {
        elements,
        cyRef,
        containerRef,
        handleFileUpload,
        handleJSONDownload,
        updateFlag
    }
};