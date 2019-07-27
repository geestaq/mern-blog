import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../../common/Button/Button';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import './PostSummary.scss';

const PostSummary = ({ id, title, content }) => (
  <article className="post-summary">
    <SmallTitle>{title}</SmallTitle>
    <p>{content}</p>
    <Button variant="primary">
      Read more
    </Button>
  </article>
);

PostSummary.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default PostSummary;
