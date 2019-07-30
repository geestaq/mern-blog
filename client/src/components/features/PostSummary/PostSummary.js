import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../../common/Button/Button';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import './PostSummary.scss';

//funkcja ograniczajaca dlugosc tesktu posta
//jezeli obciecie nastepuje w srodku slowa to cale slowo jest pomijane
//param: content - tresc posta
//param: maxLength - ilosc znakow, do ktorej post bedzie obciety
const cutText = (content, maxLength) => {
  if(maxLength < 1) return 'Error';
  if(content.length > maxLength)
    content = content.substr(0, content.lastIndexOf(" ", maxLength)) + '...';

  return content;
};

const PostSummary = ({ id, author, title, content }) => (
  <article className="post-summary">
    <SmallTitle>{title}</SmallTitle>
    <p>Author: {author}</p>
    <HtmlBox>{cutText(content, 250)}</HtmlBox>
    <Button variant="primary" to={`/post/${id}`}>
      Read more
    </Button>
  </article>
);

PostSummary.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.string,
};

export default PostSummary;
