import React from 'react'
import { Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Card from '../../../Card'
import { PrintCSV } from '../../../../utils/export-csv'


const PrintTimeTable = () => {

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { selectedTimetable } = state.timetable;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        PrintCSV("printTable");
    }, []);

    return (
        <>
            <Row id="printTable" style={{width: "100%"}}>
 
                    <Card className='mt-0'>
                        <Card.Header className="d-flex justify-content-between flex-wrap">
                            <div className="header-title">
                                <h4>{`${selectedTimetable?.className} Class Timetable`}</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div style={{width: "100%"}}>
                                <table style={{ border: "1px solid rgb(90, 89, 89)", borderCollapse: "collapse", width: "100%", textAlign: "left", }}>
                                    <thead>
                                        <tr>
                                            <th className='table-th' style={{ padding: 15, backgroundColor: "rgb(74, 72, 72)", color: "white", textAlign: "left", }}></th>
                                            {selectedTimetable?.timetable?.days?.map((items, index) => (
                                                <th className="table-th" key={index} style={{ padding: 15, backgroundColor: "rgb(74, 72, 72)", color: "white", textAlign: "left", }}>{items.day}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedTimetable?.timetable?.times?.map((item, index) => (
                                            <tr key={index}>
                                                <td className='table-td' style={{ padding: 15, border: "1px solid rgb(90, 89, 89)", textAlign: "left", }}>
                                                    {item.period}
                                                </td>
                                                {
                                                    item?.periodActivities?.map((activityItem, idx) => {
                                                        return <td
                                                            style={{ padding: 15, border: "1px solid rgb(90, 89, 89)", textAlign: "left", textAlign: "left", }}
                                                            className='table-td'
                                                            key={idx}
                                                        >
                                                            {activityItem.activity}
                                                        </td>
                                                    })
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>


            </Row>
        </>
    )
}
export default PrintTimeTable;