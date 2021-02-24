import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from "./Footer";
import Header from "./Header";
import Body from "./Body";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.blogs = []
    }

    updateBlogs = (blogs) => {
        this.setState({blogs});
    }
    componentDidMount() {
        fetch("/api/v1/blogs")
            .then(res => res.json())
            .then(data => {
                this.setState({blogs: data});
            })
            .catch(console.log)
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Header/>
                <Body blogs={this.state.blogs} updateBlogs={this.updateBlogs}/>
                <Footer/>
            </React.Fragment>
        );
    }
}
