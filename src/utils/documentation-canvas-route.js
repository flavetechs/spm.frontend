import { adminAdmissionLocations, classLocations, gradeSetting, parentsLocations, permissionLocations, portalSetting, resultManagement, sessionLocations, staffLocations, studentsLocations } from "../router/spm-path-locations"
import { ProductModuleFeatures } from "./features";

export const documentationRoutes = (pathname, setUrl) => {


  const url = 'http://fws.flavetechs.com/fws/documentation?feature='
  switch (pathname) {
    case sessionLocations.sessionList:
      setUrl(url + ProductModuleFeatures.session_Setup)
      break;
    case sessionLocations.sessionClassList:
      setUrl(url + '2')
      break;
    case sessionLocations.promotionSetup:
      setUrl(url + '3')
      break;
    case adminAdmissionLocations.adminAdmissionList:
      setUrl(url + '4')
      break;
    case classLocations.sessionClassList2:
      setUrl(url + '5')
      break;
    case classLocations.classAttendanceBoard:
      setUrl(url + '6')
      break;
    case classLocations.assessment:
      setUrl(url + '7')
      break;
    case classLocations.lessonNotes:
      setUrl(url + '8')
      break;
    case classLocations.classTimeTable:
      setUrl(url + '9')
      break;
    case resultManagement.scoreEntry:
      setUrl(url + '10')
      break;
    case resultManagement.publishResult:
      setUrl(url + '11')
      break;
    case resultManagement.printResult:
      setUrl(url + '12')
      break;
    case resultManagement.masterList:
      setUrl(url + '13')
      break;
    case resultManagement.cumulativeMasterList:
      setUrl(url + '14')
      break;
    case studentsLocations.studentList:
      setUrl(url + '15')
      break;
    case studentsLocations.enrolledStudents:
      setUrl(url + '15')
      break;
    case studentsLocations.unenrolledStudents:
      setUrl(url + '17')
      break;
    case staffLocations.staffList:
      setUrl(url + '18')
      break;
    case parentsLocations.parentsList:
      setUrl(url + '19')
      break;
    case portalSetting.setting:
      setUrl(url + '20')
      break;
    case portalSetting.setting + '?settingsKey=second':
      setUrl(url + '21')
      break;
    case portalSetting.setting + '?settingsKey=third':
      setUrl(url + '22')
      break;
    case portalSetting.setting + '?settingsKey=fourth':
      setUrl(url + '23')
      break;
    case portalSetting.setting + '?settingsKey=fifth':
      setUrl(url + '24')
      break;
    case permissionLocations.roleList:
      setUrl(url + '25')
      break;
    case gradeSetting.setting:
      setUrl(url + '26')
      break;
    case resultManagement.resultTemplate:
      setUrl(url + '27')
      break;
    case portalSetting.theme:
      setUrl(url + '28')
      break;


    default:
      setUrl(url + '1')
  }
}


