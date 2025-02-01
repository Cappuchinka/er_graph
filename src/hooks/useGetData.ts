import { useCallback, useRef, useState } from 'react';
import { Core, ElementDefinition } from 'cytoscape';
import { useFormatter } from '../utils/useFormatter.ts';

export const useGetData = () => {
    const { JSONToElementFormatter } = useFormatter();

    const containerRef = useRef<Core | null>(null);
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

    const handleJSONDownload = useCallback(() => {
        if (containerRef.current) {
            const json = containerRef.current.json();
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
        containerRef,
        handleFileUpload,
        handleJSONDownload
    }
};