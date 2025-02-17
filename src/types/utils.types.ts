import { ReactNode } from 'react';

export interface Template {
    name: string,
    position: {
        x: number,
        y: number
    }
}

export interface HintTooltip {
    content: string | ReactNode;
    x: number;
    y: number;
}