import React, {PropTypes}        from 'react';
import uicomponent from '../containers/uicomponent';

@uicomponent
class App extends React.Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content" style={{minHeight: '100%'}}>
                {React.cloneElement(this.props.children, {...this.props, router: this.context.router})}
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node,
    history: React.PropTypes.object,
    location: React.PropTypes.object
};

export default App;
