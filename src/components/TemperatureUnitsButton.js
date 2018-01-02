import React from 'react';

export class TemperatureUnitsButton extends React.Component {
    render() {
        return (
            <div>
                <label className="switch">
                    <input type="checkbox" onClick={this.props.onClick}/>
                    <span className="slider round"/>
                    <span className="slider-content"/>
                </label>
            </div>
        )
    }
}