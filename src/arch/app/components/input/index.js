import './style.scss';
import React, {Component}      from 'react';
import classNames from 'classnames';

class Input extends Component {
    constructor(props) {
        super(props);
        const {inputProps = {}} = props;
        this.state = {
            value: inputProps.defaultValue || '',
            editing: false,
            showClearBtn: false
      }
  }

    render() {
        const props = this.props;
        const {icon = false, showIcon = false,} = props;
        return ( 
            <div className={`c-input-root`}>
                <input ref="input" {...this.getData('inputProps')()}/>
                <div className="clear-box">{this.getData('showClearBtn')() ? this.getData('clearBtn')() : ''}</div>
                {this.getData('iconDom')(icon, showIcon)}
            </div>
        );
  }

    getData(type, props = this.props) {
        const {inputProps = {}, showClear = 'editing'} = props;
        const {editing} = this.state;
        return {
            'iconDom': (icon, showIcon) => {
                const iconDom = <div className="icon">{icon}</div>;
                return {
                    'always': iconDom,
                    'editing': editing ? iconDom : '',
                    'editHide': editing ? '' : iconDom,
              }[showIcon]
          },
            'clearBtn': () => {
                return ( 
                    <div onClick={e => this.clear(e => {
                            this.handlers('change')({target: {value: ''}});
                            this.refs.input.focus()
                      })
                  }
                    className = "clear-btn icon-times-circle icon-20" />
                )
          },
            'showClearBtn': () => {
                
                if (showClear == 'always' || showClear === true) {
                    return true;
              }
                if (showClear == 'editing') {
                    return this.state.showClearBtn && this.state.value;
              }
          },
            'inputProps': () => {
                const {value} = this.state;
                return {
                    type: 'text',
                    ...inputProps,
                    value,
                    onInput: this.handlers('change'),
                    onChange: this.handlers('change'),
                    onFocus: this.handlers('focus'),
                    onBlur: this.handlers('blur')
              }
          }
      }[type]
  }

    handlers(type, props = this.props) {
        const {
            filter = data => data,
                filterError = () => {},
                complete = () => {},
                onChange = () => {},
                disabled,
                showClear = 'editing',
                inputProps = {}
      } = props;
        return {
            'change': e => {
                if (disabled) {
                    return
              }
                const sourceValue = e.target? e.target.value: e;
                const filterValue = filter(sourceValue, this.state.value);
                if (filterValue != sourceValue) {
                    filterError(filterValue, sourceValue);
              }
                this.setState({
                    value: filterValue,
                    showClearBtn: !!filterValue
              }, () => {
                    onChange(filterValue);
                    // this.refs.input.value = filterValue;
                    if (inputProps.onChange) {
                        inputProps.onChange(filterValue);
                  }
              })
          },
            'focus': e => {
                if (disabled) {
                    return
              }
                this.setState({
                    editing: true,
                    showClearBtn: true
              });
                if (inputProps.onFocus) {
                    inputProps.onFocus(e);
              }
          },
            'blur': e => {
                this.setState({
                    editing: false
              });
                setTimeout(e => {
                    this.setState({
                        showClearBtn: false
                  });
              }, 0);
                complete(this.state.value);
                if (inputProps.onBlur) {
                    inputProps.onBlur(e);
              }
          },
      }[type]
  }

    //输出方法
    clear(fn = () => {}) {
        this.setState({
            value: '',
            showClearBtn: false
      }, fn)
  }

    getValue() {
        return this.state.value;
  }

    setValue(value) {
    
        this.setState({value}, ()=>{
            this.handlers('change')('' + value)
        })

  }

}

export default Input;