import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function Missions() {
    const [missions, setMissions] = useState([]);
    const [missionStatuses, setMissionStatuses] = useState({});
    const [cookies, setCookie] = useCookies(['activeMembers']);

    useEffect(() => {
        const fetchData = async () => {
            const missionsResponse = await fetch("http://api.spacexdata.com/v3/missions");
            const missionsData = await missionsResponse.json();
            setMissions(missionsData);
            const initialStatuses = {};
            missionsData.forEach(mission => {
                initialStatuses[mission.mission_id] = "Not A Member";
            });
            setMissionStatuses(initialStatuses);
            const activeMembers = cookies.activeMembers || {};
            setMissionStatuses(prevStatuses => ({ ...prevStatuses, ...activeMembers }));
        };

        fetchData();
    }, [cookies.activeMembers]);

    const handleStatusChange = (missionId) => {
        setMissionStatuses(prevStatuses => {
            const updatedStatuses = { ...prevStatuses };
            if (updatedStatuses[missionId] === "Not A Member") {
                updatedStatuses[missionId] = "Active Member";
            } else {
                updatedStatuses[missionId] = "Not A Member";
            }
            setCookie('activeMembers', updatedStatuses, { path: '/' });
            return updatedStatuses;
        });
    };

    return (
        <div>
            <table className='Table' >
                <thead>
                    <tr>
                        <th>Mission</th>
                        <th className='description'>Description</th>
                        <th colSpan={2}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {missions.map((mission) => (
                        <tr key={mission.mission_id}>
                            <td>{mission.mission_name}</td>
                            <td className="description">{mission.description}</td>
                            <td>
                                <button
                                    className={`Button ${missionStatuses[mission.mission_id] === "Not A Member" ? "red" : "blue"}`}
                                    style={{ width: '100px' }}
                                    disabled={missionStatuses[mission.mission_id] === "Not A Member"}
                                >
                                    {missionStatuses[mission.mission_id]}
                                </button>
                            </td>
                            <td><button onClick={() => handleStatusChange(mission.mission_id)} style={{ width: '100px', height: '50px' }}>{missionStatuses[mission.mission_id] === "Not A Member" ? "Join the Mission" : "Leave the Mission"}</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Missions;