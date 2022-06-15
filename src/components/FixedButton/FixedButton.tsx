import {ReactNode} from 'react';
import './FixedButton.scss';

type Props = {
  children: ReactNode,
  onClick: any
};

export function FixedButton({children, onClick}: Props) {
  return (
      <button className={'fixed-button'} onClick={onClick}>
        {children}
      </button>
  );
}
