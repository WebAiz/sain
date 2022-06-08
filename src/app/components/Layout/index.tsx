// @flow
import * as React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from '../Header';
import {Footer} from '../Footer';

type Props = {};

export function Layout(props: Props) {
  return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
  );
}
