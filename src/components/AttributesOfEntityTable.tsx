import { TAttribute, TAttributeRow } from '../types/elements.types.ts';
import { Text } from '@consta/uikit/Text';
import { rcTableAdapter } from '@consta/rc-table-adapter/rcTableAdapter';
import RCTable, { ColumnType, TableProps } from 'rc-table';
import { useEffect, useState } from 'react';
import tableStyle from '../styles/Table.module.scss'

const EMPTY_FIELD: string = '-';

export interface AttributesOfEntityTableProps {
    columns: TAttribute[];
}

export const AttributesOfEntityTable = ({
    columns,
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            render: (value: never) => (
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
            ),
        },
        {
            title: null,
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            width: '250px',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            render: (value: never) => (
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
            ),
        },
        {
            title: null,
            dataIndex: 'type',
            key: 'type',
            align: 'left',
            width: '150px',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            render: (value: never) => (
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
            ),
        },
        {
            title: null,
            dataIndex: 'desc',
            key: 'desc',
            align: 'left',
            width: '250px',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            render: (value: never) => (
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
                        align={!value ? 'center' : 'left'}
                    >
                        {value ? value : EMPTY_FIELD}
                    </Text>
                </div>
            ),
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
        rowKey: row => row.rowNumber,
    } as TableProps<TAttributeRow>;

    tableProps.className = tableStyle.scrolling;

    return (
        <RCTable
            {...tableProps}
            columns={columnsTable}
            data={data}
        />
    );
};

export default AttributesOfEntityTable;