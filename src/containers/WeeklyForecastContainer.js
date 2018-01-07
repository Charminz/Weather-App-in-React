import React from 'react';
import {WeeklyForecastView} from "../components/WeeklyForecastView";

export class WeeklyForecastContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setForecastStateFromJson = this.setForecastStateFromJson.bind(this);
        this.state = {
            message: "",
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            forecast: [],
            units: null,
        };
        this.getData = this.getData.bind(this);
        this.convertFahrenheitToCelcius = this.convertFahrenheitToCelcius.bind(this);
        this.convertCelciusToFahrenheit = this.convertCelciusToFahrenheit.bind(this);
    }

    componentWillMount() {
        this.setState({
            units: this.props.units,
            forecast: []
        });

        let url = '';
        if (this.props.cityName) {
            url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + this.props.cityName + '&appid=' + this.props.apiKey + "&units=" + this.props.units;
        } else if (this.props.lat) {
            url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.props.lat + '&lon=' + this.props.lon + '&appid=' + this.props.apiKey + "&units=" + this.props.units
        }
        this.fetchData(url);
    }

    getData() {
        if (this.state.units != null && this.state.units !== this.props.units) {
            if (this.state.units === 'imperial') {
                this.convertFahrenheitToCelcius();

            } else {
                this.convertCelciusToFahrenheit();
            }

            this.setState({
                units: this.props.units
            });
        }
    }

    fetchData(url) {
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
            if (data.message === "city not found" || data.cod === 401 || data.message === "Nothing to geocode") {
                this.setState({
                    message: "error"
                })
            } else {
                this.setState({
                    json: JSON.stringify(data)
                });
                this.setForecastStateFromJson(data);
            }
        });
    }

    setForecastStateFromJson(data) {
        const date = new Date();
        const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        for (let i = 0; i < data.list.length; i++) {
            let weatherDate = data.list[i].dt_txt.split(" ");
            if (weatherDate[0] !== currentDate && weatherDate[1] === "12:00:00") {
                let dt = new Date(weatherDate[0]);
                let forecastDay = this.state.days[dt.getDay()];
                let unit = (this.props.units === "metric") ? " °C" : " °F";
                let temperature = Math.round(data.list[i].main.temp) + unit;
                let icon = 'wi wi-owm-' + data.list[i].weather[0].id + " mini";

                let newForecast = [forecastDay, temperature, icon];

                this.setState({
                    forecast: [...this.state.forecast, newForecast]
                })
            }
        }
    }

    convertFahrenheitToCelcius() {
        let array = this.state.forecast.slice();

        for (let day = 0; day < array.length; day++) {
            array[day][1] = Math.round(((array[day][1]).split(" ")[0] - 32) * 5 / 9) + " °C";
        }

        this.setState({
            forecast: array
        });
    }

    convertCelciusToFahrenheit() {
        let array = this.state.forecast.slice();

        for (let day = 0; day < array.length; day++) {
            array[day][1] = Math.round((array[day][1]).split(" ")[0] * 1.8 + 32) + " °F";
        }
        this.setState({
            forecast: array
        });
    }

    render() {
        if (this.state.message !== "error") {
            this.getData();
            return <WeeklyForecastView forecast={this.state.forecast}/>
        } else {
            return <p/>
        }
    }
}

