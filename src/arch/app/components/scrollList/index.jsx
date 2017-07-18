import './index.scss'
import React, { Component } from 'react';
import fetchApi from '../../utils/fetch';
import { Link } from 'react-router';
import Listloading from '../listloading';

class scrollList extends Component {
    constructor(props) {
        super(props);

        this.ajLock = false;
        this.touchStart = null;
        this.rootScrollTop = 0;
        this.dragDown = false;
        this.dragDownLock = false;
        this.toptipHeight = null;

        this.state = {
            page:1,
            listData:[],
            done: false
        };
    }

    componentDidMount() {

        if(this.isFetchMode()){
            this.fetchData({
                page: this.state.page
            }, res=>{
                this.setState({
                    done: res.data.list < 10,
                    page: 2,
                    listData: res.data.list
                })
            })
        }

        if(this.getListData().length > 0){
            this.toptipHeight = this.refs.toptip.clientHeight;
        }
        
        window.addEventListener('webkitTransitionEnd', this.transitionEnd);

    }

    renderStatus() {
        // const {listData, done} = this.props;
        const listData = this.getListData(),
              done = this.getListDone()
     
        return (
            listData.length == 0 && done ?
                <div className="empty">
                    <div className="empty_icon"></div>
                    <div className="empty_text">暂无交易数据</div>
                </div>
                :
                <Listloading done={done} />
        )
    }

    render() {

        const {router, className} = this.props;
        const listData = this.getListData()

        console.log(listData)
        return (
            <div className={`scrolllist-root`} ref="listRoot">
                {
                    listData.length > 0 ?
                        <div>
                            <div className="topTip top" ref="toptip">下拉</div>
                            <div className="topTip">松开刷新</div>
                        </div>
                        : null
                }

                <div className={`scrolllist-wrapper ${className}`} ref="listWrapper"
                    onTouchStart={e => this.onTouchStart(e)}
                    onTouchMove={e => this.onTouchMove(e)}
                    onTouchEnd={e => this.onTouchEnd(e)}
                    >
                    {
                        listData.map((item, i) => this.props.ListItemTemplate(item, i))
                    }
                    {
                        this.renderStatus()
                    }
                </div>

            </div>

        )
    }

    isFetchMode(){
        return !!this.props.fetchUrl
    }

    getListData(){
        let {model=d=>d} = this.props
        return model(this.isFetchMode()? this.state.listData: this.props.listData)
    }

    getListDone(){
        return this.isFetchMode()? this.state.done: this.props.done
    }

    fetchData(params, cb=()=>{}) {
        fetchApi('/aj/list/biz', params, cb, res => {
            this.ajLock = false;
            
            this.props.toast({
                icon: 'info',
                text: `${res.msg}`
            })
        })
    }

    transitionEnd = () => {
        this.refs.listWrapper.style.transition = ""
        this.refs.toptip.classList.remove('hide')
    }

    isDataEmpty(){
        return this.props.listData.length == 0
    }

    onTouchStart(e) {
        if( this.isDataEmpty()) return;
        this.touchStart = e.touches[0].pageY
        this.rootScrollTop = this.refs.listRoot.scrollTop

    }

    onTouchEnd(e) {
        if( this.isDataEmpty()) return;
        
        let listWrapper = this.refs.listWrapper
        if (this.dragDown) {
            
            listWrapper.style.transition = "all 0.2s ease-in"
            listWrapper.style.WebkitTransform = 'translate3d(0, 0, 0)'
            this.dragDownLock = false
            this.dragDown = false
        }
    }

    onTouchMove(e) {
        if( this.isDataEmpty()) return;
        
        let listRoot = this.refs.listRoot,
            listWrapper = this.refs.listWrapper,
            currentY = e.touches[0].pageY


        if (this.rootScrollTop == 0 && currentY - this.touchStart > 0) {

            e.preventDefault()
            this.dragDown = true;
            
            let wrapperTop = Math.sqrt(currentY - this.touchStart) * 4
            listWrapper.style.WebkitTransform = 'translate3d(0,' + wrapperTop + 'px' + ', 0)';
            
            if (wrapperTop > this.toptipHeight && !this.dragDownLock) {
                this.dragDownLock = true
                this.refs.toptip.classList.add('hide')
                this.handelDragDown()
            }

        } else {
            let winY = listRoot.scrollTop,
                winH = listRoot.clientHeight,
                docH = listWrapper.clientHeight;
        
            if (winY + winH + 500 >= docH) {
                this.handelScrollPage()
            }
        }
    }

    handelDragDown(){
        let {dragDown=()=>{}} = this.props

        if(this.isFetchMode()){
            if(this.ajLock) return;

            this.fetchData({
                page: 1
            }, res=>{
                this.ajLock = false;
                
                this.setState({
                    done: false,
                    page: 2,
                    listData: res.data.list
                })
            })
        }else{
            dragDown();
        }
    }

    handelScrollPage(){
        let {scrollPage=()=>{}} = this.props

        if(this.isFetchMode()){
            let {page, done} = this.state

            if(done) return;
            if(this.ajLock) return;
            
            this.ajLock = true;
            this.fetchData({
                page: page
            }, res=>{
                this.ajLock = false;
                let list = this.state.listData.concat(res.data.list)
                this.setState({
                    done: res.data.list < 10,
                    page: page + 1,
                    listData: list
                })
            })
        }else{
            scrollPage();
        }
    }
}

export default scrollList;

