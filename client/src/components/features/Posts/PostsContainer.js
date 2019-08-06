import { connect } from 'react-redux';
import { getPosts, getRequest, resetRequest, loadPostsByPageRequest, getPages, getPostsPerPage } from '../../../redux/postsRedux';
import Posts from './Posts';

const mapStateToProps = state => ({
  posts: getPosts(state),
  request: getRequest(state),
  pages: getPages(state),
  initialPostsPerPage: getPostsPerPage(state),
})

const mapDispatchToProps = dispatch => ({
  loadPostsByPage: (page, postsPerPage) => dispatch(loadPostsByPageRequest(page, postsPerPage)),
  resetRequest: () => dispatch(resetRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
