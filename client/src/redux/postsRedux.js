import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getPosts = ({ posts }) => posts.data;
export const getPostsCounter = ({ posts }) => posts.amount;
export const getPostsPerPage = ({ posts }) => posts.postsPerPage;
export const getRequest = ({ posts }) => posts.request;
export const getSinglePost = ({ posts }) => posts.singlePost;
export const getRandomPost = ({ posts }) => posts.randomPost;
export const getPages = ({ posts }) => Math.ceil(posts.amount / posts.postsPerPage);

// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* ACTIONS */
export const CLEAR_POSTS = createActionName('CLEAR_POSTS');
export const LOAD_POSTS = createActionName('LOAD_POSTS');
export const LOAD_POSTS_PAGE = createActionName('LOAD_POSTS_PAGE');
export const LOAD_SINGLE_POST = createActionName('LOAD_SINGLE_POST');
export const LOAD_RANDOM_POST = createActionName('LOAD_RANDOM_POST');
export const START_REQUEST = createActionName('START_REQUEST');
export const END_REQUEST = createActionName('END_REQUEST');
export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const clearPosts = () => ({ type: CLEAR_POSTS });
export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
export const loadPostsByPage = payload => ({ payload, type: LOAD_POSTS_PAGE });
export const loadSinglePost = payload => ({ payload, type: LOAD_SINGLE_POST });
export const loadRandomPost = payload => ({ payload, type: LOAD_RANDOM_POST });
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });
export const resetRequest = () => ({ type: RESET_REQUEST });

/* THUNKS */
export const loadPostsRequest = () => {
  return async dispatch => {
    dispatch(clearPosts());
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/posts`);
      dispatch(loadPosts(res.data));
      dispatch(endRequest());
    } catch(e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadSinglePostRequest = (id) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/post/${id}`);
      dispatch(loadSinglePost(res.data));
      dispatch(endRequest());
    } catch(e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadRandomPostRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/post/random`);
      dispatch(loadRandomPost(res.data));
      dispatch(endRequest());
    } catch(e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const addPostRequest = (post) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.post(`${API_URL}/posts`, post);
      dispatch(endRequest());
    } catch(e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadPostsByPageRequest = (page, postsPerPage) => {
  return async dispatch => {

    dispatch(startRequest());
    try {

      const startAt = (page - 1) * postsPerPage;
      const limit = postsPerPage;

      let res = await axios.get(`${API_URL}/posts/range/${startAt}/${limit}`);

      const payload = {
        posts: res.data.posts,
        amount: res.data.amount,
        postsPerPage,
        presentPage: page,
      };

      dispatch(loadPostsByPage(payload));
      dispatch(endRequest());

    } catch(e) {
      dispatch(errorRequest(e.message));
    }

  };
};

/* INITIAL STATE */
const initialState = {
  data: [],
  singlePost: null,
  randomPost: null,
  amount: 0,
  postsPerPage: 1,
  presentPage: 1,
  request: {
    pending: false,
    error: null,
    success: null,
  },
};

/* REDUCER */
export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_POSTS:
      return { ...statePart, data: [] };
    case LOAD_POSTS:
      return { ...statePart, data: action.payload };
    case LOAD_POSTS_PAGE:
      return {
        ...statePart,
        postsPerPage: action.payload.postsPerPage,
        presentPage: action.payload.presentPage,
        amount: action.payload.amount,
        data: [...action.payload.posts],
      };
    case LOAD_SINGLE_POST:
      return { ...statePart, singlePost: action.payload };
    case LOAD_RANDOM_POST:
      return { ...statePart, randomPost: action.payload };
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: null } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };
    case RESET_REQUEST:
      return { ...statePart, request: initialState.request };
    default:
      return statePart;
  }
};
