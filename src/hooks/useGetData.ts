import { useCallback, useEffect, useRef, useState } from 'react';
import { Core, ElementsDefinition } from 'cytoscape';
import { useFormatter } from '../utils/useFormatter.ts';

export const useGetData = () => {
    const { JSONToElementFormatter, ElementToJSONFormatter, getPositionForEntity } = useFormatter();

    const cyRef = useRef<Core | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [elements, setElements] = useState<ElementsDefinition>({ nodes: [], edges: [] });
    const [updateFlag, setUpdateFlag] = useState<boolean>(false);

    const [isOpenDownloadJSONModal, setIsOpenDownloadJSONModal] = useState<boolean>(false);
    const [downloadFileName, setDownloadFileName] = useState<string | null>(null);

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
            aJSON.download = `${downloadFileName}.json`; // Имя файла
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
            aTemplate.download = `${downloadFileName}.template`; // Имя файла
            aTemplate.click();

            // Освобождаем память
            URL.revokeObjectURL(urlTemplate);
        }
    }, [ElementToJSONFormatter, downloadFileName, elements, getPositionForEntity]);

    const onCancel = useCallback(() => {
        setDownloadFileName(null);
        setIsOpenDownloadJSONModal(false);
    }, []);

    const onAccept = useCallback(() => {
        handleJSONDownload();
    }, [handleJSONDownload]);

    return {
        elements,
        cyRef,
        containerRef,
        handleFileUpload,
        handleJSONDownload,
        updateFlag,
        isOpenDownloadJSONModal,
        setIsOpenDownloadJSONModal,
        downloadFileName,
        setDownloadFileName,
        onCancel,
        onAccept
    }
};