import { useEffect, useState } from 'react'
import { Offcanvas, Row } from 'react-bootstrap'
import { bindActionCreators } from "redux"

// images

// store
import { NavbarstyleAction, LoginTemplateAction, getDirMode, getcustomizerinfoMode, getcustomizerprimaryMode, ColorCustomizerAction, SchemeDirAction, getcustomizerMode, SidebarminiTypeAction, SidebarboxedTypeAction, SidebarhoverTypeAction, getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction, SidebarColorAction, getSidebarColorMode, getSidebarTypeMode, getLoginTemplateMode } from '../../../store/setting/setting'
import { connect } from "react-redux"
import { documentationRoutes } from '../../../utils/documentation-canvas-route'


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

    const [documentationUrl, setUrl] = useState('')



    useEffect(() => {
        documentationRoutes(pathname, setUrl)
    }, [pathname])

    console.log('documentationUrl', documentationUrl);

    return (
        <>
            <div className="btn btn-fixed-end btn-light btn-icon btn-setting" onClick={handleShow} >
                <img className="img-fluid" width="50px" height="50px" src='http://fwsapi.flavetechs.com/ApplicationFiles/d6a97dee-2e2a-48c1-ac72-a858ad3f82a5.png' />

            </div>
            <Offcanvas show={show} onHide={() => {
                handleClose();
            }} placement={'end'}>
                <Offcanvas.Header className='mb-n4' style={{ marginRight: '20px' }} closeButton>
                    <div></div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>

                        <iframe style={{ height: "100vh" }} src={documentationUrl}></iframe>

                    </Row>
                </Offcanvas.Body>
            </Offcanvas>


        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentationOffcanvas)