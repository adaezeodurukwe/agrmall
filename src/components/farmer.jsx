import React from 'react';

const Farmer = ({ farmerId, fullName, address, setFarmerDetails }) => {
    return (
        <li key={farmerId} className="farmer">
            <span><b>Name:</b> {fullName}</span><br/> 
            <span><b>Address:</b> {address}</span><br/>
            <div className="details">
                <button
                    className="detailsbutton"
                    onClick={setFarmerDetails}
                >
                    Details
                </button>
            </div>
        </li>
    );
}

export default Farmer;