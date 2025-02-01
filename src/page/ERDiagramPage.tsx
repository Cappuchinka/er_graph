import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { useFormatter } from '../utils/useFormatter.ts';
import { JSON } from '../mockData/mockData.ts';
import { LAYOUT, STYLE } from '../utils/coreSettings.ts';
import CytoscapeComponent from '../components/CytoscapeComponent.tsx';

export const ERDiagramPage = () => {
    const { JSONToElementFormatter } = useFormatter();
    const elements = JSONToElementFormatter(JSON);

    return (
        <Layout
            direction="column"
        >
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
            <CytoscapeComponent
                elements={elements}
                style={STYLE}
                layout={LAYOUT}
            />
        </Layout>
    );
};

export default ERDiagramPage;