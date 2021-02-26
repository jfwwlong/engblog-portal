import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BlogCard from "./BlogCard";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Filters from "./Filters";
import {Divider} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 0),
    },
    filterContainer: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingBottom: theme.spacing(4),
    },
    seeMoreGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    }
}));

export default function Body(props) {
    const companyNames = props.companies.map((company) => company.company);

    function loadNextPage(e) {
        e.preventDefault();
        const lastId = props.blogs[props.blogs.length - 1].id;
        fetch(`/api/v1/blogs?startId=${lastId}&companies=${props.selectedCompanies.join()}`)
            .then(res => res.json())
            .then(data => {
                const newBlogs = [...props.blogs];
                newBlogs.push(...data);
                props.updateBlogs(newBlogs);
            })
    }

    const classes = useStyles();

    return (
        <main>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Tech Blog Portal
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        All the engineering blog posts from different tech companies
                    </Typography>

                </Container>

            </div>
            <Container className={classes.cardGrid} maxWidth="lg">
                <Filters companyNames={companyNames} className={classes.heroContent}
                         updateBlogs={props.updateBlogs}
                         selectedCompanies={props.selectedCompanies}
                         updateSelectedCompanies={props.updateSelectedCompanies}/>
            </Container>
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={4}>
                    {props.blogs.map((blog, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <BlogCard blog={blog}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Grid container className={classes.seeMoreGrid} spacing={2} justify="center">
                <Grid item>
                    <Button variant="outlined" color="primary" onClick={loadNextPage}>
                        See More
                    </Button>
                </Grid>
            </Grid>
        </main>
    );
}
