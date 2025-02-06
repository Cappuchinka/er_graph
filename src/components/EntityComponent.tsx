import { TAttribute } from '../types/elements.types.ts';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';

export interface EntityComponentProps {
    entityName: string;
    columns: TAttribute[];
}

export const EntityComponent = ({
    entityName,
    columns,
}: EntityComponentProps) => {
    return (
        <Layout
            direction="column"
            style={{
                backgroundColor: 'darkblue'
            }}
        >
            <Text
                style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'white'
                }}
            >
                {entityName}
            </Text>
            {columns.map((column, i) => {
                return (
                    <Layout
                        key={i}
                        direction="column"
                        style={{
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '14px',
                                color: 'white'
                            }}
                        >
                            {column.name} : {column.type}
                        </Text>
                    </Layout>
                );
            })}
        </Layout>
    );
}

export default EntityComponent;