import React, { Component } from 'react';
import FarmerDetail from './farmerDetail';
import Farmer from './farmer';

export default class Farmers extends Component {
    state = {
        farmers: [],
        page: 1,
        limit: 12,
        pagination: false,
        showDetails: false,
        fullName: '',
        dob: '',
        address: '',
        city: '',
        regno: '',
        gender: '',
        totalRec: 0
    }

    componentDidMount() {
        this.getFarmers();
    }

    // fetch all farmers from API
    getFarmers() {
        const { page, limit } = this.state;
        fetch(`https://theagromall.com/api/v2/get-sample-farmers?page=${page}&limit=${limit}`)
            .then(results => results.json())
            .then(data => {
                const { farmers, totalRec } = data.data;
                this.setState({ farmers, totalRec, pagination: true })
            })
    }

    prev() {
        const { page } = this.state;
        this.setState({ page: page - 1}, () => this.getFarmers());
    }

    next() {
        const { page } = this.state;
        this.setState({ page: page + 1}, () => this.getFarmers());
    }

    truncate(str) {
        if (str.length < 10) return str;

        const newString = str.slice(0, 10);
        return `${newString}...`;
    }

    onClose = () => {
        this.setState({ showDetails: false });
    }

    displayFarmers() {
        const { farmers } = this.state;
        let output = '';
        if (!farmers[0]) {
            output = <h3>No farmer</h3>;
        } else {
            output = farmers.map((farmer) => {
                const {
                    farmer_id,
                    surname,
                    first_name,
                    dob, reg_no,
                    gender,
                    address,
                    city
                } = farmer;
                const fullName = `${surname}, ${first_name}`;
                const newAddress = this.truncate(address);
                return (
                    <Farmer
                        farmerId={farmer_id}
                        fullName={fullName}
                        address={newAddress}
                        city={city}
                        regno={reg_no}
                        gender={gender}
                        dob={dob}
                        setFarmerDetails={() => this.setFarmerDetails(fullName, dob, address, city, reg_no, gender)}
                    />
                );
            });
        }
        return output;
    }

    setFarmerDetails(fullName, dob, address, city, regno, gender) {
        this.setState({ showDetails: true, fullName, dob, address, city, regno, gender })
    }

    render () {
        console.log(this.state, '>>>>', Math.round(3000/11));
        const { showDetails, fullName, address, city, regno, gender, dob, page, totalRec, pagination } = this.state;
        return (
            <div>
                <div className="container">
                    <h1>Farm Hub FC</h1>
                    <ul className="farmerlist">{this.displayFarmers()}</ul>
                    {pagination
                        && (
                            <div className="pagination">
                        <button
                            className="controls"
                            onClick={() => this.prev()}
                            disabled={page===1}
                        >prev</button>
                        <button
                            className="controls"
                            onClick={() => this.next()}
                            disabled={page===Math.round(totalRec/11)}
                        >next</button>
                        </div>
                        )
                    }
                </div>
                {showDetails
                    && (
                        <FarmerDetail
                            fullName={fullName}
                            address={address}
                            dob={dob}
                            city={city}
                            regno={regno}
                            gender={gender}
                            onclose={this.onClose}
                        />
                    )
                }
                
            </div>  
        );
    }
}
