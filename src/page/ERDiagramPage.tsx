import { Layout } from '@consta/uikit/Layout';
import { LAYOUT, STYLE } from '../utils/coreSettings.ts';
import CytoscapeComponent from '../components/CytoscapeComponent.tsx';
import Toolbar from '../components/Toolbar.tsx';
import { useGetData } from '../hooks/useGetData.ts';

export const ERDiagramPage = () => {
    const {
        elements,
        cyRef,
        containerRef,
        handleFileUpload,
        updateFlag,
        isOpenDownloadJSONModal,
        setIsOpenDownloadJSONModal,
        downloadFileName,
        setDownloadFileName,
        onCancel,
        onAccept
    } = useGetData();

    return (
        <Layout
            direction="column"
        >
            <Toolbar
                handleFileUpload={handleFileUpload}
                updateFlag={updateFlag}
                downloadFileName={downloadFileName}
                setDownloadFileName={setDownloadFileName}
                isOpenDownloadJSONModal={isOpenDownloadJSONModal}
                setIsOpenDownloadJSONModal={setIsOpenDownloadJSONModal}
                onCancel={onCancel}
                onAccept={onAccept}
            />
            <CytoscapeComponent
                cyRef={cyRef}
                containerRef={containerRef}
                elements={elements}
                style={STYLE}
                layout={LAYOUT}
            />
        </Layout>
    );
};

export default ERDiagramPage;