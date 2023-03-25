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
import PageNotFound from "./page-not-found";
import { TestUrls } from "../../utils/other";


const SignIn = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { message } = state.auth;
    const { appSetting } = state.portal;
    var token = localStorage.getItem("token");
    var userDetail = localStorage.getItem("userDetail");

    const schoolUrl = process.env.NODE_ENV === "development" ? TestUrls.Development() : window.location.origin;
    useEffect(() => {
        getAppLayout(schoolUrl)(dispatch);
    }, [schoolUrl])

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
            password: "",
            schoolUrl
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            loginUser(values)(dispatch)
        }
    });



    const defaultTemplate =
        <DefaultLoginTemplate
            message={message}
            auth1={auth1}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            schoolName={appSetting?.schoolName}
            schoolLogo={appSetting?.schoolLogo} />

    const templateOne =
        <LoginTemplate1
            message={message}
            auth1={auth1}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            schoolName={appSetting?.schoolName}
            schoolLogo={appSetting?.schoolLogo} />

    const templateTwo =
        <LoginTemplate2
            message={message}
            auth1={auth1}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched} 
            schoolName={appSetting?.schoolName}
            schoolLogo={appSetting?.schoolLogo}/>

    const templateThree =
        <LoginTemplate3
            message={message}
            auth1={auth1}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched} 
            schoolName={appSetting?.schoolName}
            schoolLogo={appSetting?.schoolLogo}/>

    const templateFour =
        <LoginTemplate4
            message={message}
            auth1={auth1}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched} 
            schoolName={appSetting?.schoolName}
            schoolLogo={appSetting?.schoolLogo}/>

    const pageNotFound =
        <PageNotFound />

    return (
        <>
            <section className="login-content">
                <SmpLoader />
                {appSetting.loginTemplate === "default-login-template" && defaultTemplate}
                {appSetting.loginTemplate === "template-1" && templateOne}
                {appSetting.loginTemplate === "template-2" && templateTwo}
                {appSetting.loginTemplate === "template-3" && templateThree}
                {appSetting.loginTemplate === "template-4" && templateFour}
                {appSetting.schoolUrl === undefined && <div className="bg-dark"></div>}
                {appSetting.schoolUrl === null && pageNotFound}
            </section>
        </>
    );
};

export default SignIn;
