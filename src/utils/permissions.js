export const NavPermissions = {
  addSessionSetup: 'add-session-setup',
  addUser: "add-user",
  announcementList: 'announcement-list',
  changeSessionInUnenrolled:"change-session-in-unenrolled",
  classAttendance: 'class-attendance',
  classSetup: 'class-setup',
  createAnnouncement:'create-announcement',
  createClassSetup:'create-class-setup',
  createSessionClass:'create-session-class',
  createStaff:'create-staff',
  createStudent:'create-student',
  createTimeTable: "create-time-table",
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
  reviewLessonNote: "review-lesson-note",
  scoreEntry: "score-entry",
  sessionClass: "session-class",
  sessionSessionClass: "session-session-class",
  sessionSetup: "session-setup",
  studentList: "student-list",
  staffList:"staff-list",
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

export const hasAccess2 = (navs = [] ) => {
  const permissions = localStorage.getItem("permissions")?.split(",");
  if(permissions)
        return permissions.find((d) => navs.includes(d)) ? true : false;
    return false;
};


export const getUserDetails  = async () => {
    var userDetail = localStorage.getItem('userDetail');
    if(userDetail !== 'undefined')
        return JSON.parse(userDetail);
    else{
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        localStorage.removeItem('userDetail');
        return 'undefined';
    }
}
