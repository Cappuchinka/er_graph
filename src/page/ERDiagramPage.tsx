import { Layout } from '@consta/uikit/Layout';
import { LAYOUT, STYLE } from '../utils/coreSettings.ts';
import CytoscapeComponent from '../components/CytoscapeComponents/CytoscapeComponent.tsx';
import Toolbar from '../components/Toolbar.tsx';
import { useGetData } from '../hooks/useGetData.tsx';
import {useState} from "react";

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
        entitiesStroke,
        setEntitiesStroke,
        handleFiltration
    } = useGetData();

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <Layout
            direction="column"
            style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
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
                entitiesStroke={entitiesStroke}
                setEntitiesStroke={setEntitiesStroke}
                handleFiltration={handleFiltration}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
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
                showFilter={showFilter}
            />
        </Layout>
    );
};

export default ERDiagramPage;