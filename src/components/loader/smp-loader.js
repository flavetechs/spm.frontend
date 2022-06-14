import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./smp-loader.scss"
const SmpLoader = () => {

    const state = useSelector((state) => state);
    const { loading: loading1 } = state.roles;
    const { loading: loading2 } = state.auth;
    const { loading: loading3 } = state.grade;
    const { loading: loading4 } = state.activities;
    const { loading: loading5 } = state.appState;
    const { loading: loading6 } = state.session;
    const { loading: loading7 } = state.staff;
    const { loading: loading8 } = state.student
    const { loading: loading9 } = state.enrollment;
    const { loading: loading10 } = state.class;
    const { loading: loading11 } = state.promotion;

    const [show, setShow] = useState(false);

    React.useEffect(() => {

        if (loading1 || loading2 || loading3 || loading4 || loading5 || loading6 || loading7 || loading8 || loading9 || loading10|| loading11 ) {
            setShow(true);
        } else {
            setShow(false);
        }

    }, [loading1 || loading2 || loading3 || loading4 || loading5 || loading6 || loading7 || loading8 || loading9 || loading10 || loading11 ])

    return (
        <>
            <div class={show ? `overlay show` : `overlay`}></div>
            <div class={show ? `spanner show` : `spanner`}>
                <div class="loader"></div>
            </div>
        </>
    )
}

export default SmpLoader;