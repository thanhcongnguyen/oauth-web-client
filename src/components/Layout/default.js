import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './layout.css';
export class Default extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="main">
                <Header/>
                    {
                        this.props.children
                    }
                <Footer />
            </div>
        )
    }
}