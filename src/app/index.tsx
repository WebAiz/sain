// @flow
import * as React from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages";
import Admin from "../admin";
import Dashboard from "../admin/pages/Dashboard/Dashboard";
import Reset from "../components/auth/Reset/Reset";
import {CommonPages} from "../admin/pages/CommonPages/CommonPages";
import {BlogsPage} from "../admin/pages/BlogsPage/BlogsPage";
import {Contacts} from "../admin/pages/Contacts/Contacts";
import {ChildYear} from "../admin/pages/ChildYear/ChildYear";
import {Stuff} from "../admin/pages/Stuff/Stuff";
import {Images} from "../components/Images/Images";
import {Ceo} from "../admin/pages/CEO/CEO";
import Register from "../components/auth/Register";

type Props = {};

export default function App(props: Props) {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="admin" element={<Admin />}>
                    <Route index element={<Dashboard/>} />
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
