import { useRef, useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { ContextMenu } from '@consta/uikit/ContextMenu';
import { EntityItemsContextMenu } from '../types/elements.types.ts';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { IconDown } from '@consta/icons/IconDown';

export interface EntitiesListProps {
    items: EntityItemsContextMenu[]
}

export const EntitiesList = ({
    items,
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

    return (
        <>
            <Button
                disabled={items.length === 0}
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
                items={items}
                onClickOutside={() => {
                    setIsOpen(false);
                }}
                getItemKey={item => item.id}
                getItemLabel={item => item.label}
            />
        </>
    );
};

export default EntitiesList;
