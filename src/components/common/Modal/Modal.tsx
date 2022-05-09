// @flow
import {ReactNode} from 'react';

type Props = {
    children: ReactNode
};

export function Modal({children}: Props) {
    return (
        <div>
            {children}
        </div>
    );
};