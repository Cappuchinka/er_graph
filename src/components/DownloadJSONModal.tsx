import { Modal } from '@consta/uikit/Modal';
import { useGetData } from '../hooks/useGetData.ts';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Button } from '@consta/uikit/Button';

export interface DownloadJSONModalProps {
    isOpen: ReturnType<typeof useGetData>['isOpenDownloadJSONModal'];
    downloadFileName: ReturnType<typeof useGetData>['downloadFileName'];
    setDownloadFileName: ReturnType<typeof useGetData>['setDownloadFileName'];
    onCancel: () => void;
    onAccept: () => void;
}

export const DownloadJSONModal = ({
    isOpen,
    downloadFileName,
    setDownloadFileName,
    onCancel,
    onAccept,
}: DownloadJSONModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            hasOverlay
            onClickOutside={onCancel}
            onEsc={onCancel}
            className={cnMixSpace({ p: 's' })}
        >
            <Layout
                direction="column"
                style={{
                    height: '100%',
                    overflow: 'hidden'
                }}
            >
                {/** Title */}
                <Layout
                    direction="row"
                >
                    <Text
                        size="l"
                        weight="bold"
                    >
                        Скачивание файла
                    </Text>
                </Layout>

                {/** TextField */}
                <Layout
                    direction="column"
                    className={cnMixSpace({ mT: 's' })}
                >
                    <TextField
                        label="Введите название для скачиваемого файла"
                        placeholder="Название файла"
                        size="m"
                        value={downloadFileName}
                        onChange={value => {
                            setDownloadFileName(value);
                        }}
                        withClearButton
                        required
                    />
                </Layout>

                {/** Buttons */}
                <Layout
                    direction="row"
                    className={cnMixSpace({ mT: '3xl', mL: 'auto' })}
                >
                    <Button
                        size="m"
                        label="Отменить"
                        view="secondary"
                        onClick={onCancel}
                    />
                    <Button
                        size="m"
                        className={cnMixSpace({ mL: 'xs' })}
                        label="Скачать"
                        view="primary"
                        disabled={!downloadFileName}
                        onClick={onAccept}
                    />
                </Layout>
            </Layout>
        </Modal>
    );
};

export default DownloadJSONModal;