import { useCallback, useEffect, useRef, useState } from 'react';
import { Core, ElementsDefinition } from 'cytoscape';
import { useFormatter } from '../utils/useFormatter.ts';
import {Template} from "../types/template.types.ts";

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

    useEffect(() => {
        if (elements.nodes.length === 0 || elements.edges.length === 0) {
            setUpdateFlag(false);
        }
    }, [elements]);

    const handleJSONFileUpload = useCallback(() => {
        const jsonFileInput = document.getElementById('jsonFileInput') as HTMLInputElement;
        if (jsonFileInput.files && jsonFileInput.files.length > 0) {
            const jsonFile = jsonFileInput.files[0];
            setFileJSONName(jsonFile.name);
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

    return {
        elements,
        cyRef,
        containerRef,
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
        setIsWithTemplate,
        template,
        isTemplateLoaded,
        fileJSONName,
        fileTemplateName
    }
};