import React from 'react';
import { PropTypes } from 'prop-types';
import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

class Posts extends React.Component {

  componentDidMount() {
    const { loadPosts, resetRequest } = this.props;
    resetRequest();
    loadPosts();
  }

  render() {
    const { posts, request } = this.props;

    let content = '';
    if(!request.pending && request.success && posts.length > 0)
      content = <PostsList posts={posts} />;
    if(request.pending || request.success === null)
      content = <Spinner/>;
    if(!request.pending && request.error !== null)
      content = <Alert variant="error">{request.error}</Alert>;
    if(!request.pending && request.success && posts.length === 0)
      content = <Alert variant="info">No posts</Alert>;

    return (
      <div>
        {content}
      </div>
    );
  }

};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ),
  loadPosts: PropTypes.func.isRequired,
};

export default Posts;
