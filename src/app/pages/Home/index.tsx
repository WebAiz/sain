// @flow
import * as React from 'react';

type Props = {};

export function Home(props: Props) {
  const arr = new Array(5).fill(2);
  return (
      <main>
        <div className="block-list">
          {arr.map((el, i) => (
              // <SmallBlock key={i} />
              <div>home</div>
          ))}
        </div>
      </main>
  );
}
