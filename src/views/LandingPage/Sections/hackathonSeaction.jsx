import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import productStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";
import Hackathon from "components/hackathon/hackathon";

const useStyles = makeStyles(productStyle);


export default function HackathonSeaction(props) {
  const classes = useStyles();

  const [hackathonList, setHackathonList] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8222/hackatones`)
      .then(res => res.json(res))
      .then(data => {
        if(Object.keys(props).length){
          setHackathonList(data)
        }else{
          setHackathonList(data.slice(0,6))
        }
      })
  }, [props])

  return (
    <div className={classes.section}>
      <GridContainer>
        {hackathonList &&
          hackathonList.map(hackathon => (

            <GridItem key={hackathon.id} xs={12} sm={4} md={4}>
              <Hackathon data={hackathon} />
            </GridItem>
          ))
        }
      </GridContainer>
    </div>
  );
}
