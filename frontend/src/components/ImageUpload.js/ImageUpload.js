import React, { Component } from "react";
import axios from "axios";
import rcmelogo from "../../assets/rcme-logo.png";
import artbg from "../../assets/art1.jpeg";
import {ip} from "../../constants"
import toastr from "toastr";

import { Container, Card, CardBody, Row, Col, Button } from "reactstrap";

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
    };

    this.uploadHandler = this.uploadHandler.bind(this);
  }

  data = new FormData();

  handleChange = (event) => {
    if(event.target.files[0].size < 2000000){
      this.data.append("file", event.target.files[0]);
    }else{
      alert("Please select image size less than 2mb")
      event.target.value = null;
    }
  };

  uploadHandler = () => {
    axios
      .put(
        `${ip.host}/upload/${this.props.match.params.id}`,
        this.data
      )
      .then((r) =>
        r.data.success === true
          ? toastr.success("Uploaded Successfully")
          : toastr.error(r.data.message)
      )
      .catch((e) => toastr.error(e));
    setTimeout(() => {
      this.props.history.push("/upload");
    }, 2000);
  };

  render() {
    return (
      <div className="signup">
        <div className="artlogo-box">
          <img src={rcmelogo} alt="Art" className="artlogo" />
        </div>
        <h1 className="my-4 font-weight-bold .display-4">Upload</h1>
        {/* <div className="signup-box"> */}
        <Container>
          <Card>
            <CardBody style={{ backgroundColor: "#e6a9ca" }}>
              <Row>
                <Col md={8}>
                  <img
                    style={{ height: "100%", width: "100%" }}
                    src={artbg}
                    alt="Art"
                  />
                </Col>
                <Col
                 md={4}
                  style={{
                    backgroundColor: "#fff",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                 
                  <Row>
                    <div>
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <span className="text-danger" style={{fontSize:"15px"}}>Please choose your image as the following types(jpg,jpeg,png) and <br/>size should be less than 2mb</span>
                    <Button
                      size="sm"
                      className="primary mt-2 mb-2"
                      onClick={this.uploadHandler}
                    >
                      Upload
                    </Button>
                  </Row>
                 
                </Col>
              </Row>
              <Row>
              <p className="text-center mt-4">For all queries, Please contact us using this email - <a href="mailto:colouryourdreams@rcme.in" target="_blank" className="text-primary">colouryourdreams@rcme.in</a></p>
                  </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}
