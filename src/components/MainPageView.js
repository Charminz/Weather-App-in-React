import React from 'react';

export class MainPageView extends React.Component {

    render() {
        return (
            <div className="main-container">
                <div className="search-bar">
                    <input onChange={this.props.onChange} type="search" className="search" placeholder="City" minLength="1" maxLength="30"/>
                    <button className="search-icon" onClick={this.props.onClickSearchButton}><i className="material-icons">search</i></button>
                </div>

                <div className="current-position-box">
                    <p>or</p>
                    <button className="current-pos-btn" onClick={this.props.onClickCoordinatesButton}> Use current position </button>
                </div>
            </div>
        )
    }
}
