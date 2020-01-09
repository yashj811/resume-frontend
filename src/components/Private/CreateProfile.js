import React from 'react';
import Layout from '../../Layout';
import UserProfile from './UserProfile';
import Education from './Education';
import Header from './Header';
import Work from './Work';
import { Modal, Button } from 'antd';

class CreateProflie extends React.Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
    modal3Visible: false,
    modal4Visible:false,
    modal5Visible: false,
    modal6Visible: false
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  setModal3Visible(modal3Visible) {
    this.setState({ modal3Visible });
  }

  setModal4Visible(modal4Visible) {
    this.setState({ modal4Visible });
  }

  setModal5Visible(modal5Visible) {
    this.setState({ modal5Visible });
  }

  setModal6Visible(modal6Visible) {
    this.setState({ modal6Visible });
  }

  render() {
    return (
    <Layout>
      <div>
      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Details</h5>
              <Button type="primary" onClick={() => this.setModal1Visible(true)}>
              Add Details
              </Button>
              <Modal
                title="20px to Top"
                style={{ top: 20 }}
                visible={this.state.modal1Visible}
                onOk={() => this.setModal1Visible(false)}
                onCancel={() => this.setModal1Visible(false)}
              >
                <UserProfile />
              </Modal>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Header</h5>
              <Button type="primary" onClick={() => this.setModal2Visible(true)}>
              Add Header
              </Button>
              <Modal
                title="Vertically centered modal dialog"
                centered
                width={700}
                visible={this.state.modal2Visible}
                onOk={() => this.setModal2Visible(false)}
                onCancel={() => this.setModal2Visible(false)}
                >
                   <Header /> 
             </Modal>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Education</h5>
              <Button type="primary" onClick={() => this.setModal3Visible(true)}>
                Add Education
              </Button>
              <Modal
                title="20px to Top"
                style={{ top: 20 }}
                visible={this.state.modal3Visible}
                onOk={() => this.setModal3Visible(false)}
                onCancel={() => this.setModal3Visible(false)}
              >
              <Education />
              </Modal>
            </div>
          </div>
        </div>
      </div>
       

      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Work</h5>
              <Button type="primary" onClick={() => this.setModal4Visible(true)}>
              Add Work
              </Button>
              <Modal
                title="Vertically centered modal dialog"
                centered
                width={700}
                visible={this.state.modal4Visible}
                onOk={() => this.setModal4Visible(false)}
                onCancel={() => this.setModal4Visible(false)}
                >
              <Work /> 
              </Modal>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Projects</h5>
              <Button type="primary" onClick={() => this.setModal5Visible(true)}>
                Add Projects
                </Button>
                <Modal
                  title="Vertically centered modal dialog"
                  centered
                  width={700}
                  visible={this.state.modal5Visible}
                  onOk={() => this.setModal5Visible(false)}
                  onCancel={() => this.setModal5Visible(false)}
                  >
                <UserProfile /> 
                </Modal>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Extras</h5>
              <Button type="primary" onClick={() => this.setModal6Visible(true)}>
                  Add Extras
                  </Button>
                  <Modal
                    title="Extras"
                    centered
                    width={700}
                    visible={this.state.modal6Visible}
                    onOk={() => this.setModal6Visible(false)}
                    onCancel={() => this.setModal6Visible(false)}
                    >
                  <UserProfile /> 
                  </Modal>
            </div>
          </div>
        </div>
      </div>
  </div>
  </Layout>
    );
  }
}

export default CreateProflie;