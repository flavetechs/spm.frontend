import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Scrollbar from 'smooth-scrollbar'
import { bindActionCreators } from "redux"

import { NavbarstyleAction, getDirMode, SchemeDirAction, getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction, SidebarColorAction, getSidebarColorMode, getSidebarTypeMode } from '../../../../store/setting/setting'
import { connect } from "react-redux"
import { getUserDetails } from '../../../../utils/permissions';
import Icon from '../../components/Icon'
import StudentsVerticalNav from './student-vertical-nav'

const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
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
        },
        dispatch
    )
})


const StudentsSidebar = (props) => {



    useEffect(
        () => {
            // sidebarcolormode
            const sidebarcolorMode1 = sessionStorage.getItem('sidebarcolor-mode');
            if (sidebarcolorMode1 === null) {
                props.SidebarColorAction(props.sidebarcolorMode);
            }
            else {
                props.SidebarColorAction(sidebarcolorMode1);
            }

            // sidebarstylemode
            const sidebarstyleMode = sessionStorage.getItem('sidebarstyle-mode');
            if (sidebarstyleMode === null) {
                props.SidebarActiveStyleAction(props.sidebaractivestyleMode);
            }
            else {
                props.SidebarActiveStyleAction(sidebarstyleMode);
            }
            Scrollbar.init(document.querySelector('#my-scrollbar'))
        }



    )
    const minisidebar = () => {
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }

    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const handleResize = () => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize, false);

        setTimeout(function () {
            if (dimensions.width < 800) {
                if (!document.getElementsByTagName('ASIDE')[0]?.classList.contains('sidebar-mini')) {
                    document.getElementsByTagName('ASIDE')[0]?.classList?.add('sidebar-mini');
                }
            }
        }, 1000)

    });
    var userDetail = getUserDetails();
    const schoolLogo= localStorage.getItem('schoolLogo');
    const schoolAbrev = localStorage.getItem(("schoolAbrev"))

    return (
        <>
            <aside className="sidebar sidebar-default navs-rounded-all {{ sidebarVariants }}">
                <div className="sidebar-header d-flex align-items-center justify-content-start">
                    <Link to="/dashboard" className="navbar-brand">
                       
                    <div className="text-center d-flex align-items-center">
                    <img src={schoolLogo} alt='school logo'height="40px"/>
                        <h4 className="logo-title">{schoolAbrev} </h4> 
                     </div>
                    </Link>
                    <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar} >
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.25 12.2744L19.25 12.2744" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </i>
                    </div>
                </div>
                <div className="pt-0 sidebar-body data-scrollbar" data-scroll="1" id="my-scrollbar">
                    {/* sidebar-list class to be added after replace css */}
                    <div className="sidebar-list navbar-collapse" id="sidebar">
                        <StudentsVerticalNav />
                    </div>
                </div>
                <div className="sidebar-footer"></div>
            </aside>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsSidebar)

