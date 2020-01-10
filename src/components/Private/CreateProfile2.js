import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../Layout';
import { Menu, Icon } from 'antd';
import Education from './Education';
import Work from './Work';
import Header from './Header';
import UserProfile from './UserProfile';
import Contacts from './Contacts';
import Skills from './Skills';
import 'antd/dist/antd.css';
import { GetProfile } from '../../actions/profileActions';

class Sider extends React.Component {
  state = {
    value: 'details',
  };

  componentDidMount() {
    this.props.GetProfile();
  }

  handleClick = e => {
    this.setState({ value: e.item.props.name });
  };

  render() {
    return (
      <Layout>
        <div className='row'>
          <div className='col-3'>
            <Menu
              style={{ width: 256 }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode='inline'
            >
              <Menu.Item key='1' name='details' onClick={this.handleClick}>
                {' '}
                Details{' '}
              </Menu.Item>
              <Menu.Item key='2' name='contact' onClick={this.handleClick}>
                Contact
              </Menu.Item>
              <Menu.Item key='3' name='summary' onClick={this.handleClick}>
                Summary
              </Menu.Item>
              <Menu.Item key='4' name='education' onClick={this.handleClick}>
                Education
              </Menu.Item>
              <Menu.Item key='5' name='work' onClick={this.handleClick}>
                Work Experience
              </Menu.Item>
              <Menu.Item key='6' name='skills' onClick={this.handleClick}>
                Skills
              </Menu.Item>
              <Menu.Item key='7' name='achievements' onClick={this.handleClick}>
                Achievements (optional)
              </Menu.Item>
            </Menu>
          </div>

          <div className='col-8 container'>
            {this.state.value === 'education' && <Education />}
            {this.state.value === 'work' && <Work />}
            {this.state.value === 'details' && <UserProfile />}
            {this.state.value === 'summary' && <Header />}
            {this.state.value === 'contact' && <Contacts />}
            {this.state.value === 'skills' && <Skills />}
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { GetProfile })(Sider);
