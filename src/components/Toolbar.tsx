import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { FileField } from '@consta/uikit/FileField';
import { Button } from '@consta/uikit/Button';
import { useGetData } from '../hooks/useGetData.ts';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import DownloadJSONModal from "./DownloadJSONModal.tsx";

export interface ToolbarProps {
    handleFileUpload: ReturnType<typeof useGetData>['handleFileUpload'];
    updateFlag: ReturnType<typeof useGetData>['updateFlag'];
    downloadFileName: ReturnType<typeof useGetData>['downloadFileName'];
    setDownloadFileName: ReturnType<typeof useGetData>['setDownloadFileName'];
    isOpenDownloadJSONModal: ReturnType<typeof useGetData>['isOpenDownloadJSONModal'];
    setIsOpenDownloadJSONModal: ReturnType<typeof useGetData>['setIsOpenDownloadJSONModal'];
    onCancel: ReturnType<typeof useGetData>['onCancel'];
    onAccept: ReturnType<typeof useGetData>['onAccept'];
}

export const Toolbar = ({
    handleFileUpload,
    updateFlag,
    downloadFileName,
    setDownloadFileName,
    isOpenDownloadJSONModal,
    setIsOpenDownloadJSONModal,
    onCancel,
    onAccept,
}: ToolbarProps) => {
    return (
        <>
            <Layout
                direction="column"
                className={cnMixSpace({ mH: 'xs', mT: '2xs' })}
            >
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
                    >
                        ER Diagram
                    </Text>
                </Layout>

                <Layout
                    direction="row"
                    className={cnMixSpace({ mT: '2xs' })}
                >
                    <FileField
                        id="jsonFileInput"
                        accept="application/json"
                        onChange={() => {
                            handleFileUpload();
                        }}
                    >
                        {(props) => <Button {...props} label="Загрузить JSON" />}
                    </FileField>

                    <Button
                        // disabled
                        disabled={!updateFlag}
                        className={cnMixSpace({ mL: 's' })}
                        label="Скачать JSON"
                        onClick={() => {
                            setIsOpenDownloadJSONModal(true);
                        }}
                    />
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