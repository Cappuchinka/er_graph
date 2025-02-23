import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { FileField } from '@consta/uikit/FileField';
import { Button } from '@consta/uikit/Button';
import { useGetData } from '../hooks/useGetData.ts';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import DownloadJSONModal from './DownloadJSONModal.tsx';
import { Switch } from '@consta/uikit/Switch';
import EntitiesList from "./EntitiesList.tsx";

export interface ToolbarProps {
    handleJSONFileUpload: ReturnType<typeof useGetData>['handleJSONFileUpload'];
    handleTemplateFileUpload: ReturnType<typeof useGetData>['handleTemplateFileUpload'];
    updateFlag: ReturnType<typeof useGetData>['updateFlag'];
    downloadFileName: ReturnType<typeof useGetData>['downloadFileName'];
    setDownloadFileName: ReturnType<typeof useGetData>['setDownloadFileName'];
    isOpenDownloadJSONModal: ReturnType<typeof useGetData>['isOpenDownloadJSONModal'];
    onOpen: ReturnType<typeof useGetData>['onOpen'];
    onCancel: ReturnType<typeof useGetData>['onCancel'];
    onAccept: ReturnType<typeof useGetData>['onAccept'];
    isWithTemplate: ReturnType<typeof useGetData>['isWithTemplate'];
    handleSwitch: ReturnType<typeof useGetData>['handleSwitch'];
    isTemplateLoaded: ReturnType<typeof useGetData>['isTemplateLoaded'];
    fileJSONName: ReturnType<typeof useGetData>['fileJSONName'];
    fileTemplateName: ReturnType<typeof useGetData>['fileTemplateName'];
    entityItems: ReturnType<typeof useGetData>['entityItems'];
}

export const Toolbar = ({
    handleJSONFileUpload,
    handleTemplateFileUpload,
    updateFlag,
    downloadFileName,
    setDownloadFileName,
    isOpenDownloadJSONModal,
    onOpen,
    onCancel,
    onAccept,
    isWithTemplate,
    handleSwitch,
    isTemplateLoaded,
    fileJSONName,
    fileTemplateName,
    entityItems
}: ToolbarProps) => {
    return (
        <>
            <Layout
                direction="column"
                className={cnMixSpace({ mH: 'xs', mT: '2xs' })}
            >

                {/** Title */}
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
                            {(props) => <Button {...props} label="Загрузить JSON" />}
                        </FileField>

                        <FileField
                            id="templateFileInput"
                            accept=".template"
                            disabled={!isWithTemplate}
                            onChange={handleTemplateFileUpload}
                            className={cnMixSpace({ mL: 's' })}
                        >
                            {(props) => <Button {...props} view={isWithTemplate ? 'primary' : 'ghost'} style={{ cursor: isWithTemplate ? 'pointer' : 'not-allowed' }} label="Загрузить Шаблон" />}
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
                            onClick={onOpen}
                        />
                    </Layout>

                    <Layout
                        direction="row"
                        className={cnMixSpace({ mL: 's' })}
                    >
                        <EntitiesList
                            items={entityItems}
                        />
                    </Layout>
                </Layout>

                <Layout
                    direction="column"
                    className={cnMixSpace({ mT: '2xs' })}
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
                onCancel={onCancel}
                onAccept={onAccept}
            />
        </>
    );
};

export default Toolbar;