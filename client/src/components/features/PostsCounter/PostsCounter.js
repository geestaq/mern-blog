import React from 'react';

class PostsCounter extends React.Component {

  render() {
    const { postsCounter } = this.props;
    const postsCounterText = postsCounter > 0 ? `Posts amount: ${postsCounter}` : '';

    return (
      <div>{postsCounterText}</div>
    );
  }

};

export default PostsCounter;
