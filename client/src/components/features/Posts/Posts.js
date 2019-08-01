import React from 'react';
import { PropTypes } from 'prop-types';
import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import Pagination from '../../common/Pagination/Pagination';

class Posts extends React.Component {

  loadPostsPage = (page) => {
    const { loadPostsByPage } = this.props;
    loadPostsByPage(page);
  }

  componentDidMount() {
    const { loadPostsByPage , resetRequest } = this.props;
    resetRequest();
    loadPostsByPage(1);
  }

  render() {
    const { posts, request, pages } = this.props;
    const { loadPostsPage } = this;

    if(!request.pending && request.success && posts.length > 0)
      return (
        <div>
          <PostsList posts={posts} />
          <Pagination pages={pages} onPageChange={loadPostsPage} />
        </div>
      );
    if(request.pending || request.success === null)
      return (
        <div>
          <Spinner/>
          <Pagination pages={pages} onPageChange={loadPostsPage} />
        </div>
      );
    if(!request.pending && request.error !== null)
      return <Alert variant="error">{request.error}</Alert>;
    if(!request.pending && request.success && posts.length === 0)
      return <Alert variant="info">No posts</Alert>;
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
  pages: PropTypes.number.isRequired,
  loadPostsByPage: PropTypes.func.isRequired,
};

export default Posts;
