// @flow
import * as React from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages";

type Props = {};

export default function App(props: Props) {
    return (
        <div className={'container'}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
};
