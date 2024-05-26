import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function Rockets() {
    const [rockets, setRockets] = useState([]);
    const [reservedRocketIds, setReservedRocketIds] = useState([]);
    const [cookies, setCookie] = useCookies(['reservedRocketIds']);

    useEffect(() => {
        const fetchData = async () => {
            const rocketsResponse = await fetch("http://api.spacexdata.com/v4/rockets");
            const rocketsData = await rocketsResponse.json();
            setRockets(rocketsData);
        };

        fetchData();

        // Retrieve reserved rocket IDs from cookies
        const storedRocketIds = cookies.reservedRocketIds;
        if (storedRocketIds) {
            setReservedRocketIds(storedRocketIds);
        }
    }, [cookies.reservedRocketIds]);

    const handleReservation = (rocketId) => {
        if (!reservedRocketIds.includes(rocketId)) {
            const updatedRocketIds = [...reservedRocketIds, rocketId];
            setReservedRocketIds(updatedRocketIds);

            // Save reserved rocket IDs to cookies
            setCookie('reservedRocketIds', updatedRocketIds, { path: '/' });
        }
    };

    const handleCancelReservation = (rocketId) => {
        const updatedRocketIds = reservedRocketIds.filter((id) => id !== rocketId);
        setReservedRocketIds(updatedRocketIds);
        // Save reserved rocket IDs to cookies
        setCookie('reservedRocketIds', updatedRocketIds, { path: '/' });
    };

    return (
        <div>
            {
                rockets.map((rocket) => (
                    <div style={{ display: 'flex', justifyContent: 'center' }} key={rocket.id}>
                        <div className='cards'>
                            <img className='img' src={rocket.flickr_images[0]} alt={rocket.name} />
                            <div className='p'>
                                <h4><b>{rocket.name}</b></h4>
                                <p>{rocket.description}</p>
                                {reservedRocketIds.includes(rocket.id) ? (
                                    <button className='button1 reserved' onClick={() => handleCancelReservation(rocket.id)}>Cancel Reservation</button>
                                ) : (
                                    <button className='button1' onClick={() => handleReservation(rocket.id)} disabled={reservedRocketIds.includes(rocket.id)}>Reserve</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Rockets;