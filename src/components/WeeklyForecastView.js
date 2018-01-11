import React from 'react';
import "../styles/WeeklyForecast.css";

export class WeeklyForecastView extends React.Component {
    constructor(props) {
        super(props);
        this.setForecastLayout = this.setForecastLayout.bind(this);
    }

    setForecastLayout() {
        return this.props.forecast.map((day) => {
            return (
                <div key={day[0]} className="dayinfo">
                    <p>{day[0]}</p>
                    <i className={day[2] + " weathericon"}/>
                    <p>{day[1]}</p>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="forecast-container">
                {this.setForecastLayout()}
            </div>
        )
    }
}

