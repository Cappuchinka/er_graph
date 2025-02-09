import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';

// export interface CytoscapeEntityComponentProps {
//
// }

export const CytoscapeEntityComponent = () => {
    return (
        <Layout
            direction="column"
        >
            <Text
                style={{
                    fontSize: '14px',
                    color: 'black',
                    verticalAlign: 'top',
                }}
            >
                ENTITY_NAME
            </Text>
        </Layout>
    );
};

export default CytoscapeEntityComponent;
