import React from 'react';

const FarmerDetails = ({ fullName, dob, address, city, regno, gender, onclose }) => {
    return (
        <div>
            <div className="farmerdets" onClick={onclose}></div>
            <div className="farmerbody">
                <img src="./placeholder-avatar.png"/>
                <span><b>Name:</b> { fullName }</span>
                <span><b>Registration Number:</b> { regno }</span> 
                <span><b>Date of Birth:</b> { dob }</span> 
                <span><b>Gender:</b> { gender }</span> 
                <span><b>Address:</b> { address }</span>
                <span><b>City:</b> { city }</span>
                <button className="close" onClick={onclose}>Close</button>
            </div>
        </div>
    )
}

export default FarmerDetails;