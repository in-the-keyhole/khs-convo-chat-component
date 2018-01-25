import React from 'react';
import './phonenumbersmodal.css';

export default class PhoneNumbersModal extends React.Component {

    render() {
        if (this.props.isVisible) {
            return (
                <div className="phonenumbersmodal">
                    <h3 className="phonenumbersheader">Phone Numbers</h3>
                    <div className="phonenumberscont">
                        <div style={{ height: '50px' }}>
                            <button type="button" className="addphonenumber" onClick={this.props.closeMe}>+</button>
                        </div>
                        <div style={{ height: '50px' }}>
                            <button type="button" className="addphonenumber" onClick={this.props.closeMe}>+</button>
                        </div>
                        <div style={{ height: '50px' }}>
                            <button type="button" className="addphonenumber" onClick={this.props.closeMe}>+</button>
                        </div>
                        <div style={{ height: '50px' }}>
                            <button type="button" className="addphonenumber" onClick={this.props.closeMe}>+</button>
                        </div>
                        <div style={{ height: '50px' }}>
                            <button type="button" className="addphonenumber" onClick={this.props.closeMe}>+</button>
                        </div>
                        <div style={{ height: '50px' }}>
                            <button type="button" className="addphonenumber" onClick={this.props.closeMe}>+</button>
                        </div>
                        <div style={{ height: '50px' }}>
                            <button type="button" className="addphonenumber" onClick={this.props.closeMe}>+</button>
                        </div>
                        <div style={{ height: '50px' }}>
                            <button type="button" className="addphonenumber" onClick={this.props.closeMe}>+</button>
                        </div>
                        <div style={{ height: '50px' }}>
                            <button type="button" className="addphonenumber" onClick={this.props.closeMe}>+</button>
                        </div>
                        <div style={{ height: '50px' }}>
                            <button type="button" className="addphonenumber" onClick={this.props.closeMe}>+</button>
                        </div>
                        <div style={{ height: '50px' }}>
                            <button type="button" className="addphonenumber" onClick={this.props.closeMe}>+</button>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}
