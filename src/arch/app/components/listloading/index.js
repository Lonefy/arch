import './style.scss';
import React, {Component}      from 'react';
import Input from '../input';
import classNames from 'classnames';

class Listloading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillUnmount() {
        clearInterval(this.state.t);
    }

    render() {
        const props = this.props;
        const {done} = props;
        return (
            <div className={`c-listloading-root`}>
                {
                    done?
                        <div>
                            <div className="loading_text">没有更多了</div>
                        </div>
                        : 
                        <div>
                            <div className="loading_icon"></div>
                            <div className="loading_text">加载中...</div>
                        </div>
                }
            </div>
        );
    }

    getData(type) {
        return {
            
        }[type]
    }


}

export default Listloading;