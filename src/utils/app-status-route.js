import {
  gradeSetting,
  portalSetting,
  resultManagement,
  sessionClassSetupLocations,
  sessionLocations,
} from "../router/spm-path-locations";

export const appStatusRoute = {
  session: sessionLocations.sessionList,
  classes: sessionClassSetupLocations.sessionClassList,
  subjects: sessionLocations.subjectSetupList,
  schoolsetting: portalSetting.setting,
  resultsetting: portalSetting.setting + "?settingsKey=second",
  registrationnumber: portalSetting.setting + "?settingsKey=fifth",
  grade: gradeSetting.setting,
  resulttemplate: resultManagement.resultTemplate,
};
