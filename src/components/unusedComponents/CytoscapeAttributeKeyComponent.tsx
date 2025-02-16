import { Text } from '@consta/uikit/Text';

export interface CytoscapeAttributeKeyComponentProps {
    divKey: string;
    value: string;
}

export const CytoscapeAttributeKeyComponent = ({
    divKey,
    value
}: CytoscapeAttributeKeyComponentProps) => {
    return (
        <div
            id={divKey}
            style={{
                backgroundColor: 'white',
                height: '30px'
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