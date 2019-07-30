import React from 'react';
import './NavBar.scss';
import MainMenu from '../../layout/MainMenu/MainMenu';
import Logo from '../../common/Logo/Logo';

class NavBar extends React.Component {

  state = {
    links: [
      { path: '/', title: 'Home' },
      { path: '/posts', title: 'Posts' },
      { path: '/post/new', title: 'New post' },
      { path: '/contact', title: 'Contact' },
    ]
  };

  render() {
    const { links } = this.state;

    return (
      <nav className="navbar">
        <Logo />
        <MainMenu links={links} />
      </nav>
    );
  }

}

export default NavBar;
