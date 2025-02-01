import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { FileField } from '@consta/uikit/FileField';
import { Button } from '@consta/uikit/Button';
import { useGetData } from '../hooks/useGetData.ts';
import { cnMixSpace } from '@consta/uikit/MixSpace';

export interface ToolbarProps {
    handleFileUpload: ReturnType<typeof useGetData>['handleFileUpload'];
    handleJSONDownload: ReturnType<typeof useGetData>['handleJSONDownload'];
    updateFlag: ReturnType<typeof useGetData>['updateFlag'];
}

export const Toolbar = ({
    handleFileUpload,
    handleJSONDownload,
    updateFlag
}: ToolbarProps) => {
    return (
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
                    disabled={!updateFlag}
                    className={cnMixSpace({ mL: 's' })}
                    label="Скачать JSON"
                    onClick={() => {
                        handleJSONDownload()
                    }}
                />
            </Layout>
        </Layout>
    );
};

export default Toolbar;