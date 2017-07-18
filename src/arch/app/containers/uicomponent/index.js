import React, {Component} from 'react';
import Dialog from '../../components/dialog';
import Toast from '../../components/toast';
import vars from './style.scss';

const Container = (SourceComponent) => class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert:{
                text: '',
            },
            toast:{
                show: false
            }
        }
    }


    render() {
        const props = this.props;
        const state = this.state;
        let newProps = {
            alert: this.handlers('alert').bind(this),
            alertClose: this.handlers('alertClose').bind(this),
            toast: this.handlers('toast').bind(this)
        };
        return (
            <div className="container-uicomponent-root" >
                <SourceComponent {...Object.assign({}, props, newProps)}/>
                <Dialog ref={c => this.alert = c} btns={[
                    {
                        text: '知道了',
                        isClose: true,
                    }
                ]}>
                    <div className="info">
                        {this.state.alert.text}
                    </div>
                </Dialog>
                <Toast {...this.state.toast}
                    autoClose={()=>{
                        this.setState({
                            toast: {
                                show: false
                            }
                        })
                    }}/>
            </div>
        )
    }

    handlers(type) {
        return {
            'alert': (text) => {
                this.setState({
                    alert:{
                        text: text
                    }
                });
                this.alert.open();
            },
            'alertClose': ()=>{
                this.alert.close();
            },
            'toast': (opt) => {
                this.setState({
                    toast:{
                        show: true,
                        ...opt
                    }
                })
            }
        }[type]
    }
};

export default Container;
