// @flow
import * as React from 'react';
import {SmallBlock} from '../../../components/SmallBlock';

type Props = {};

export function Home(props: Props) {
  const arr = new Array(5).fill(2);
  return (
      <main>
        <div className="block-list">
          {arr.map((el, i) => (
              <SmallBlock key={i} />
          ))}
        </div>
      </main>
  );
}
