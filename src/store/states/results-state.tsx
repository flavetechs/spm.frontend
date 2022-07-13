export const _state = {
    loading: false,
    message: "",
    isSuccessful: false,
    staffClasses: [],
    staffClassSubjects: null,
    scoreEntry: null,
    scoreEntryPreview: null,
    fetchPreviewSuccessful: false,
    masterEntry: null,
    previousScoreEntry:null,
    previousScoreEntryPreview:null,
    cumulativeEntry:null,
    templateSetting:"template-one",
    studentResult:{
            "studentName": "BRIDGET DAVID",
            "studentContactId": "e7bd6632-4d18-4217-8c05-adc4c318d6b6",
            "registrationNumber": "ABC/0000017/xyz",
            "sessionClassName": "JSS 2",
            "session": "2021/2022",
            "term" : "3rd",
            "position":"4th",
            "remark":"very good",
            "noOfStudents":50,
            "total":150,
            "totalScores":1000,
            "average":70,
            "isPublished": false,
            "studentSubjectEntries": [
              {
                "sessionClassId": "51650414-a9ce-43e5-9bf5-08da506c0c63",
                "subjectId": "23090a42-5012-447e-9f6f-08da4a4d0da1",
                "sibjectName": "ECONOMICS",
                "examScore": 60,
                "classScoreEntryId": "06fdb762-d9be-44c6-b945-08da506c0cbd",
                "assessmentScore": 4,
                "totalScore": 64,
                "grade": "C",
                "remark": "GOOD"
              },
              {
                "sessionClassId": "51650414-a9ce-43e5-9bf5-08da506c0c63",
                "subjectId": "f5646cdd-c039-487a-9f6e-08da4a4d0da1",
                "sibjectName": "COMPUTER SCIENCE",
                "examScore": 40,
                "classScoreEntryId": "f54ba6c6-6a90-4f5c-b946-08da506c0cbd",
                "assessmentScore": 20,
                "totalScore": 60,
                "grade": "C",
                "remark": "GOOD"
              }
            ],
            "gradeSetting" : [
                {limit:"80-100", grade:"A"},
                {limit:"60-79", grade:"B"},
                {limit:"60-79", grade:"C"},
                {limit:"40-49", grade:"D"},
                {limit:"20-39", grade:"E"},
                {limit:"0-19", grade:"F"}
            ],
            "cognitiveBehaviour" :[
                {behaviour:"Team work", remark:"good"},
                {behaviour:"Creativity", remark:"good"}, 
                {behaviour:"Responsibility", remark:"good"},
                {behaviour:"Attentiveness", remark:"good"}
            ]
    }
    }