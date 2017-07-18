import './style.scss';
import React, {Component}      from 'react';
import classNames from 'classnames';

class Loading extends Component {

    static defaultProps = {
        time: 6000,
        offset: 16,
        auto: true,
        onEnd: () => {
        },
        onStart: () => {
        }
    };

    state = {
        deg: 0,
        t: null,
        time: 0,
        countDown: 0,
    };

    componentDidMount() {
        const {auto} = this.props;
        auto && this.start();
    }

    componentWillUnmount() {
        clearInterval(this.state.t);
    }

    render() {
        const {showText} = this.props;
        const {time, countDown} = this.state;
        return (
            <div className={`c-loading-root`}>
                <canvas ref="canvas" width={100} height={100}/>
                <div>
                    <div>{this.getData('text')(showText)}</div>
                </div>
            </div>
        );
    }

    getData(type) {
        return {
            'text': showText => ({
                'time': this.state.time,
                'countDown': this.state.countDown,
                [undefined]: ''
            }[showText])
        }[type]
    }

    start(time = this.props.time) {
        const {onStart, onEnd, offset} = this.props;
        const step = 360 / time * offset;
        onStart();
        this.setState({
            deg: 0,
            t: setInterval(() => {
                const deg = this.state.deg;
                const countDown = Math.ceil((time - (deg + step) / 360 * time) / 1000);
                const _time = Math.floor((deg + step) / 360 * time / 1000);
                if (deg >= 360) {
                    clearInterval(this.state.t);
                    onEnd();
                    return
                }
                this.initCanvas(deg);
                this.setState({
                    deg: deg + step,
                    countDown,
                    time: _time,
                })
            }, offset)
        })
    }

    initCanvas(rotate = 0) {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const PI = Math.PI;
        const deg = rotate / 360 * 2 * PI - 1 / 2 * PI;
        const lineWidth = 12;
        const ra = 50 - lineWidth / 2;

        ctx.clearRect(0, 0, 100, 100);
        ctx.beginPath();
        ctx.arc(50, 50, ra, 0, 2 * PI);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = '#d8d8d8';
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(50, 50, ra, -1 / 2 * PI, deg);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = '#fbb285';
        ctx.stroke();
        ctx.closePath();
    }
}

export default Loading;