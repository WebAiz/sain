// @flow
import * as React          from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './DropDown.scss'

export interface list {
    slug: string,
    name: string
}

export interface Pages {
    title: string,
    lists: list[]
}
type Props = {
    data : Pages
}


export function DropDown({data}:Props) {
    const navigate = useNavigate();

    function goToPage(slug: string) {
        navigate("/pages/" + slug);
    }
    return (
        <div className={'dropDown'}>
            <h3>{data.title}</h3>
            <ul>
                {data.lists.map((list, index) => (
                    <span key={index} onClick={() => goToPage(list.slug)}>{list.name}</span>
                ))}
            </ul>
        </div>
    );
};