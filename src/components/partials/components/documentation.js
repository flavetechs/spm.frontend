import { useEffect, useState } from "react";
import { Badge, Offcanvas, Row } from "react-bootstrap";
import { bindActionCreators } from "redux";

// images

// store
import {
  NavbarstyleAction,
  LoginTemplateAction,
  getDirMode,
  getcustomizerinfoMode,
  getcustomizerprimaryMode,
  ColorCustomizerAction,
  SchemeDirAction,
  getcustomizerMode,
  SidebarminiTypeAction,
  SidebarboxedTypeAction,
  SidebarhoverTypeAction,
  getNavbarStyleMode,
  getSidebarActiveMode,
  SidebarActiveStyleAction,
  getDarkMode,
  ModeAction,
  SidebarColorAction,
  getSidebarColorMode,
  getSidebarTypeMode,
  getLoginTemplateMode,
} from "../../../store/setting/setting";
import { connect } from "react-redux";
import { documentationRoutes } from "../../../utils/documentation-canvas-route";
import { detailedDocumentationRoutes } from "../../../utils/detailed-documentation-route";
import { ServiceURLs } from "../../../utils/other";


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
};

const mapDispatchToProps = (dispatch) => ({
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
  ),
});

const DocumentationOffcanvas = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { pathname, href } = window.location;
  const [documentationUrl, setUrl] = useState("");
  const [path, setPath] = useState("");

  // const refg = useRef(null)
  useEffect(() => {
    show && documentationRoutes(href, pathname, setUrl);
  }, [pathname, href, show]);

  return (
    <>
      <div
        className="btn btn-fixed-end btn-light btn-icon btn-setting"
        onClick={handleShow}
      >
        <img
          className="img-fluid"
          width="50px"
          height="50px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1XrF3z2XWVE5iDpStKwS1L3R_ITQlthwoNQ&usqp=CAU"
        // src={"http://fwsapi.flaveconsole.com/ApplicationFiles/d6a97dee-2e2a-48c1-ac72-a858ad3f82a5.png"}
        />
      </div>

      <Offcanvas
      style={{width: '45%'}}
        show={show}
        onHide={() => {
          handleClose();
          setUrl("");
          setPath("");
        }}
        placement={"end"}
      >
        <Offcanvas.Header
          className="mb-n4"
          style={{ marginRight: "20px" }}
          closeButton
        >
          <Badge
            bg="success"
            style={{ cursor: "pointer", zIndex:5 }}
            onClick={() => {
              detailedDocumentationRoutes(href, pathname, setPath);
            }}
          >
            <a className='text-white' href={path} target="_blank" rel="noopener noreferrer">
              {" "}
              view detailed page
            </a>
          </Badge>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row >
            <iframe id="docsIframe" style={{ height: "100vh" }} src={documentationUrl}></iframe>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentationOffcanvas);
