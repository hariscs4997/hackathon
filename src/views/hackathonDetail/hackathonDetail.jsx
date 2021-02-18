/*eslint-disable*/ import React, { useState } from "react";
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
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Info from "components/Typography/Info.js";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.js";
import cardsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.js";

import { cardTitle } from "assets/jss/material-kit-pro-react.js";
import { Button, Icon } from "@material-ui/core";


const useStyles = makeStyles(landingPageStyle);

export default function HackathonDetail({ ...rest }) {
	const { id } = useParams()
	const [hackathon, setHackathon] = useState()
	const [tecnologias, setTecnologias] = useState([])


	React.useEffect(() => {
		getTechnologyList()
		if (id) {
			axios.get('http://localhost:8222/hackatones/' + id)
				.then(res => {
					setHackathon(res.data)
				})
		}
	}, [id]);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
	});


	const getTechnologyList = () => {
		axios.get('http://localhost:8222/tecnologias')
			.then(data => {
				setTecnologias(data.data)
			})
	}


	const getTechnology = (id) => {
		if (id != null) {
			return tecnologias.find(t=>t.id==id).nombre
		} else {
			return 'Technology'
		}
	}

	const classes = useStyles();
	return (
		<div>
			<Header
				color="transparent"
				brand="World of Hackathon"
				links={<HeaderLinks dropdownHoverColor="info" />}
				fixed
				changeColorOnScroll={{
					height: 300,
					color: "info"
				}}
				{...rest}
			/>
			<Parallax image={require("assets/img/bg8.jpg")} filter="dark">
			</Parallax>
			<div className={classNames(classes.main, classes.mainRaised)}>
				<div className={classes.container}>
					<Card blog>
						<CardHeader image>
							<a href="javascript:void()">
								<img
									className={classes.imgCard}
									src="https://images.unsplash.com/photo-1511439817358-bee8e21790b5?auto=format&fit=crop&w=750&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
									alt=""
								/>
								{
									hackathon &&
									<div className={classes.imgCardOverlay}>
										<h4
											className={classes.cardTitle}
											style={{
												color: "white",
												position: "absolute",
												bottom: "10px",
												left: "15px"
											}}
										>{hackathon.nombre}</h4>
									</div>
								}
							</a>
						</CardHeader>
						{
							hackathon &&
							<CardBody>

								<Info>
									<h6 className={classes.cardCategory}>{getTechnology(hackathon.id_tech)}</h6>
								</Info>
								<p>{hackathon.contenido}</p>
								<Button color="info" round><Icon>add</Icon> Register</Button>
							</CardBody>
						}
					</Card>
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
