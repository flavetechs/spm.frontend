import React, { useState } from 'react'
import "./css/lobby.css"
import "./css/main.css"
import { getAllStaffClasses } from '../../store/actions/results-actions';
import { useDispatch, useSelector } from 'react-redux';
import { generalOnlineClassLocations } from '../../router/spm-path-locations';
import { useHistory } from 'react-router';

const Lobby = () => {
    const [classRoom, setClassRoom] = useState("")
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => state);
    const { staffClasses } = state.results;

    React.useEffect(() => {
        getAllStaffClasses()(dispatch);
      }, []);

  return (
    <main id="room__lobby__container">
     <div id="form__container">
          <div id="form__container__header">
              <p> Create or Join Room</p>
          </div>


         <form id="lobby__form">

              <div className="form__field__wrapper">
                  <label>Class Room</label>
                  <div className="box">
                  <select className="room-dropdown" 
                  onChange={(e)=>{setClassRoom(e.target.value)}}
                  >
                    <option value="">Select Class Room</option>
                    <option value="111">111</option>
                    {staffClasses?.map((item, idx) => (
                                  <option
                                    key={idx}
                                    value={item.sessionClassId}>
                                    {item.sessionClass}
                                  </option>
                    ))}
                  </select>
                  </div>
              </div>

              <div className="form__field__wrapper">
                  <button className='submit-button' onClick={()=>history.push(`${generalOnlineClassLocations.room}?roomId=${classRoom}`)}>Go to Room 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg>
                 </button>
              </div>
         </form>
     </div>
  </main>
  )
}

export default Lobby