import { TAttribute } from '../types/elements.types.ts';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import AttributesOfEntityTable from './AttributesOfEntityTable.tsx';
import {useGetData} from "../hooks/useGetData.ts";

export interface EntityComponentProps {
    entityName: string;
    columns: TAttribute[];
    cyRef: ReturnType<typeof useGetData>['cyRef'];
}

export const EntityComponent = ({
    entityName,
    columns,
    cyRef,
}: EntityComponentProps) => {
    return (
        <Layout
            direction="column"
            style={{
                backgroundColor: 'white',
                border: '1px solid black',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'black'
                }}
            >
                {entityName}
            </Text>
            <AttributesOfEntityTable
                columns={columns}
                cyRef={cyRef}
                parent={entityName}
            />
        </Layout>
    );
}

export default EntityComponent;