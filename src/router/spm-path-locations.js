export const currentTabRoute = (route) => {
  return route.split('/')[1];
}

export const permissionLocations = {
  active: '/dashboard/smp-permissions/',
  roleList: "/dashboard/smp-permissions/role-list",
  roleEdit: "/dashboard/smp-permissions/role-edit",
  roleAdd: "/dashboard/smp-permissions/role-add",
  addUser: "/dashboard/smp-permissions/add-user",
  removeUser: "/dashboard/smp-permissions/remove-user"
};

export const generalOnlineClassLocations = {
  active:"/online-class/smp-online-class/",
  room: "/online-class/smp-online-class/room",
};

export const dashboardLocations = {
  dashboard: "/dashboard/",
};

export const inprogress = {
  unactivated: "/dashboard/smp/unactivated",
};

export const authLocations = {
  active:"/smp/auth/",
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
  active: '/dashboard/smp-class/',
  sessionClassList2: "/dashboard/smp-class/session-class",
  classGroup: "/dashboard/smp-class/class-group",
  classStudents: "/dashboard/smp-class/class-students",
  addClassGroup: "/dashboard/smp-class/add-class-group",
  editClassGroup: "/dashboard/smp-class/edit-class-group",
  scoreRecord: "/dashboard/smp-class/score-record",
  scoreRecordDetails: "/dashboard/smp-class/score-record-details",
  studentNotes: "/dashboard/smp-lesson-note/student-notes",
  studentNotesDetails: "/dashboard/smp-lesson-note/student-note-details",
}
export const attendanceLocations = {
  active:"/dashboard/smp-attendance/",
  updateClassAttendance: "/dashboard/smp-attendance/update-class-attendance",
  createClassAttendance: "/dashboard/smp-attendance/create-class-attendance",
  classAttendanceBoard: "/dashboard/smp-attendance/class-attendance-board",
  attendancePresence: "/dashboard/smp-attendance/attendance-presence",
}
export const assessmentLocations = {
  active:"/dashboard/smp-assessment/",
  assessment: "/dashboard/smp-assessment/assessment",
  homeAssessmentDetails: "/dashboard/smp-assessment/home-assessment-details",
  createHomeAssessment: "/dashboard/smp-assessment/create-home-assessment",
  editClassAssessment: "/dashboard/smp-assessment/edit-class-assessment",
  classAssessmentDetails: "/dashboard/smp-assessment/class-assessment-details",
  cbtAssessmentList: "/dashboard/smp-assessment/cbt-assessment",
  editHomeAssessment: "/dashboard/smp-assessment/edit-home-assessment",
  viewStudentsHomeAssessment: "/dashboard/smp-assessment/view-student-home-assessment",
}
  export const lessonNoteLocations = {
  active:"/dashboard/smp-lesson-note/",
  lessonNotes: "/dashboard/smp-lesson-note/lesson-notes",
  createLessonNotes: "/dashboard/smp-lesson-note/create-lesson-notes",
  editLessonNotes: "/dashboard/smp-lesson-note/edit-lesson-notes",
  lessonNotesDetails: "/dashboard/smp-lesson-note/lesson-note-details",
  
  }
  export const timetableLocations = {
  active:"/dashboard/smp-timetable/",
  classTimeTable: "/dashboard/smp-timetable/class-time-table",
  examTimeTable: "/dashboard/smp-timetable/exam-time-table",
  cumulativeTimeTable: "/dashboard/smp-timetable/cumulative-time-table",
  printTimeTable: "/dashboard/smp-timetable/print-time-table",
};

export const sessionLocations = {
  active: '/dashboard/smp-session/',
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
  active:"/dashboard/smp-session-class-setup/",
  sessionClassList: "/dashboard/smp-session-class-setup/session-class",
  sessionClassEdit: "/dashboard/smp-session-class-setup/edit-session-class",
  sessionClassTableEdit: "/dashboard/smp-session-class-setup/edit-session-class-table",
  sessionClassAdd: "/dashboard/smp-session-class-setup/add-session-class",
  sessionClassTableAdd: "/dashboard/smp-session-class-setup/add-session-class-table",
  sessionClassDetail: "/dashboard/smp-session/class-detail",
}
export const promotionLocations = {
  active:"/dashboard/smp-promotion/",
  promotionSetup: "/dashboard/smp-promotion/promotion-setup",
  promotionPassedList: "/dashboard/smp-promotion/promotion-passed-list-setup",
  promotionFailedList: "/dashboard/smp-promotion/promotion-failed-list-setup",
};

