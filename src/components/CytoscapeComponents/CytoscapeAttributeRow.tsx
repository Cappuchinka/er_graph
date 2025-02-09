import { Layout } from '@consta/uikit/Layout';
import { NodeDefinition } from 'cytoscape';
import {Text} from "@consta/uikit/Text";

export interface AttributeRowCytoscapeProps {
    attribute: NodeDefinition;
}

export const CytoscapeAttributeRow = ({
    attribute,
}: AttributeRowCytoscapeProps) => {
    return (
        <Layout
            direction="row"
            style={{
                width: '100%',
            }}
        >
            {/** Key */}
            <Layout
                style={{
                    backgroundColor: 'white',
                    border: '1px solid black'
                }}
            >
                <Text
                    style={{
                        fontSize: '14px',
                        color: 'black',
                        display: 'inline-block',
                        width: '30px'
                    }}
                >
                    {attribute.data.key ? attribute.data.key : ''}
                </Text>
            </Layout>
            {/** Name */}
            <Layout
                style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    display: 'inline-block'
                }}
            >
                <Text
                    style={{
                        fontSize: '14px',
                        color: 'black'
                    }}
                >
                    {attribute.data.label}
                </Text>
            </Layout>
            {/** Type */}
            <Layout
                style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    display: 'inline-block'
                }}
            >
                <Text
                    style={{
                        fontSize: '14px',
                        color: 'black'
                    }}
                >
                    {attribute.data.type}
                </Text>
            </Layout>
        </Layout>
    );
};

export default CytoscapeAttributeRow;