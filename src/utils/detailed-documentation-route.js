import { adminAdmissionLocations, assessmentLocations, attendanceLocations, authLocations, classLocations, gradeSetting, lessonNoteLocations, parentsLocations, permissionLocations, portalSetting, printResultManagement, promotionLocations, publishResultManagement, resultManagement, scoreEntryManagement, sessionClassSetupLocations, sessionLocations, staffLocations, studentsLocations, timetableLocations } from "../router/spm-path-locations"
import { ProductModuleFeatures } from "./features";
import { ServiceURLs } from "./other";

export const detailedDocumentationRoutes = (pathname, setPath) => {


  const url = ServiceURLs.SmpDocumentation2();
 if(pathname.includes(sessionLocations.active)){
      setPath(url + ProductModuleFeatures.session_Setup)
  }
   else if (pathname.includes(sessionClassSetupLocations.active)){
      setPath(url + ProductModuleFeatures.session_classSetup)
    }
   else if (pathname.includes(promotionLocations.active)) {
     setPath(url + ProductModuleFeatures.session_promotion)
    }
    else if (pathname.includes(adminAdmissionLocations.active)) {
      setPath(url + ProductModuleFeatures.session_admission)
    }
    else if (pathname.includes(classLocations.active)){
      setPath(url + ProductModuleFeatures.session_class)
    }
    else if (pathname.includes(attendanceLocations.active)){
     setPath(url + ProductModuleFeatures.session_attendance)
    }
    else if (pathname.includes(assessmentLocations.active)){
     setPath(url + ProductModuleFeatures.session_assessment)
    }
    else if(pathname.includes(lessonNoteLocations.active)){
      setPath(url + ProductModuleFeatures.session_lessonNote)
    }
    else if (pathname.includes(timetableLocations.active)){
     setPath(url + ProductModuleFeatures.session_timetable)
     if (pathname === timetableLocations.examTimeTable) {
      setPath(url + ProductModuleFeatures.exam_timetable)
    }  
      }
    else if (pathname.includes(scoreEntryManagement.active)) {
      setPath(url + ProductModuleFeatures.result_scoreEntry)
     }
    else if (pathname.includes(publishResultManagement.active)){
      setPath(url + ProductModuleFeatures.result_publishResult)
      }
    else if (pathname.includes(printResultManagement.active)){
       setPath(url + ProductModuleFeatures.result_printResult)
    }
    else if (pathname.includes(resultManagement.active)){
     setPath(url + ProductModuleFeatures.result_masterlist)
     if ( pathname === resultManagement.cumulativeMasterList) {
      setPath(url + ProductModuleFeatures.result_cumulativeMasterlist)
    }
     else if (pathname === resultManagement.resultTemplate){
      setPath(url + ProductModuleFeatures.settings_resultTemplate)
    }
    }
 
    else if (pathname.includes(studentsLocations.active)){
      setPath(url + ProductModuleFeatures.studentList)
      if (pathname === studentsLocations.enrolledStudents){
        setPath(url + ProductModuleFeatures.enrolledStudents)
      }
     else if (pathname === studentsLocations.unenrolledStudents){
        setPath(url + ProductModuleFeatures.unenrolledStudents)
      }
    }
    else if (pathname.includes(staffLocations.active)){
      setPath(url + ProductModuleFeatures.staff)
    }
    else if (pathname.includes(parentsLocations.active)){
      setPath(url + ProductModuleFeatures.parent)
    }
    else if (pathname.includes(portalSetting.active)){
      setPath(url + ProductModuleFeatures.settings_portal_schoolSetting)
      if (pathname === portalSetting.theme){
      setPath(url + ProductModuleFeatures.settings_theme)
      }
    else if (pathname ===  portalSetting.setting + '?settingsKey=second'){
    setPath(url + ProductModuleFeatures.settings_portal_resultSetting)
    }
    else if (pathname === portalSetting.setting + '?settingsKey=third'){
       setPath(url + ProductModuleFeatures.settings_portal_notification)
    }
    else if (pathname === portalSetting.setting + '?settingsKey=fourth'){
      setPath(url + ProductModuleFeatures.settings_portal_admission)
    }
    else if (pathname ===  portalSetting.setting + '?settingsKey=fifth'){
      setPath(url + ProductModuleFeatures.settings_portal_studentRegSetup)
  }
}
  else if ( pathname.includes(permissionLocations.active)){
      setPath(url + ProductModuleFeatures.settings_permission)
}
    else if  (pathname.includes(gradeSetting.active)){
     setPath(url + ProductModuleFeatures.setting_grade)
    }
    else if (pathname.includes(authLocations.resetPassword)) {
      setPath(url + ProductModuleFeatures.result_password)
    }
  


   else {
     setPath(url)
  }
}


