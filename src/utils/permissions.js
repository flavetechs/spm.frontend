import { useSelector } from "react-redux";

export const NavPermissions = {
    dashboard: 'dashboard',
    addSessionSetup: 'add-session-setup',
    sessionClass: 'session-class',
    masterList: 'master-list',
    editSubjectSetup: 'edit-subject-setup',
    templateSetting: 'template-setting',
    classClass: 'class-class',
    deleteSubjectSetup: 'delete-subject-setup',
    totalStaff: 'total-staff',
    gradeSetting: 'grade-setting',
    classSetup: 'class-setup',
    cummulativeMasterList: 'cummulative-master-list',
    totalClasses: 'total-classes',
    exportCummulativeMaster: 'export-cummulative-master',
    totalEnrolledStudent: 'total-enrolled-student',
    scoreEntry: 'score-entry',
    portalSetting: 'portal-setting',
    createAnnouncement: 'create-announcement',
    totalSubjects: 'total-subjects',
    classAttendance: 'class-attendance',
    editAnnouncement: 'edit-announcement',
    totalPins: 'total-pins',
    deleteClassRegister: 'delete-class-register',
    viewResultsToPublish: 'view-results-to-publish',
    printCesult: 'print-result'
}



export const hasAccess = (nav) => {
    const permissions = localStorage.getItem('permissions').split(',');
    return permissions.find(d => d == nav) ? true : false;
}