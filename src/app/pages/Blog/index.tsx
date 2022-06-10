// @flow
import * as React from 'react';
import './Blog.scss';

type Props = {};

export function Blog(props: Props) {
  const images = new Array(8).fill(0);
  return (
      <main className={'blog'}>
        <h1>TITLE</h1>
        <p className={'mb'}>Disda sdfsd f fsdfsd s fsdf </p>
        <div className={'blog-list'}>
          {images.map((el, i) => (
              <img src="/images/map.png" alt="img" />
          ))}
        </div>
      </main>
  );
}
