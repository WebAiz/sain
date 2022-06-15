import * as React from 'react';
import {MouseEventHandler, ReactNode} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './Modal.scss';

type Props = {
  children: ReactNode,
  onClose: MouseEventHandler<SVGSVGElement>
};

export function Modal({children, onClose}: Props) {
  return (
      <div className="modal">
        <div className={'modal-content'}>
          <CloseIcon className="modal-close" onClick={onClose} />
          {children}
        </div>

      </div>
  );
}
