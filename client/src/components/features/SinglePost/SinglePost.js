import React from 'react';
import { PropTypes } from 'prop-types';
import PageTitle from '../../common/PageTitle/PageTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
//import './PostSummary.scss';

class SinglePost extends React.Component {

  componentDidMount() {
    const { loadSinglePost, resetRequest, match } = this.props;
    resetRequest();
    loadSinglePost(match.params.id);
  }

  render() {
    const { singlePost, request } = this.props;

    let content = '';
    if(!request.pending && request.success && singlePost !== null)
      content = <article id={`post-${singlePost.id}`}>
        <PageTitle>{singlePost.title}</PageTitle>
        <p>Author: {singlePost.author}</p>
        <HtmlBox>{singlePost.content}</HtmlBox>
      </article>;
    if(request.pending || request.success === null)
      content = <Spinner/>;
    if(!request.pending && request.error !== null)
      content = <Alert variant="error">{request.error}</Alert>;
    if(!request.pending && request.success && singlePost === null)
      content = <Alert variant="info">No post</Alert>;

    return (
      <div>
        {content}
      </div>
    );
  }

};

SinglePost.propTypes = {
  singlePost: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }),
  loadSinglePost: PropTypes.func.isRequired,
};

export default SinglePost;
