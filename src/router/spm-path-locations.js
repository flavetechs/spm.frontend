export const currentTabRoute = (route) => {
  return route.split('/')[1];
}

export const permissionLocations = {
  active: 'smp-permissions',
  roleList: "/dashboard/smp-permissions/role-list",
  roleEdit: "/dashboard/smp-permissions/role-edit",
  roleAdd: "/dashboard/smp-permissions/role-add",
};

export const dashboardLocations = {
  dashboard: "/dashboard",
};

export const authLocations = {
  login: "/smp/sign-in",
};

export const classLocations = {
  active: 'smp-class',
  sessionClassList2: "/dashboard/smp-class/session-class",
  classAttendance: "/dashboard/smp-class/class-attendance",
  classAttendanceBoard: "/dashboard/smp-class/class-attendance-board",
  attendancePresence:"/dashboard/smp-class/attendance-presence",
};

export const sessionLocations = {
  active: 'smp-session',
  sessionList: "/dashboard/smp-session/setup",
  sessionEdit: "/dashboard/smp-session/edit-session",
  sessionDetails: "/dashboard/smp-session/details-setup",
  sessionAdd: "/dashboard/smp-session/add-session",
  classSetupList: "/dashboard/smp-session/class-setup",
  classSetupEdit: "/dashboard/smp-session/edit-class",
  classSetupAdd: "/dashboard/smp-session/add-class",
  subjectSetupList: "/dashboard/smp-session/subject-setup",
  editSubjectSetup: "/dashboard/smp-session/edit-subject",
  addSubjectSetup: "/dashboard/smp-session/add-subject",
  sessionClassList: "/dashboard/smp-session/session-class",
  sessionClassEdit: "/dashboard/smp-session/edit-session-class",
  sessionClassAdd: "/dashboard/smp-session/add-session-class",
  sessionClassDetail: "/dashboard/smp-session/class-detail",
  promotionSetup: "/dashboard/smp-session/promotion-setup",
  promotionPassedList: "/dashboard/smp-session/promotion-passed-list-setup",
  promotionFailedList: "/dashboard/smp-session/promotion-failed-list-setup",
};

export const staffLocations = {
  active: 'smp-staff',
    staffList: '/dashboard/smp-staff/staff-list',
    staffAdd: '/dashboard/smp-staff/add-setup',
    staffEdit: '/dashboard/smp-staff/edit-setup',
    staffDetails: '/dashboard/smp-staff/details-setup',
}

export const studentsLocations = {
  active: 'smp-student',
  studentList: "/dashboard/smp-student/student-list",
  studentAdd: "/dashboard/smp-student/add-student",
  studentEdit: "/dashboard/smp-student/edit-student",
  studentDetails: "/dashboard/smp-student/student-details",
  enrolledStudents: "/dashboard/smp-student/enrollment",
  unenrolledStudents: "/dashboard/smp-student/unenrollment",
};



export const gradeSetting = {
  active: 'smp-permigradessions',
  setting: "/dashboard/smp-grade/setting"
}

export const resultManagement = {
  active: 'smp-result',
  adminScoreEntry: "/dashboard/smp-result/admin-score-entry",
  scoreEntry: "/dashboard/smp-result/score-entry",
  publishResult: "/dashboard/smp-result/publish-result",
  publishResultEdit: "/dashboard/smp-result/edit-publish-result",
  previewPublishedResult: "/dashboard/smp-result/preview-published-result",
  masterList: "/dashboard/smp-result/master-list",
  printResult: "/dashboard/smp-result/print-result",
  resultTemplate: "/dashboard/smp-result/result-template",
  cumulativeMasterList: "/dashboard/smp-result/cumulative-master-list"
}

export const portalSetting = {
  active: 'smp-setting',
  setting: "/dashboard/smp-setting",
  templateSetting:"/dashboard/smp-template-setting"
};

export const pinManagement = {
  active: 'smp-pin',
  pins: "/dashboard/smp-pin/pins",
  usedPins: "/dashboard/smp-pin/used-pins",
  pinDetails: "/dashboard/smp-pin/pin-details",
}