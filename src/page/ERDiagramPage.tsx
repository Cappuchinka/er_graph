import { Layout } from '@consta/uikit/Layout';
import { LAYOUT, STYLE } from '../utils/coreSettings.ts';
import CytoscapeComponent from '../components/CytoscapeComponent.tsx';
import Toolbar from '../components/Toolbar.tsx';
import { useGetData } from '../hooks/useGetData.ts';

export const ERDiagramPage = () => {
    const { elements, cyRef, handleFileUpload, handleJSONDownload, updateFlag } = useGetData();

    return (
        <Layout
            direction="column"
        >
            <Toolbar
                handleFileUpload={handleFileUpload}
                handleJSONDownload={handleJSONDownload}
                updateFlag={updateFlag}
            />
            <CytoscapeComponent
                cyRef={cyRef}
                elements={elements}
                style={STYLE}
                layout={LAYOUT}
            />
        </Layout>
    );
};

export default ERDiagramPage;