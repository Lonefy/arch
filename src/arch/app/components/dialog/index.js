import './style.scss';
import React, {Component}      from 'react';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen
        }
    }

    render() {
        const props = this.props;
        const {className, children, btns = []} = props;
        const {isOpen} = this.state;
        return (
            <div className={`c-dialog-root ${className}`} style={this.getData('rootStyle')(isOpen)}>
                <div className="body">
                    <div className='msg'>
                        {children}
                    </div>
                    <div className="btns">
                        {btns.map((btn, i) => (
                            <div key={i} className={btn.className} onClick={e => this.handlers('click')(btn)}>
                                <div>{btn.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    getData(type) {
        return {
            'rootStyle': (isOpen) => ({
                top: isOpen ? 0 : '-100%'
            })
        }[type]
    }

    handlers(type) {
        return {
            'click': btn => {
                const {
                    onClick = () => {},
                    isClose = false,
                } = btn;
                onClick(btn);
                if (isClose) {
                    this.close();
                }
            }
        }[type]
    }

    open() {
        this.setState({
            isOpen: true
        })
    }

    close() {
        this.setState({
            isOpen: false
        })
    }
}

export default Dialog;