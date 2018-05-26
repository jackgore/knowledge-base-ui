import React from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'next/link';
import Search from './Search.js';
import Logo from '../misc/Logo.js';
import Config from '../../config.json';
import $ from 'jquery';
import { Navbar, NavItem, MenuItem, Nav, NavDropdown } from 'react-bootstrap';

class KBNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.buildUserSection = this.buildUserSection.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      isLoggedIn: props.isLoggedIn || false,
      username: props.username || '',
      text: props.text || ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.username === prevState.username) {
      return null;
    }

    return ({
      username: nextProps.username,
      isLoggedIn: nextProps.isLoggedIn
    });
  }

  logout() {
    const self = this;

    // Post loging request to backend
    $.ajax({
      type: 'POST',
      url: Config.serverURL + '/logout',
      xhrFields: {
        withCredentials: true
      },
      success: function(json) {
        self.setState({isLoggedIn: false});
      },
      error: function (xhr) {
        //var data = JSON.parse(xhr.responseText);
        //self.addError(self.buildError(data['message']));
        console.log('unable to logout');
      }
    });
  }

  buildUserSection() {
    if (!this.state.isLoggedIn) {
      return (
        <NavItem eventKey={3} href='/login'>Login</NavItem>
      );
    }

    return (
      <NavDropdown eventKey={3} title={this.state.username} id="basic-nav-dropdown">
        <MenuItem eventKey={3.1} href={'/users/' + this.state.username}>Profile</MenuItem>
        <MenuItem eventKey={3.2}>Settings</MenuItem>
        <MenuItem eventKey={3.3}>Help</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3} onClick={this.logout}>Logout</MenuItem>
      </NavDropdown>
    );
  }

  render() {
    return (
    /*  <nav className='kb-navbar'>
        <Logo color={'black'} size={'inherit'} className={'kb-navbar-padding'}/>
        <span className='kb-navbar-text kb-navbar-padding'>
          {this.state.text}
        </span>
        <Search text={'Search...'} />
        <UserWidget className='kb-navbar-padding' />
      </nav>*/

      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Logo color={'#777'} size={'inherit'} className={'kb-navbar-padding'}/>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href='/questions'>Questions</NavItem>
          <NavItem eventKey={2} href='/about'>About</NavItem>
        </Nav>
        <Nav pullRight>
          {this.buildUserSection()}
        </Nav>
      </Navbar>
    );
	}
}

export default KBNavbar;
