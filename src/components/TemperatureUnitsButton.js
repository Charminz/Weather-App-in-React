import React from 'react';

export class TemperatureUnitsButton extends React.Component {
    constructor(props) {
        super(props);

        this.isButtonChecked = this.isButtonChecked.bind(this);
    }

    isButtonChecked() {
        return sessionStorage.getItem("unit") === "imperial";
    }

    render() {
        return (
            <div>
                <label className="switch">
                    <input type="checkbox" className="unit-input" onChange={this.props.onClick} defaultChecked={this.isButtonChecked()}/>
                    <span className="slider round"/>
                    <span className="slider-content"/>
                </label>
            </div>
        )
    }
}