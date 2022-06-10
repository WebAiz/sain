// @flow
import * as React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from '../Header';
import {Footer} from '../Footer';
import {SideBlock} from '../SideBlock';
import './Layout.scss';
import {BreadCrumb} from '../BreadCrumb';

type Props = {};

export function Layout(props: Props) {
  return (
      <div className={'layout'}>
        <Header />
        <BreadCrumb />
        <div className={'layout-body'}>
          <Outlet />
          <SideBlock />
        </div>

        <Footer />
      </div>
  );
}
