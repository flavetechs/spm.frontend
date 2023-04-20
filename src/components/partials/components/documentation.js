import { useEffect, useState } from 'react'
import { Offcanvas, Row } from 'react-bootstrap'
import { bindActionCreators } from "redux"

// images

// store
import { NavbarstyleAction, LoginTemplateAction, getDirMode, getcustomizerinfoMode, getcustomizerprimaryMode, ColorCustomizerAction, SchemeDirAction, getcustomizerMode, SidebarminiTypeAction, SidebarboxedTypeAction, SidebarhoverTypeAction, getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction, SidebarColorAction, getSidebarColorMode, getSidebarTypeMode, getLoginTemplateMode } from '../../../store/setting/setting'
import { connect } from "react-redux"
import { dashboardLocations } from '../../../router/spm-path-locations'


const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
        customizerMode: getcustomizerMode(state),
        cololrinfomode: getcustomizerinfoMode(state),
        colorprimarymode: getcustomizerprimaryMode(state),
        schemeDirMode: getDirMode(state),
        sidebarcolorMode: getSidebarColorMode(state),
        sidebarTypeMode: getSidebarTypeMode(state) || {},
        sidebaractivestyleMode: getSidebarActiveMode(state),
        navbarstylemode: getNavbarStyleMode(state),
        loginTemplateMode: getLoginTemplateMode(state),
    };
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ModeAction,
            ColorCustomizerAction,
            SchemeDirAction,
            SidebarColorAction,
            SidebarActiveStyleAction,
            NavbarstyleAction,
            SidebarminiTypeAction,
            SidebarhoverTypeAction,
            SidebarboxedTypeAction,
            LoginTemplateAction,
        },
        dispatch
    )
})



const DocumentationOffcanvas = (props) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const { pathname } = window.location
    console.log('pathname', pathname);

    const [documentationUrl, setUrl] = useState('')



    useEffect(() => {
        if (pathname == dashboardLocations.dashboard) {
            // setUrl('http://fws.flavetechs.com/dashboard/preview-documentation?fetaure=12')
            setUrl('http://fws.flavetechs.com/dashboard/preview-documentation?docId=12')
        }
    }, [documentationUrl])

    return (
        <>
            <div className="btn btn-fixed-end btn-warning btn-icon btn-setting" onClick={handleShow} >
                <img src='../' />

            </div>
            <Offcanvas show={show} onHide={() => {
                handleClose();
            }} placement={`${props.schemeDirMode === "rtl" ? 'start' : 'end'}`}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Title</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>

                        <iframe src={documentationUrl}></iframe>

                    </Row>
                </Offcanvas.Body>
            </Offcanvas>


        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentationOffcanvas)