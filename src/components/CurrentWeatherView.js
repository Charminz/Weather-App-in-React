import React from 'react';
import "weathericons/css/weather-icons.css";
import "../styles/CurrentWeather.css";
import {TemperatureUnitsButton} from "../components/TemperatureUnitsButton";

export class CurrentWeatherView extends React.Component {
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
                    <div className="currentday-info">
                        <p className="date">{this.props.date}</p>
                        <p className="daily-description">{this.props.currentWeatherDescription}</p>
                    </div>
                    <div className="temperature-weathericon">
                        <span className="temperature">{this.props.currentTemperature}</span>
                        <span><i className={this.props.icon + " weathericon"} /></span>
                    </div>
                </div>
            )
        }
    }
}

