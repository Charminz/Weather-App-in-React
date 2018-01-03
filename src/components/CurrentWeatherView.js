import React from 'react';
import "../styles/weather-icons.css";
import "../styles/CurrentWeather.css";
import {TemperatureUnitsButton} from "../components/TemperatureUnitsButton";

export class CurrentWeatherView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        }
    }

    render() {
        if (this.props.message && this.props.message === "Invalid city name!") {
            return (
                <div className="backbtn-cityname">
                    <button className="backbtn" onClick={this.props.onClick}><i
                        className="material-icons">arrow_back</i></button>
                    <h2>Invalid city name</h2>
                </div>
            )
        } else {
            return (
                <div className="current-weather-container">
                    <div className="backbtn-cityname">
                        <button className="backbtn" onClick={this.props.onClick}><i
                            className="material-icons">arrow_back</i></button>
                        <h1 className="cityName">{this.props.cityName}</h1>
                        <TemperatureUnitsButton onClick={this.props.onClickUnitsButton}/>
                    </div>
                    <div className="date-condition-info">
                        <p className="date">{this.props.date}</p>
                        <p className="description">{this.props.currentWeatherDescription}</p>
                    </div>
                    <div className="temperature-weathericon">
                        <span className="temperature">{this.props.currentTemperature}</span>
                        <span><i className={this.props.icon} /></span>
                    </div>
                </div>
            )
        }

    }
}

