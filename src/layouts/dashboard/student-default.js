import { useEffect } from 'react'
import { bindActionCreators } from "redux"

//header
import Header from '../../components/partials/dashboard/HeaderStyle/header'
//subheader
import SubHeader from '../../components/partials/dashboard/HeaderStyle/sub-header'
//sidebar
//footer
import Footer from '../../components/partials/dashboard/FooterStyle/footer'
//default 
import DocumentationOffcanvas from '../../components/partials/components/documentation'
import { useHistory } from 'react-router-dom'

// store
import { NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode, getcustomizerinfoMode, SchemeDirAction, ColorCustomizerAction, getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction, SidebarColorAction, getSidebarColorMode, getSidebarTypeMode } from '../../store/setting/setting'
import { connect } from "react-redux"
import { authLocations } from '../../router/spm-path-locations'
import { DecisionDialog } from '../../components/partials/components/hoc-tools/decision-dialog'
import { SingleDeleteDialog } from '../../components/partials/components/hoc-tools/delete-dialogs'
import { ErrorToast, SuccessToast } from '../../components/partials/components/hoc-tools/alert'
import SmpLoader from '../../components/loader/smp-loader'
import StudentDashboardRouter from '../../router/student-router'
import StudentSideBar from '../../components/partials/dashboard/SidebarStyle/student-side-bar'

const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
        customizerMode: getcustomizerMode(state),
        cololrinfomode: getcustomizerinfoMode(state),
        colorprimarymode: getcustomizerprimaryMode(state),
        schemeDirMode: getDirMode(state),
        sidebarcolorMode: getSidebarColorMode(state),
        sidebarTypeMode: getSidebarTypeMode(state),
        sidebaractivestyleMode: getSidebarActiveMode(state),
        navbarstylemode: getNavbarStyleMode(state),
    };
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ModeAction,
            SchemeDirAction,
            SidebarColorAction,
            SidebarActiveStyleAction,
            NavbarstyleAction,
            ColorCustomizerAction,
        },
        dispatch
    )
})

const StudentDefault = (props) => {
    useEffect(() => {
        //   darkmode
        const colorMode = sessionStorage.getItem('color-mode');
        if (colorMode === null) {
            props.ModeAction(props.darkMode);
        }
        else {
            props.ModeAction(colorMode);
        }

        // colocustomizermode
        const colorcustomizerMode = sessionStorage.getItem('color-customizer-mode');
        const colorcustomizerinfoMode = sessionStorage.getItem('colorcustominfo-mode');
        const colorcustomizerprimaryMode = sessionStorage.getItem('colorcustomprimary-mode');
        if (colorcustomizerMode === null) {
            props.ColorCustomizerAction(props.customizerMode, props.cololrinfomode, props.colorprimarymode);
            document.documentElement.style.setProperty('--bs-info', props.cololrinfomode);
        }
        else {
            props.ColorCustomizerAction(colorcustomizerMode, colorcustomizerinfoMode, colorcustomizerprimaryMode);
            document.documentElement.style.setProperty('--bs-info', colorcustomizerinfoMode);
        }

        // rtlmode
        const rtlMode = sessionStorage.getItem('rtl-mode');
        if (rtlMode === null) {
            props.SchemeDirAction(props.schemeDirMode)
        }
        else {
            props.SchemeDirAction(rtlMode);
        }
    })

    var token = localStorage.getItem('token');
    let history = useHistory();

    if (!token) {
        history.push(authLocations.login);
    }

    return (
        <>
            {/* <Loader /> */}
            <SmpLoader />
            <StudentSideBar />
            <main className="main-content">
                <div className="position-relative">
                    <Header />
                    <SubHeader />
                </div>
                <div className="py-0 conatiner-fluid content-inner mt-n5">
                    <DecisionDialog />
                    <SuccessToast />
                    <SingleDeleteDialog />
                    <ErrorToast />
                    <StudentDashboardRouter />
                </div>
                <Footer />
            </main>
            <DocumentationOffcanvas />
        </>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDefault)
