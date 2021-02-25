import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
}));

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    getContentAnchorEl: null
};

export default function Filters(props) {
    const classes = useStyles();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        setPersonName(event.target.value);
        fetch(`/api/v1/blogs?companies=${event.target.value.join()}`)
            .then(res => res.json())
            .then(data => {
                props.updateBlogs(data);
            })
            .catch(console.log)
        props.updateSelectedCompanies(event.target.value);
    };

    return (
        <Grid
            container
            direction="row"
            justify="center">
            <FormControl className={classes.formControl}>
                <InputLabel id="main-filters">Company</InputLabel>
                <Select
                    labelId="filter-checkbox-label"
                    id="filter-mutiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<Input/>}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {props.companyNames.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1}/>
                            <ListItemText primary={name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
}
