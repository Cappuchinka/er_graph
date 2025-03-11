import { EdgeDefinition } from 'cytoscape';
import { useEffect, useState } from 'react';
import RCTable, {ColumnType, TableProps} from 'rc-table';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { rcTableAdapter } from '@consta/rc-table-adapter/rcTableAdapter';
import tableStyle from '../styles/Table.module.scss';
import { InfoRelation } from '../types/elements.types.ts';

const EMPTY_FIELD: string = '-';

export interface InfoRelationTableProps {
    sources: EdgeDefinition[];
    targets: EdgeDefinition[];
}

export const InfoRelationTable = ({
    sources,
    targets,
}: InfoRelationTableProps) => {

    const [data, setData] = useState<InfoRelation[]>([]);

    useEffect(() => {
        let i: number;
        const tempData: InfoRelation[] = [];
        if (sources.length > targets.length) {
            for (i = 0; i < targets.length; i++) {
                tempData.push({
                    sources: sources[i],
                    targets: targets[i]
                });
            }
            for (i; i < sources.length; i++) {
                tempData.push({
                    sources: sources[i],
                    targets: null
                })
            }
        } else if (sources.length < targets.length) {
            for (i = 0; i < sources.length; i++) {
                tempData.push({
                    sources: sources[i],
                    targets: targets[i]
                });
            }
            for (i; i < targets.length; i++) {
                tempData.push({
                    sources: null,
                    targets: targets[i]
                })
            }
        } else {
            for (i = 0; i < sources.length; i++) {
                tempData.push({
                    sources: sources[i],
                    targets: targets[i]
                });
            }
        }
        setData(tempData);
    }, [sources, targets]);

    const columnsTable: ColumnType<InfoRelation>[] = [
        {
            title: 'Входящие',
            dataIndex: 'targets',
            key: 'targets',
            align: 'left',
            width: '250px',
            render: (record: EdgeDefinition) => {
                return (
                    record ? (
                        <Layout
                            direction="column"
                        >
                            <Text>{`Таблица: ${record.data.sourceTable}`}</Text>
                            <Text>{`Поля: ${record.data.targetField} <- ${record.data.sourceField}`}</Text>
                        </Layout>
                    ) : (
                        <Layout
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <Text align="center">{ EMPTY_FIELD }</Text>
                        </Layout>
                    )
                );
            },
        },
        {
            title: 'Исходящие',
            dataIndex: 'sources',
            key: 'sources',
            align: 'left',
            width: '250px',
            render: (record: EdgeDefinition) => {
                return (
                    record ? (
                        <Layout
                            direction="column"
                        >
                            <Text>{`Таблица: ${record.data.targetTable}`}</Text>
                            <Text>{`Поля: ${record.data.sourceField} -> ${record.data.targetField}`}</Text>
                        </Layout>
                    ): (
                        <Layout
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <Text align="center">{ EMPTY_FIELD }</Text>
                        </Layout>
                    )
                );
            },
        },
    ];

    const tableProps = {
        ...rcTableAdapter({
            borderBetweenColumns: true,
            borderBetweenRows: true,
            verticalAlign: 'center',
        }),
        style: {
            height: 'auto'
        },
        scroll: {
            y: 10000
        },
        // rowKey: row => row.rowNumber,
    } as TableProps<InfoRelation>;

    tableProps.className = tableStyle.scrolling;

    return (
        <RCTable
            {...tableProps}
            columns={columnsTable}
            data={data}
        />
    );
};

export default InfoRelationTable;
