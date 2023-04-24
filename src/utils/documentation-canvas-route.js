import { adminAdmissionLocations, classLocations, gradeSetting, parentsLocations, permissionLocations, portalSetting, promotionLocations, resultManagement, sessionClassSetupLocations, sessionLocations, staffLocations, studentsLocations } from "../router/spm-path-locations"
import { ProductModuleFeatures } from "./features";

export const documentationRoutes = (pathname, setUrl) => {

  const url = 'http://localhost:3001/docs/smp-canvas?feature='
  if(pathname.includes(sessionLocations.active)){
      setUrl(url + ProductModuleFeatures.session_Setup)
  }
   else if (sessionClassSetupLocations.sessionClassList){
      setUrl(url + ProductModuleFeatures.session_classSetup)
    }
   else if (promotionLocations.promotionSetup) {
     setUrl(url + ProductModuleFeatures.session_promotion)
    }
    else if (pathname.includes(adminAdmissionLocations.active)) {
      setUrl(url + ProductModuleFeatures.session_admission)
    }
    else if (pathname.includes(classLocations.active)){
      setUrl(url + ProductModuleFeatures.session_class)
    }
    else if (classLocations.classAttendanceBoard){
     setUrl(url + ProductModuleFeatures.session_attendance)
    }
    else if (classLocations.assessment){
     setUrl(url + ProductModuleFeatures.session_assessment)
    }
    else if(classLocations.lessonNotes){
      setUrl(url + ProductModuleFeatures.session_lessonNote)
    }
    else if (classLocations.classTimeTable){
     setUrl(url + ProductModuleFeatures.session_timetable)
    }
    else if (resultManagement.scoreEntry) {
      setUrl(url + ProductModuleFeatures.result_scoreEntry)
  }
  else if (resultManagement.publishResult){
      setUrl(url + ProductModuleFeatures.result_publishResult)
}
else if (resultManagement.printResult){
       setUrl(url + ProductModuleFeatures.result_printResult)
    }
    else if (resultManagement.masterList){
     setUrl(url + ProductModuleFeatures.result_masterlist)
    }
    else if (resultManagement.cumulativeMasterList) {
      setUrl(url + ProductModuleFeatures.result_cumulativeMasterlist)
    }
    else if (pathname.includes(studentsLocations.active)){
      setUrl(url + ProductModuleFeatures.studentList)
    }
    // case studentsLocations.enrolledStudents:
    //   setUrl(url + ProductModuleFeatures.enrolledStudents)
    //   break;
    // case studentsLocations.unenrolledStudents:
    //   setUrl(url + ProductModuleFeatures.unenrolledStudents)
    //   break;
    // case staffLocations.staffList:
    //   setUrl(url + ProductModuleFeatures.staff)
    //   break;
    // case parentsLocations.parentsList:
    //   setUrl(url + ProductModuleFeatures.parent)
    //   break;
    // case portalSetting.setting:
    //   setUrl(url + ProductModuleFeatures.settings_portal_schoolSetting)
    //   break;
    // case portalSetting.setting + '?settingsKey=second':
    //   setUrl(url + ProductModuleFeatures.settings_portal_resultSetting)
    //   break;
    // case portalSetting.setting + '?settingsKey=third':
    //   setUrl(url + ProductModuleFeatures.settings_portal_notification)
    //   break;
    // case portalSetting.setting + '?settingsKey=fourth':
    //   setUrl(url + ProductModuleFeatures.settings_portal_admission)
    //   break;
    // case portalSetting.setting + '?settingsKey=fifth':
    //   setUrl(url + ProductModuleFeatures.settings_portal_studentRegSetup)
    //   break;
    // case permissionLocations.roleList:
    //   setUrl(url + ProductModuleFeatures.settings_permission)
    //   break;
    // case gradeSetting.setting:
    //   setUrl(url + ProductModuleFeatures.setting_grade)
    //   break;
    // case resultManagement.resultTemplate:
    //   setUrl(url + ProductModuleFeatures.settings_resultTemplate)
    //   break;
    // case portalSetting.theme:
    //   setUrl(url + ProductModuleFeatures.settings_theme)
    //   break;


   else {
     setUrl(url)
  }
}


