export const currentTabRoute = (route) => {
  return route.split('/')[1];
}

export const permissionLocations = {
  active: '/dashboard/smp-permissions',
  roleList: "/dashboard/smp-permissions/role-list",
  roleEdit: "/dashboard/smp-permissions/role-edit",
  roleAdd: "/dashboard/smp-permissions/role-add",
  addUser: "/dashboard/smp-permissions/add-user",
  removeUser: "/dashboard/smp-permissions/remove-user"
};

export const dashboardLocations = {
  dashboard: "/dashboard",
};

export const inprogress = {
  unactivated: "/dashboard/smp/unactivated",
};

export const authLocations = {
  active:"/smp/auth",
  login: "/smp/auth/sign-in",
  firstTimeLogin: "/smp/auth/change-password-on-login",
  staffProfilePage: "/dashboard/smp-user/staff-profile",
  staffProfileEdit: "/dashboard/smp-user/staff-profile-edit",
  resetPassword:"/dashboard/reset-password",
  forgottenPassword: "/smp/auth/forgotten-password",
  PasswordReset: "/smp/auth/PasswordReset",
  passwordResetSuccessful: "/smp/auth/password-reset-successful",
  pageNotFound:"/smp/auth/page-not-found"
};

export const classLocations = {
  active: '/dashboard/smp-class',
  sessionClassList2: "/dashboard/smp-class/session-class",
  updateClassAttendance: "/dashboard/smp-class/update-class-attendance",
  createClassAttendance: "/dashboard/smp-class/create-class-attendance",
  classAttendanceBoard: "/dashboard/smp-class/class-attendance-board",
  attendancePresence: "/dashboard/smp-class/attendance-presence",
  assessment: "/dashboard/smp-class/assessment",
  homeAssessmentDetails: "/dashboard/smp-class/home-assessment-details",
  createHomeAssessment: "/dashboard/smp-class/create-home-assessment",
  editClassAssessment: "/dashboard/smp-class/edit-class-assessment",
  classAssessmentDetails: "/dashboard/smp-class/class-assessment-details",
  cbtAssessmentList: "/dashboard/smp-class/cbt-assessment",
  editHomeAssessment: "/dashboard/smp-class/edit-home-assessment",
  viewStudentsHomeAssessment: "/dashboard/smp-class/view-student-home-assessment",
  lessonNotes: "/dashboard/smp-class/lesson-notes",
  createLessonNotes: "/dashboard/smp-class/create-lesson-notes",
  editLessonNotes: "/dashboard/smp-class/edit-lesson-notes",
  lessonNotesDetails: "/dashboard/smp-class/lesson-note-details",
  studentNotes: "/dashboard/smp-class/student-notes",
  studentNotesDetails: "/dashboard/smp-class/student-note-details",
  classGroup: "/dashboard/smp-class/class-group",
  classStudents: "/dashboard/smp-class/class-students",
  addClassGroup: "/dashboard/smp-class/add-class-group",
  editClassGroup: "/dashboard/smp-class/edit-class-group",
  classTimeTable: "/dashboard/smp-class/class-time-table",
  examTimeTable: "/dashboard/smp-class/exam-time-table",
  cumulativeTimeTable: "/dashboard/smp-class/cumulative-time-table",
  printTimeTable: "/dashboard/smp-class/print-time-table",
  scoreRecord: "/dashboard/smp-class/score-record",
  scoreRecordDetails: "/dashboard/smp-class/score-record-details",
};

export const sessionLocations = {
  active: '/dashboard/smp-session',
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
}
export const sessionClassSetupLocations = {
  active:"/dashboard/smp-session-class-setup",
  sessionClassList: "/dashboard/smp-session-class-setup/session-class",
  sessionClassEdit: "/dashboard/smp-session-class-setup/edit-session-class",
  sessionClassTableEdit: "/dashboard/smp-session-class-setup/edit-session-class-table",
  sessionClassAdd: "/dashboard/smp-session-class-setup/add-session-class",
  sessionClassTableAdd: "/dashboard/smp-session-class-setup/add-session-class-table",
  sessionClassDetail: "/dashboard/smp-session/class-detail",
}
export const promotionLocations = {
  active:"/dashboard/smp-promotion",
  promotionSetup: "/dashboard/smp-promotion/promotion-setup",
  promotionPassedList: "/dashboard/smp-promotion/promotion-passed-list-setup",
  promotionFailedList: "/dashboard/smp-promotion/promotion-failed-list-setup",
};

