// @flow
import * as React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Reset from '../components/auth/Reset';
import Images from '../components/Images';
import Register from '../components/auth/Register';
import Layout from '../components/Layout';
import Blog from './pages/Blog';
import ChildYearApp from './pages/ChildYearApp';
import ContactsApp from '../components/Contacts';
import StuffApp from './pages/StuffApp';

// admin components
import Admin from '../admin/Admin';
import Dashboard from '../admin/pages/Dashboard';
import CommonPages from '../admin/pages/CommonPages';
import BlogsPage from '../admin/pages/BlogsPage';
import Contacts from '../admin/pages/Contacts';
import Stuff from '../admin/pages/Stuff';
import Ceo from '../admin/pages/CEO';
import Blogs from './pages/Blogs';
import ChildYear from '../admin/pages/ChildYear';

type Props = {};

export default function App(props: Props) {
  return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blog/:sectionId/:blogsId/:blogId" element={<Blog />} />
            <Route path="blogs/:sectionId/:blogsId" element={<Blogs />} />
            <Route path="child-year" element={<ChildYearApp />} />
            <Route path="contacts" element={<ContactsApp />} />
            <Route path="stuff" element={<StuffApp />} />
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
