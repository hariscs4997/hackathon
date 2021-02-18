import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import productStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";
import Hackathon from "components/hackathon/hackathon";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(productStyle);

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export default function HackathonSeaction(props) {

  const classes = useStyles();
  const searchQuery = useLocation().search
  const [hackathonList, setHackathonList] = useState([])
  const query = useQuery()

  React.useEffect(() => {
    getHackathons()
  }, [props]);

  const getHackathons=() => {
    fetch(`http://localhost:8222/hackatones`)
      .then(res => res.json(res))
      .then(async data => {
        if (props.filter) {
          const nombre1 = query.get("nombre").toString().toLowerCase()
          const presencial1 = query.get("presencial")
          const tecnologias1 = query.get("tecnologias")

          let list = await data.filter(h =>
            h.nombre.toLowerCase().includes(nombre1) &&
            h.presencial == presencial1 &&
            h.id_tech == tecnologias1
          )
          setHackathonList(list)
        } else {
          setHackathonList(data.slice(0, 6))
        }
      })
  }

  return (
    <div className={classes.section}>
      {
        props.title !== '' &&
        <h2 className={classes.title}>{props.title}</h2>
      }
      <GridContainer>
        {hackathonList &&
          hackathonList.map(hackathon => (

            <GridItem key={hackathon.id} xs={12} sm={4} md={4}>
              <Hackathon data={hackathon} />
            </GridItem>
          ))
        }
      </GridContainer>
      {
        hackathonList.length === 0 &&
        <h4 className={classes.title}>No Hackathon Found</h4>
      }
    </div>
  );
}
