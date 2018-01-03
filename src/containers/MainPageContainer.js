import React from 'react';
import {MainPageView} from "../components/MainPageView";
import {WeatherPageContainer} from "./WeatherPageContainer";
import "../styles/MainPage.css";

export class MainPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: null,
            temporaryCityName: null
        };
        this.handleClickOnSearchButton = this.handleClickOnSearchButton.bind(this);
        this.handleCityInputValueChange = this.handleCityInputValueChange.bind(this);
        this.handleClickOnSearchByCoordsButton = this.handleClickOnSearchByCoordsButton.bind(this);
        this.resetStates = this.resetStates.bind(this);
        this.setCoordinates = this.setCoordinates.bind(this);
    }

    componentWillMount() {
        const savedCity = sessionStorage.getItem("cityName");
        if (savedCity) this.setState({cityName: savedCity});

        const savedLongitude = sessionStorage.getItem("lon");
        if (savedLongitude) this.setState({longitude: savedLongitude});

        const savedLatitude = sessionStorage.getItem("lat");
        if (savedLatitude) this.setState({latitude: savedLatitude});
    }

    handleClickOnSearchButton() {
        if (this.state.temporaryCityName != null && this.state.temporaryCityName !== "") {
            this.setState({
                cityName: this.state.temporaryCityName
            });
            sessionStorage.setItem("cityName", this.state.temporaryCityName);
        } else {
            this.setState({
                cityName: null
            })
        }
    }

    handleCityInputValueChange(event) {
        this.setState({
            temporaryCityName: event.target.value.trim()
        })
    }

    handleClickOnSearchByCoordsButton() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setCoordinates);
        } else {
            console.log("Can not get coordinates!");
        }
    }

    setCoordinates(position) {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        sessionStorage.setItem("lat", position.coords.latitude);
        sessionStorage.setItem("lon", position.coords.longitude);

    }

    resetStates() {
        this.setState({
            cityName: null,
            temporaryCityName: null,
            longitude: null,
            latitude: null
        });
        sessionStorage.removeItem("cityName");
        sessionStorage.removeItem("lon");
        sessionStorage.removeItem("lat");
    }

    render() {
        if (this.state.cityName != null || (this.state.longitude != null && this.state.latitude != null)) {
            return <WeatherPageContainer
                lon={this.state.longitude}
                lat={this.state.latitude}
                backBtn={this.resetStates}
                cityName={this.state.cityName}/>;
        } else {
            return <MainPageView
                onClickCoordinatesButton={this.handleClickOnSearchByCoordsButton}
                onClickSearchButton={this.handleClickOnSearchButton}
                onChange={this.handleCityInputValueChange}/>;
        }
    }
}