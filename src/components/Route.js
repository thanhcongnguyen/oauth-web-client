import React from 'react';
import { withRouter } from 'react-router-dom';
class Route extends React.Component{
    constructor(props){
        super(props);
        
    }

    componentDidMount = () => {
        let token = localStorage.getItem('token');
        if(!token){
            props.history.push('/login');
        }
    }

    render(){
        const Layout = this.props.layout;
        const Component = this.props.component;
        if(Layout){
            return(
                <Layout>
                    <Component {...this.props}/>
                </Layout>
            )
        }
        return <Component {...this.props}/>
    }
}

export default withRouter(Route);