export const staffLocations = {
  active: '/dashboard/smp-staff',
  staffList: '/dashboard/smp-staff/staff-list',
  staffAdd: '/dashboard/smp-staff/add-setup',
  staffEdit: '/dashboard/smp-staff/edit-setup',
  staffDetails: '/dashboard/smp-staff/details-setup',
}

export const studentsLocations = {
  active: '/dashboard/smp-student',
  studentList: "/dashboard/smp-student/student-list",
  studentAdd: "/dashboard/smp-student/add-student",
  studentEdit: "/dashboard/smp-student/edit-student",
  studentDetails: "/dashboard/smp-student/student-details",
  enrolledStudents: "/dashboard/smp-student/enrollment",
  unenrolledStudents: "/dashboard/smp-student/unenrollment",
};

export const parentsLocations = {
  active:'/dashboard/smp-parents',
  parentsList: '/dashboard/smp-parents/parents-list',
  parentsDetails: '/dashboard/smp-parents/parents-details',
}

export const gradeSetting = {
  active: '/dashboard/smp-grade',
  setting: "/dashboard/smp-grade/setting"
}

export const resultManagement = {
  active: '/dashboard/smp-result',
  adminScoreEntry: "/dashboard/smp-result/admin-score-entry",
  adminScoreEntryTable: "/dashboard/smp-result/admin-score-entry-table",
  scoreEntry: "/dashboard/smp-result/score-entry",
  scoreEntryTable: "/dashboard/smp-result/score-entry-table",
  publishResult: "/dashboard/smp-result/publish-result",
  publishedClassList: "/dashboard/smp-result/published-class-list",
  publishResultTable:"/dashboard/smp-result/publish-result-table",
  publishResultEdit: "/dashboard/smp-result/edit-publish-result",
  previewPublishedResult: "/dashboard/smp-result/preview-published-result",
  masterList: "/dashboard/smp-result/master-list",
  printResult: "/dashboard/smp-result/print-result",
  batchPrintPreview: "/dashboard/smp-result/batch-print-preview",
  resultTemplate: "/dashboard/smp-result/result-template",
  cumulativeMasterList: "/dashboard/smp-result/cumulative-master-list"
}

export const portalSetting = {
  active: '/dashboard/smp-setting',
  setting: "/dashboard/smp-setting",
  createAdmissionSetting: "/dashboard/smp-setting/create-addmission-setting",
  updateAdmissionSetting: "/dashboard/smp-setting/update-addmission-setting",
  admissionSettingsDetails: "/dashboard/smp-setting/admission-settings-details",
  templateSetting: "/dashboard/smp-template-setting",
  theme: "/dashboard/smp-theme",
};

export const pinManagement = {
  active: '/dashboard/smp-pin',
  pins: "/dashboard/smp-pin/pins",
  usedPins: "/dashboard/smp-pin/used-pins",
  pinDetails: "/dashboard/smp-pin/pin-details",
  usedPinDetails: "/dashboard/smp-pin/usedpin-details",
}

export const notificationManagement = {
  active:'/dashboard/smp-notification',
  announcement: "/dashboard/smp-notification/announcement",
  makeAnnouncement: "/dashboard/smp-notification/make-announcement",
  announcementDetails: "/dashboard/smp-notification/announcement-details",
  announcementEdit: "/dashboard/smp-notification/announcement-edit",
}

export const pushedNotificationManagement = {
  pushedNotificationDetails: "/dashboard/notification-details",
}

export const adminAdmissionLocations = {
  active:'/dashboard/smp-admission',
  adminAdmissionList: "/dashboard/smp-admission/admission-setup",
  adminAdmissionDetail: "/dashboard/smp-session/admission-detail",
  viewCandidateAnswers: "/dashboard/smp-session/view-candidate-answers",
};
export const admissionLocations = {
  active:'/dashboard/smp-admission',
  admissionRegistration: "/dashboard/smp-admission/admission-registration",
  admissionRegistrationInformation: "/dashboard/smp-admission/admission-registration-information",
  admissionBoard: "/dashboard/smp-admission/admission-board",
}
