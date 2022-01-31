import React, { Fragment, useState } from "react";
import { Formik, Form, Field, resetForm } from "formik";
import axios  from "axios";
import { TextField } from "./TextField";
import * as Yup from "yup";
import "./signup.css";
import CustomSelect from "./CustomSelect";
import artbg from "../assets/art1.jpeg";
import rcmelogo from "../assets/rcme-logo.png";
import { states } from "./AdminCom/states";
import toastr from "toastr";
import {ip} from "../constants"

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Container,  
  Card,
  CardBody,
  Row,
  Col,
  ButtonGroup,
  FormGroup,
  Label,
} from "reactstrap";

class Signup extends React.Component {
  state = {
    city: "",
    state: "",
    ageGroup: "",
    cityList: [],
    stateList: [],
    ageGroup: [],
    grade: [
      { id: "PRE-KG", label: "PRE-KG" },
      { id: "LKG", label: "LKG" },
      { id: "UKG", label: "UKG" },
      { id: "1st", label: "1st" },
      { id: "2nd", label: "2nd" },
      { id: "3rd", label: "3rd" },
      { id: "4th", label: "4th" },
      { id: "5th", label: "5th" },
      { id: "6th", label: "6th" },
      { id: "7th", label: "7th" },
      { id: "8th", label: "8th" },
      { id: "9th", label: "9th" },
      { id: "10th", label: "10th" },
      { id: "11th", label: "11th" },
      { id: "12th", label: "12th" },
    ],
    age: [
      { label: 1, id: "1" },
      { label: 2, id: "2" },
      { label: 3, id: "3" },
      { label: 4, id: "4" },
      { label: 5, id: "5" },
      { label: 6, id: "6" },
      { label: 7, id: "7" },
      { label: 8, id: "8" },
      { label: 9, id: "9" },
      { label: 10, id: "10" },
      { label: 11, id: "11" },
      { label: 12, id: "13" },
      { label: 13, id: "13" },
      { label: 14, id: "14" },
      { label: 15, id: "15" },
      { label: 16, id: "16" },
    ],
  };

  setstateValues = () => {
    this.setState({
      stateList: states.states.map((a) => {
        return { value: parseInt(a.id), label: a.name };
      }),
    });
  };
  componentDidMount() {
    this.setstateValues();
  }

   phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  render() {
    const validate = Yup.object({
      studentName: Yup.string().required("Required"),
      studentAge: Yup.number().required("Required"),
      ageGroup: Yup.string().required("Required"),
      grade: Yup.string().required("Required"),
      parentName: Yup.string().required("Required"),
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      phoneNumber:  Yup.string().matches(this.phoneRegExp, 'Phone number is not valid').min(10).max(10),
      school: Yup.string(),
      address: Yup.string().required("Required"),
      region: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      pincode: Yup.string()
        .min(6, "Minimum 6 digits should be allowed")
        .max(6, "Max 6 digits only allowed")
        .required("Required"),
    });
    return (
      <Formik
        initialValues={{
          studentName: "",
          studentAge: "",
          ageGroup: "",
          grade: "",
          parentName: "",
          email: "",
          phoneNumber: "",
          school: "",
          region: "",
          city: "",
          address: "",
          pincode: "",
        }}
        validationSchema={validate}
        onSubmit={async (values, { resetForm, setFieldValue }) => {
          console.log(values);
          // post request to backend
          await axios
            .post(`${ip.host}/user`, values)
            .then((r) =>
              r.data.success
                ? toastr.success(
                    "Registered Successfully, Check Your Email Further Updates"
                  )
                : toastr.error("Failed to Register")
            )
            .catch((e) => toastr.error(e));
          setTimeout(() => {
            window.location.replace('https://www.impactguru.com/fundraiser/help-rotary-club-of-madras-east-o')
          }, 1000);
        }}
      >
        {(formik) => (
          <div className="signup">
            <div className="artlogo-box">
              <img src={rcmelogo} alt="Art" className="artlogo" />
            </div>
            <h1 className="my-4 font-weight-bold .display-4">Register</h1>
            {/* <div className="signup-box"> */}
            <Container fluid={true}>
              <Card>
                <CardBody style={{ backgroundColor: "#e6a9ca" }}>
                  <Row>
                    <Col md={7} sm={12}>
                      <img
                        style={{ height: "100%", width: "100%" }}
                        src={artbg}
                        alt="Art"
                      />
                    </Col>
                    <Col
                      style={{ backgroundColor: "#fff", padding: "10px" }}
                      md={5}
                      sm={12}
                    >
                      <Form>
                        <Row>
                          <Col md={6} sm={12}>
                            <TextField
                              label="Student Name"
                              name="studentName"
                              type="text"
                            />
                          </Col>
                          <Col md={6} sm={12}>
                            <label for="region">Age</label>
                            <CustomSelect
                              options={this.state.age}
                              name="studentAge"
                              value={formik.values.studentAge || ""}
                              onChange={(value) => {
                                formik.setFieldValue("studentAge", value.label);
                                if (value.label <= 8) {
                                  this.setState({
                                    ageGroup: [{ id: "1", label: "Upto 8" }],
                                  });
                                } else if (
                                  value.label >= 9 &&
                                  value.label <= 12
                                ) {
                                  this.setState({
                                    ageGroup: [
                                      { id: "2", label: "Between 9-12" },
                                    ],
                                  });
                                } else {
                                  this.setState({
                                    ageGroup: [
                                      { id: "3", label: "Between 13-16" },
                                    ],
                                  });
                                }
                              }}
                            />
                            {formik.errors.studentAge ? (
                              <div style={{ color: "red", fontSize: "10px" }}>
                                {formik.errors.studentAge}
                              </div>
                            ) : undefined}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} sm={12}>
                            <label for="region">Age Group</label>
                            <CustomSelect
                              options={this.state.ageGroup}
                              name="ageGroup"
                              value={formik.values.ageGroup || ""}
                              onChange={(value) => {
                                formik.setFieldValue("ageGroup", value.label);
                              }}
                            />
                            {formik.errors.ageGroup ? (
                              <div style={{ color: "red", fontSize: "10px" }}>
                                {formik.errors.ageGroup}
                              </div>
                            ) : undefined}
                          </Col>
                          <Col md={6} sm={12}>
                            <label for="region">Standard/Grade</label>
                            <CustomSelect
                              options={this.state.grade}
                              name="grade"
                              value={formik.values.grade || ""}
                              onChange={(value) => {
                                formik.setFieldValue("grade", value.label);
                              }}
                            />
                            {formik.errors.grade ? (
                              <div style={{ color: "red", fontSize: "10px" }}>
                                {formik.errors.grade}
                              </div>
                            ) : undefined}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} sm={12}>
                            <TextField
                              label="Email"
                              name="email"
                              type="email"
                            />
                          </Col>
                          <Col md={6} sm={12}>
                            <TextField
                              label="Parent's Name"
                              name="parentName"
                              type="text"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} sm={12}>
                            <TextField
                              label="Phone Number/Whatsapp Number"
                              name="phoneNumber"
                              type="number"
                            />
                          </Col>
                          <Col md={6} sm={12}>
                            <TextField
                              label="School Name/Home School"
                              name="school"
                              type="text"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} sm={12}>
                            <label for="region">Region</label>
                            <CustomSelect
                              options={this.state.stateList}
                              value={formik.values.region || ""}
                              name="region"
                              onChange={(value) => {
                                this.setState({ state: value.label });
                                formik.setFieldValue("region", value.label);
                                const city = states.states.filter(
                                  (state) => state.name === value.label
                                );
                                this.setState({
                                  cityList: city[0]?.cities?.map((a) => {
                                    return {
                                      value: parseInt(a.id),
                                      label: a.name,
                                    };
                                  }),
                                });
                              }}
                            />
                            {formik.errors.region ? (
                              <div style={{ color: "red", fontSize: "10px" }}>
                                {formik.errors.region}
                              </div>
                            ) : undefined}
                          </Col>
                          <Col md={6} sm={12}>
                            <label for="city">City</label>
                            <CustomSelect
                              options={this.state.cityList}
                              name="city"
                              value={formik.values.city || ""}
                              onChange={(value) => {
                                formik.setFieldValue("city", value.label);
                              }}
                            />
                            {formik.errors.city ? (
                              <div style={{ color: "red", fontSize: "10px" }}>
                                {formik.errors.city}
                              </div>
                            ) : undefined}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} sm={12}>
                            <TextField
                              label="Address"
                              name="address"
                              type="text"
                            />
                          </Col>
                          <Col md={6} sm={12}>
                            <TextField
                              label="Pincode"
                              name="pincode"
                              type="number"
                            />
                          </Col>
                        </Row>
                        <div className="button-component">
                          <button className="btn btn-dark mt-3" type="submit">
                            Register and Pay
                          </button>
                          <button
                            className="btn btn-danger mt-3 ml-3"
                            type="reset"
                          >
                            Reset
                          </button>
                        </div>
                      </Form>
                      <Row>
                      <p className="text-center mt-4 text-danger"><b>For your art to be considered for evaluation please donate minimum of Rs.250.</b></p>
                      
                      <p className="text-center mt-2">For all queries, Please contact us using this email - <a href="mailto:colouryourdreams@rcme.in" target="_blank"  className="text-primary">colouryourdreams@rcme.in</a></p>
                      <p className="text-center mt-2"><b>Those who haven't got email with unique ID(search first email from colouryourdreams@rcme.in) please re register it again.</b></p>
                      <p className="text-center mt-2"><b>No need to pay again if you have already made the payment.</b></p>
                      </Row>
                     
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Container>
          </div>
        )}
      </Formik>
    );
  }
}

export default Signup;
