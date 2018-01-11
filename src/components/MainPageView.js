import React from 'react';

export class MainPageView extends React.Component {
    render() {
        return (
            <div className="main-container">
                <div className="search-bar">
                    <form onSubmit={this.props.handleSearchFormSubmit}>
                        <input onChange={this.props.onChange} type="text" className="search" placeholder="City"
                               minLength="1" maxLength="30"/>
                        <button type="submit" className="search-icon"><i
                            className="material-icons">search</i></button>
                    </form>
                </div>
                <div className="current-position-box">
                    <p className="or-word">or</p>
                    <button className="current-pos-btn" onClick={this.props.onClickCoordinatesButton}> Use current
                        position
                    </button>
                </div>
            </div>
        )
    }
}
