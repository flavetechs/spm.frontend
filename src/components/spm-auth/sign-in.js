import { useHistory } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
// img
import auth1 from "../../assets/images/auth/01.png";
import {
    authLocations,
} from "../../router/spm-path-locations";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions/auth-actions";
import { useEffect, useState } from "react";
import SmpLoader from "../loader/smp-loader";
import DefaultLoginTemplate from "./login-templates/default-login-template";
import LoginTemplate1 from "./login-templates/login-template-1";
import LoginTemplate2 from "./login-templates/login-template-2";
import LoginTemplate3 from "./login-templates/login-template-3";
import LoginTemplate4 from "./login-templates/login-template-4";
import { getAppLayout } from "../../store/actions/portal-setting-action";


const SignIn = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { message } = state.auth;
    const { layout } = state.portal;
    var token = localStorage.getItem("token");
    var userDetail = localStorage.getItem("userDetail");
useEffect(() => {
 //getAppLayout()(dispatch);
}, [])

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
    
    // const baseUrl = window.location.origin;
    // const [templateNo, setTemplateNo] = useState(-1)
    // useEffect(() => {
    //     layout.loginTemplate == 'default-login-template' ?
    //     setTemplateNo(0):
    //     layout.loginTemplate == 'template-1' ?
    //     setTemplateNo(1):
    //     layout.loginTemplate == 'template-2' ?
    //     setTemplateNo(2):
    //     layout.loginTemplate == 'template-3' ?
    //     setTemplateNo(3):
    //     layout.loginTemplate == 'template-4' &&
    //     setTemplateNo(4)
    // }, [])
    // console.log("template",layout.loginTemplate);
    const baseUrl = window.location.origin;
    const [templateNo, setTemplateNo] = useState(-1)
    useEffect(() => {
        baseUrl == 'http://localhost:3001' ?
        setTemplateNo(0):
        baseUrl == 'http://flavetech-001-site2.itempurl.com' ?
        setTemplateNo(1):
        baseUrl == 'http://localhost:3004' ?
        setTemplateNo(2):
        baseUrl == 'http://localhost:3003' ?
        setTemplateNo(3):
        baseUrl == 'http://localhost:3000' &&
        setTemplateNo(4)
    }, [])

    return (
        <>
            <section className="login-content">
                <SmpLoader />
                {templateNo == 0 ?
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
                    :
                    templateNo == 1 ?
                    <LoginTemplate1
                    message={message}
                    auth1={auth1}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched} />
                    :
                    templateNo == 2 ?
                    <LoginTemplate2
                    message={message}
                    auth1={auth1}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched} />
                    :
                    templateNo == 3 ?
                    <LoginTemplate3
                    message={message}
                    auth1={auth1}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched} />
                    :
                    templateNo == 4 ?
                    <LoginTemplate4
                    message={message}
                    auth1={auth1}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched} />
                    :""
    }
            </section>
        </>
    );
};

export default SignIn;
