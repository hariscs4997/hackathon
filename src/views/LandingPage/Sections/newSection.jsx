import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import productStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";
import NewsLetter from "components/newsLetter/newsLetter";

const useStyles = makeStyles(productStyle);


export default function NewsSeaction(props) {
    const classes = useStyles();

    const [newsList, setNewsList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8222/noticias`)
            .then(res => res.json(res))
            .then(data => {
                setNewsList(data.slice(0, 6))
            })
    }, [props])

    return (
        <div className={classes.section}>
            <GridContainer>
                {newsList &&
                    newsList.map(news => (

                        <GridItem key={news.id} xs={12} sm={4} md={4}>
                            <NewsLetter data={news} />
                        </GridItem>
                    ))
                }
            </GridContainer>
        </div>
    );
}
