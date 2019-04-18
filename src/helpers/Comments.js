import React from 'react';// eslint-disable-line
import PropTypes from 'prop-types';
import CardItem from './CardItem';
import css from './commnets_css_module.css';

export default function CommentsBlock({
  UserName, DateAdded, Comments, Message
}) {
  return (
    <div className={css.blockBorder}>
      <CardItem
        asAccordion = {false}
        title = {UserName}
        subtitle = {DateAdded}
      >
        "{Message}"
      </CardItem>
      {(Comments || []).map((supportComment, idx) => (
        <CardItem
          key = {idx}
          asAccordion = {false}
          title = {'Поддержка'}
          subtitle = {supportComment.DateAdded}
        >
          "{supportComment.Comment}"
        </CardItem>
      ))}
    </div>
  );
}

CommentsBlock.propTypes = {
  UserName: PropTypes.string,
  DateAdded: PropTypes.string,
  Message: PropTypes.string,
  Comments: PropTypes.array,
};
CommentsBlock.defaultProps = {
  UserName: '',
  DateAdded: '',
  Message: '',
  Comments: []
};
