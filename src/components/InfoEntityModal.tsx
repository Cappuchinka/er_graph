import { Modal } from '@consta/uikit/Modal';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/icons/IconClose';
import { useGetData } from '../hooks/useGetData.tsx';
import AttributesOfEntityTable from './AttributesOfEntityTable.tsx';

export interface InfoEntityModalProps {
    isOpen: ReturnType<typeof useGetData>['isOpenInfoEntityModal'];
    onCancel: () => void;
    nodeEntityInfo: ReturnType<typeof useGetData>['nodeEntityInfo'];
}

export const InfoEntityModal = ({
    isOpen,
    onCancel,
    nodeEntityInfo
}: InfoEntityModalProps) => {
    const IconCloseButton = () => {
        return (
            <IconClose
                size="m"
                view="link"
            />
        );
    };

    return (
        <Modal
            className={cnMixSpace({ p: 's' })}
            isOpen={isOpen}
            hasOverlay={false}
            style={{
                right: '10px',
                height: '100%',
                width: '550px',
                boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.125)',
            }}
            onEsc={onCancel}
        >
            <Layout
                direction="column"
            >
                {/* Top */}
                <Layout
                    direction="row"
                    style={{
                        alignItems: 'center',
                    }}
                    className={cnMixSpace({ mB: 'xl' })}
                >
                    <Text
                        weight="bold"
                        size="2xl"
                    >
                        Информация о сущности
                    </Text>
                    <Button
                        size="m"
                        onlyIcon
                        view="clear"
                        onClick={onCancel}
                        iconLeft={IconCloseButton}
                        className={cnMixSpace({ mL: 'auto' })}
                    />
                </Layout>

                {nodeEntityInfo && (
                    <Layout
                        direction="column"
                        style={{
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden'
                        }}
                    >
                        {/** Название сущности */}
                        <Text>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-expect-error */}
                            { `Название сущности: ${nodeEntityInfo ? nodeEntityInfo.data().label : ''}` }
                        </Text>

                        {/** Цвет */}
                        <Layout
                            direction="row"
                            style={{
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                className={cnMixSpace({ mR: '2xs' })}
                            >
                                Цвет:
                            </Text>
                            <div
                                style={{
                                    border: '1px solid black',
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    backgroundColor: nodeEntityInfo.data().color,
                                    width: '16px',
                                    height: '16px'
                                }}
                            />
                            <Text
                                className={cnMixSpace({ mL: '2xs' })}
                            >
                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                {/* @ts-expect-error */}
                                {nodeEntityInfo.data().color}
                            </Text>
                        </Layout>

                        {/** Аттрибуты */}
                        <Layout
                            direction="column"
                            className={cnMixSpace({ mT: 'xs' })}
                            style={{
                                border: '1px solid lightgray',
                            }}
                        >
                            <AttributesOfEntityTable
                                columns={
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    nodeEntityInfo.data().attributes
                                }
                            />
                        </Layout>
                    </Layout>
                )}
            </Layout>
        </Modal>
    );
};

export default InfoEntityModal;
