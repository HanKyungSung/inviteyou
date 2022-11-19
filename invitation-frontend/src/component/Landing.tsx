import {
  Header,
  Grid,
  Title,
  Text,
  Container,
  createStyles,
  Button,
  Group,
  Box,
  Anchor,
  Stack,
  Image,
  BackgroundImage,
  MantineProvider
} from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  IconSearch,
  IconMenu2,
  IconArrowLeft,
  IconArrowRight
} from '@tabler/icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import { Swiper as SwiperType, Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const STYLE_BG_Color = '#F6E5E5';
const useStyles = createStyles((theme, _params, getRef) => ({
  header: {
    paddingTop: 25,
    paddingBottom: 25,
    border: 'none',
    position: 'fixed',
    width: '100%',
    left: 0,
    top: 0,
    backgroundColor: 'transparent'
  },
  headerLeft: {
    display: 'flex',
    flexWrap: 'nowrap'
  },
  headerRight: {
    display: 'flex',
    flexWrap: 'nowrap'
  },
  logo: {
    margin: 0,
    fontSize: 30,
    fontWeight: 400,
    color: '#222'
  },
  gnbLists: {
    display: 'flex',
    alignItem: 'center',
    fontSize: 16,
    whiteSpace: 'nowrap',
    gap: 10,
    marginLeft: 30
  },
  gnbList: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 400
  },
  visual: {
    position: 'relative',
    paddingTop: 90,
    backgroundColor: STYLE_BG_Color,
    overflowX: 'hidden',
    overflowY: 'visible'
  },
  visualImg: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 50,
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  swiperLists: {
    position: 'relative',
    overflowY: 'visible'
  },
  swiperList: {
    position: 'relative'
  },
  swiperContent: {
    minHeight: 700
  },
  swiperLeft: {
    height: 700
  },
  swiperRight: {
    position: 'relative'
  },
  swiperNavsWrap: {
    position: 'relative'
  },
  swiperNavs: {
    position: 'absolute',
    left: 0,
    bottom: 50,
    zIndex: 10,
    display: 'flex',
    flexWrap: 'nowrap',
    maxWidth: 200
  },
  swiperNav: {
    position: 'static',
    background: 'none!important',
    textAlign: 'center'
  },
  swiperNavs2: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: '50%',
    zIndex: 10,
    transform: `translate(-50%, -50%)`,
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 50,
    paddingRight: 50
  },
  swiperNav2: {
    width: 50,
    height: 50,
    padding: 0
  },
  swiperBullet: {
    background: 'none!important'
  }
}));

