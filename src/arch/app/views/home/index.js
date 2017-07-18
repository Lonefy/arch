import './index.style.scss';
import React, {Component} from 'react';
import fetchApi from '../../utils/fetch';
// import weiboJSBridgeReady from '../../utils/weiboJSBridgeReady';
import {Link} from 'react-router';

class Home extends Component {
    state = {
    };

    componentDidMount() {


            
        this.handlers('fetchData')('index')();
    }

    render() {
        const {router} = this.props;
        const {showAmount} = this.state;
        return (
            <div className="home-root">
       
            </div>
        )
    }





    handlers(type) {
        return {
            'fetchData': (api) => {
                return {
                    'index': (params) => {
                        fetchApi('/aj/index/index', {}, this.handlers('setData'))
                    },
                    'eyeStatus':(params) => {
                        fetchApi('aj/other/userStatus', params)
                    }
                }[api]
            }
        }[type]
    }
}

export default (Home);

