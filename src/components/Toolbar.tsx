import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { FileField } from '@consta/uikit/FileField';
import { Button } from '@consta/uikit/Button';
import { useGetData } from '../hooks/useGetData.ts';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import DownloadJSONModal from './DownloadJSONModal.tsx';
import { Switch } from '@consta/uikit/Switch';
import EntitiesList from './EntitiesList.tsx';
import { TextField } from '@consta/uikit/TextField';
import React from 'react';
import { IconDown } from '@consta/icons/IconDown';

export interface ToolbarProps {
    handleJSONFileUpload: ReturnType<typeof useGetData>['handleJSONFileUpload'];
    handleTemplateFileUpload: ReturnType<typeof useGetData>['handleTemplateFileUpload'];
    updateFlag: ReturnType<typeof useGetData>['updateFlag'];
    downloadFileName: ReturnType<typeof useGetData>['downloadFileName'];
    setDownloadFileName: ReturnType<typeof useGetData>['setDownloadFileName'];
    isOpenDownloadJSONModal: ReturnType<typeof useGetData>['isOpenDownloadJSONModal'];
    onOpenDownloadJSON: ReturnType<typeof useGetData>['onOpenDownloadJSON'];
    onCancelDownloadJSON: ReturnType<typeof useGetData>['onCancelDownloadJSON'];
    onAccept: ReturnType<typeof useGetData>['onAccept'];
    isWithTemplate: ReturnType<typeof useGetData>['isWithTemplate'];
    handleSwitch: ReturnType<typeof useGetData>['handleSwitch'];
    isTemplateLoaded: ReturnType<typeof useGetData>['isTemplateLoaded'];
    fileJSONName: ReturnType<typeof useGetData>['fileJSONName'];
    fileTemplateName: ReturnType<typeof useGetData>['fileTemplateName'];
    elements: ReturnType<typeof useGetData>['elements'];
    handleCheckbox: ReturnType<typeof useGetData>['handleCheckbox'];
    entitiesStroke: ReturnType<typeof useGetData>['entitiesStroke'];
    setEntitiesStroke: ReturnType<typeof useGetData>['setEntitiesStroke'];
    handleFiltration: ReturnType<typeof useGetData>['handleFiltration'];
    showFilter: boolean;
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toolbar = ({
    handleJSONFileUpload,
    handleTemplateFileUpload,
    updateFlag,
    downloadFileName,
    setDownloadFileName,
    isOpenDownloadJSONModal,
    onOpenDownloadJSON,
    onCancelDownloadJSON,
    onAccept,
    isWithTemplate,
    handleSwitch,
    isTemplateLoaded,
    fileJSONName,
    fileTemplateName,
    elements,
    handleCheckbox,
    entitiesStroke,
    setEntitiesStroke,
    handleFiltration,
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
                            id="jsonFileInput"
                            accept="application/json"
                            onChange={handleJSONFileUpload}
                        >
                            {(props) => {
                                return (
                                    <Button
                                        {...props}
                                        label="Загрузить JSON"
                                    />
                                );
                            }}
                        </FileField>

                        <FileField
                            id="templateFileInput"
                            accept=".template"
                            disabled={!isWithTemplate}
                            onChange={handleTemplateFileUpload}
                            className={cnMixSpace({ mL: 's' })}
                        >
                            {(props) => {
                                return (
                                    <Button
                                        {...props}
                                        view={isWithTemplate ? 'primary' : 'ghost'}
                                        style={{ cursor: isWithTemplate ? 'pointer' : 'not-allowed' }}
                                        label="Загрузить Шаблон"
                                    />
                                );
                            }}
                        </FileField>

                        <Layout
                            direction="row"
                            style={{
                                alignItems: 'center',
                            }}
                            className={cnMixSpace({ mL: 's' })}
                        >
                            <Text
                                size="l"
                            >
                                Шаблон
                            </Text>

                            <Switch
                                size="l"
                                checked={isWithTemplate}
                                onChange={handleSwitch}
                                className={cnMixSpace({ mL: 'xs' })}
                            />
                        </Layout>

                        <Button
                            disabled={!updateFlag}
                            view="secondary"
                            className={cnMixSpace({ mL: 's' })}
                            label="Скачать JSON"
                            onClick={onOpenDownloadJSON}
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

                    {/** Show Filter */}
                    <Layout
                        direction="row"
                        className={cnMixSpace({ mL: 's' })}
                    >
                        <Button
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
                            width: '45%'
                        }}
                    >
                        <TextField
                            form="defaultClear"
                            placeholder="Введите сущности"
                            type="textarea"
                            value={entitiesStroke}
                            onChange={(value) => {
                                setEntitiesStroke(value);
                            }}
                            // rows={4}
                        />
                        <Button
                            form="brickDefault"
                            label="Поиск"
                            onClick={() => {
                                handleFiltration();
                            }}
                        />
                    </Layout>
                )}

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
                isOpen={isOpenDownloadJSONModal}
                downloadFileName={downloadFileName}
                setDownloadFileName={setDownloadFileName}
                onCancel={onCancelDownloadJSON}
                onAccept={onAccept}
            />
        </>
    );
};

export default Toolbar;