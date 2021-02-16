import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import workStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(workStyle);

export default function SearchEngion() {
    const classes = useStyles();
    return (
        <div className={classes.section}>
            <GridContainer justify="center">
                <GridItem cs={12} sm={8} md={8}>
                    <h2 className={classes.title}>Search Hackathon</h2>
                    <form>
                        <GridContainer>
                            <GridItem xs={12} sm={6} md={6}>
                                <CustomInput
                                    labelText="nombre"
                                    id="nombre"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem
                                xs={12}
                                sm={4}
                                md={4}
                                className={classes.mrAuto + " " + classes.mlAuto}
                            >
                                <Button color="primary">Search Hackathon</Button>
                            </GridItem>
                        </GridContainer>
                    </form>
                </GridItem>
            </GridContainer>
        </div>
    );
}
