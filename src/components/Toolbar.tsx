import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';

export const Toolbar = () => {
    return (
        <Layout
            style={{
                width: '100vw',
                maxWidth: '100vw',
            }}
        >
            <Text
                style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                }}
            >
                ER Diagram
            </Text>
        </Layout>
    );
};

export default Toolbar;