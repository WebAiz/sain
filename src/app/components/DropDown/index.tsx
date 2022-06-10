// @flow
import * as React from 'react';
import {useState} from 'react';
import './DropDown.scss';

type Props = {};

const data = {
  title: 'temp title',
  list: [{title: 'dsfsd', slug: '1'}, {title: 'sdfsd', slug: '2'}],
};

export function DropDown(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
      <div className={'dropdown'}
           onMouseOver={() => setIsOpen(true)}
           onMouseLeave={() => setIsOpen(false)}>
        <div className={'dropdown-header'}>
          {data.title}
        </div>
        {isOpen && <div className={'dropdown-body'}>
          {data.list.map((el, i) => (
              <p key={i}>{el.title}</p>
          ))}
        </div>}
      </div>
  );
}
