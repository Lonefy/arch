/*
 * @param{
 * show: bool
 * text: string
 * icon:'info/success/error/loading'
 * autoHideDuration:INT 
 * autoClose: ()=>{}
 * afterClose: ()=>{}
 */
import './style.scss';
import React, {Component}      from 'react';
import classNames from 'classnames';

class Toast extends Component {

    shouldComponentUpdate(nextProps, nextState){

        return this.props.show != nextProps.show || this.props.text != nextProps.text
    }

    componentDidUpdate(){
        let {autoHideDuration = 2000, autoClose, afterClose} = this.props;

        setTimeout(() => {
            autoClose && autoClose();
            afterClose && afterClose();
        }, autoHideDuration);
    }

    renderToast(){
        const props = this.props;
        const {className, icon = 'info', text, bgColor = 'rgba(51,51,51,.8)'} = props;
       
        return (
           
            <div className={`c-toast-root ${className}`} style={this.getData('rootStyle')(bgColor)}>
                <div className="icon">{this.getData('icon')(icon)}</div>
                <div className="text">{text}</div>
            </div>
           
        );
    }

    render() {
       return (
           this.props.show?
                <div className='c-toast-wrapper'>
                    {
                        this.renderToast()
                    }
                </div>
                :null
       )
    }

    getData(type) {
        return {
            'rootStyle': (bgColor) => ({
                background: bgColor
            }),
            'icon': icon => {
                if(!c2p.checkType(icon, 'string')){
                    return icon;
                }
                return {
                    'info': <i className="icon-info-circle"/>,
                    'success': <i className="icon-check-circle"/>,
                    'error': <i className="icon-error-circle"/>,
                    'loading': <i className="icon-loading"/>,
                }[icon]
            }
        }[type]
    }
}

export default Toast;