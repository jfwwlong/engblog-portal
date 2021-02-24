import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BlogCard from "./BlogCard";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grade} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
    },
    seeMoreGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    }
}));

export default function Body(props) {

    function loadNextPage(e) {
        e.preventDefault();
        const lastId = props.blogs[props.blogs.length - 1].id;
        fetch(`/api/v1/blogs?startId=${lastId}`)
            .then(res => res.json())
            .then(data => {
                const newBlogs = [...props.blogs];
                newBlogs.push(...data);
                props.updateBlogs(newBlogs);
            })
            .catch(console.log)
    }

    const classes = useStyles();

    return (
        <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Tech Blog Portal
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        All the blog posts from different tech companies
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    Main call to action
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary">
                                    Secondary action
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="lg">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {props.blogs.map(blog => (
                        <Grid item key={blog.title} xs={12} sm={6} md={4}>
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