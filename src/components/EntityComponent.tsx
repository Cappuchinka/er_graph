import { TAttribute } from '../types/elements.types.ts';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import AttributesOfEntityTable from './AttributesOfEntityTable.tsx';
import { EdgeDefinition } from 'cytoscape';

export interface EntityComponentProps {
    entityName: string;
    columns: TAttribute[];
    edges: EdgeDefinition[];
}

export const EntityComponent = ({
    entityName,
    columns,
    edges
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
                edges={edges}
            />
        </Layout>
    );
}

export default EntityComponent;