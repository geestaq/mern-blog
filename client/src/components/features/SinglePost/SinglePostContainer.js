import { connect } from 'react-redux';
import { getSinglePost, getRequest, loadSinglePostRequest } from '../../../redux/postsRedux';
import SinglePost from './SinglePost';
import { withRouter } from 'react-router';

const mapStateToProps = state => ({
  singlePost: getSinglePost(state),
  request: getRequest(state)
})

const mapDispatchToProps = dispatch => ({
  loadSinglePost: (id) => dispatch(loadSinglePostRequest(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePost));
