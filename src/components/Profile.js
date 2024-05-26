import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function Profile() {
    const [missions, setMissions] = useState([]);
    const [rockets, setRockets] = useState([]);
    const [cookies, setCookie] = useCookies(['activeMembers', 'reservedRocketIds']);

    useEffect(() => {
        const fetchData = async () => {
            const missionsResponse = await fetch("http://api.spacexdata.com/v3/missions");
            const missionsData = await missionsResponse.json();
            setMissions(missionsData);

            const rocketsResponse = await fetch("http://api.spacexdata.com/v4/rockets");
            const rocketsData = await rocketsResponse.json();
            setRockets(rocketsData);
        };

        fetchData();
    }, []);

    const activeMembers = cookies.activeMembers || {};
    const reservedRocketIds = cookies.reservedRocketIds || [];

    const memberMissions = missions.filter(mission => activeMembers[mission.mission_id] == "Active Member");
    const reservedRockets = rockets.filter(rocket => reservedRocketIds.includes(rocket.id));

    return (
        <div className='div'>
            <div>
                <h2>Member Missions</h2>
                {memberMissions.length > 0 ? (
                    <table className='table4'>
                        <thead>
                            <tr>
                                <th>Mission Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {memberMissions.map(mission => (
                                <tr key={mission.mission_id}>
                                    <td>{mission.mission_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No membership</p>
                )}
            </div>

            <div>
                <h2>Reserved Rockets</h2>
                {reservedRockets.length > 0 ? (
                    <table className='table4'>
                        <thead>
                            <tr>
                                <th>Rocket Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservedRockets.map(rocket => (
                                <tr key={rocket.id}>
                                    <td>{rocket.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No reservation</p>
                )}
            </div>
        </div>
    );
}

export default Profile;