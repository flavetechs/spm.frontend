import { adminAdmissionLocations, classLocations, gradeSetting, parentsLocations, permissionLocations, portalSetting, resultManagement, sessionLocations, staffLocations, studentsLocations } from "../router/spm-path-locations"
import { ProductModuleFeatures } from "./features";

export const detailedDocumentationRoutes = (pathname, setPath) => {


  const url = 'http://fws.flavetechs.com/fws/detailed-documentation?feature='
  switch (pathname) {
    case sessionLocations.sessionList:
      setPath(url + ProductModuleFeatures.session_Setup)
      break;
    case sessionLocations.sessionClassList:
      setPath(url + ProductModuleFeatures.session_classSetup)
      break;
    case sessionLocations.promotionSetup:
      setPath(url + ProductModuleFeatures.session_promotion)
      break;
    case adminAdmissionLocations.adminAdmissionList:
      setPath(url + ProductModuleFeatures.session_admission)
      break;
    case classLocations.sessionClassList2:
      setPath(url + ProductModuleFeatures.session_class)
      break;
    case classLocations.classAttendanceBoard:
      setPath(url + ProductModuleFeatures.session_attendance)
      break;
    case classLocations.assessment:
      setPath(url + ProductModuleFeatures.session_assessment)
      break;
    case classLocations.lessonNotes:
      setPath(url + ProductModuleFeatures.session_lessonNote)
      break;
    case classLocations.classTimeTable:
      setPath(url + ProductModuleFeatures.session_timetable)
      break;
    case resultManagement.scoreEntry:
      setPath(url + ProductModuleFeatures.result_scoreEntry)
      break;
    case resultManagement.publishResult:
      setPath(url + ProductModuleFeatures.result_publishResult)
      break;
    case resultManagement.printResult:
      setPath(url + ProductModuleFeatures.result_printResult)
      break;
    case resultManagement.masterList:
      setPath(url + ProductModuleFeatures.result_masterlist)
      break;
    case resultManagement.cumulativeMasterList:
      setPath(url + ProductModuleFeatures.result_cumulativeMasterlist)
      break;
    case studentsLocations.studentList:
      setPath(url + ProductModuleFeatures.studentList)
      break;
    case studentsLocations.enrolledStudents:
      setPath(url + ProductModuleFeatures.enrolledStudents)
      break;
    case studentsLocations.unenrolledStudents:
      setPath(url + ProductModuleFeatures.unenrolledStudents)
      break;
    case staffLocations.staffList:
      setPath(url + ProductModuleFeatures.staff)
      break;
    case parentsLocations.parentsList:
      setPath(url + ProductModuleFeatures.parent)
      break;
    case portalSetting.setting:
      setPath(url + ProductModuleFeatures.settings_portal_schoolSetting)
      break;
    case portalSetting.setting + '?settingsKey=second':
      setPath(url + ProductModuleFeatures.settings_portal_resultSetting)
      break;
    case portalSetting.setting + '?settingsKey=third':
      setPath(url + ProductModuleFeatures.settings_portal_notification)
      break;
    case portalSetting.setting + '?settingsKey=fourth':
      setPath(url + ProductModuleFeatures.settings_portal_admission)
      break;
    case portalSetting.setting + '?settingsKey=fifth':
      setPath(url + ProductModuleFeatures.settings_portal_studentRegSetup)
      break;
    case permissionLocations.roleList:
      setPath(url + ProductModuleFeatures.settings_permission)
      break;
    case gradeSetting.setting:
      setPath(url + ProductModuleFeatures.setting_grade)
      break;
    case resultManagement.resultTemplate:
      setPath(url + ProductModuleFeatures.settings_resultTemplate)
      break;
    case portalSetting.theme:
      setPath(url + ProductModuleFeatures.settings_theme)
      break;


    default:
     setPath(url)
  }
}


