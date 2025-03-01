import { Layout } from '@consta/uikit/Layout';
import { LAYOUT, STYLE } from '../utils/coreSettings.ts';
import CytoscapeComponent from '../components/CytoscapeComponents/CytoscapeComponent.tsx';
import Toolbar from '../components/Toolbar.tsx';
import { useGetData } from '../hooks/useGetData.tsx';

export const ERDiagramPage = () => {
    const {
        elements,
        cyRef,
        containerRef,
        tooltip,
        initializeEntities,
        initializeEdges,
        destroyGraph,
        handleJSONFileUpload,
        handleTemplateFileUpload,
        updateFlag,
        isOpenDownloadJSONModal,
        downloadFileName,
        setDownloadFileName,
        onOpen,
        onCancel,
        onAccept,
        isWithTemplate,
        handleSwitch,
        template,
        isTemplateLoaded,
        fileJSONName,
        fileTemplateName,
        handleCheckbox,
        count
    } = useGetData();

    return (
        <Layout
            direction="column"
        >
            <Toolbar
                handleJSONFileUpload={handleJSONFileUpload}
                handleTemplateFileUpload={handleTemplateFileUpload}
                updateFlag={updateFlag}
                downloadFileName={downloadFileName}
                setDownloadFileName={setDownloadFileName}
                isOpenDownloadJSONModal={isOpenDownloadJSONModal}
                onOpen={onOpen}
                onCancel={onCancel}
                onAccept={onAccept}
                isWithTemplate={isWithTemplate}
                handleSwitch={handleSwitch}
                isTemplateLoaded={isTemplateLoaded}
                fileJSONName={fileJSONName}
                fileTemplateName={fileTemplateName}
                elements={elements}
                handleCheckbox={handleCheckbox}
                count={count}
            />
            <CytoscapeComponent
                cyRef={cyRef}
                containerRef={containerRef}
                tooltip={tooltip}
                elements={elements}
                style={STYLE}
                layout={LAYOUT}
                isWithTemplate={isWithTemplate}
                template={template}
                isTemplateLoaded={isTemplateLoaded}
                initializeEntities={initializeEntities}
                initializeEdges={initializeEdges}
                destroyGraph={destroyGraph}
            />
        </Layout>
    );
};

export default ERDiagramPage;