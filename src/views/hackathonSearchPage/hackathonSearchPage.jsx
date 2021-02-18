/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";
import HackathonSeaction from "views/LandingPage/Sections/hackathonSeaction";

// Sections for this page
const useStyles = makeStyles(landingPageStyle);

export default function HackathonSearchPage({ ...rest }) {


    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const classes = useStyles();
    return (
        <div>
            <Header
                color="transparent"
                brand="Material Kit PRO React"
                links={<HeaderLinks dropdownHoverColor="info" />}
                fixed
                changeColorOnScroll={{
                    height: 300,
                    color: "info"
                }}
                {...rest}
            />
            <Parallax image={require("assets/img/bg8.jpg")} filter="dark">
                <div className={classes.container}>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <HackathonSeaction data='all' title='Hackathon Results' />
                </div>
            </div>
            <Footer
                content={
                    <div>
                        <div className={classes.left}>
                            <List className={classes.list}>
                                <ListItem className={classes.inlineBlock}>
                                    <a
                                        href="https://www.creative-tim.com/?ref=mkpr-landing"
                                        target="_blank"
                                        className={classes.block}
                                    >
                                        Creative Tim
                  </a>
                                </ListItem>
                                <ListItem className={classes.inlineBlock}>
                                    <a
                                        href="https://www.creative-tim.com/presentation?ref=mkpr-landing"
                                        target="_blank"
                                        className={classes.block}
                                    >
                                        About us
                  </a>
                                </ListItem>
                                <ListItem className={classes.inlineBlock}>
                                    <a href="//blog.creative-tim.com/" className={classes.block}>
                                        Blog
                  </a>
                                </ListItem>
                                <ListItem className={classes.inlineBlock}>
                                    <a
                                        href="https://www.creative-tim.com/license?ref=mkpr-landing"
                                        target="_blank"
                                        className={classes.block}
                                    >
                                        Licenses
                  </a>
                                </ListItem>
                            </List>
                        </div>
                        <div className={classes.right}>
                            &copy; {1900 + new Date().getYear()} , made with{" "}
                            <Favorite className={classes.icon} /> by{" "}
                            <a
                                href="https://www.creative-tim.com/?ref=mkpr-landing"
                                target="_blank"
                            >
                                Creative Tim
              </a>{" "}
              for a better web.
            </div>
                    </div>
                }
            />
        </div>
    );
}
