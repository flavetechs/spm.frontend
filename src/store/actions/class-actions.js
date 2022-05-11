import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/class-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";


export const getAllClassList = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASSLOOKUP_LOADING
    });

    axiosInstance.get('class/api/v1/getall/class-lookup')
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASSLOOKUP_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_CLASSLOOKUP_FAILED,
                payload: err.response.data.result
            })
        });
}




export const createClass = ({ name, isActive }) => (dispatch) => {

    dispatch({
        type: actions.CREATE_CLASSLOOKUP_LOADING
    });

    const payload = {
        name,
        isActive
    }

    axiosInstance.post('/class/api/v1/create/class-lookup', payload)
        .then((res) => {
            dispatch({
                type: actions.CREATE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}



export const updateClass = ({name, classId, isActive}) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_CLASSLOOKUP_LOADING
    });
    const payload = {
        lookupId : classId,
        name: name,
        isActive: isActive
    }
    axiosInstance.post('/class/api/v1/update/class-lookup', payload)
        .then((res) => {
            console.log('update res: ', res)
            dispatch({
                type: actions.UPDATE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage.result
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('update error: ', err)
            dispatch({
                type: actions.UPDATE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}





 
export const deleteClassItems = (classId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_CLASS_LOADING
    });

    const payload = {
        items: classId
    }
    const url = '/class/api/v1/delete/class-lookup'
    axiosInstance.post(`${url}/${payload}`)
        .then((res) => {
            dispatch({
                type: actions.DELETE_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_CLASS_FAILED,
                payload: err.response.data.result
            })
        });
}


export const fetchSingleClass = (classId) => dispatch =>{
        console.log('my fetchsingleclass', classId)
    dispatch({
        type: actions.GET_SINGLE_CLASS,
        payload: classId
    });

}


export const getAllSubjects = () => (dispatch) => {
    dispatch({
        type: actions.SUBJECTS_LOADING
    });

    axiosInstance.get('subject/api/v1/getall/subject')
        .then((res) => {
            dispatch({
                type: actions.FETCH_SUBJECTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.SUBJECT_REQUEST_FAILED,
                payload: err.response.data.result
            })
        });
}


//CREATE SUBJECT
export const createSubjectName = (name, selectedSubject) => dispatch => {
    console.log("name", name)
    selectedSubject.name = name;
    dispatch({
        type: actions.CREATE_SUBJECT_NAME,
        payload: selectedSubject,
    });


}
export const createStatus = (value, selectedSubject) => dispatch => {
    console.log("value", value)
    selectedSubject.isActive = value;
    dispatch({
        type: actions.CREATE_STATUS,
        payload: selectedSubject,
    });


}


export const createSubject = (subject) => (dispatch) => {
console.log("subject", subject)
    dispatch({
        type: actions.CREATE_SUBJECT_LOADING
    });


    axiosInstance.post('/subject/api/v1/create/subject', subject)
        .then((res) => {
            dispatch({
                type: actions.CREATE_SUBJECT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_SUBJECT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

//Delete subject
export const pushId = (itemId) => {
    console.log("itemId", itemId)
    return {
        type: actions.PUSH_SUBJECT_ID,
        payload: itemId
    }
}

export const deleteSubject = (subjectId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_SUBJECT_LOADING
    });
    const payload = {
        items: subjectId
    }

    console.log("subjectId", subjectId)
    console.log("payload", payload)
    axiosInstance.post('/subject/api/v1/delete/subject', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_SUBJECT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_SUBJECT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


  //Update subject

  export const fetchSingleSubject = (lookupId) => dispatch => {
    console.log('my fetchsingleclass', lookupId)
    dispatch({
        type: actions.GET_SINGLE_SUBJECT,
        payload: lookupId
    });

}
  

export const updateSubjectName = (name, selectedSubject) => dispatch => {
    console.log("updatedName", name)
    selectedSubject.name = name;
    dispatch({
        type: actions.CREATE_SUBJECT_NAME,
        payload: selectedSubject,
    });


}
export const updateStatus = (value, selectedSubject) => dispatch => {
    console.log("value", value)
    //selectedSubject.isActive = value;
    dispatch({
        type: actions.CREATE_STATUS,
        payload: selectedSubject,
    });


}

export const updateSubject = (updatedSubject) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_SUBJECT_LOADING
    });
    
  console.log("updatedSubject", updatedSubject)
    axiosInstance.post('/subject/api/v1/update/subject', updatedSubject)
        .then((res) => {
            console.log('update res: ', res)
            dispatch({
                type: actions.UPDATE_SUBJECT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('update error: ', err)
            dispatch({
                type: actions.UPDATE_SUBJECT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}



