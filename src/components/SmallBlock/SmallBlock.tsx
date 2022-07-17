import './SmallBlock.scss';
import {useNavigate} from 'react-router-dom';
import {truncateString} from '../../utils';

type Props = {
  data: any,
  imgUrl: any,
  sectionId: any,
  blogsId: any
};


export function SmallBlock(props: Props) {
  const {sectionId, blogsId, data, imgUrl} = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${sectionId}/${blogsId}/${data.id}`);
  };
  return (
      <div onClick={handleClick} className={'block'}>
        <div className={'img-wrapper'}>
          <img src={imgUrl} alt="block" />
        </div>

        <div className={'block-content'}>
          <h2>{data.title}</h2>
          <p>{truncateString(data.description, 300)}</p>
        </div>
      </div>
  );
}
