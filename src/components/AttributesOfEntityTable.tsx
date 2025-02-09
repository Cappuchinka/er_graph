import { TAttribute, TAttributeRow } from '../types/elements.types.ts';
import { Text } from '@consta/uikit/Text';
import { rcTableAdapter } from '@consta/rc-table-adapter/rcTableAdapter';
import RCTable, { ColumnType, TableProps } from 'rc-table';
import { useEffect, useState } from 'react';
import {CytoscapeAttributeKeyComponent} from "./CytoscapeAttributeKeyComponent.tsx";
import {useGetData} from "../hooks/useGetData.ts";

export interface AttributesOfEntityTableProps {
    columns: TAttribute[];
    cyRef: ReturnType<typeof useGetData>['cyRef'];
    parent: string;
}

export const AttributesOfEntityTable = ({
    columns,
    cyRef,
    parent,
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
        console.log(convertData)
    }, [columns]);

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
                            <CytoscapeAttributeKeyComponent
                                divKey={record.divKeyId}
                                value={value}
                                cyRef={cyRef}
                                parent={parent}
                            />
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