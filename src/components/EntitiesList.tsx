import { useRef, useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { ContextMenu } from '@consta/uikit/ContextMenu';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { IconDown } from '@consta/icons/IconDown';
import { Checkbox } from '@consta/uikit/Checkbox';
import { useGetData } from '../hooks/useGetData.tsx';
import { NodeDefinition } from 'cytoscape';
import { Classes } from '../types/elements.types.ts';

export interface EntitiesListProps {
    elements: ReturnType<typeof useGetData>['elements'];
    handleCheckbox: ReturnType<typeof useGetData>['handleCheckbox'];
    count: ReturnType<typeof useGetData>['count'];
}

export const EntitiesList = ({
    elements,
    handleCheckbox,
    count
}: EntitiesListProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const IconDownButton = () => {
        return (
            <IconDown
                size="s"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                className={cnMixSpace({ mL: 'xs' })}
            />
        );
    };

    const renderLeftSide = (
        item: NodeDefinition,
        onChange: (item: NodeDefinition) => void
    ) => {
        const nodeArray = [];

        nodeArray.push(
            <Checkbox
                disabled={count === 1 && item.data.isShow}
                checked={item.data.isShow}
                onChange={() => onChange(item)}
            />
        );

        return nodeArray;
    };

    return (
        <>
            <Button
                disabled={elements.nodes.length === 0}
                ref={ref}
                view="secondary"
                label="Список сущностей"
                iconRight={IconDownButton}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            />
            <ContextMenu
                isOpen={isOpen}
                anchorRef={ref}
                direction="downStartLeft"
                items={elements.nodes.filter(elem => elem.classes === Classes.ENTITY)}
                onClickOutside={() => {
                    setIsOpen(false);
                }}
                getItemLeftSide={item => renderLeftSide(item, handleCheckbox)}
                getItemKey={item => item.data.id}
                getItemLabel={item => item.data.label}
                style={{
                    width: 'max-content',
                }}
            />
        </>
    );
};

export default EntitiesList;
