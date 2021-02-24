import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import {CardActionArea} from "@material-ui/core";
import Link from "@material-ui/core/Link";

var dateFormat = require("dateformat");

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }
}));

export default function BlogCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={() => window.open(props.blog.url, "_blank")}>
                <CardMedia
                    className={classes.cardMedia}
                    image={props.blog.cover}
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                        {props.blog.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" src={props.blog.companyIcon} />
                }
                title={props.blog.company}
                subheader={dateFormat(props.blog.pubDate, "mmm d, yyyy")}
            />
        </Card>
    );
}
