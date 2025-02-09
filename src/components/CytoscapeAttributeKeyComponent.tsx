import { Text } from '@consta/uikit/Text';
import { useEffect } from 'react';
import { useGetData } from '../hooks/useGetData.ts';
import { Classes } from '../types/elements.types.ts';

export interface CytoscapeAttributeKeyComponentProps {
    divKey: string;
    value: string;
    cyRef: ReturnType<typeof useGetData>['cyRef'];
    parent: string;
}

export const CytoscapeAttributeKeyComponent = ({
    divKey,
    value,
    cyRef,
    parent,
}: CytoscapeAttributeKeyComponentProps) => {

    useEffect(() => {
        const div = document.getElementById(divKey);
        if (div) {
            if (cyRef.current) {
                cyRef.current.add({
                    'data': {
                        'id': String(divKey).toUpperCase(),
                        'classes': Classes.ATTRIBUTE,
                        'parent': parent.toUpperCase(),
                        'dom': div,
                    },
                });
            }
        }
    }, [cyRef, divKey, parent]);

    return (
        <div
            id={divKey}
            style={{
                backgroundColor: 'red',
                height: '30px',
                width: 'max-content',
            }}
        >
            <Text
                style={{
                    fontSize: '14px',
                    color: 'black',
                }}
            >
                {value ? value : ''}
            </Text>
        </div>
    )
};