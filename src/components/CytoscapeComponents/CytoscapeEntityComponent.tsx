import { TAttribute } from '../../types/elements.types.ts';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { EdgeDefinition } from 'cytoscape';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import KeyTooltip from '../KeyTooltip.tsx';

export interface EntityComponentProps {
    entityName: string;
    columns: TAttribute[];
    edges: EdgeDefinition[];
}

export const CytoscapeEntityComponent = ({
    entityName,
    columns,
    edges
}: EntityComponentProps) => {

    return (
        <Layout
            direction="column"
            id={entityName}
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
                className={cnMixSpace({ pH: 's', pT: '2xs' })}
            >
                {entityName}
            </Text>
            {columns.map((column, index) => {
                return (
                    <Layout
                        key={index}
                        id={column.divKeyId ? column.divKeyId : ''}
                        direction="row"
                        style={{
                            width: '30vw'
                        }}
                    >
                        <div
                            className={cnMixSpace({ p: 'xs' })}
                            style={{
                                border: '1px solid black',
                                borderTop: '2px solid black',
                                width: '15%'
                            }}
                        >
                            <KeyTooltip
                                column={column}
                                edges={edges}
                            />
                        </div>
                        <div
                            className={cnMixSpace({ p: 'xs' })}
                            style={{
                                border: '1px solid black',
                                borderTop: '2px solid black',
                                width: '100%'
                            }}
                        >
                            {column.name}
                        </div>
                        <div
                            className={cnMixSpace({ p: 'xs' })}
                            style={{
                                border: '1px solid black',
                                borderTop: '2px solid black',
                                width: '50%'
                            }}
                        >
                            {column.type}
                        </div>
                        <div
                            className={cnMixSpace({ p: 'xs' })}
                            style={{
                                border: '1px solid black',
                                borderTop: '2px solid black',
                                width: '50%'
                            }}
                        >
                            {column.desc ? column.desc : ''}
                        </div>
                    </Layout>
                );
            })}
        </Layout>
    );
}

export default CytoscapeEntityComponent;