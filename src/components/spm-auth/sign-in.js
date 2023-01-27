import { Row, Col, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Card from "../Card";

import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
// img
import auth1 from "../../assets/images/auth/01.png";
import {
    authLocations,
    dashboardLocations,
} from "../../router/spm-path-locations";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions/auth-actions";
import { useEffect, useState } from "react";
import SmpLoader from "../loader/smp-loader";
import Logo from "../partials/components/logo";
import DefaultLoginTemplate from "./login-templates/default-login-template";


const SignIn = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { message } = state.auth;
    var token = localStorage.getItem("token");
    var userDetail = localStorage.getItem("userDetail");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (userDetail) {
            if (JSON.parse(userDetail).isFirstTimeLogin === false) {
                if (JSON.parse(userDetail).userType === "Student") {
                    window.location.href = "/stds-dashboard";
                } else if (JSON.parse(userDetail).userType === "Parent") {
                    window.location.href = "/parent-dashboard";
                } else {
                    window.location.href = "/dashboard";
                }
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("userDetail");
                localStorage.removeItem("permissions");
                history.push(
                    authLocations.firstTimeLogin +
                    "?id=" +
                    JSON.parse(userDetail).userAccountId
                );
            }
        }
    }, [token, history, userDetail]);

    const validation = Yup.object().shape({
        userName: Yup.string()
            .min(2, "Username Too Short!")
            .max(50, "Username Too Long!")
            .required("Username is required to login"),
        password: Yup.string()
            .required("Password Required")
            .min(4, "Password must be a minimum of 4 characters"),
    });



    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched } = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            loginUser(values)(dispatch)
        }
    });
    console.log('values', values);
    return (
        <>
            <section className="login-content">
                <SmpLoader />
                <DefaultLoginTemplate
                    message={message}
                    auth1={auth1}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched} />
            </section>
        </>
    );
};

export default SignIn;
