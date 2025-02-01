import { Layout } from '@consta/uikit/Layout';
import { useFormatter } from '../utils/useFormatter.ts';
import { JSON } from '../mockData/mockData.ts';
import { LAYOUT, STYLE } from '../utils/coreSettings.ts';
import CytoscapeComponent from '../components/CytoscapeComponent.tsx';
import Toolbar from '../components/Toolbar.tsx';

export const ERDiagramPage = () => {
    const { JSONToElementFormatter } = useFormatter();
    const elements = JSONToElementFormatter(JSON);

    return (
        <Layout
            direction="column"
        >
            <Toolbar />
            <CytoscapeComponent
                elements={elements}
                style={STYLE}
                layout={LAYOUT}
            />
        </Layout>
    );
};

export default ERDiagramPage;