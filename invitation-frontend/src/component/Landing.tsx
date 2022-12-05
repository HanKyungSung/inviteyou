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

const STYLE_BG_COLOR = '#F6E5E5';
const SECONDARY_COLOR = '#191F28';
const PRIMARY_COLOR = '#FF8689';
const COLOR_BLACK = '#222222';
const STYLE_BTN_COLOR = { from: '#ed6ea0', to: '#ec8c69', deg: 35 };

const useStyles = createStyles((_theme, _params, _getRef) => ({
  header: {
    paddingTop: 25,
    paddingBottom: 25,
    border: 'none',
    position: 'fixed',
    width: '100%',
    left: 0,
    top: 0,
    backgroundColor: STYLE_BG_COLOR
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
    color: COLOR_BLACK
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
    backgroundColor: STYLE_BG_COLOR,
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
  },
  freeTrialBtn: {
    maxWidth: 225,
    textAlign: 'center'
  },
  bgPink: {
    backgroundColor: STYLE_BG_COLOR
  },
  productItemImgWrap: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden'
  }
}));

const Landing = () => {
  const { classes } = useStyles();
  const swiperRef = useRef<SwiperType>();
  const pagination = {
    el: '.swiper-custom-pagination',
    clickable: true,
    renderBullet: function (bulletIndex: number, bulletClass: string) {
      return `<span className=${bulletClass}>${bulletIndex + 1}</span>`;
    }
  };

  return (
    <>
      <MantineProvider
        theme={{
          globalStyles: (_theme) => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box'
            },
            body: {
              color: COLOR_BLACK
            },
            a: {
              color: 'inherit!important'
            }
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
                      gradient={STYLE_BTN_COLOR}
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
                      color={SECONDARY_COLOR}
                      className={classes.gnbList}
                      styles={{ root: { backgroundColor: SECONDARY_COLOR } }}
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
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
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
                      <Text size={20} pr={250} mt={20}>
                        Lorem Ipsum has been the industry standard dummy text
                        ever the 1500s, when an unknown printer took a galley of
                        typem to make a type specimen book.
                      </Text>
                      <Button
                        variant="gradient"
                        color="color-white"
                        gradient={STYLE_BTN_COLOR}
                        size="lg"
                        className={classes.freeTrialBtn}
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
                  </Grid.Col>
                  <Grid.Col span="content" className={classes.swiperRight}>
                    <Box className={classes.visualImg}>
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
                          ever the 1500s, when an unknown printer took a galley
                          of typem to make a type specimen book.
                        </Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span="content" className={classes.swiperRight}>
                      <Box className={classes.visualImg}>
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
                gradient={STYLE_BTN_COLOR}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <IconArrowLeft size={20} />
              </Button>
              <Button
                className={classes.swiperNav2}
                variant="gradient"
                color="white"
                gradient={STYLE_BTN_COLOR}
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
        <Container py={150} fluid>
          <Stack spacing={0} align="center">
            <Title size={35} weight={300} order={3} mb={10}>
              Will you get married in spring?
            </Title>
            <Title size={50} weight={700} order={2} transform="uppercase">
              <Text span color="#E4797C" inherit mr={10}>
                One Click
              </Text>
              to make mobile RSVP
            </Title>
            <Button
              variant="gradient"
              color="color-white"
              gradient={STYLE_BTN_COLOR}
              size="lg"
              className={classes.freeTrialBtn}
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
            <Box mt={100}>
              <Image
                src={require('../assets/img/landing-section1-img.png')}
                alt="visual image"
                width="100%"
                height={500}
              />
            </Box>
          </Stack>
        </Container>
        {/* SECTION 02 */}
        <Container py={150} fluid className={classes.bgPink}>
          <Container size={1400}>
            <Grid justify="space-between" align="center">
              <Grid.Col span={6}>
                <Stack spacing={0} align="left">
                  <Text size={20} weight={500} color={SECONDARY_COLOR}>
                    OUR BENEFIT 01
                  </Text>
                  <Title
                    size={45}
                    weight={700}
                    order={2}
                    transform="uppercase"
                    color={SECONDARY_COLOR}
                    my={30}
                  >
                    Our mobile invitation is
                    <br />
                    100% customizable.
                  </Title>
                  <Text size={25} weight={400} color="#666">
                    Every components in Inviteyou can customize from color to
                    font. Every components in Inviteyou can customize from color
                    to font.
                  </Text>
                  <Button
                    variant="gradient"
                    color="color-white"
                    gradient={STYLE_BTN_COLOR}
                    size="lg"
                    className={classes.freeTrialBtn}
                    p={12}
                    mt={60}
                    uppercase
                  >
                    <Anchor
                      component={Link}
                      underline={false}
                      style={{ color: 'white' }}
                      to="/builder"
                    >
                      GET START
                    </Anchor>
                  </Button>
                </Stack>
              </Grid.Col>
              <Grid.Col span="content">
                <Box ml={50}>
                  <Image
                    src={require('../assets/img/visual-phone-mockup.png')}
                    alt="visual image"
                    width={364}
                    height={750}
                  />
                </Box>
              </Grid.Col>
            </Grid>
          </Container>
        </Container>
        {/* SECTION 03 */}
        <Container py={150} fluid>
          <Container size={1400}>
            <Grid justify="space-between" align="center">
              <Grid.Col span={6}>
                <Box mr={50}>
                  <Image
                    src={require('../assets/img/landing-img-mockup.png')}
                    alt="visual image"
                    width="100%"
                    height={450}
                    fit="contain"
                  />
                </Box>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack spacing={0} align="left">
                  <Text size={20} weight={500} color={SECONDARY_COLOR}>
                    OUR BENEFIT 01
                  </Text>
                  <Title
                    size={45}
                    weight={700}
                    order={2}
                    transform="uppercase"
                    color={SECONDARY_COLOR}
                    my={30}
                  >
                    Our mobile invitation is
                    <br />
                    100% customizable.
                  </Title>
                  <Text size={25} weight={400} color="#666">
                    Every components in Inviteyou can customize from color to
                    font. Every components in Inviteyou can customize from color
                    to font.
                  </Text>
                  <Button
                    variant="gradient"
                    color="color-white"
                    gradient={STYLE_BTN_COLOR}
                    size="lg"
                    className={classes.freeTrialBtn}
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
              </Grid.Col>
            </Grid>
          </Container>
        </Container>
        {/* SECTION 04 */}
        <Container py={150} fluid className={classes.bgPink}>
          <Container size={1400}>
            <Grid justify="space-between" align="center">
              <Grid.Col span={6}>
                <Stack spacing={0} align="left">
                  <Text size={20} weight={500} color={SECONDARY_COLOR}>
                    OUR BENEFIT 01
                  </Text>
                  <Title
                    size={45}
                    weight={700}
                    order={2}
                    transform="uppercase"
                    color={SECONDARY_COLOR}
                    my={30}
                  >
                    Our mobile invitation is
                    <br />
                    100% customizable.
                  </Title>
                  <Text size={25} weight={400} color="#666">
                    Every components in Inviteyou can customize from color to
                    font. Every components in Inviteyou can customize from color
                    to font.
                  </Text>
                  <Button
                    variant="gradient"
                    color="color-white"
                    gradient={STYLE_BTN_COLOR}
                    size="lg"
                    className={classes.freeTrialBtn}
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
              </Grid.Col>
              <Grid.Col span={6}>
                <Box mr={50}>
                  <Image
                    src={require('../assets/img/landing-img-mockup.png')}
                    alt="visual image"
                    width="100%"
                    height={450}
                    fit="contain"
                  />
                </Box>
              </Grid.Col>
            </Grid>
          </Container>
        </Container>
        {/* SECTION 05 */}
        <Container py={150} size={1400}>
          <Title
            size={45}
            weight={700}
            order={2}
            mb={60}
            align="center"
            transform="uppercase"
          >
            Mobile wedding invitation
          </Title>
          <Grid gutter={20}>
            <Grid.Col span={3} mb={20}>
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    height={435}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={6} p={0}>
                      <Text size={20} weight={500} transform="capitalize">
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6} p={0}>
                      <Text
                        size={22}
                        weight={700}
                        transform="uppercase"
                        align="right"
                        color={PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} mb={20}>
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    height={435}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={6} p={0}>
                      <Text size={20} weight={500} transform="capitalize">
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6} p={0}>
                      <Text
                        size={22}
                        weight={700}
                        transform="uppercase"
                        align="right"
                        color={PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} mb={20}>
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    height={435}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={6} p={0}>
                      <Text size={20} weight={500} transform="capitalize">
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6} p={0}>
                      <Text
                        size={22}
                        weight={700}
                        transform="uppercase"
                        align="right"
                        color={PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} mb={20}>
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    height={435}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={6} p={0}>
                      <Text size={20} weight={500} transform="capitalize">
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6} p={0}>
                      <Text
                        size={22}
                        weight={700}
                        transform="uppercase"
                        align="right"
                        color={PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} mb={20}>
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    height={435}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={6} p={0}>
                      <Text size={20} weight={500} transform="capitalize">
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6} p={0}>
                      <Text
                        size={22}
                        weight={700}
                        transform="uppercase"
                        align="right"
                        color={PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} mb={20}>
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    height={435}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={6} p={0}>
                      <Text size={20} weight={500} transform="capitalize">
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6} p={0}>
                      <Text
                        size={22}
                        weight={700}
                        transform="uppercase"
                        align="right"
                        color={PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} mb={20}>
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    height={435}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={6} p={0}>
                      <Text size={20} weight={500} transform="capitalize">
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6} p={0}>
                      <Text
                        size={22}
                        weight={700}
                        transform="uppercase"
                        align="right"
                        color={PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} mb={20}>
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    height={435}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={6} p={0}>
                      <Text size={20} weight={500} transform="capitalize">
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6} p={0}>
                      <Text
                        size={22}
                        weight={700}
                        transform="uppercase"
                        align="right"
                        color={PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} mb={20}>
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    height={435}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={6} p={0}>
                      <Text size={20} weight={500} transform="capitalize">
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6} p={0}>
                      <Text
                        size={22}
                        weight={700}
                        transform="uppercase"
                        align="right"
                        color={PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} mb={20}>
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    height={435}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={6} p={0}>
                      <Text size={20} weight={500} transform="capitalize">
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6} p={0}>
                      <Text
                        size={22}
                        weight={700}
                        transform="uppercase"
                        align="right"
                        color={PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
        {/* FOOTER */}
        <Container py={50} fluid>
          <Container size={1400}>
            <Stack>
              <Anchor
                component={Link}
                underline={false}
                className={classes.logo}
                to="/"
                align="center"
              >
                <Text weight={700} component="span">
                  Invite
                </Text>
                You
              </Anchor>
              <Box my={20}>
                <Text size={16} color="grey" align="center">
                  주소. 서울특별시 강남구 강남대로 123, 강남빌딩 201호
                </Text>
                <Text size={16} color="grey" align="center">
                  Tel. +82. 02. 0000. 0000 Fax. +82. 02. 0000. 0000 Mail.
                  sample@gmail.com
                </Text>
              </Box>
              <Text size={14} color="grey" align="center">
                ⓒ2022 Raon Design Limited
              </Text>
            </Stack>
          </Container>
        </Container>
      </MantineProvider>
    </>
  );
};

export default Landing;
