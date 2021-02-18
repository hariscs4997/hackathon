/*eslint-disable*/
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Typography/Info.js";
import CardHeader from "components/Card/CardHeader.js";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";

import image from "assets/img/bg7.jpg";
import Card from "components/Card/Card";
import { TextField } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage() {

  const classes = useStyles();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };


  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const signinHandler = () => {
    console.log(user)
    axios.post('http://localhost:8222/users/login', user)
      .then(res => {
        console.log(res);
        localStorage.setItem('HACKATHON_USER_TOKEN',res.data.token)
      })
      .catch(err=>{
        console.log(err)
      })
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="World of Hackathon"
        links={<HeaderLinks dropdownHoverColor="info" />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <form className={classes.form}>
                  <CardHeader
                    color="primary"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>Login</h4>
                    <div className={classes.socialLine}>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <GridContainer style={{ margin: 'auto' }}>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.email}
                          onChange={handleChange('email')}
                          id="outlined-required"
                          label="Email"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.password}
                          onChange={handleChange('password')}
                          id="outlined-required"
                          type='password'
                          label="Password"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button onClick={() => signinHandler()} simple color="primary" size="lg">Login</Button>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer
          className={classes.footer}
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/?ref=mkpr-login"
                      target="_blank"
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation?ref=mkpr-login"
                      target="_blank"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="//blog.creative-tim.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license?ref=mkpr-login"
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
                  href="https://www.creative-tim.com?ref=mkpr-login"
                  target="_blank"
                >
                  Creative Tim
                </a>{" "}
                for a better web
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
