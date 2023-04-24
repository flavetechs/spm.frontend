import { adminAdmissionLocations, classLocations, gradeSetting, parentsLocations, permissionLocations, portalSetting, resultManagement, sessionLocations, staffLocations, studentsLocations } from "../router/spm-path-locations"
import { ProductModuleFeatures } from "./features";
import { ServiceURLs } from "./other";

export const documentationRoutes = (pathname, setUrl) => {


  const url = ServiceURLs.SmpDocumentation();
  switch (pathname) {
    case sessionLocations.active:
      setUrl(url + ProductModuleFeatures.session_Setup)
      break;
    case sessionLocations.sessionClassList:
      setUrl(url + ProductModuleFeatures.session_classSetup)
      break;
    case sessionLocations.promotionSetup:
      setUrl(url + ProductModuleFeatures.session_promotion)
      break;
    case adminAdmissionLocations.adminAdmissionList:
      setUrl(url + ProductModuleFeatures.session_admission)
      break;
    case classLocations.sessionClassList2:
      setUrl(url + ProductModuleFeatures.session_class)
      break;
    case classLocations.classAttendanceBoard:
      setUrl(url + ProductModuleFeatures.session_attendance)
      break;
    case classLocations.assessment:
      setUrl(url + ProductModuleFeatures.session_assessment)
      break;
    case classLocations.lessonNotes:
      setUrl(url + ProductModuleFeatures.session_lessonNote)
      break;
    case classLocations.classTimeTable:
      setUrl(url + ProductModuleFeatures.session_timetable)
      break;
    case resultManagement.scoreEntry:
      setUrl(url + ProductModuleFeatures.result_scoreEntry)
      break;
    case resultManagement.publishResult:
      setUrl(url + ProductModuleFeatures.result_publishResult)
      break;
    case resultManagement.printResult:
      setUrl(url + ProductModuleFeatures.result_printResult)
      break;
    case resultManagement.masterList:
      setUrl(url + ProductModuleFeatures.result_masterlist)
      break;
    case resultManagement.cumulativeMasterList:
      setUrl(url + ProductModuleFeatures.result_cumulativeMasterlist)
      break;
    case studentsLocations.studentList:
      setUrl(url + ProductModuleFeatures.studentList)
      break;
    case studentsLocations.enrolledStudents:
      setUrl(url + ProductModuleFeatures.enrolledStudents)
      break;
    case studentsLocations.unenrolledStudents:
      setUrl(url + ProductModuleFeatures.unenrolledStudents)
      break;
    case staffLocations.staffList:
      setUrl(url + ProductModuleFeatures.staff)
      break;
    case parentsLocations.parentsList:
      setUrl(url + ProductModuleFeatures.parent)
      break;
    case portalSetting.setting:
      setUrl(url + ProductModuleFeatures.settings_portal_schoolSetting)
      break;
    case portalSetting.setting + '?settingsKey=second':
      setUrl(url + ProductModuleFeatures.settings_portal_resultSetting)
      break;
    case portalSetting.setting + '?settingsKey=third':
      setUrl(url + ProductModuleFeatures.settings_portal_notification)
      break;
    case portalSetting.setting + '?settingsKey=fourth':
      setUrl(url + ProductModuleFeatures.settings_portal_admission)
      break;
    case portalSetting.setting + '?settingsKey=fifth':
      setUrl(url + ProductModuleFeatures.settings_portal_studentRegSetup)
      break;
    case permissionLocations.roleList:
      setUrl(url + ProductModuleFeatures.settings_permission)
      break;
    case gradeSetting.setting:
      setUrl(url + ProductModuleFeatures.setting_grade)
      break;
    case resultManagement.resultTemplate:
      setUrl(url + ProductModuleFeatures.settings_resultTemplate)
      break;
    case portalSetting.theme:
      setUrl(url + ProductModuleFeatures.settings_theme)
      break;


    default:
     setUrl(url)
  }
}


