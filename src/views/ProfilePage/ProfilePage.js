/*eslint-disable*/
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import People from "@material-ui/icons/People";
import Add from "@material-ui/icons/Add";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Button from "components/CustomButtons/Button.js";

import christian from "assets/img/faces/christian.jpg";
import cardProfile2Square from "assets/img/faces/card-profile2-square.jpg";

import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.js";
import axios from "axios";
import { Card, SnackbarContent, TextField } from "@material-ui/core";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

const useStyles = makeStyles(profilePageStyle);

export default function ProfilePage(props) {

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState(23)
  const [user, setUser] = useState({
    id: 0,
    avatar: christian,
    nombre: "",
    apellido1: "",
    apellido2: "",
    dni: "",
    nick: "",
    password: "",
    email: ""
  });

  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, [props]);

  useEffect(() => {
    getUserById()
  }, [props]);

  const getUserById = () => {
    const headers = {
      'Authorization': localStorage.HACKATHON_USER_TOKEN
    }
    axios.get('http://localhost:8222/users-info/'+userId, { headers: headers })
      .then(res => {
        setUser({
          ...res.data,
          password: '',
          avatar: res.data.avatar ? res.data.avatar : christian
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const updateUserHandler = () => {
    setMessage('')
    const headers = {
      'Authorization': localStorage.HACKATHON_USER_TOKEN
    }
    let userData = { ...user, userId: user.id }
    axios.post(`http://localhost:8222/users/${userId}/update`, userData, { headers: headers })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        setMessage(err.response.data.err)
      })
  }

  const updateImage = (avatar) => {
    let formData = new FormData()
    formData.append('avatar', avatar)
    axios.put(`http://localhost:8222/users/${userId}/avatar/update`, formData)
      .then(res => {
        // setUser({...user,avatar:'http://localhost:8222/'+res.data.file})
        console.log({avatar:res.data.file});
      })
      .catch(err => {
        console.log(err)
      })
  }

  // const getUserAvatar = () => {
  //   axios.post('http://localhost:8222/users/23/avatar')
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  const uploadPhoto = () => {
    document.getElementById('imagePicker').click()
  }

  return (
    <div>
      <Header
        color="transparent"
        brand="World of Hackathon"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "info"
        }}
        props
      />
      <Parallax
        image={require("assets/img/examples/city.jpg")}
        filter="dark"
        className={classes.parallax}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.profile}>
                <div>
                  <img src={user.avatar} alt="..." className={imageClasses} />
                  <Camera style={{ cursor: 'pointer', margin: '0 0 -3px -55px', fontSize: 50, zIndex: 5, position: 'relative', color: '#00acc1' }} onClick={() => uploadPhoto()} />
                </div>
                <div className={classes.name}>
                  {
                    user.nombre &&
                    <h3 className={classes.title}>{user.nombre}</h3>
                  }
                </div>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <form className={classes.form}>
                  <CardBody>
                    <GridContainer style={{ margin: 'auto' }}>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.nombre}
                          onChange={handleChange('nombre')}
                          id="outlined-required"
                          label="Nombre"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.apellido1}
                          onChange={handleChange('apellido1')}
                          id="outlined-required"
                          label="Apellido1"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.apellido2}
                          onChange={handleChange('apellido2')}
                          id="outlined-required"
                          label="Apellido2"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.nick}
                          onChange={handleChange('nick')}
                          id="outlined-required"
                          label="Nick"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.dni}
                          onChange={handleChange('dni')}
                          id="outlined-required"
                          label="DNI"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
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
                    {
                      message &&
                      <SnackbarContent
                        message={
                          <span>{message}</span>
                        }
                        close='true'
                        color="danger"
                        icon="info_outline"
                      />
                    }
                    <Button onClick={() => updateUserHandler()} simple color="primary" size="lg">Update</Button>
                  </div>
                </form>
              </Card>
            </GridItem>
            <input id='imagePicker' type='file' onChange={(e) => updateImage(e.target.files[0])} style={{ display: 'none' }} />
          </GridContainer>
          <Clearfix />
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/?ref=mkpr-profile"
                    target="_blank"
                    className={classes.block}
                  >
                    Creative Tim
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/presentation?ref=mkpr-profile"
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
                    href="https://www.creative-tim.com/license?ref=mkpr-profile"
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
                href="https://www.creative-tim.com?ref=mkpr-profile"
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
