import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Layout from '../../Layout';
import LoadingScreen from '../common/LoadingScreen';
import axios from 'axios';
import { GetProfile } from '../../actions/profileActions';
import { saveAs } from 'file-saver';

class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Jordan Belfort',
    };
  }

  handleClick = () => {
    axios
      .post('http://localhost:5000/api/v1/profile/create-pdf', this.props.profile.profile)
      .then(() =>
        axios.get('http://localhost:5000/api/v1/profile/fetch-pdf', {
          responseType: 'blob',
        }),
      )
      .then(res => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'Resume.pdf');
      });
  };

  componentDidMount() {
    this.props.GetProfile();
  }

  render() {
    return (
      <Layout>
        <Fragment>
          {this.props.profile.isLoading ? (
            <LoadingScreen />
          ) : (
            <div>
              <button type='button' onClick={this.handleClick}>
                Download
              </button>
            </div>
          )}
        </Fragment>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { GetProfile })(Templates);
