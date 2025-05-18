import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { FileField } from '@consta/uikit/FileField';
import { Button } from '@consta/uikit/Button';
import { useGetData } from '../hooks/useGetData.ts';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import DownloadJSONModal from './DownloadJSONModal.tsx';
import EntitiesList from './EntitiesList.tsx';
import { TextField } from '@consta/uikit/TextField';
import React from 'react';
import { IconDown } from '@consta/icons/IconDown';
import { CloudDownloadOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';

export interface ToolbarProps {
    handleFileUpload: ReturnType<typeof useGetData>['handleFileUpload'];
    updateFlag: ReturnType<typeof useGetData>['updateFlag'];
    downloadFileName: ReturnType<typeof useGetData>['downloadFileName'];
    setDownloadFileName: ReturnType<typeof useGetData>['setDownloadFileName'];
    isOpenDownloadJSONModal: ReturnType<typeof useGetData>['isOpenDownloadJSONModal'];
    isOpenDownloadPDFModal: ReturnType<typeof useGetData>['isOpenDownloadPDFModal'];
    onOpenJSONDownloadModal: ReturnType<typeof useGetData>['onOpenJSONDownloadModal'];
    onOpenPDFDownloadModal: ReturnType<typeof useGetData>['onOpenPDFDownloadModal'];
    onCancel: ReturnType<typeof useGetData>['onCancel'];
    onAccept: ReturnType<typeof useGetData>['onAccept'];
    isTemplateLoaded: ReturnType<typeof useGetData>['isTemplateLoaded'];
    fileJSONName: ReturnType<typeof useGetData>['fileJSONName'];
    fileTemplateName: ReturnType<typeof useGetData>['fileTemplateName'];
    elements: ReturnType<typeof useGetData>['elements'];
    handleCheckbox: ReturnType<typeof useGetData>['handleCheckbox'];
    entitiesStroke: ReturnType<typeof useGetData>['entitiesStroke'];
    setEntitiesStroke: ReturnType<typeof useGetData>['setEntitiesStroke'];
    handleFiltration: ReturnType<typeof useGetData>['handleFiltration'];
    handleGetServerData: ReturnType<typeof useGetData>['handleGetServerData'];
    showFilter: boolean;
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toolbar = ({
    handleFileUpload,
    updateFlag,
    downloadFileName,
    setDownloadFileName,
    isOpenDownloadJSONModal,
    isOpenDownloadPDFModal,
    onOpenJSONDownloadModal,
    onOpenPDFDownloadModal,
    onCancel,
    onAccept,
    isTemplateLoaded,
    fileJSONName,
    fileTemplateName,
    elements,
    handleCheckbox,
    entitiesStroke,
    setEntitiesStroke,
    handleFiltration,
    handleGetServerData,
    showFilter,
    setShowFilter,
}: ToolbarProps) => {

    const IconDownButton = () => {
        return (
            <IconDown
                size="s"
                style={{ transform: showFilter ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
        );
    };

    const IconUploadButton = () => {
        return (
            <UploadOutlined
                size={16}
                className={cnMixSpace({ mR: 'xs' })}
            />
        );
    };

    const IconDownloadButton = () => {
        return (
            <DownloadOutlined
                size={16}
                className={cnMixSpace({ mR: 'xs' })}
            />
        );
    };

    const IconServerDataButton = () => {
        return (
            <CloudDownloadOutlined
                size={16}
                className={cnMixSpace({ mR: 'xs' })}
            />
        );
    }

    return (
        <>
            <Layout
                direction="column"
                className={cnMixSpace({ mH: 'xs', mT: '2xs' })}
                style={{
                    maxWidth: '100%'
                }}
            >

                {/** Title */}
                <Layout
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                    }}
                >
                    <Text
                        style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                        className={cnMixSpace({ mH: 'auto' })}
                    >
                        ER Diagram
                    </Text>
                </Layout>

                <Layout
                    direction="column"
                    style={{
                        width: 'max-content'
                    }}
                >
                    {/** Buttons */}
                    <Layout
                        direction="row"
                        className={cnMixSpace({ mT: '2xs' })}
                        style={{
                            alignItems: 'center',
                            width: 'max-content'
                        }}
                    >
                        <Layout
                            direction="row"
                        >
                            <FileField
                                id="fileInput"
                                accept=" .json, .template"
                                onChange={handleFileUpload}
                                multiple={true}
                            >
                                {(props) => {
                                    return (
                                        <Button
                                            {...props}
                                            label="Загрузить диаграмму"
                                            iconLeft={IconUploadButton}
                                        />
                                    );
                                }}
                            </FileField>

                            <Button
                                disabled={!updateFlag}
                                view="secondary"
                                className={cnMixSpace({ mL: 's' })}
                                label="Скачать JSON"
                                iconLeft={IconDownloadButton}
                                onClick={onOpenJSONDownloadModal}
                            />

                            <Button
                                disabled={!updateFlag}
                                view="secondary"
                                className={cnMixSpace({ mL: 's' })}
                                label="Скачать PDF"
                                iconLeft={IconDownloadButton}
                                onClick={onOpenPDFDownloadModal}
                            />
                        </Layout>

                        {/** Filtration */}
                        <Layout
                            direction="row"
                            className={cnMixSpace({ mL: 's' })}
                        >
                            <EntitiesList
                                elements={elements}
                                handleCheckbox={handleCheckbox}
                            />
                        </Layout>

                        {/** Get server data */}
                        <Layout
                            direction="row"
                            className={cnMixSpace({ mL: 's' })}
                        >
                            <Button
                                label="Получение модели"
                                view="primary"
                                iconLeft={IconServerDataButton}
                                onClick={() => {
                                    handleGetServerData();
                                }}
                            />
                        </Layout>

                        {/** Show Filter */}
                        <Layout
                            direction="row"
                            className={cnMixSpace({ mL: 's' })}
                        >
                            <Button
                                title="Фильтрация по перечисленному списку"
                                iconLeft={IconDownButton}
                                view="secondary"
                                onClick={() => {
                                    setShowFilter(!showFilter);
                                }}
                            />
                        </Layout>
                    </Layout>

                    {/** New Filtration */}
                    {showFilter && (
                        <Layout
                            direction="row"
                            className={cnMixSpace({ mT: 's' })}
                            style={{
                                width: '100%'
                            }}
                        >
                            <TextField
                                disabled={elements.nodes.length === 0}
                                form="defaultClear"
                                placeholder="Введите сущности"
                                type="textarea"
                                value={entitiesStroke}
                                onChange={(value) => {
                                    setEntitiesStroke(value);
                                }}
                                maxRows={1}
                            />
                            <Button
                                disabled={elements.nodes.length === 0}
                                form="brickDefault"
                                label="Поиск"
                                onClick={() => {
                                    handleFiltration();
                                }}
                            />
                        </Layout>
                    )}
                </Layout>

                {/** Название файлов */}
                <Layout
                    direction="column"
                    className={cnMixSpace({ mT: '2xs' })}
                    style={{
                        width: 'max-content'
                    }}
                >
                    <Text
                        weight="semibold"
                        size="xl"
                    >
                        {`Диаграмма: ${fileJSONName ? fileJSONName : '-'}`}
                    </Text>
                    {isTemplateLoaded ? (
                        <Text
                            weight="semibold"
                            size="xl"
                        >
                            {`Шаблон: ${fileTemplateName ? fileTemplateName : '-'}`}
                        </Text>
                    ) : (
                        <></>
                    )}
                </Layout>
            </Layout>

            <DownloadJSONModal
                isOpen={isOpenDownloadJSONModal || isOpenDownloadPDFModal}
                downloadFileName={downloadFileName}
                setDownloadFileName={setDownloadFileName}
                onCancel={onCancel}
                onAccept={onAccept}
            />
        </>
    );
};

export default Toolbar;