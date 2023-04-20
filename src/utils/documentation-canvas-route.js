import { adminAdmissionLocations, classLocations, gradeSetting, parentsLocations, permissionLocations, portalSetting, resultManagement, sessionLocations, staffLocations, studentsLocations } from "../router/spm-path-locations"

export const documentationRoutes = (pathname,setUrl)  =>{
switch(pathname) {
    case sessionLocations.sessionList:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=1')
      break;
    case sessionLocations.sessionClassList:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=2')
      break;
      case sessionLocations.promotionSetup:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=3')
      break;
      case adminAdmissionLocations.adminAdmissionList:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=4')
      break;
      case classLocations.sessionClassList2:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=5')
      break;
      case classLocations.classAttendanceBoard:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=6')
      break;
      case classLocations.assessment:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=7')
      break;
      case classLocations.lessonNotes:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=8')
      break;
      case classLocations.classTimeTable:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=9')
      break;
      case resultManagement.scoreEntry:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=10')
      break;
      case resultManagement.publishResult:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=11')
      break;
      case resultManagement.printResult:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=12')
      break;
      case resultManagement.masterList:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=13')
      break;
      case resultManagement.cumulativeMasterList:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=14')
      break;
      case studentsLocations.studentList:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=15')
      break;
      case studentsLocations.enrolledStudents:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=15')
      break;
      case studentsLocations.unenrolledStudents:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=17')
      break;
      case staffLocations.staffList:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=18')
      break;
      case parentsLocations.parentsList:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=19')
      break;
      case portalSetting.setting :
        setUrl('http://fws.flavetech.com/fws/documentation?feature=20')
      break;
      case portalSetting.setting + '?settingsKey=second':
        setUrl('http://fws.flavetech.com/fws/documentation?feature=21')
      break;
      case portalSetting.setting + '?settingsKey=third':
        setUrl('http://fws.flavetech.com/fws/documentation?feature=22')
      break;
      case portalSetting.setting + '?settingsKey=fourth':
        setUrl('http://fws.flavetech.com/fws/documentation?feature=23')
      break;
      case portalSetting.setting + '?settingsKey=fifth':
        setUrl('http://fws.flavetech.com/fws/documentation?feature=24')
      break;
      case permissionLocations.roleList:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=25')
      break;
      case gradeSetting.setting:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=26')
      break;
      case resultManagement.resultTemplate:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=27')
      break;
      case portalSetting.theme:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=28')
      break;

     
    default:
        setUrl('http://fws.flavetech.com/fws/documentation?feature=1')
  }
}