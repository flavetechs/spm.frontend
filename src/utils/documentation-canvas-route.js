import { adminAdmissionLocations, assessmentLocations, attendanceLocations, classLocations, dashboardLocations, gradeSetting, lessonNoteLocations, parentsLocations, permissionLocations, portalSetting, printResultManagement, promotionLocations, publishResultManagement, resultManagement, scoreEntryManagement, sessionClassSetupLocations, sessionLocations, staffLocations, studentsLocations, timetableLocations } from "../router/spm-path-locations"
import { ProductModuleFeatures } from "./features";
import { ServiceURLs } from "./other";

export const documentationRoutes = (pathname, setUrl) => {

  const url = ServiceURLs.SmpDocumentation();
  if (pathname.includes(dashboardLocations.dashboard)) {
    setUrl(url + ProductModuleFeatures.session_examTimetable)
  }
  if (pathname.includes(sessionLocations.active)) {
    setUrl(url + ProductModuleFeatures.session_Setup)
  }
  else if (pathname.includes(sessionClassSetupLocations.active)) {
    setUrl(url + ProductModuleFeatures.session_classSetup)
  }
  else if (pathname.includes(promotionLocations.active)) {
    setUrl(url + ProductModuleFeatures.session_promotion)
  }
  else if (pathname.includes(adminAdmissionLocations.active)) {
    setUrl(url + ProductModuleFeatures.session_admission)
  }
  else if (pathname.includes(classLocations.active)) {
    setUrl(url + ProductModuleFeatures.session_class)
  }
  else if (pathname.includes(attendanceLocations.active)) {
    setUrl(url + ProductModuleFeatures.session_attendance)
  }
  else if (pathname.includes(assessmentLocations.active)) {
    setUrl(url + ProductModuleFeatures.session_assessment)
  }
  else if (pathname.includes(lessonNoteLocations.active)) {
    setUrl(url + ProductModuleFeatures.session_lessonNote)
  }
  else if (pathname.includes(timetableLocations.active)) {
    setUrl(url + ProductModuleFeatures.session_timetable)
  }
  else if (pathname.includes(scoreEntryManagement.active)) {
    setUrl(url + ProductModuleFeatures.result_scoreEntry)
  }
  else if (pathname.includes(publishResultManagement.active)) {
    setUrl(url + ProductModuleFeatures.result_publishResult)
  }
  else if (pathname.includes(printResultManagement.active)) {
    setUrl(url + ProductModuleFeatures.result_printResult)
  }
  else if (pathname.includes(resultManagement.active)) {
    setUrl(url + ProductModuleFeatures.result_masterlist)
    if (pathname === resultManagement.cumulativeMasterList) {
      setUrl(url + ProductModuleFeatures.result_cumulativeMasterlist)
    }
    else if (pathname === resultManagement.resultTemplate) {
      setUrl(url + ProductModuleFeatures.settings_resultTemplate)
    }
  }

  else if (pathname.includes(studentsLocations.active)) {
    setUrl(url + ProductModuleFeatures.studentList)
    if (pathname === studentsLocations.enrolledStudents) {
      setUrl(url + ProductModuleFeatures.enrolledStudents)
    }
    else if (pathname === studentsLocations.unenrolledStudents) {
      setUrl(url + ProductModuleFeatures.unenrolledStudents)
    }
  }
  else if (pathname.includes(staffLocations.active)) {
    setUrl(url + ProductModuleFeatures.staff)
  }
  else if (pathname.includes(parentsLocations.active)) {
    setUrl(url + ProductModuleFeatures.parent)
  }
  else if (pathname.includes(portalSetting.active)) {
    setUrl(url + ProductModuleFeatures.settings_portal_schoolSetting)
    if (pathname === portalSetting.theme) {
      setUrl(url + ProductModuleFeatures.settings_theme)
    }
    else if (pathname === portalSetting.setting + '?settingsKey=second') {
      setUrl(url + ProductModuleFeatures.settings_portal_resultSetting)
    }
    else if (pathname === portalSetting.setting + '?settingsKey=third') {
      setUrl(url + ProductModuleFeatures.settings_portal_notification)
    }
    else if (pathname === portalSetting.setting + '?settingsKey=fourth') {
      setUrl(url + ProductModuleFeatures.settings_portal_admission)
    }
    else if (pathname === portalSetting.setting + '?settingsKey=fifth') {
      setUrl(url + ProductModuleFeatures.settings_portal_studentRegSetup)
    }
  }
  else if (pathname.includes(permissionLocations.active)) {
    setUrl(url + ProductModuleFeatures.settings_permission)
  }
  else if (pathname.includes(gradeSetting.active)) {
    setUrl(url + ProductModuleFeatures.setting_grade)
  }




  else {
    setUrl(url)
  }
}


