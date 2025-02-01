import {useCallback, useState} from 'react';
import { ElementDefinition } from 'cytoscape';
import {useFormatter} from "../utils/useFormatter.ts";

export const useGetData = () => {
    const { JSONToElementFormatter } = useFormatter();

    const [elements, setElements] = useState<ElementDefinition[]>([]);

    const handleFileUpload = useCallback(() => {
        const jsonFileInput = document.getElementById('jsonFileInput') as HTMLInputElement;
        if (jsonFileInput.files && jsonFileInput.files.length > 0) {
            const file = jsonFileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                try {
                    const parsedElements = JSON.parse(content);
                    setElements(JSONToElementFormatter(parsedElements));
                } catch (error) {
                    console.error('Ошибка при парсинге JSON:', error);
                }
            };
            reader.readAsText(file);
        }
    }, [JSONToElementFormatter]);

    return {
        elements,
        handleFileUpload
    }
};