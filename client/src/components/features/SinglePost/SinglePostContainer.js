import { connect } from 'react-redux';
import { getSinglePost, getRequest, resetRequest, loadSinglePostRequest } from '../../../redux/postsRedux';
import SinglePost from './SinglePost';
import { withRouter } from 'react-router';

const mapStateToProps = state => ({
  singlePost: getSinglePost(state),
  request: getRequest(state)
})

const mapDispatchToProps = dispatch => ({
  loadSinglePost: (id) => dispatch(loadSinglePostRequest(id)),
  resetRequest: () => dispatch(resetRequest()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePost));
