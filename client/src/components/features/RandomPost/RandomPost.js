import React from 'react';
import { PropTypes } from 'prop-types';
import PageTitle from '../../common/PageTitle/PageTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
//import './PostSummary.scss';

class RandomPost extends React.Component {

  componentDidMount() {
    const { loadRandomPost, resetRequest } = this.props;
    resetRequest();
    loadRandomPost();
  }

  render() {
    const { randomPost, request } = this.props;

    let content = '';
    if(!request.pending && request.success && randomPost !== null)
      content = <article id={`post-${randomPost.id}`}>
        <PageTitle>{randomPost.title}</PageTitle>
        <p>Author: {randomPost.author}</p>
        <HtmlBox>{randomPost.content}</HtmlBox>
      </article>;
    if(request.pending || request.success === null)
      content = <Spinner/>;
    if(!request.pending && request.error !== null)
      content = <Alert variant="error">{request.error}</Alert>;
    if(!request.pending && request.success && randomPost === null)
      content = <Alert variant="info">No post</Alert>;

    return (
      <div>
        {content}
      </div>
    );
  }

};

RandomPost.propTypes = {
  randomPost: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }),
  loadRandomPost: PropTypes.func.isRequired,
};

export default RandomPost;
