import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import MainMenu from '../../layout/MainMenu/MainMenu';
import Logo from '../../common/Logo/Logo';

const links = [
  { path: '/', title: 'Home' },
  { path: '/posts', title: 'Posts' },
  { path: '/post/new', title: 'New post' },
  { path: '/contact', title: 'Contact' },
];

class NavBar extends React.Component {

  render() {
    return (
      <nav className="navbar">
        <Logo />
        <MainMenu links={links} />
      </nav>
    );
  }

}

export default NavBar;