const Landing = () => {
  const { classes } = useStyles();
  const swiperRef = useRef<SwiperType>();
  const pagination = {
    clickable: true,
    el: '.swiper-custom-pagination',
    renderBullet: function (bulletIndex: any, bulletClass: string) {
      return `<span class="${bulletClass} ${classes.swiperBullet}">${
        bulletIndex + 1
      }</span>`;
    }
  };

  return (
    <>
      <MantineProvider
        theme={{
          globalStyles: (theme) => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box'
            },
            body: {
              color: '#222'
            },
            a: {
              color: 'inherit!important'
            }
            // 'secondaryColor': {
            //   color: '#293951'
            // }
          })
        }}
      >
        {/* HEADER */}
        <Header height={90} className={classes.header}>
          <Container size={1400}>
            <Grid>
              <Grid.Col lg={6}>
                <Container className={classes.headerLeft}>
                  <Anchor
                    component={Link}
                    underline={false}
                    className={classes.logo}
                    to="/"
                  >
                    <Text weight={700} component="span">
                      Invite
                    </Text>
                    You
                  </Anchor>
                  <Group className={classes.gnbLists}>
                    <Anchor
                      component={Link}
                      underline={false}
                      className={classes.gnbList}
                      color="dark"
                      to="/"
                    >
                      ABOUT US
                    </Anchor>
                    <Anchor
                      component={Link}
                      underline={false}
                      className={classes.gnbList}
                      color="dark"
                      to="/"
                    >
                      TEMPLATE
                    </Anchor>
                    <Anchor
                      component={Link}
                      underline={false}
                      className={classes.gnbList}
                      color="dark"
                      to="/"
                    >
                      CONTACT US
                    </Anchor>
                    <Button
                      variant="gradient"
                      color="color-white"
                      gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                      className={classes.gnbList}
                      size="md"
                      p={12}
                      uppercase
                    >
                      <Anchor component={Link} underline={false} to="/builder">
                        GET START
                      </Anchor>
                    </Button>
                  </Group>
                </Container>
              </Grid.Col>
              <Grid.Col lg="auto" offset={3}>
                <Container className={classes.headerRight}>
                  <Group className={classes.gnbLists}>
                    <Anchor
                      component={Link}
                      underline={false}
                      className={classes.gnbList}
                      to="/"
                    >
                      Log in
                    </Anchor>
                    <Button
                      color="blue.9"
                      className={classes.gnbList}
                      size="md"
                      p={12}
                      uppercase
                    >
                      Sign up
                    </Button>
                  </Group>
                  <Group className={classes.gnbLists} ml={20}>
                    <IconSearch className={classes.gnbList} size={30} />
                    <IconMenu2 className={classes.gnbList} size={30} />
                  </Group>
                </Container>
              </Grid.Col>
            </Grid>
          </Container>
        </Header>
        {/* VISUAL */}
        <Container fluid px={0} className={classes.visual}>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false
            // }}
            modules={[Autoplay, Navigation, Pagination]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={pagination}
            className={classes.swiperLists}
          >
            <SwiperSlide className={classes.swiperList}>
              <Container size={1400} className={classes.swiperContent}>
                <Grid justify="space-between" align="center">
                  <Grid.Col span={8}>
                    <Stack
                      spacing={0}
                      className={classes.swiperLeft}
                      justify="center"
                    >
                      <Title size={40} weight={300} order={1}>
                        Will you get married in spring?
                      </Title>
                      <Title size={50} weight={500} order={2}>
                        One Click to make mobile RSVP
                      </Title>
                      <Text pr={250} mt={20}>
                        Lorem Ipsum has been the industry standard dummy text
                        ever the 1500s, when an unknown printer took a galley of
                        typem to make a type specimen book.
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={4} className={classes.swiperRight}>
                    <Box component="figure" className={classes.visualImg}>
                      <Image
                        src={require('../assets/img/visual-phone-mockup.png')}
                        alt="visual phone mockup"
                        width={312}
                        height={632}
                      />
                    </Box>
                  </Grid.Col>
                </Grid>
              </Container>
            </SwiperSlide>
            <SwiperSlide className={classes.swiperList}>
              <BackgroundImage
                src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
                radius="sm"
              >
                <Container size={1400}>
                  <Grid justify="space-between" align="center">
                    <Grid.Col span={8}>
                      <Stack
                        spacing={0}
                        className={classes.swiperLeft}
                        justify="center"
                      >
                        <Title size={40} weight={300} order={1}>
                          Will you get married in spring?
                        </Title>
                        <Title size={50} weight={500} order={2}>
                          One Click to make mobile RSVP
                        </Title>
                        <Text pr={250} mt={20}>
                          Lorem Ipsum has been the industry standard dummy text
                          ever the 1500s, when an unknown printer took a galley
                          of typem to make a type specimen book.
                        </Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Box component="figure" className={classes.visualImg}>
                        <Image
                          src={require('../assets/img/visual-phone-mockup.png')}
                          alt="visual phone mockup"
                          width={312}
                          height={632}
                        />
                      </Box>
                    </Grid.Col>
                  </Grid>
                </Container>
              </BackgroundImage>
            </SwiperSlide>
            <SwiperSlide className={classes.swiperList}>Slide 2</SwiperSlide>
            <Group className={classes.swiperNavs2}>
              <Button
                className={classes.swiperNav2}
                variant="gradient"
                color="white"
                gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <IconArrowLeft size={20} />
              </Button>
              <Button
                className={classes.swiperNav2}
                variant="gradient"
                color="white"
                gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                onClick={() => swiperRef.current?.slideNext()}
              >
                <IconArrowRight size={20} />
              </Button>
            </Group>
            <Container size={1400} className={classes.swiperNavsWrap}>
              <Group className={classes.swiperNavs}>
                <Button
                  className={classes.swiperNav}
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <IconArrowLeft size={20} color="black" />
                </Button>
                <Box className="swiper-custom-pagination"></Box>
                <Button
                  className={classes.swiperNav}
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <IconArrowRight size={20} color="black" />
                </Button>
              </Group>
            </Container>
          </Swiper>
        </Container>
        {/* SECTION 01 */}
        <Container py={150}>
          <Stack spacing={0}>
            <Title size={35} weight={300} order={3} mb={10} align="center">
              Will you get married in spring?
            </Title>
            <Title
              size={50}
              weight={700}
              order={2}
              align="center"
              transform="uppercase"
            >
              <Text span color="#E4797C" inherit mr={10}>
                One Click
              </Text>
              to make mobile RSVP
            </Title>
            <Button
              variant="gradient"
              color="color-white"
              gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
              size="lg"
              p={12}
              mt={60}
              uppercase
            >
              <Anchor
                component={Link}
                underline={false}
                weight={700}
                to="/builder"
              >
                Start Free Trial
              </Anchor>
            </Button>
          </Stack>
        </Container>
      </MantineProvider>
    </>
  );
};

export default Landing;
