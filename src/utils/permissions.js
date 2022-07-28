export const NavPermissions = {
  addSessionSetup: 'add-session-setup',
  addUser: "add-user",
  announcementList: 'announcement-list',
  classAttendance: 'class-attendance',
  classClass: 'class-class',
  classSetup: 'class-setup',
  createAnnouncement:'create-announcement',
  createClassSetup:'create-class-setup',
  createSessionClass:'create-session-class',
  createStaff:'create-staff',
  createStudent:'create-student',
  createSubjectSetup:'create-subject-setup',
  cummulativeMasterList:'cummulative-master-list',
  deleteAnnouncement: "delete-announcement",
  deleteClassRegister: "delete-class-register",
  deleteClassSetup: "delete-class-setup",
  deleteSession: "delete-session",
  deleteSessionClass: "delete-session-class",
  deleteStaff: "delete-staff",
  deleteStudent: "delete-student",
  deleteSubjectSetup: "delete-subject-setup",
  editAnnouncement: "edit-announcement",
  editClassSetup: "edit-class-setup",
  editRole: "edit-role",
  editSessionClass: "edit-session-class",
  editStaff: "edit-staff",
  editStudent: "edit-student",
  editSubjectSetup: "edit-subject-setup",
  enrolledStudentsList: "enrolled-students-list",
  enrollStudents: "enroll-students",
  exportCummulativeMaster: "export-cummulative-master",
  exportMasterList: "export-master-list",
  gradeSetting: "grade-setting",
  masterList: "master-list",
  newRole: "new-role",
  portalSetting: "portal-setting",
  previousTermsScores: "previous-terms-scores",
  printResult: "print-result",
  promoteStudents: "promote-students",
  promotionList: "promotion-list",
  publishResult: "publish-result",
  roleList: "role-list",
  scoreEntry: "score-entry",
  sessionClass: "session-class",
  sessionSetup: "session-setup",
  studentList: "student-list",
  subjectSetup: "subject-setup",
  switchTerms: "switch-terms",
  templateSetting: "template-setting",
  totalClasses: "total-classes",
  totalEnrolledStudent: "total-enrolled-student",
  totalPins: "total-pins",
  totalStaff: "total-staff",
  totalSubjects: "total-subjects",
  unenrollStudents: "unenroll-students",
  unenrolledStudentsList: "unenrolled-students-list",
  unusedPins: "unused-pins",
  uploadPins: "upload-pins",
  usedPins: "used-pins",
  viewResultsToPublish: "view-results-to-publish",
};

export const hasAccess = (nav) => {
  const permissions = localStorage.getItem("permissions")?.split(",");
  if(permissions)
        return permissions.find((d) => d == nav) ? true : false;
    return false;
};

export const getUserDetails = () => {
    var userDetail = localStorage.getItem('userDetail');
    if(userDetail !== 'undefined')
        return JSON.parse(userDetail);
    else{
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        localStorage.removeItem('userDetail');
    }
}
