export const actions = {
  PUSH_ITEM_ID: "PUSH_ITEM_ID",
  REMOVE_ITEM_ID: "REMOVE_ITEM_ID",
  RETURN_ITEM_LIST: "RETURN_ITEM_LIST",
  GET_SINGLE_ITEM: "GET_SINGLE_ITEM",

  //CLASS ACTION TYPES
  FETCH_CLASSLOOKUP_LOADING: "FETCH_CLASSLOOKUP_LOADING",
  FETCH_CLASSLOOKUP_SUCCESS: "FETCH_CLASSLOOKUP_SUCCESS",
  FETCH_CLASSLOOKUP_FAILED: "FETCH_CLASSLOOKUP_FAILED",

  CREATE_CLASSLOOKUP_LOADING: "CREATE_CLASSLOOKUP_LOADING",
  CREATE_CLASSLOOKUP_SUCCESS: "CREATE_CLASSLOOKUP_SUCCESS",
  CREATE_CLASSLOOKUP_FAILED: "CREATE_CLASSLOOKUP_FAILED",

  UPDATE_CLASSLOOKUP_LOADING: "UPDATE_CLASSLOOKUP_LOADING",
  UPDATE_CLASSLOOKUP_SUCCESS: "UPDATE_CLASSLOOKUP_SUCCESS",
  UPDATE_CLASSLOOKUP_FAILED: "UPDATE_CLASSLOOKUP_FAILED",

  DELETE_CLASSLOOKUP_LOADING: "DELETE_CLASSLOOKUP_LOADING",
  DELETE_CLASSLOOKUP_SUCCESS: "DELETE_CLASSLOOKUP_SUCCESS",
  DELETE_CLASSLOOKUP_FAILED: "DELETE_CLASSLOOKUP_FAILED",
  //CLASS ACTION TYPES

  //SUBJECT ACTION TYPES
  FETCH_SUBJECTS_LOADING: "FETCH_SUBJECTS_LOADING",
  FETCH_SUBJECTS_SUCCESS: "FETCH_SUBJECTS_SUCCESS",
  FETCH_SUBJECT_FAILED: "FETCH_SUBJECT_FAILED",

  FETCH_STUDENT_SUBJECTS_LOADING: "FETCH_STUDENT_SUBJECTS_LOADING",
  FETCH_STUDENT_SUBJECTS_SUCCESS: "FETCH_STUDENT_SUBJECTS_SUCCESS",
  FETCH_STUDENT_SUBJECT_FAILED: "FETCH_STUDENT_SUBJECT_FAILED",

  UPDATE_SUBJECT_LOADING: "UPDATE_SUBJECT_LOADING",
  UPDATE_SUBJECT_SUCCESS: "UPDATE_SUBJECT_SUCCESS",
  UPDATE_SUBJECT_FAILED: "UPDATE_SUBJECT_FAILED",

  CREATE_SUBJECT_LOADING: "CREATE_SUBJECT_LOADING",
  CREATE_SUBJECT_SUCCESS: "CREATE_SUBJECT_SUCCESS",
  CREATE_SUBJECT_FAILED: "CREATE_SUBJECT_FAILED",

  DELETE_SUBJECT_LOADING: "DELETE_SUBJECT_LOADING",
  DELETE_SUBJECT_SUCCESS: "DELETE_SUBJECT_SUCCESS",
  DELETE_SUBJECT_FAILED: "DELETE_SUBJECT_FAILED",

  //SESSION CLASS ACTION TYPES

  FETCH_SESSION_CLASS_LOADING: "FETCH_SESSION_CLASS_LOADING",
  FETCH_SESSION_CLASS_SUCCESS: "FETCH_SESSION_CLASS_SUCCESS",
  FETCH_SESSION_CLASS_FAILED: "FETCH_SESSION_CLASS_FAILED",

  UPDATE_SESSION_CLASS_LOADING: "UPDATE_SESSION_CLASS_LOADING",
  UPDATE_SESSION_CLASS_SUCCESS: "UPDATE_SESSION_CLASS_SUCCESS",
  UPDATE_SESSION_CLASS_FAILED: "UPDATE_SESSION_CLASS_FAILED",

  CREATE_SESSION_CLASS_LOADING: "CREATE_SESSION_CLASS_LOADING",
  CREATE_SESSION_CLASS_SUCCESS: "CREATE_SESSION_CLASS_SUCCESS",
  CREATE_SESSION_CLASS_FAILED: "CREATE_SESSION_CLASS_FAILED",

  DELETE_SESSION_CLASS_LOADING: "DELETE_SESSION_CLASS_LOADING",
  DELETE_SESSION_CLASS_SUCCESS: "DELETE_SESSION_CLASS_SUCCESS",
  DELETE_SESSION_CLASS_FAILED: "DELETE_SESSION_CLASS_FAILED",

  //SESSION CLASS ACTION TYPES

  //GET TEACHER ACTION TYPE
  FETCH_ACTIVE_TEACHERS_LOADING: "FETCH_ACTIVE_TEACHERS_LOADING",
  FETCH_ACTIVE_TEACHERS_SUCCESS: "FETCH_ACTIVE_TEACHERS_SUCCESS",
  FETCH_ACTIVE_TEACHERS_FAILED: "FETCH_ACTIVE_TEACHERS_FAILED",
  //GET TEACHER ACTION TYPE

  //GET ACTIVE SUBJECTS ACTION TYPE
  FETCH_ACTIVE_SUBJECTS_LOADING: "FETCH_ACTIVE_SUBJECTS_LOADING",
  FETCH_ACTIVE_SUBJECTS_SUCCESS: "FETCH_ACTIVE_SUBJECTS_SUCCESS",
  FETCH_ACTIVE_SUBJECTS_FAILED: "FETCH_ACTIVE_SUBJECTS_FAILED",
  //GET ACTIVE SUBJECTS ACTION TYPE

  //GET ACTIVE CLASSES ACTION TYPE
  FETCH_ACTIVE_CLASSES_LOADING: "FETCH_ACTIVE_CLASSES_LOADING",
  FETCH_ACTIVE_CLASSES_SUCCESS: "FETCH_ACTIVE_CLASSES_SUCCESS",
  FETCH_ACTIVE_CLASSES_FAILED: "FETCH_ACTIVE_CLASSES_FAILED",
  //GET ACTIVE CLASSES ACTION TYPE

  //CLASS SUBJECT IDS//
  PUSH_CLASS_SUBJECT_ID: "PUSH_CLASS_SUBJECT_ID",
  //CLASS SUBJECT IDS//

  //GET SINGLE SESSION CLASS
  FETCH_SINGLE_SESSION_CLASS_LOADING: "FETCH_SINGLE_SESSION_CLASS_LOADING",
  FETCH_SINGLE_SESSION_CLASS_SUCCESS: "FETCH_SINGLE_SESSION_CLASS_SUCCESS",
  FETCH_SINGLE_SESSION_CLASS_FAILED: "FETCH_SINGLE_SESSION_CLASS_FAILED",
  //GET SINGLE SESSION CLASS

  //PUSH_SESSION_ID
  PUSH_SESSION_CLASS_ID:"PUSH_SESSION_CLASS_ID",
//PUSH_SESSION_ID

//GET CLASS STUDENTS
FETCH_CLASS_STUDENTS_LOADING:"FETCH_CLASS_STUDENTS_LOADING",
FETCH_CLASS_STUDENTS_SUCCESS:"FETCH_CLASS_STUDENTS_SUCCESS",
FETCH_CLASS_STUDENTS_FAILED:"FETCH_CLASS_STUDENTS_FAILED",
//GET CLASS STUDENTS

//ATTENDANCE
CREATE_CLASS_REGISTER_LOADING: "CREATE_REGISTER_LOADING",
CREATE_CLASS_REGISTER_SUCCESS: "CREATE_REGISTER_SUCCESS",
CREATE_CLASS_REGISTER_FAILED: "CREATE_REGISTER_FAILED",

FETCH_CLASS_REGISTER_LOADING:"FETCH_CLASS_REGISTER_LOADING",
FETCH_CLASS_REGISTER_SUCCESS:"FETCH_CLASS_REGISTER_SUCCESS",
FETCH_CLASS_REGISTER_FAILED:"FETCH_CLASS_REGISTER_FAILED",

UPDATE_CLASS_REGISTER_LABEL_LOADING: "UPDATE_REGISTER_LABEL_LOADING",
UPDATE_CLASS_REGISTER_LABEL_SUCCESS: "UPDATE_REGISTER_LABEL_SUCCESS",
UPDATE_CLASS_REGISTER_LABEL_FAILED: "UPDATE_REGISTER_LABEL_FAILED",

DELETE_CLASS_REGISTER_LOADING: "DELETE_CLASS_REGISTER_LOADING",
DELETE_CLASS_REGISTER_SUCCESS: "DELETE_CLASS_REGISTER_SUCCESS",
DELETE_CLASS_REGISTER_FAILED: "DELETE_CLASS_REGISTER_FAILED",

CONTINUE_CLASS_REGISTER_LOADING: "CONTINUE_CLASS_REGISTER_LOADING",
CONTINUE_CLASS_REGISTER_SUCCESS: "CONTINUE_CLASS_REGISTER_SUCCESS",
CONTINUE_CLASS_REGISTER_FAILED: "CONTINUE_CLASS_REGISTER_FAILED",

FETCH_STUDENTS_PRESENT_LOADING:"FETCH_STUDENTS_PRESENT_LOADING",
FETCH_STUDENTS_PRESENT_SUCCESS:"FETCH_STUDENTS_PRESENT_SUCCESS",
FETCH_STUDENTS_PRESENT_FAILED:"FETCH_STUDENTS_PRESENT_FAILED",

FETCH_STUDENTS_ABSENT_LOADING:"FETCH_STUDENTS_ABSENT_LOADING",
FETCH_STUDENTS_ABSENT_SUCCESS:"FETCH_STUDENTS_ABSENT_SUCCESS",
FETCH_STUDENTS_ABSENT_FAILED:"FETCH_STUDENTS_ABSENT_FAILED",

CREATE_ATTENDANCE:"CREATE_ATTENDANCE",
UPDATE_ATTENDANCE:"UPDATE_ATTENDANCE",
//ATTENDANCE

//LESSON NOTES ACTION TYPES
CREATE_LESSON_NOTES_LOADING:"CREATE_LESSON_NOTES_LOADING",
CREATE_LESSON_NOTES_SUCCESS:"CREATE_LESSON_NOTES_SUCCESS",
CREATE_LESSON_NOTES_FAILED:"CREATE_LESSON_NOTES_FAILED",

UPDATE_LESSON_NOTES_LOADING:"UPDATE_LESSON_NOTES_LOADING",
UPDATE_LESSON_NOTES_SUCCESS:"UPDATE_LESSON_NOTES_SUCCESS",
UPDATE_LESSON_NOTES_FAILED:"UPDATE_LESSON_NOTES_FAILED",

DELETE_LESSON_NOTES_LOADING:"DELETE_LESSON_NOTES_LOADING",
DELETE_LESSON_NOTES_SUCCESS:"DELETE_LESSON_NOTES_SUCCESS",
DELETE_LESSON_NOTES_FAILED:"DELETE_LESSON_NOTES_FAILED",

FETCH_STAFFACCOUNT_LOADING: "FETCH_STAFFACCOUNT_LOADING",
FETCH_STAFFACCOUNT_SUCCESS: "FETCH_STAFFACCOUNT_SUCCESS",
FETCH_STAFFACCOUNT_FAILED: "FETCH_STAFFACCOUNT_FAILED", 

SHARE_LESSON_NOTES_LOADING:"SHARE_LESSON_NOTES_LOADING",
SHARE_LESSON_NOTES_SUCCESS:"SHARE_LESSON_NOTES_SUCCESS",
SHARE_LESSON_NOTES_FAILED:"SHARE_LESSON_NOTES_FAILED",

APPROVE_NOTES_LOADING:"APPROVE_NOTES_LOADING",
APPROVE_NOTES_SUCCESS:"APPROVE_NOTES_SUCCESS",
APPROVE_NOTES_FAILED:"APPROVE_NOTES_FAILED",

SEND_FOR_APPROVAL_LOADING:"SEND_FOR_ARRROVAL_LOADING",
SEND_FOR_APPROVAL_SUCCESS:"SEND_FOR_ARRROVAL_SUCCESS",
SEND_FOR_APPROVAL_FAILED:"SEND_FOR_ARRROVAL_FAILED",

FETCH_SINGLE_LESSON_NOTES_LOADING:"FETCH_SINGLE_LESSON_NOTES_LOADING",
FETCH_SINGLE_LESSON_NOTES_SUCCESS:"FETCH_SINGLE_LESSON_NOTES_SUCCESS",
FETCH_SINGLE_LESSON_NOTES_FAILED:"FETCH_SINGLE_LESSON_NOTES_FAILED",

FETCH_SINGLE_STUDENT_NOTES_LOADING:"FETCH_SINGLE_STUDENT_NOTES_LOADING",
FETCH_SINGLE_STUDENT_NOTES_SUCCESS:"FETCH_SINGLE_STUDENT_NOTES_SUCCESS",
FETCH_SINGLE_STUDENT_NOTES_FAILED:"FETCH_SINGLE_STUDENT_NOTES_FAILED",

FETCH_STUDENT_NOTES_BY_TEACHER_LOADING:"FETCH_STUDENT_NOTES_BY_TEACHER_LOADING",
FETCH_STUDENT_NOTES_BY_TEACHER_SUCCESS:"FETCH_STUDENT_NOTES_BY_TEACHER_SUCCESS",
FETCH_STUDENT_NOTES_BY_TEACHER_FAILED:"FETCH_STUDENT_NOTES_BY_TEACHER_FAILED",

FETCH_UNAPPROVED_LESSON_NOTES_LOADING:"FETCH_UNAPPROVED_LESSON_NOTES_LOADING",
FETCH_UNAPPROVED_LESSON_NOTES_SUCCESS:"FETCH_UNAPPROVED_LESSON_NOTES_SUCCESS",
FETCH_UNAPPROVED_LESSON_NOTES_FAILED:"FETCH_UNAPPROVED_LESSON_NOTES_FAILED",

FETCH_COMMENTS_LOADING:"FETCH_COMMENTS_LOADING",
FETCH_COMMENTS_SUCCESS:"FETCH_COMMENTS_SUCCESS",
FETCH_COMMENTS_FAILED:"FETCH_COMMENTS_FAILED",

FETCH_STUDENT_COMMENTS_LOADING:"FETCH_STUDENT_COMMENTS_LOADING",
FETCH_STUDENT_COMMENTS_SUCCESS:"FETCH_STUDENT_COMMENTS_SUCCESS",
FETCH_STUDENT_COMMENTS_FAILED:"FETCH_STUDENT_COMMENTS_FAILED",

FETCH_LESSON_NOTES_LOADING:"FETCH_LESSON_NOTES_LOADING",
FETCH_LESSON_NOTES_SUCCESS:"FETCH_LESSON_NOTES_SUCCESS",
FETCH_LESSON_NOTES_FAILED:"FETCH_LESSON_NOTES_FAILED",

FETCH_CLASS_NOTES_LOADING:"FETCH_CLASS_NOTES_LOADING",
FETCH_CLASS_NOTES_SUCCESS:"FETCH_CLASS_NOTES_SUCCESS",
FETCH_CLASS_NOTES_FAILED:"FETCH_CLASS_NOTES_FAILED",

FETCH_STUDENT_NOTES_LOADING:"FETCH_STUDENT_NOTES_LOADING",
FETCH_STUDENT_NOTES_SUCCESS:"FETCH_STUDENT_NOTES_SUCCESS",
FETCH_STUDENT_NOTES_FAILED:"FETCH_STUDENT_NOTES_FAILED",

FETCH_SUBJECT_TEACHER_LOADING:"FETCH_SUBJECT_TEACHER_LOADING",
FETCH_SUBJECT_TEACHER_SUCCESS:"FETCH_SUBJECT_TEACHER_SUCCESS",
FETCH_SUBJECT_TEACHER_FAILED:"FETCH_SUBJECT_TEACHER_FAILED",

FETCH_STATUS_LOADING:"FETCH_STATUS_LOADING",
FETCH_STATUS_SUCCESS:"FETCH_STATUS_SUCCESS",
FETCH_STATUS_FAILED:"FETCH_STATUS_FAILED",

FETCH_NOTE_VIEWERS_LOADING:"FETCH_NOTE_VIEWERS_LOADING",
FETCH_NOTE_VIEWERS_SUCCESS:"FETCH_NOTE_VIEWERS_SUCCESS",
FETCH_NOTE_VIEWERS_FAILED:"FETCH_NOTE_VIEWERS_FAILED",

FETCH_RELATED_NOTES_LOADING:"FETCH_RELATED_NOTES_LOADING",
FETCH_RELATED_NOTES_SUCCESS:"FETCH_RELATED_NOTES_SUCCESS",
FETCH_RELATED_NOTES_FAILED:"FETCH_RELATED_NOTES_FAILED",

ADD_COMMENTS_LOADING:"ADD_COMMENTS_LOADING",
ADD_COMMENTS_SUCCESS:"ADD_COMMENTS_SUCCESS",
ADD_COMMENTS_FAILED:"ADD_COMMENTS_FAILED",

ADD_REPLIES_LOADING:"ADD_REPLIES_LOADING",
ADD_REPLIES_SUCCESS:"ADD_REPLIES_SUCCESS",
ADD_REPLIES_FAILED:"ADD_REPLIES_FAILED",

RESET_SINGLE_CLASS_REGISTER_STATE:"RESET_SINGLE_CLASS_REGISTER_STATE",
RESET_CLASS_REGISTER_STATE:"RESET_CLASS_REGISTER_STATE",
RESET_CREATE_SUCCESSFUL_STATE:"RESET_CREATE_SUCCESSFUL_STATE",
//LESSON NOTES ACTION TYPES

//ASSESSMENT ACTION TYPES
CREATE_ASSESSMENT_LOADING:"CREATE_ASSESSMENT_LOADING",
CREATE_ASSESSMENT_SUCCESS:"CREATE_ASSESSMENT_SUCCESS",
CREATE_ASSESSMENT_FAILED:"CREATE_ASSESSMENT_FAILED",

UPDATE_ASSESSMENT_LOADING:"UPDATE_ASSESSMENT_LOADING",
UPDATE_ASSESSMENT_SUCCESS:"UPDATE_ASSESSMENT_SUCCESS",
UPDATE_ASSESSMENT_FAILED:"UPDATE_ASSESSMENT_FAILED",

SUBMIT_ASSESSMENT_LOADING:"SUBMIT_ASSESSMENT_LOADING",
SUBMIT_ASSESSMENT_SUCCESS:"SUBMIT_ASSESSMENT_SUCCESS",
SUBMIT_ASSESSMENT_FAILED:"SUBMIT_ASSESSMENT_FAILED",

DELETE_ASSESSMENT_LOADING:"DELETE_ASSESSMENT_LOADING",
DELETE_ASSESSMENT_SUCCESS:"DELETE_ASSESSMENT_SUCCESS",
DELETE_ASSESSMENT_FAILED:"DELETE_ASSESSMENT_FAILED",

FETCH_HOME_ASSESSMENT_LOADING: "FETCH_HOME_ASSESSMENT_LOADING",
FETCH_HOME_ASSESSMENT_SUCCESS: "FETCH_HOME_ASSESSMENT_SUCCESS",
FETCH_HOME_ASSESSMENT_FAILED: "FETCH_HOME_ASSESSMENT_FAILED", 

FETCH_CLASS_ASSESSMENT_LOADING: "FETCH_CLASS_ASSESSMENT_LOADING",
FETCH_CLASS_ASSESSMENT_SUCCESS: "FETCH_CLASS_ASSESSMENT_SUCCESS",
FETCH_CLASS_ASSESSMENT_FAILED: "FETCH_CLASS_ASSESSMENT_FAILED", 

FETCH_SINGLE_HOME_ASSESSMENT_LOADING: "FETCH_SINGLE_HOME_ASSESSMENT_LOADING",
FETCH_SINGLE_HOME_ASSESSMENT_SUCCESS: "FETCH_SINGLE_HOME_ASSESSMENT_SUCCESS",
FETCH_SINGLE_HOME_ASSESSMENT_FAILED: "FETCH_SINGLE_HOME_ASSESSMENT_FAILED", 

FETCH_SINGLE_CLASS_ASSESSMENT_LOADING: "FETCH_SINGLE_CLASS_ASSESSMENT_LOADING",
FETCH_SINGLE_CLASS_ASSESSMENT_SUCCESS: "FETCH_SINGLE_CLASS_ASSESSMENT_SUCCESS",
FETCH_SINGLE_CLASS_ASSESSMENT_FAILED: "FETCH_SINGLE_CLASS_ASSESSMENT_FAILED", 

FETCH_STUDENTS_CLASS_ASSESSMENT_LOADING: "FETCH_STUDENTS_CLASS_ASSESSMENT_LOADING",
FETCH_STUDENTS_CLASS_ASSESSMENT_SUCCESS: "FETCH_STUDENTS_CLASS_ASSESSMENT_SUCCESS",
FETCH_STUDENTS_CLASS_ASSESSMENT_FAILED: "FETCH_STUDENTS_CLASS_ASSESSMENT_FAILED", 

FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_LOADING: "FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_LOADING",
FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_SUCCESS: "FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_SUCCESS",
FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_FAILED: "FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_FAILED", 

//ASSESSMENT ACTION TYPES

//GROUP ACTION TYPES
CREATE_GROUP_LOADING:"CREATE_GROUP_LOADING",
CREATE_GROUP_SUCCESS:"CREATE_GROUP_SUCCESS",
CREATE_GROUP_FAILED:"CREATE_GROUP_FAILED",

UPDATE_GROUP_LOADING:"UPDATE_GROUP_LOADING",
UPDATE_GROUP_SUCCESS:"UPDATE_GROUP_SUCCESS",
UPDATE_GROUP_FAILED:"UPDATE_GROUP_FAILED",

DELETE_GROUP_LOADING:"DELETE_GROUP_LOADING",
DELETE_GROUP_SUCCESS:"DELETE_GROUP_SUCCESS",
DELETE_GROUP_FAILED:"DELETE_GROUP_FAILED",

FETCH_GROUP_LOADING: "FETCH_GROUP_LOADING",
FETCH_GROUP_SUCCESS: "FETCH_GROUP_SUCCESS",
FETCH_GROUP_FAILED: "FETCH_GROUP_FAILED", 

FETCH_SINGLE_GROUP_LOADING: "FETCH_SINGLE_GROUP_LOADING",
FETCH_SINGLE_GROUP_SUCCESS: "FETCH_SINGLE_GROUP_SUCCESS",
FETCH_SINGLE_GROUP_FAILED: "FETCH_SINGLE_GROUP_FAILED", 

FETCH_CLASS_SUBJECTS_LOADING: "FETCH_CLASS_SUBJECTS_LOADING",
FETCH_CLASS_SUBJECTS_SUCCESS: "FETCH_CLASS_SUBJECTS_SUCCESS",
FETCH_CLASS_SUBJECTS_FAILED: "FETCH_CLASS_SUBJECTS_FAILED",

SEND_ASSESSMENT_TO_STUDENTS_LOADING:"SEND_ASSESSMENT_TO_STUDENTS_LOADING",
SEND_ASSESSMENT_TO_STUDENTS_SUCCESS:"SEND_ASSESSMENT_TO_STUDENTS_SUCCESS",
SEND_ASSESSMENT_TO_STUDENTS_FAILED:"SEND_ASSESSMENT_TO_STUDENTS_FAILED",

FETCH_ASSESSMENT_SCORE_LOADING: "FETCH_ASSESSMENT_SCORE_LOADING",
FETCH_ASSESSMENT_SCORE_SUCCESS: "FETCH_ASSESSMENT_SCORE_SUCCESS",
FETCH_ASSESSMENT_SCORE_FAILED: "FETCH_ASSESSMENT_SCORE_FAILED",

};