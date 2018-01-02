import React from 'react';
import { CurrentWeatherContainer } from "./CurrentWeatherContainer";
import { WeeklyForecastContainer } from "./WeeklyForecastContainer";
import '../styles/index.css';

export class WeatherPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            apiKey: "601f0af0ab3c45e9d8068973cfffe6eb",
            units: "metric",
            message: ""
        };

        this.handleUnitsSwitch = this.handleUnitsSwitch.bind(this);
    }


    handleUnitsSwitch() {
        if (this.state.units === "imperial") {
            this.setState({units: "metric"});
        } else {
            this.setState({units: "imperial"});
        }
    }

    render() {
        return (
            <div>
                <CurrentWeatherContainer onClickUnitsButton={this.handleUnitsSwitch} onClick={this.props.backBtn} lon={this.props.lon} lat={this.props.lat} cityName={this.props.cityName} apiKey={this.state.apiKey} units={this.state.units}/>

                <WeeklyForecastContainer lon={this.props.lon} lat={this.props.lat} cityName={this.props.cityName} apiKey={this.state.apiKey} units={this.state.units} />
            </div>
        )

    }
}

