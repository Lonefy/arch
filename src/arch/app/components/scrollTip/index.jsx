import './index.scss'
import React, { Component } from 'react';
import fetchApi from '../../utils/fetch';
import { Link } from 'react-router';

class scrollTip extends Component {
    constructor(props) {
        super(props);

        this.player = null
        this.state = {
            text: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦二'
        };
    }

    componentDidMount() {
        this.init()
    }

    init() {
        let textWidth = this.refs.text.clientWidth
        console.log(textWidth)
    }   



    render() {

        const {router, className} = this.props;
        return (
            <div className={`scrolltip-root swiper-container`} ref="tipRoot">
                <div className="text-wrapper swiper-wrapper" ref="text">
                    {this.state.text}
                </div>
                <div className="close-wrapper">&times;</div>
            </div>
        )
    }




}

export default scrollTip;

