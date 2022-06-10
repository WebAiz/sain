// @flow
import * as React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Home} from './pages/Home';
import Reset from '../components/auth/Reset/Reset';
import {Images} from '../components/Images/Images';
import Register from '../components/auth/Register';
import {Layout} from '../components/Layout';
import {Blog} from './pages/Blog';

// admin components
import Admin from '../admin';
import Dashboard from '../admin/pages/Dashboard/Dashboard';
import {CommonPages} from '../admin/pages/CommonPages/CommonPages';
import {BlogsPage} from '../admin/pages/BlogsPage/BlogsPage';
import {Contacts} from '../admin/pages/Contacts/Contacts';
import {ChildYear} from '../admin/pages/ChildYear/ChildYear';
import {Stuff} from '../admin/pages/Stuff/Stuff';
import {Ceo} from '../admin/pages/CEO/CEO';

type Props = {};

export default function App(props: Props) {
  return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blog/:sectionId/:blogId" element={<Blog />} />
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="register" element={<Register />} />
            <Route path="reset" element={<Reset />} />
            <Route path="pages/:slug" element={<CommonPages />} />
            <Route path="pages/:slug/:subSlug" element={<BlogsPage />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="child-year" element={<ChildYear />} />
            <Route path="stuff" element={<Stuff />} />
            <Route path="images/:slug" element={<Images />} />
            <Route path="ceo" element={<Ceo />} />
          </Route>
        </Routes>
      </>
  );
};