export const staffLocations = {
  active: '/dashboard/smp-staff/',
  staffList: '/dashboard/smp-staff/staff-list',
  staffAdd: '/dashboard/smp-staff/add-setup',
  staffEdit: '/dashboard/smp-staff/edit-setup',
  staffDetails: '/dashboard/smp-staff/details-setup',
}

export const studentsLocations = {
  active: '/dashboard/smp-student/',
  studentList: "/dashboard/smp-student/student-list",
  studentAdd: "/dashboard/smp-student/add-student",
  studentEdit: "/dashboard/smp-student/edit-student",
  studentDetails: "/dashboard/smp-student/student-details",
  enrolledStudents: "/dashboard/smp-student/enrollment",
  unenrolledStudents: "/dashboard/smp-student/unenrollment",
};

export const parentsLocations = {
  active:'/dashboard/smp-parents/',
  parentsList: '/dashboard/smp-parents/parents-list',
  parentsDetails: '/dashboard/smp-parents/parents-details',
}

export const gradeSetting = {
  active: '/dashboard/smp-grade/',
  setting: "/dashboard/smp-grade/setting"
}

export const scoreEntryManagement = {
  active: '/dashboard/smp-score-entry/',
  adminScoreEntry: "/dashboard/smp-score-entry/admin-score-entry",
  adminScoreEntryTable: "/dashboard/smp-score-entry/admin-score-entry-table",
  scoreEntry: "/dashboard/smp-score-entry/score-entry",
  scoreEntryTable: "/dashboard/smp-score-entry/score-entry-table",
}
  export const publishResultManagement = {
  active: '/dashboard/smp-publish-result/',
  publishResult: "/dashboard/smp-publish-result/publish-result",
  publishedClassList: "/dashboard/smp-publish-result/published-class-list",
  publishResultTable:"/dashboard/smp-publish-result/publish-result-table",
  publishResultEdit: "/dashboard/smp-publish-result/edit-publish-result",
  previewPublishedResult: "/dashboard/smp-publish-result/preview-published-result",
  }
  export const resultManagement = {
  active: '/dashboard/smp-result/',
  masterList: "/dashboard/smp-result/master-list",
  cumulativeMasterList: "/dashboard/smp-result/cumulative-master-list",
  resultTemplate: "/dashboard/smp-result/result-template",
  }
  export const printResultManagement = {
  active: '/dashboard/smp-print-result/',
  printResult: "/dashboard/smp-print-result/print-result",
  batchPrintPreview: "/dashboard/smp-print-result/batch-print-preview",
  }
  


export const portalSetting = {
  active: '/dashboard/smp-setting/',
  setting: "/dashboard/smp-setting/setting",
  createAdmissionSetting: "/dashboard/smp-setting/create-addmission-setting",
  updateAdmissionSetting: "/dashboard/smp-setting/update-addmission-setting",
  admissionSettingsDetails: "/dashboard/smp-setting/admission-settings-details",
  templateSetting: "/dashboard/smp-template-setting",
  theme: "/dashboard/smp-theme",
};

export const pinManagement = {
  active: '/dashboard/smp-pin/',
  pins: "/dashboard/smp-pin/pins",
  usedPins: "/dashboard/smp-pin/used-pins",
  pinDetails: "/dashboard/smp-pin/pin-details",
  usedPinDetails: "/dashboard/smp-pin/usedpin-details",
}

export const notificationManagement = {
  active:'/dashboard/smp-notification/',
  announcement: "/dashboard/smp-notification/announcement",
  makeAnnouncement: "/dashboard/smp-notification/make-announcement",
  announcementDetails: "/dashboard/smp-notification/announcement-details",
  announcementEdit: "/dashboard/smp-notification/announcement-edit",
}

export const pushedNotificationManagement = {
  pushedNotificationDetails: "/dashboard/notification-details",
}

export const adminAdmissionLocations = {
  active:'/dashboard/smp-admission/',
  adminAdmissionList: "/dashboard/smp-admission/admission-setup",
  adminAdmissionDetail: "/dashboard/smp-session/admission-detail",
  viewCandidateAnswers: "/dashboard/smp-session/view-candidate-answers",
};
export const admissionLocations = {
  active:'/dashboard/smp-admission/',
  admissionRegistration: "/dashboard/smp-admission/admission-registration",
  admissionRegistrationInformation: "/dashboard/smp-admission/admission-registration-information",
  admissionBoard: "/dashboard/smp-admission/admission-board",
}
