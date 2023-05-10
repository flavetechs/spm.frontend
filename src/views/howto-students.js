import React, { useState } from 'react'
import { detailedDocumentationRoutes } from '../utils/detailed-documentation-route';
import { adminAdmissionLocations, assessmentLocations, attendanceLocations, classLocations, lessonNoteLocations, portalSetting, printResultManagement, promotionLocations, publishResultManagement, resultManagement, scoreEntryManagement, sessionClassSetupLocations, sessionLocations } from '../router/spm-path-locations';
import { studentTimeTableLocations } from '../router/students-path-locations';

const HowToStudents = () => {
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
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Submit Assessment</a>
                    <span className="mb-0">guide to submit an assessment</span>
                </div>
            </div>
            <div className="mb-2 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4"  onClick={()=>{ detailedDocumentationRoutes(href,promotionLocations.promotionSetup,setPath);}} style={{cursor:'pointer'}}>
                     <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Download</a>
                    <span className="mb-0">guide to download</span>
                </div>  
            </div>
            <div className="mb-2 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,sessionClassSetupLocations.sessionClassList,setPath);}} style={{cursor:'pointer'}}>
                     <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Download Class note</a>
                    <span className="mb-0">guide to downloading a class note</span>
                </div>
            </div>
            <div className="mb-2 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,portalSetting.setting,setPath);}} style={{cursor:'pointer'}}>
                     <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Notes</a>
                    <span className="mb-0">guide to keep notes</span>
                </div>
            </div>
            <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary "></div>
                <div className="ms-4"  onClick={()=>{ detailedDocumentationRoutes(href,portalSetting.setting + '?settingsKey=second',setPath);}} style={{cursor:'pointer'}}>
                <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Announcement</a>
                    <span className="mb-0">guide to get announcement</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4"  onClick={()=>{ detailedDocumentationRoutes(href,adminAdmissionLocations.adminAdmissionList,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Download Class Time Table</a>
                    <span className="mb-0">guide to download class timeTable</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4"  onClick={()=>{ detailedDocumentationRoutes(href,portalSetting.setting + '?settingsKey=fifth',setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Download Exam Time Table</a>
                    <span className="mb-0">guide to download exam timeTable</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4">
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Print Result</a>
                    <span className="mb-0">guide to printing result</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,resultManagement.resultTemplate,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Reset Password</a>
                    <span className="mb-0">guide to reseting password</span>
                </div>
                </div>
                <div className="mb-1 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4" onClick={()=>{ detailedDocumentationRoutes(href,portalSetting.theme,setPath);}} style={{cursor:'pointer'}}>
                    <a className="mb-1 h6 d-block"href={path} target="_blank" rel="noopener noreferrer">Online Class</a>
                    <span className="mb-0">guide to joining an online class</span>
                </div>
                </div>
               </div>
               </div>

  )
}

export default HowToStudents