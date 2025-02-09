import { TAttribute, TAttributeRow } from '../types/elements.types.ts';
import { Text } from '@consta/uikit/Text';
import { rcTableAdapter } from '@consta/rc-table-adapter/rcTableAdapter';
import RCTable, { ColumnType, TableProps } from 'rc-table';
import { useEffect, useState } from 'react';
import { withTooltip } from '@consta/uikit/withTooltip';
import { EdgeDefinition } from 'cytoscape';
import { Layout } from '@consta/uikit/Layout';

export interface AttributesOfEntityTableProps {
    columns: TAttribute[];
    edges: EdgeDefinition[];
}

export const AttributesOfEntityTable = ({
    columns,
    edges,
}: AttributesOfEntityTableProps) => {
    const [data, setData] = useState<TAttributeRow[]>([]);

    useEffect(() => {
        const convertData = columns.map((column, index) => {
            return {
                ...column,
                rowNumber: index + 1
            }
        });
        setData(convertData);
    }, [columns]);

    const KeyTooltip = withTooltip()(Text);

    const TooltipContent = (record: TAttributeRow, key: string) => {
        let edge;
        if (key === 'PK') {
            edge = edges.find(edge => edge.data.source === record.divKeyId);
        } else {
            edge = edges.find(edge => edge.data.targetField === record.name.toUpperCase());
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
                        Target Table: {edge.data.targetTable}
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

    const columnsTable: ColumnType<TAttributeRow>[] = [
        {
            title: null,
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            width: '30px',
            render: (value: any, record: TAttributeRow) => {
                return (
                    <>
                        {record.divKeyId ? (
                            <div
                                id={record.divKeyId}
                                style={{
                                    height: '30px'
                                }}
                            >
                                {record.key ? (
                                    <KeyTooltip
                                        content={value}
                                        tooltipProps={{ content: TooltipContent(record, record.key) }}
                                    >
                                        {value}
                                    </KeyTooltip>
                                ) : (
                                    <Text>
                                        {value}
                                    </Text>
                                )}
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                );
            }
        },
        {
            title: null,
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            width: '300px',
            render: (value: any) => (
                <div
                    style={{
                        height: '30px'
                    }}
                >
                    <Text
                        style={{
                            fontSize: '14px',
                            color: 'black'
                        }}
                    >
                        {value}
                    </Text>
                </div>

            )
        },
        {
            title: null,
            dataIndex: 'type',
            key: 'type',
            align: 'left',
            width: '150px',
            render: (value: any) => (
                <div
                    style={{
                        height: '30px'
                    }}
                >
                    <Text
                        style={{
                            fontSize: '14px',
                            color: 'black'
                        }}
                    >
                        {value}
                    </Text>
                </div>
            )
        },
    ];

    const tableProps = {
        ...rcTableAdapter({
            borderBetweenColumns: true,
            borderBetweenRows: true,
            verticalAlign: 'center',
        }),
        scroll: {
            y: 10000
        },
        rowKey: row => row.rowNumber,
    } as TableProps<TAttributeRow>;

    return (
        <RCTable
            {...tableProps}
            columns={columnsTable}
            data={data}
        />
    );
};

export default AttributesOfEntityTable;