import React from 'react';
import {CurrentWeatherContainer} from "./CurrentWeatherContainer";
import {WeeklyForecastContainer} from "./WeeklyForecastContainer";
import '../styles/index.css';

export class WeatherPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            apiKey: "d0fcb2e76efa4e13887c5910130b1ead",
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
                <CurrentWeatherContainer
                    onClickUnitsButton={this.handleUnitsSwitch}
                    onClick={this.props.backBtn}
                    lon={this.props.lon}
                    lat={this.props.lat}
                    cityName={this.props.cityName}
                    apiKey={this.state.apiKey}
                    units={this.state.units}/>

                <WeeklyForecastContainer
                    lon={this.props.lon}
                    lat={this.props.lat}
                    cityName={this.props.cityName}
                    apiKey={this.state.apiKey}
                    units={this.state.units}/>
            </div>
        )
    }
}

