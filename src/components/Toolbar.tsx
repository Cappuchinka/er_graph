import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { FileField } from '@consta/uikit/FileField';
import { Button } from '@consta/uikit/Button';
import { useGetData } from "../hooks/useGetData.ts";

export interface ToolbarProps {
    handleFileUpload: ReturnType<typeof useGetData>['handleFileUpload'];
}

export const Toolbar = ({
    handleFileUpload
}: ToolbarProps) => {
    return (
        <Layout
            direction="column"
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
            </Layout>
        </Layout>
    );
};

export default Toolbar;