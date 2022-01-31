import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import axios from "axios";
import { TextField } from "../TextField";
import * as Yup from "yup";
import auth from "./auth";
import toastr from "toastr";
import "./Login.css";
import {ip} from "../../constants"

const Login = () => {
  const history = useHistory();
  const validate = Yup.object({
    userName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .trim()
      .required("Required"),
    password: Yup.string()
      .trim()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
  });
  return (
    <Formik
      initialValues={{
        userName: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        // post request to backend 206.189.130.90
        await axios
          .post(`${ip.host}/login`, values)
          .then((response) => {
            console.log(response.data);
            if (
              response.data.username === values.userName &&
              response.data.password === values.password
            ) {
              auth.login(() => {
                if (response.data.role === "rcme") {
                  toastr.success("Successfully logged in as Admin");
                  history.push("/dashboard/rcme");
                } else if (response.data.role === "student") {
                  history.push("/dashboard/student");
                  toastr.success("Successfully logged in as Student Admin");
                }
              }, response.data.role);
            } else if (response.data !== "success") {
              toastr.error("Invalid Username or password");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(values);
      }}
    >
      {(formik) => (
        <div className="formik-login-form">
          <h1 className="my-4 font-weight-bold .display-4">Admin Login</h1>
          <Form>
            <TextField label="Username" name="userName" type="text" />
            <TextField label="Password" name="password" type="password" />

            <button className="btn btn-dark mt-3" type="submit">
              Login
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
