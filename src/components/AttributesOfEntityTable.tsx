import { TAttribute, TAttributeRow } from '../types/elements.types.ts';
import { Text } from '@consta/uikit/Text';
import { rcTableAdapter } from '@consta/rc-table-adapter/rcTableAdapter';
import RCTable, { ColumnType, TableProps } from 'rc-table';
import { useEffect, useState } from 'react';

export interface AttributesOfEntityTableProps {
    columns: TAttribute[];
}

export const AttributesOfEntityTable = ({
    columns
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

    const columnsTable: ColumnType<TAttributeRow>[] = [
        {
            title: null,
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            width: '30px',
            render: (value: any) => (
                <div
                    style={{
                        height: '30px'
                    }}
                >
                    <Text
                        style={{
                            fontSize: '14px',
                            color: 'black',
                        }}
                    >
                        {value}
                    </Text>
                </div>
            )
        },
        {
            title: null,
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            width: '125px',
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
            width: '125px',
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