import React, { useState } from 'react'
import { detailedDocumentationRoutes } from '../utils/detailed-documentation-route';
import { adminAdmissionLocations, assessmentLocations, attendanceLocations, classLocations, gradeSetting, lessonNoteLocations, portalSetting, printResultManagement, promotionLocations, publishResultManagement, resultManagement, scoreEntryManagement, sessionClassSetupLocations, sessionLocations } from '../router/spm-path-locations';
import { studentTimeTableLocations } from '../router/students-path-locations';

const HowTo = () => {
    const [path, setPath] = useState("");
    const { href } = window.location
  return (
    <div className="card" data-aos="fade-up" data-aos-delay="600">
        <div className="flex-wrap card-header d-flex justify-content-between">
            <div className="header-title">
                <h4 className="mb-2 card-title">How To Set up Application</h4>
                
            </div>
        </div>
        <div className="card-body">
            <div className="mb-2 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,sessionLocations.sessionList,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Set up session</a>
                    <span className="mb-0">guide to session and term set up</span>
                </div>
            </div>
            <div className="mb-2 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4"  onClick={()=>{ detailedDocumentationRoutes(href,promotionLocations.promotionSetup,setPath);}} style={{cursor:'pointer'}}>
                     <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer"> Promotion</a>
                    <span className="mb-0">guide to promoting students at session end</span>
                </div>  
            </div>
            <div className="mb-2 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,sessionClassSetupLocations.sessionClassList,setPath);}} style={{cursor:'pointer'}}>
                     <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Class Setup</a>
                    <span className="mb-0">adding classes to school</span>
                </div>
            </div>
            <div className="mb-2 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,portalSetting.setting,setPath);}} style={{cursor:'pointer'}}>
                     <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Set up school</a>
                    <span className="mb-0">guide to set up school profile and information</span>
                </div>
            </div>
            <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary "></div>
                <div className="ms-4"  onClick={()=>{ detailedDocumentationRoutes(href,portalSetting.setting + '?settingsKey=second',setPath);}} style={{cursor:'pointer'}}>
                <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Set up result</a>
                    <span className="mb-0">guide to set result from assessments </span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4"  onClick={()=>{ detailedDocumentationRoutes(href,adminAdmissionLocations.adminAdmissionList,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Admission</a>
                    <span className="mb-0">setting admission for new students</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4"  onClick={()=>{ detailedDocumentationRoutes(href,portalSetting.setting + '?settingsKey=fifth',setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Registration number</a>
                    <span className="mb-0">setting arrangement of registration number</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,gradeSetting.setting,setPath);}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Grades</a>
                    <span className="mb-0">setting grading system for assessments</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,resultManagement.resultTemplate,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Result template</a>
                    <span className="mb-0">setting template format for result printing</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,portalSetting.theme,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Theme</a>
                    <span className="mb-0">changing view of application</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,classLocations.sessionClassList2,setPath);}} style={{cursor:'pointer'}} >
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Class</a>
                    <span className="mb-0">guide on how to use class</span>
                </div>
                </div>
                   <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,attendanceLocations.classAttendanceBoard,setPath);}} style={{cursor:'pointer'}} >
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Attendance</a>
                    <span className="mb-0">guide on how to use attendance</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,assessmentLocations.assessment,setPath);}} style={{cursor:'pointer'}} >
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Assessment</a>
                    <span className="mb-0">guide on how to use assessment features to create assessments</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,lessonNoteLocations.lessonNotes,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Lesson note</a>
                    <span className="mb-0">guide on how to use lesson note to create notes</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,studentTimeTableLocations.classTimeTable,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Class time table</a>
                    <span className="mb-0">guide on how to use class time table</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,studentTimeTableLocations.classTimeTable,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Examination time table</a>
                    <span className="mb-0">guide on how to use examination time table</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,scoreEntryManagement.scoreEntry,setPath);}} style={{cursor:'pointer'}} >
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Score entry</a>
                    <span className="mb-0">guide on how to use score entry to enter scores</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,publishResultManagement.publishResult,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Publish results</a>
                    <span className="mb-0">guide on how to publish results</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,resultManagement.masterList,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Master list</a>
                    <span className="mb-0">guide on ow to use master list</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,printResultManagement.printResult,setPath);}} style={{cursor:'pointer'}}> 
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Print results</a>
                    <span className="mb-0">guide on how to print results</span>
                </div>
                
                </div>
            </div>
        </div>
   

  )
}

export default HowTo