import { Text } from '@consta/uikit/Text';
import { Layout } from '@consta/uikit/Layout';
import { cnMixSpace } from '@consta/uikit/MixSpace';

export interface EdgeHintComponentProps {
    sourceTable: string;
    sourceField: string;
    targetTable: string;
    targetField: string;
    type: string;
}

export const EdgeHintComponent = ({
    sourceTable,
    sourceField,
    targetTable,
    targetField,
    type,
}: EdgeHintComponentProps) => {
    return (
        <Layout
            direction="column"
        >
            <Layout
                direction="row"
            >
                <Text
                    weight="bold"
                    className={cnMixSpace({ mR: '2xs' })}
                >
                    Table:
                </Text>
                <Text>{`${sourceTable} ==> ${targetTable}`}</Text>
            </Layout>

            <Layout
                direction="row"
            >
                <Text
                    weight="bold"
                    className={cnMixSpace({ mR: '2xs' })}
                >
                    Attributes:
                </Text>
                <Text>{`${sourceField} ==> ${targetField}`}</Text>
            </Layout>

            <Layout
                direction="row"
            >
                <Text
                    weight="bold"
                    className={cnMixSpace({ mR: '2xs' })}
                >
                    Type:
                </Text>
                <Text>{type}</Text>
            </Layout>
        </Layout>
    );
};

export default EdgeHintComponent;
