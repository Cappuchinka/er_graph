import { Layout } from '@consta/uikit/Layout';
import { LAYOUT, STYLE } from '../utils/coreSettings.ts';
import CytoscapeComponent from '../components/CytoscapeComponent.tsx';
import Toolbar from '../components/Toolbar.tsx';
import { useGetData } from '../hooks/useGetData.ts';

export const ERDiagramPage = () => {
    const { elements, handleFileUpload } = useGetData();

    return (
        <Layout
            direction="column"
        >
            <Toolbar
                handleFileUpload={handleFileUpload}
            />
            <CytoscapeComponent
                elements={elements}
                style={STYLE}
                layout={LAYOUT}
            />
        </Layout>
    );
};

export default ERDiagramPage;