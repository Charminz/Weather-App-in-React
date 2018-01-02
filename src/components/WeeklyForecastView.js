import React from 'react';
import "../styles/WeeklyForecast.css";

export class WeeklyForecastView extends React.Component {
    constructor(props) {
        super(props);
        this.setForecastLayout = this.setForecastLayout.bind(this);
    }

    setForecastLayout() {
        let array = this.props.forecast.map(function (day) {
            return (
                <div key={day[0]}>
                    <p>{day[0]}</p>
                    <i className={day[2]} />
                    <p>{day[1]}</p>
                </div>
            )
        });
        return array;
    }

    render() {
        return (
            <div className="forecast-container">
                {this.setForecastLayout()}
            </div>
        )
    }
}

