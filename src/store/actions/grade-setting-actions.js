import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/grade-setting-action-types"
import { respondModal, showErrorToast, showHideModal, showSuccessToast } from "./toaster-actions";

export const getAllGradeClasses = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_GRADE_CLASSES_LOADING
    });

    axiosInstance.get('/grade/api/v1/get/get-classes')
        .then((res) => {
            dispatch({
                type: actions.FETCH_GRADE_CLASSES_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_GRADE_CLASSES_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getPreviousGrades = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_PREVIOUS_GRADES_LOADING
    });

    axiosInstance.get('/grade/api/v1/get/get-settings')
        .then((res) => {
            dispatch({
                type: actions.FETCH_PREVIOUS_GRADES_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_PREVIOUS_GRADES_FAILED,
                payload: err.response.data.result
            })
        });
}
export const createGradeSetting = (values) => (dispatch) => {
    dispatch({
        type: actions.CREATE_GRADE_LOADING
    });
    axiosInstance.post('/grade/api/v1/create', values)
        .then((res) => {
            dispatch({
                type: actions.CREATE_GRADE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_GRADE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const gradeValueArray = (gradeInput) => (dispatch) => {
    dispatch({
        type: actions.PUSH_GRADE_VALUES,
        payload: gradeInput
    })
    
}

export const editGradeValues = (index, gradeGroupId, prevGradesList) => (dispatch) => {
    var existingGradeGroup = prevGradesList.find(er => er.gradeGroupId === gradeGroupId);
if(existingGradeGroup){
    prevGradesList.splice(index, 1)
}
    dispatch({
        type: actions.EDIT_GRADE_VALUES,
        payload: prevGradesList
    })
}
export const chooseEdit = (index, gradeGroupId, prevGradesList) => (dispatch) => {
    var existingGradeGroup = prevGradesList.find(er => er.gradeGroupId === gradeGroupId);
if(existingGradeGroup){
    var cutGradeGroup = prevGradesList.slice(index, index + 1);
}
    dispatch({
        type: actions.CHOOSE_EDIT,
        payload: cutGradeGroup
    })
}

export const updateFetchClass = (index, gradeGroupId, prevGradesList) => (dispatch) => {
    var existingGradeGroup = prevGradesList.find(er => er.gradeGroupId === gradeGroupId);
    if(existingGradeGroup){
        var cutGradeGroup = prevGradesList.slice(index, index + 1);
        var sessionClassId = cutGradeGroup.map((edit, index) => 
        edit.classes.map((list) =>
           list.sessionClassId
    ));
    sessionClassId = sessionClassId.toString();
    
    var sessionClassName = cutGradeGroup.map((edit, index) => 
        edit.classes.map((list) =>
           list.sessionClassName
    ));
    
    sessionClassName = sessionClassName.toString();
    }
    let classToAdd = {
        sessionClassId,
        className: sessionClassName
    }

    dispatch({
        type: actions.UPDATE_FETCH_CLASS,
        payload: classToAdd
    })
    
}

export const buildClassArray = (checked, sessionClassId, classes) => (dispatch) => {
    var existingClasses = classes.find(er => er.sessionClassId === sessionClassId);
    var otherClasses = classes.filter(er => er.sessionClassId !== sessionClassId);
    if (existingClasses) {
        if (checked) {
            existingClasses.sessionClassId = sessionClassId;
            classes = [...otherClasses, existingClasses]
        } else {
            classes = [...otherClasses]
        }
    } else {
        let newClasses = {
            sessionClassId
        }
        classes = [...classes, newClasses]
    }
    dispatch({
        type: actions.PUSH_CLASSES_ID,
        payload: classes
    })
}






