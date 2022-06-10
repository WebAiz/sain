// @flow
import * as React from 'react';
import './SmallBlock.scss';
import {useNavigate} from 'react-router-dom';

type Props = {};

const data = {
  title: 'dsfsdf dsfsd sdfsdf sdfsdfs dsfs',
  description: 'fsdfsd sdfsdfsdf sdfsdfsd sdf',
};

export function SmallBlock(props: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/blog/1/1');
  };
  return (
      <div onClick={handleClick} className={'block'}>
        <img src="/images/map.png" alt="block" />
        <div className={'block-content'}>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>

      </div>
  );
}
