import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./Header";
import Body from "./Body";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.blogs = []
        this.state.companies = []
        this.state.selectedCompanies = []
    }

    componentDidMount() {
        fetch("/api/v1/companies")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({companies: data});
            })
            .catch(console.log)

        console.log(this.state.companies)
        fetch("/api/v1/blogs")
            .then(res => res.json())
            .then(data => {
                this.setState({blogs: data});
            })
            .catch(console.log)
    }

    updateBlogs = (blogs) => {
        this.setState({blogs});
    }

    updateSelectedCompanies = (selectedCompanies) => {
        this.setState({selectedCompanies});
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Header/>
                <Body
                    blogs={this.state.blogs}
                    companies={this.state.companies}
                    selectedCompanies={this.state.selectedCompanies}
                    updateBlogs={this.updateBlogs}
                    updateSelectedCompanies={this.updateSelectedCompanies}
                />
            </React.Fragment>
        );
    }
}
