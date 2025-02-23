import { useRef, useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { ContextMenu } from '@consta/uikit/ContextMenu';
import { EntityItemsContextMenu } from '../types/elements.types.ts';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { IconDown } from '@consta/icons/IconDown';
import { Checkbox } from '@consta/uikit/Checkbox';
import { useGetData } from '../hooks/useGetData.tsx';

export interface EntitiesListProps {
    entityItems: ReturnType<typeof useGetData>['entityItems'];
    handleCheckbox: ReturnType<typeof useGetData>['handleCheckbox'];
}

export const EntitiesList = ({
    entityItems,
    handleCheckbox
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
        item: EntityItemsContextMenu,
        onChange: (item: EntityItemsContextMenu) => void
    ) => {
        const nodeArray = [];

        nodeArray.push(
            <Checkbox
                checked={item.isShow}
                onChange={() => onChange(item)}
            />
        );

        return nodeArray;
    };

    return (
        <>
            <Button
                disabled={entityItems.length === 0}
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
                items={entityItems}
                onClickOutside={() => {
                    setIsOpen(false);
                }}
                getItemLeftSide={item => renderLeftSide(item, handleCheckbox)}
                getItemKey={item => item.id}
                getItemLabel={item => item.label}
            />
        </>
    );
};

export default EntitiesList;
