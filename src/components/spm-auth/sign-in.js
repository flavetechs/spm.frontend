import { useHistory } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
// img
import auth1 from "../../assets/images/auth/01.png";
import {
    authLocations,
} from "../../router/spm-path-locations";
import { connect, useDispatch, useSelector } from "react-redux";
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
import { ServiceURLs } from "../../utils/other";
// import { io } from "socket.io-client";


const SignIn = (props) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { message } = state.auth;
    const { appSetting } = state.portal;
    var token = localStorage.getItem("token");
    var userDetail = localStorage.getItem("userDetail");
    const [selectedUserType, setUserType] = useState();

    console.log('selectedUserType', selectedUserType);
    const schoolUrl = ServiceURLs.GetAppUrl();
    useEffect(() => {
        props.getAppLayout(schoolUrl).then(res => {
            return res;
        })
    }, [schoolUrl])

    useEffect(() => {
        localStorage.setItem("userType", selectedUserType);
    }, [selectedUserType]);

    // const layoutSetting = localStorage.getItem("appSetting")
    // const appSetting2 = JSON.parse(layoutSetting) || "";

    // useEffect(() => {
    //     if (!appSetting2.scheme) {
    //         props.getAppLayout(schoolUrl).then(res => {
    //             return res;
    //         })
    //     }
    // }, [schoolUrl])

    useEffect(() => {
        if (userDetail) {
            if (JSON.parse(userDetail).isFirstTimeLogin === false) {
                if (selectedUserType === 0) {
                    window.location.href = "/stds-dashboard/";
                } else if (selectedUserType === 2) {
                    window.location.href = "/parent-dashboard/";
                } else {
                    window.location.href = "/dashboard/";
                }
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("userDetail");
                localStorage.removeItem("permissions");
                history.push(authLocations.firstTimeLogin + "?id=" + JSON.parse(userDetail).userAccountId);
            }
        }
    }, [token, history, userDetail, selectedUserType]);

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
            schoolUrl,
            userType: selectedUserType
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            loginUser(values)(dispatch)
        }
    });

    // useEffect(() => {
    //     const socket = io("http://jobserver.flavetechs.com:80");
    //     console.log('socket', socket);
    //     // socket.emit(UserEvents.createSmpUser, { socketId: socket.id, clientId: 'ddfdbefd-b901-452f-f3bf-08db1b649886' })
    // }, [])





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
            schoolLogo={appSetting?.schoolLogo}
            setUserType={setUserType}
            selectedUserType={selectedUserType}
        />

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
            schoolLogo={appSetting?.schoolLogo}
            setUserType={setUserType}
            selectedUserType={selectedUserType}
        />

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
            schoolLogo={appSetting?.schoolLogo}
            setUserType={setUserType}
            selectedUserType={selectedUserType}
        />

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
            schoolLogo={appSetting?.schoolLogo}
            setUserType={setUserType}
            selectedUserType={selectedUserType}
        />

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
            schoolLogo={appSetting?.schoolLogo}
            setUserType={setUserType}
            selectedUserType={selectedUserType}
        />

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

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAppLayout: (schoolUrl) => getAppLayout(schoolUrl)(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);



