import {useState} from 'react';
import './DropDown.scss';

type Props = {
  data: any,
  navigateToBlogs: any
};

export function DropDown({data, navigateToBlogs}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className={'dropdown'}
           onMouseOver={() => setIsOpen(true)}
           onMouseLeave={() => setIsOpen(false)}>
        <div className={'dropdown-header'}>
          {data.header.name}
        </div>
        {isOpen && <div className={'dropdown-body'}>
          {data.list.map((el, i) => (
              <p onClick={() => navigateToBlogs(data.header.id, el.id)} key={i}>{el.name}</p>
          ))}
        </div>}
      </div>
  );
}
