import React, {useEffect, useCallback} from 'react';// eslint-disable-line
import PropTypes from 'prop-types';
import ReactList from 'react-list';
import AppBar from './helpers/AppBar';
import Comments from './helpers/Comments';
import Menu from './helpers/Menu';
import { useBtnControl, useInputControl } from './helpers/hooks';

export default function Main({ getComments, comments }) {
  const [commentType, setCommentType] = useBtnControl('');
  const [searchValue, setSearchValue] = useInputControl('');
  useEffect(() => { getComments && getComments(); }, [getComments]);

  const fillterBy = useCallback((commentsList) => {
    if (!commentType && !searchValue) {
      return commentsList;
    }
    let result = commentsList;
    if (commentType) {
      const isPositive = commentType === 'positive';
      result = result.filter(comment => comment.IsPositive === isPositive);
    }
    if (searchValue) {
      result = result.filter(comment => (comment.Message || '').indexOf(searchValue) !== -1);
    }
    return result;
  }, [commentType, searchValue]);

  const filteredComments = fillterBy(comments);
  return (
    <div>
      <AppBar title='Отзывы'>
        <Menu filterBy={setCommentType} selectedButton={commentType} searchBy = {setSearchValue}/>
      </AppBar>
      <ReactList
        itemRenderer={index => filteredComments[index]}
        itemsRenderer={(visibleComments, ref) => (
          <div ref={ref} key='listBlock'>
            {visibleComments.map(comment => (
              <Comments {...comment} key ={comment.id}/>
            ))}
          </div>)
        }
        length={filteredComments.length}
        type='uniform'
      />
    </div>
  );
}

Main.propTypes = {
  title: PropTypes.string,
  comments: PropTypes.array,
  getComments: PropTypes.func.isRequired,
};
Main.defaultProps = {
  title: '',
  comments: [],
};
