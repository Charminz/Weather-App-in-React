import React from 'react';
import {CurrentWeatherView} from "../components/CurrentWeatherView";

export class CurrentWeatherContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            units: null,
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        };
        this.convertFahrenheitToCelcius = this.convertFahrenheitToCelcius.bind(this);
        this.convertCelciusToFahrenheit = this.convertCelciusToFahrenheit.bind(this);
        this.getNewWeatherDataFromAPI = this.getNewWeatherDataFromAPI.bind(this);
        this.setNewTemperaturesOnUnitChange = this.setNewTemperaturesOnUnitChange.bind(this);
    }

    componentWillMount() {
        this.getNewWeatherDataFromAPI();
    }

    componentDidUpdate() {
        if (this.state.units !== this.props.units) {
            this.setNewTemperaturesOnUnitChange();
        }
    }

    getNewWeatherDataFromAPI() {
        let url = '';
        if (this.props.cityName) {
            url = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.props.cityName + '&appid=' + this.props.apiKey + "&units=" + this.props.units;
        } else if (this.props.lat) {
            url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.props.lat + '&lon=' + this.props.lon + '&appid=' + this.props.apiKey + "&units=" + this.props.units
        }
        this.fetchData(url);
    }

    setNewTemperaturesOnUnitChange() {
        if (this.state.units === 'imperial') {
            this.setState({
                currentTemperature: this.convertFahrenheitToCelcius(this.state.currentTemperature.split(" ")[0])
            })
        } else {
            this.setState({
                currentTemperature: this.convertCelciusToFahrenheit(this.state.currentTemperature.split(" ")[0])
            })
        }

        this.setState({
            units: this.props.units
        });
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
                const currentDate = new Date();

                let unit = this.props.units === "metric" ? " °C" : " °F";

                this.setState({
                    json: JSON.stringify(data),
                    cityName: data.name,
                    message: "",
                    units: this.props.units,
                    date: this.state.days[currentDate.getDay()] + ", " + this.state.months[currentDate.getMonth()] + " " + this.addSuffixToDate(currentDate.getDate()) + " " + currentDate.getFullYear(),
                    currentTemperature: Math.round(data.main.temp) + unit,
                    currentWeatherDescription: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
                    icon: 'wi wi-owm-' + data.weather[0].id
                })
            }
        })
    }

    addSuffixToDate(date) {
        let j = date % 10;
        let k = date % 100;

        if (j === 1 && k !== 11) return date + "st";
        if (j === 2 && k !== 12) return date + "nd";
        if (j === 3 && k !== 13) return date + "rd";

        return date + "th";
    }

    render() {
        if (this.state.message === "error") {
            return <CurrentWeatherView onClick={this.props.onClick} message="Invalid city name!"/>;
        } else {
            return <CurrentWeatherView
                onClick={this.props.onClick}
                onClickUnitsButton={this.props.onClickUnitsButton}
                cityName={this.state.cityName}
                date={this.state.date}
                icon={this.state.icon}
                currentWeatherDescription={this.state.currentWeatherDescription}
                currentTemperature={this.state.currentTemperature}
            />
        }
    }

    convertFahrenheitToCelcius(currentTemperature) {
        let temp = Math.round((currentTemperature - 32) * 5 / 9);
        return temp + " °C"
    }

    convertCelciusToFahrenheit(currentTemperature) {
        let temp = Math.round(currentTemperature * 1.8 + 32);
        return temp + " °F"
    }
}

