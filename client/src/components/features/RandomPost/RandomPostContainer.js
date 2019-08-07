import { connect } from 'react-redux';
import { getRandomPost, getRequest, resetRequest, loadRandomPostRequest } from '../../../redux/postsRedux';
import RandomPost from './RandomPost';
import { withRouter } from 'react-router';

const mapStateToProps = state => ({
  randomPost: getRandomPost(state),
  request: getRequest(state)
})

const mapDispatchToProps = dispatch => ({
  loadRandomPost: () => dispatch(loadRandomPostRequest()),
  resetRequest: () => dispatch(resetRequest()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RandomPost));
