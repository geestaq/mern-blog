import React from 'react';
import { PropTypes } from 'prop-types';
import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import Pagination from '../../common/Pagination/Pagination';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      presentPage: props.initialPage || 1,
      perPage: props.postsPerPage || props.initialPostsPerPage
    };
  }

  loadPostsPage = (page, postsPerPage) => {
    const { loadPostsByPage } = this.props;
    loadPostsByPage(page, postsPerPage);
  }

  componentDidMount() {
    const { loadPostsByPage, resetRequest } = this.props;
    const { presentPage, perPage } = this.state;
    resetRequest();
    loadPostsByPage(presentPage, perPage);
  }

  render() {
    const { posts, request, pages, initialPage } = this.props;
    const { perPage } = this.state;
    const { loadPostsPage } = this;

    let { pagination } = this.props;
    if(typeof(pagination) == 'undefined') pagination = true;

    let paginationContent = '';
    if(pagination) paginationContent = <Pagination pages={pages} perPage={perPage} initialPage={initialPage} onPageChange={loadPostsPage} />;

    if(!request.pending && request.success && posts.length > 0)
      return (
        <div>
          <PostsList posts={posts} />
          {paginationContent}
        </div>
      );
    if(request.pending || request.success === null)
      return (
        <div>
          <Spinner/>
          {paginationContent}
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
  initialPage: PropTypes.number,
  postsPerPage: PropTypes.number,
};

export default Posts;
