// import { useEffect, useState } from 'react'
// import { bindActionCreators } from "redux"

// //header
// //subheader
// //sidebar
// //footer
// //default 

// import Loader from '../../components/Loader'
// import { useHistory } from 'react-router-dom';

// // store
// import { connect } from "react-redux"
// import { NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode, getcustomizerinfoMode, SchemeDirAction, ColorCustomizerAction, getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction, SidebarColorAction, getSidebarColorMode, getSidebarTypeMode } from '../../store/setting/setting'
// import { authLocations } from '../../router/spm-path-locations'
// import SmpLoader from '../../components/loader/smp-loader'
// import HeaderStyle4 from '../../components/partials/dashboard/HeaderStyle/header-style-4'
// import { DecisionDialog } from '../../components/partials/components/hoc-tools/decision-dialog'
// import { ErrorToast, SuccessToast } from '../../components/partials/components/hoc-tools/alert'
// import { SingleDeleteDialog } from '../../components/partials/components/hoc-tools/delete-dialogs'
// import ParentDashboardRouter from '../../router/parent-router'
// import Footer from '../../components/partials/dashboard/FooterStyle/footer'


// const mapStateToProps = (state) => {
//     return {
//         darkMode: getDarkMode(state),
//         customizerMode: getcustomizerMode(state),
//         cololrinfomode: getcustomizerinfoMode(state),
//         colorprimarymode: getcustomizerprimaryMode(state),
//         schemeDirMode: getDirMode(state),
//         sidebarcolorMode: getSidebarColorMode(state),
//         sidebarTypeMode: getSidebarTypeMode(state),
//         sidebaractivestyleMode: getSidebarActiveMode(state),
//         navbarstylemode: getNavbarStyleMode(state),
//     };
// }
// const mapDispatchToProps = dispatch => ({
//     ...bindActionCreators(
//         {
//             ModeAction,
//             SchemeDirAction,
//             SidebarColorAction,
//             SidebarActiveStyleAction,
//             NavbarstyleAction,
//             ColorCustomizerAction,
//         },
//         dispatch
//     )
// })

// const ParentDefault = (props) => {
//     useEffect(() => {
//         //   darkmode
//         const colorMode = sessionStorage.getItem('color-mode');
//         if (colorMode === null) {
//             props.ModeAction(props.darkMode);
//         }
//         else {
//             props.ModeAction(colorMode);
//         }

//         // colocustomizermode
//         const colorcustomizerMode = sessionStorage.getItem('color-customizer-mode');
//         const colorcustomizerinfoMode = sessionStorage.getItem('colorcustominfo-mode');
//         const colorcustomizerprimaryMode = sessionStorage.getItem('colorcustomprimary-mode');
//         if (colorcustomizerMode === null) {
//             props.ColorCustomizerAction(props.customizerMode, props.cololrinfomode, props.colorprimarymode);
//             document.documentElement.style.setProperty('--bs-info', props.cololrinfomode);
//         }
//         else {
//             props.ColorCustomizerAction(colorcustomizerMode, colorcustomizerinfoMode, colorcustomizerprimaryMode);
//             document.documentElement.style.setProperty('--bs-info', colorcustomizerinfoMode);
//         }

//         // rtlmode
//         const rtlMode = sessionStorage.getItem('rtl-mode');
//         if (rtlMode === null) {
//             props.SchemeDirAction(props.schemeDirMode)
//         }
//         else {
//             props.SchemeDirAction(rtlMode);
//         }
//     })
    
//     var token = localStorage.getItem('token');
//     let history = useHistory();
    
//     if (!token) {
//         history.push(authLocations.login);
//     }

//     return (
//         <>
//             {/* <Loader /> */}
//             <SmpLoader />
//             {/* <StudentSideBar /> */}
//             <main className="main-content">
//                 <div className="position-relative">
//                     <HeaderStyle4 />
//                     {/* <Header /> */}
//                     {/* <SubHeader /> */}
//                 </div>
//                 <div className="py-0 conatiner-fluid content-inner mt-n5">

//                     <DecisionDialog />
//                     <SuccessToast />
//                     <SingleDeleteDialog />
//                     <ErrorToast />
//                     <ParentDashboardRouter />
//                     {/* <StudentDashboardRouter /> */}
//                 </div>
//                 <Footer />
//             </main>
//             {/* <Settingoffcanvas /> */}
//         </>
//     )

// }

// export default connect(mapStateToProps, mapDispatchToProps)(ParentDefault)




import{useEffect} from 'react'
import {bindActionCreators} from "redux"

//HorizontalMulti2Router
// import HorizontalMulti2Router from '../../router/horizontal-multi-2-router'

//herder
import  HeaderStyle4 from  '../../components/partials/dashboard/HeaderStyle/header-style-4'


//footer
import Footer from '../../components/partials/dashboard/FooterStyle/footer'

// store
import {NavbarstyleAction, getDirMode, SchemeDirAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../store/setting/setting'
import {connect} from "react-redux"
import ParentDashboardRouter from '../../router/parent-router'

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


const DualCompact = (props) => {
  useEffect(
    () =>{
      //   darkmode
      const colorMode = sessionStorage.getItem('color-mode');
      if(colorMode===null){
          props.ModeAction(props.darkMode);
      }
      else{
          props.ModeAction(colorMode);
      }

      // rtlmode
      const rtlMode = sessionStorage.getItem('rtl-mode');
      if(rtlMode===null){
          props.SchemeDirAction(props.schemeDirMode)
      }
      else{
          props.SchemeDirAction(rtlMode);
      }   
      
      document.body.classList.add('dual-compact')
      return () =>{
        document.body.classList.remove('dual-compact')
      }
    }
  )
    return (
        <>
          <span className="screen-darken"></span>
          <div id="loading">
          </div>
          <main className="main-content">
            <HeaderStyle4 />
            <div className="conatiner-fluid content-inner">
              {/* <HorizontalMulti2Router /> */}
              <ParentDashboardRouter />
            </div>
              <Footer />
          </main>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DualCompact)
