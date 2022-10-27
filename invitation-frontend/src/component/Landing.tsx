import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import { Link } from "react-router-dom";

// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import MenuIcon from '@mui/icons-material/Menu';

const Landing = () => {
	
	return (
		<Container id="Landing" maxWidth={false} disableGutters={true}>
			<AppBar id="header">
				<Container className="landing-inr">
					<Grid container className="header-content">
						<Grid className="header-left">
							<Typography className="logo" variant="h1" component="h2"  sx={{fontSize: 30}} mr={5}>
								<Box sx={{ fontWeight: 700 }}>Invite</Box>
								You
							</Typography>
							<List className="gnb-left" >
								<ListItem>
									<Link href="#" underline="hover">ABOUT US</Link>
								</ListItem>
								<ListItem>
									<Link href="#" underline="hover">TEMPLATE</Link>
								</ListItem>
								<ListItem>
									<Link href="#" underline="hover">CONTACT US</Link>
								</ListItem>
								<ListItem>
									<Button variant="contained" href="builder" className="btn-primary">get start</Button>
								</ListItem>
								{/* <Link to="/faq"> FAQ </Link> */}
							</List>
						</Grid>
						<Grid className="header-right">
							<List className="gnb-right">
								<ListItem>
									<Button variant="contained" href="#text-buttons" className="btn-primary">Log in</Button>
								</ListItem>
								<ListItem>
									<Button variant="contained" href="#text-buttons" className="btn-secondary">Sign up</Button>
								</ListItem>
								<ListItem>
									<Link>
										{/* <SearchOutlinedIcon /> */}
									</Link>
								</ListItem>
								<ListItem>
									<Link>
										{/* <MenuIcon /> */}
									</Link>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</Container>
			</AppBar>
			<Container id="visual" maxWidth={false} >
				<Swiper
				wrapperTag="ul"
				spaceBetween={50}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
				modules={[Navigation]}
				navigation
				>
					<SwiperSlide tag="li">Slide 1</SwiperSlide>
					<SwiperSlide tag="li">Slide 2</SwiperSlide>
					<SwiperSlide tag="li">Slide 3</SwiperSlide>
					<SwiperSlide tag="li">Slide 4</SwiperSlide>
				</Swiper>
			</Container>
			<Container style={{height: 1000, backgroundColor: '#eee'}} maxWidth={false}>
				sdf
			</Container>
		</Container>
	)
}

export default Landing;
