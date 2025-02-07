import { useCallback, useRef, useState } from 'react';
import { Core, ElementsDefinition } from 'cytoscape';
import { useFormatter } from '../utils/useFormatter.ts';
// import { validateInputJSON } from '../utils/utils.ts';

export const useGetData = () => {
    const { JSONToElementFormatter } = useFormatter();

    const cyRef = useRef<Core | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [elements, setElements] = useState<ElementsDefinition>({ nodes: [], edges: [] });
    const [updateFlag, setUpdateFlag] = useState<boolean>(false);

    const handleFileUpload = useCallback(() => {
        setUpdateFlag(false);
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
            // TODO: подумать над обратным форматтером
            const json = cyRef.current.json();
            const jsonStr = JSON.stringify(json, null, 2); // Форматируем JSON для читаемости
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Создаем ссылку для скачивания
            const a = document.createElement('a');
            a.href = url;
            a.download = 'graph.json'; // Имя файла
            a.click();

            // Освобождаем память
            URL.revokeObjectURL(url);
        }
    }, []);

    return {
        elements,
        cyRef,
        containerRef,
        handleFileUpload,
        handleJSONDownload,
        updateFlag
    }
};