import React, { Fragment } from "react";
import ListPage from "./ListPage";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import DropDown from "./DropDown";
import { states } from "./states";
import * as Yup from "yup";
import {ip} from "../../constants"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import {ExportToExcel} from './ExportToExcel'

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Card,
  CardBody,
  Row,
  Col,
  ButtonGroup,
  FormGroup,
  Label,
} from "reactstrap";
import toastr from "toastr";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import "./Adminrcme.css";
import AdminUserCard from "./AdminUserCard.js";
class AdminRcme extends React.Component {
  state = {
    per_page: 25,
    page: 1,
    totalCount: 0,
    mark1: null,
    mark2: null,
    filterstate: false,
    filtercity: false,
    filterage: false,
    filtergrade: false,
    filterstatus: false,
    filtermark1: false,
    filtermark2: false,
    statusfilter: null,
    image: null,
    state: "",
    city: "",
    grade: "",
    stateList: [],
    cityList: [],
    overalldata:[],
    editData: {
      studentname: "",
      studentage: "",
      grade: "",
      parentname: "",
      email: "",
      phonenumber: "",
      school: "",
      region: "",
      city: "",
      address: "",
      pincode: "",
      payment: "",
      status: false,
    },
    gradeOptions: [
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
    markOptions: [
      { label: "1", id: 1 },
      { label: "2", id: 2 },
      { label: "3", id: 3 },
      { label: "4", id: 4 },
      { label: "5", id: 5 },
      { label: "6", id: 6 },
      { label: "7", id: 7 },
      { label: "8", id: 8 },
      { label: "9", id: 9 },
      { label: "10", id: 10 },
    ],
    managEditModal: false,
    managViewModal: false,
    isLoading: true,
    data: [],
    column: [
      {
        name: "id",
        selector: "id",
        sortable: false,
        cell: (row) => <span>{row.id ? row.id : ""}</span>,
      },
      {
        name: "Unique Id",
        selector: "uniqueid",
        sortable: false,
        cell: (row) => <span>{row.uniqueid ? row.uniqueid : ""}</span>,
      },
      {
        name: "Name",
        selector: "studentname",
        sortable: false,
        cell: (row) => <span>{row.studentname ? row.studentname : ""}</span>,
      },
      {
        name: "Age",
        selector: "age",
        sortable: false,
        cell: (row) => <span>{row.studentage ? row.studentage : ""}</span>,
      },
      {
        name: "Email",
        selector: "email",
        sortable: false,
        cell: (row) => (
          <a href={`mailto:${row.email}`}>{row.email ? row.email : ""}</a>
        ),
      },
      {
        name: "Region",
        selector: "region",
        sortable: false,
        cell: (row) => <span>{row.region ? row.region : ""}</span>,
      },
      {
        name: "City",
        selector: "city",
        sortable: false,
        cell: (row) => <span>{row.city ? row.city : ""}</span>,
      },
      {
        name: "Mark1",
        selector: "mark1",
        sortable: false,
        cell: (row) => <span>{row.mark1 ? row.mark1 : "-"}</span>,
      },
      {
        name: "Mark2",
        selector: "mark2",
        sortable: false,
        cell: (row) => <span>{row.mark2 ? row.mark2 : "-"}</span>,
      },
      {
        name: "Signedby",
        selector: "signedby",
        sortable: false,
        cell: (row) => <span>{row.signedby ? row.signedby : "-"}</span>,
      },
      {
        name: "Submission",
        selector: "filename",
        sortable: false,
        cell: (row) => (
          <span style={{ alignItems: "center", justifyContent: "center" }}>
            {row.filename === null ? (
              <img
                src={
                  "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color-round/3/44-512.png"
                }
                style={{ height: "18px", width: "18px" }}
                alt="false"
              />
            ) : (
              <img
                style={{ height: "18px", width: "18px" }}
                src={
                  "https://icon2.cleanpng.com/20180703/esh/kisspng-insurance-information-business-service-synology-in-5b3c32cd5f44c3.1515026615306718213902.jpg"
                }
                alt="true"
              />
            )}
          </span>
        ),
      },
      {
        name: "Payment",
        selector: "paymentstatus",
        sortable: false,
        cell: (row) => (
          <span style={{ alignItems: "center", justifyContent: "center" }}>
            {row?.paymentstatus === false ? (
              <img
                src={
                  "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color-round/3/44-512.png"
                }
                style={{ height: "18px", width: "18px" }}
                alt="false"
              />
            ) : (
              <img
                style={{ height: "18px", width: "18px" }}
                src={
                  "https://icon2.cleanpng.com/20180703/esh/kisspng-insurance-information-business-service-synology-in-5b3c32cd5f44c3.1515026615306718213902.jpg"
                }
                alt="true"
              />
            )}
          </span>
        ),
      },
      {
        name: "Status",
        selector: "status",
        sortable: false,
        cell: (row) => (
          <span style={{ alignItems: "center", justifyContent: "center" }}>
            {row.status === false ? (
              <img
                src={
                  "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color-round/3/44-512.png"
                }
                style={{ height: "18px", width: "18px" }}
                alt="false"
              />
            ) : (
              <img
                style={{ height: "18px", width: "18px" }}
                src={
                  "https://icon2.cleanpng.com/20180703/esh/kisspng-insurance-information-business-service-synology-in-5b3c32cd5f44c3.1515026615306718213902.jpg"
                }
                alt="true"
              />
            )}
          </span>
        ),
      },
      {
        name: "View",
        selector: "action",
        sortable: false,
        cell: (row) => (
          <>
            <Row>
              <ButtonGroup className="mb-2" style={{ top: "4px" }}>
                <Button
                  outline
                  color="success"
                  className="mobileViewFont ml-2"
                  onClick={() => {
                    this.EditBtnClick(row);
                  }}
                >
                  View
                </Button>
              </ButtonGroup>
            </Row>
          </>
        ),
      },
      {
        name: "Edit",
        selector: "action",
        sortable: false,
        cell: (row) => (
          <>
            <Row>
              <ButtonGroup className="mb-2" style={{ top: "4px" }}>
                <Button
                  outline
                  color="danger"
                  className="mobileViewFont ml-2"
                  onClick={() => {
                    this.viewBtnClick(row);
                  }}
                >
                  Edit
                </Button>
              </ButtonGroup>
            </Row>
          </>
        ),
      },
    ],
  };
fileName = "myfile";
  EditBtnClick = (row) => {
    // row.filename &&
    //   import(`./public/${row.filename}`).then((image) => {
    //     this.setState({
    //       image: image["default"],
    //     });
    //     console.log(this.state.image);
    //   });

    this.setState({
      editData: row,
    });

    this.toggleManageEditModal();
  };

  viewBtnClick = (row) => {
    this.setState({
      editData: row,
    });
    this.toggleManageViewModal();
  };

  toggleManageViewModal = () => {
    this.dataFilter();
    this.setState({
      managViewModal: !this.state.managViewModal,
    });
  };

  toggleManageEditModal = () => {
    this.dataFilter();
    this.setState({
      managEditModal: !this.state.managEditModal,
    });
  };
  componentDidMount = async () => {
    await axios.get(`${ip.host}/admin`).then(res => {
      this.setState({
        overalldata:res.data
      })
    })
    console.log(this.state.data)
    this.dataFilter();
    this.states();
  };
  statusoption = [
    { label: "True", id: true },
    { label: "False", id: false },
  ];
  states = () => {
    this.setState({
      stateList: states.states.map((a) => {
        return { value: parseInt(a.id), label: a.name };
      }),
    });
  };
  dataFilter = async () => {
    const city = states.states.filter(
      (state) => state.name === this.state.state
    );
    this.setState({
      cityList: city[0]?.cities?.map((a) => {
        return { value: parseInt(a.id), label: a.name };
      }),
      isLoading: true,
    });
    //  console.log(this.state.filterstate,this.state.filtercity,this.state.grade)
    await axios
      .get(
        `${ip.host}/user?page=${this.state.page}&per_page=${this.state.per_page}`
      )
      .then((res) => {
        var arr = res.data.data;
        this.setState({
          totalCount: res.data["count"],
        });
        arr =
          this.state.filterstate === true
            ? arr.filter((r) => r.region === this.state.state)
            : arr;
        arr =
          this.state.filtercity === true
            ? arr.filter((r) => r.city === this.state.city)
            : arr;
        arr =
          this.state.filtergrade === true
            ? arr.filter((r) => r.grade === this.state.grade)
            : arr;
        arr =
          this.state.filterstatus === true
            ? arr.filter((r) => r.status === this.state.statusfilter)
            : arr;
        arr =
          this.state.filtermark1 === true
            ? arr.filter((r) => r.mark1 === this.state.mark1)
            : arr;
        arr =
          this.state.filtermark2 === true
            ? arr.filter((r) => r.mark2 === this.state.mark2)
            : arr;
        arr = arr.sort((a,b)=> a.id-b.id)
        this.setState({
          data: arr,
          isLoading: false,
        });
      });
  };
  handlePerRowsChange = (perPage) => {
    this.setState(
      {
        per_page: perPage,
      },
      () => {
        this.dataFilter();
      }
    );
  };
  handlePageChange = (page) => {
    this.setState({ page: page }, () => {
      this.dataFilter();
    });
  };
  render() {
    // const history = useHistory();

    const initialValues = this.state.editData;
    const validate = Yup.object({
      mark1: Yup.string().required("Required"),
      mark2: Yup.string().required("Required"),
      signedby: Yup.string().required("Required"),
    });
    const valuesInitial = this.state.editData;
    return (
      <div>
        <Modal
          size="md"
          isOpen={this.state.managViewModal}
          toggle={this.toggleManageViewModal}
        >
          <ModalHeader toggle={this.toggleManageViewModal}>
            Payment Details
          </ModalHeader>
          <Formik
            initialValues={valuesInitial}
            onSubmit={async (values, { setSubmitting }) => {
              await axios
                .put(
                  `${ip.host}/updateadmin/${values.uniqueid}`,
                  values
                )
                .then((r) =>
                  r.data.success
                    ? toastr.success("Updated Successfully")
                    : toastr.error("Failed to Upload")
                )
                .catch((e) => toastr.error(e));
              setSubmitting(false);
              this.toggleManageViewModal();
              this.dataFilter();
            }}
          >
            {({ errors, values, setFieldValue, isSubmitting }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <ModalBody>
                  <Fragment>
                    <Form>
                      <div className="form-group f-flex align-items-center justify-content-center">
                        <Field name="paymentstatus" type="checkbox" />
                        <label htmlFor="paymentstatus">
                          Is the User payment is successful?
                        </label>
                      </div>
                    </Form>
                  </Fragment>
                </ModalBody>

                <ModalFooter>
                  <div className="container-fluid">
                    <Row>
                      <Col sm={6} className="required">
                        &nbsp; Mandatory Fields
                      </Col>
                      <Col sm={6}>
                        <div className="text-sm-right d-none d-sm-block">
                          <FormGroup className="float-sm-right ">
                            <Button
                              type="submit"
                              color="primary"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Please wait..." : "Submit"}
                            </Button>
                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={this.toggleManageViewModal}
                            >
                              Cancel
                            </Button>
                          </FormGroup>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>

        <Modal
          size="lg"
          isOpen={this.state.managEditModal}
          toggle={this.toggleManageEditModal}
        >
          <ModalHeader toggle={this.toggleManageEditModal}>
            <div className="modal-title">
              <h1>{this.state.editData.studentname}</h1>
              <span>
                {this.state.editData.status === false ? (
                  <img
                    src={
                      "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color-round/3/44-512.png"
                    }
                    style={{ height: "12px", width: "12px" }}
                    alt="false"
                  />
                ) : (
                  <img
                    style={{ height: "12px", width: "12px" }}
                    src={
                      "https://icon2.cleanpng.com/20180703/esh/kisspng-insurance-information-business-service-synology-in-5b3c32cd5f44c3.1515026615306718213902.jpg"
                    }
                    alt="true"
                  />
                )}
              </span>
              <small style={{ marginTop: "20px" }}>
                {this.state.editData.city},{this.state.editData.region}
              </small>
            </div>
          </ModalHeader>
          <ModalBody>
            <AdminUserCard values={this.state.editData} />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </Modal>
        <h2 className="d-flex align-items-center justify-content-center mt-4 mb-4">
          RCME ADMIN
        </h2>
        <Card>
          <CardBody>
            <Row style={{ margin: 0 }}>
              <Col md={2} sm={6}>
                <DropDown
                  label="State"
                  className="react-select"
                  classNamePrefix="react-select"
                  isSearchable
                  isClearable={true}
                  options={this.state.stateList}
                  Action={(entity) => {
                    if (entity) {
                      this.setState(
                        {
                          state: entity ? entity.label : "",
                          filterstate: true,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    } else {
                      this.setState(
                        {
                          state: "",
                          cityList: [],
                          filterstate: false,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    }
                  }}
                />
              </Col>
              <Col md={2} sm={6}>
                <DropDown
                  label="City"
                  className="react-select"
                  classNamePrefix="react-select"
                  isSearchable
                  isClearable={true}
                  options={this.state.cityList}
                  Action={(entity) => {
                    if (entity) {
                      this.setState(
                        {
                          city: entity ? entity.label : "",
                          filtercity: true,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    } else {
                      this.setState(
                        {
                          cityList: [],
                          filtercity: false,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    }
                  }}
                />
              </Col>
              <Col md={2} sm={6}>
                <DropDown
                  label="Grade"
                  className="react-select"
                  classNamePrefix="react-select"
                  isSearchable
                  isClearable={true}
                  options={this.state.gradeOptions}
                  Action={(entity) => {
                    if (entity) {
                      this.setState(
                        {
                          grade: entity ? entity.label : "",
                          filtergrade: true,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    } else {
                      this.setState(
                        {
                          filtergrade: false,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    }
                  }}
                />
              </Col>
              <Col md={2} sm={6}>
                <DropDown
                  label="Status"
                  className="react-select"
                  classNamePrefix="react-select"
                  isSearchable
                  isClearable={true}
                  options={this.statusoption}
                  Action={(entity) => {
                    if (entity) {
                      this.setState(
                        {
                          statusfilter: entity ? entity.id : null,
                          filterstatus: true,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    } else {
                      this.setState(
                        {
                          statusfilter: null,
                          filterstatus: false,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    }
                  }}
                />
              </Col>
              <Col md={2} sm={6}>
                <DropDown
                  label="Mark1"
                  className="react-select"
                  classNamePrefix="react-select"
                  isSearchable
                  isClearable={true}
                  options={this.state.markOptions}
                  Action={(entity) => {
                    if (entity) {
                      this.setState(
                        {
                          mark1: entity ? entity.id : null,
                          filtermark1: true,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    } else {
                      this.setState(
                        {
                          mark1: null,
                          filtermark1: false,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    }
                  }}
                />
              </Col>
              <Col md={2} sm={6}>
                <DropDown
                  label="Mark2"
                  className="react-select"
                  classNamePrefix="react-select"
                  isSearchable
                  isClearable={true}
                  options={this.state.markOptions}
                  Action={(entity) => {
                    if (entity) {
                      this.setState(
                        {
                          mark2: entity ? entity.id : null,
                          filtermark2: true,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    } else {
                      this.setState(
                        {
                          filtermark2: false,
                          mark2: null,
                        },
                        () => {
                          this.dataFilter();
                        }
                      );
                    }
                  }}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
          <div className="text-center">
             <ExportToExcel apiData={this.state.overalldata} fileName={this.fileName} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            </div>
            <ListPage
              id="user"
              columns={this.state.column}
              data={this.state.data}
              totalCount={this.state.totalCount}
              // rowClicked={this.EditBtnClick}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
            ></ListPage>
           
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AdminRcme;
