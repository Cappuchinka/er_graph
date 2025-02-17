import { TAttribute } from '../types/elements.types.ts';
import { EdgeDefinition } from 'cytoscape';
import { withTooltip } from '@consta/uikit/withTooltip';
import { Text } from '@consta/uikit/Text';
import { Layout } from '@consta/uikit/Layout';

export interface TextWithTooltipProps {
    column: TAttribute;
    edges: EdgeDefinition[];
}

export const KeyTooltip = ({
    column,
    edges
}: TextWithTooltipProps) => {
    const UseKeyTooltip = withTooltip()(Text);

    const TooltipContent = (column: TAttribute, key: string) => {
        let edge;
        if (key === 'PK') {
            edge = edges.find(edge => edge.data.source === column.divKeyId);
        } else {
            edge = edges.find(edge => edge.data.targetField === column.name.toUpperCase());
        }

        if (edge) {
            return (
                <Layout
                    direction="column"
                >
                    <Text
                        style={{
                            color: 'white',
                        }}
                    >
                        Source Table: {edge.data.sourceTable}
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                        }}
                    >
                        Source Field: {edge.data.sourceField}
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                        }}
                    >
                        Target Table: {edge.data.targetTable}
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                        }}
                    >
                        Target Field: {edge.data.targetField}
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                        }}
                    >
                        Type: {edge.data.type}
                    </Text>
                </Layout>
            );
        } else {
            return null;
        }
    }

    return (
        <>
            {column.divKeyId ? (
                column.key ? (
                    <UseKeyTooltip
                        content={column.key}
                        tooltipProps={{
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            content: TooltipContent(column, column.key)
                        }}
                    >
                        {column.key}
                    </UseKeyTooltip>
                ) : (
                    <Text>
                        {column.key}
                    </Text>
                )
            ) : (
                <></>
            )}
        </>
    );
};

export default KeyTooltip;
