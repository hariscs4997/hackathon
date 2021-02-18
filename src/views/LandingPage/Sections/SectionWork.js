import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import workStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/workStyle.js";
import { TextField } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(workStyle);

export default function SectionWork() {
  const classes = useStyles();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendMessage=()=>{
    let payload = {
      name,
      email,
      message
    }
    console.log(payload)
    axios.post('http://localhost:8222/email',payload).then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.warn(err)
    })
  }

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={8} md={8}>
          <h2 className={classes.title}>Contact us</h2>
          <h4 className={classes.description}>
            Fill this form to reach us
          </h4>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                {/* <CustomInput
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                /> */}
                <TextField fullWidth label="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField fullWidth label="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {/* <CustomInput
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                /> */}
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  fullWidth
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  label="Your Message"
                  multiline
                  rows={5}
                />

              </GridItem>
              {/* <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5
                }}
              /> */}
              <GridItem
                xs={12}
                sm={4}
                md={4}
                className={classes.mrAuto + " " + classes.mlAuto}
              >
                <Button onClick={()=>sendMessage()} color="primary">Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
