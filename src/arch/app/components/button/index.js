import './style.scss';
import React, {Component}      from 'react';
import classNames from 'classnames';

class Button extends Component {
    render() {
        const props = this.props;
        const {className, children, disabled, onClick = () => {}} = props;
        return (
            <div onClick={onClick} className={`c-button-root ${disabled ? 'disabled': ''} ${className}`}>
                <div>{children}</div>
            </div>
        );
    }
}

export default Button;