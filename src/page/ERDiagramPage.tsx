import { Layout } from '@consta/uikit/Layout';
import { LAYOUT, STYLE } from '../utils/coreSettings.ts';
import CytoscapeComponent from '../components/CytoscapeComponents/CytoscapeComponent.tsx';
import Toolbar from '../components/Toolbar.tsx';
import { useGetData } from '../hooks/useGetData.ts';

export const ERDiagramPage = () => {
    const {
        elements,
        cyRef,
        containerRef,
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
        fileTemplateName
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
            />
            <CytoscapeComponent
                cyRef={cyRef}
                containerRef={containerRef}
                elements={elements}
                style={STYLE}
                layout={LAYOUT}
                isWithTemplate={isWithTemplate}
                template={template}
                isTemplateLoaded={isTemplateLoaded}
            />
        </Layout>
    );
};

export default ERDiagramPage;