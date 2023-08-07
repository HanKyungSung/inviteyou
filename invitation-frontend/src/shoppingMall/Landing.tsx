import {
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
  MantineProvider
} from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons';

import { Link } from 'react-router-dom';
import { useRef } from 'react';
import LandingHeader from '../common/LandingHeader';
import LandingFooter from '../common/LandingFooter';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType, Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import * as ConstantStyle from '../common/Constant';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((_theme, _params, _getRef) => ({
  visual: {
    position: 'relative',
    paddingTop: 90,
    backgroundColor: ConstantStyle.STYLE_BG_COLOR,
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
  swiperRight: {
    position: 'relative'
  },
  swiperNavsWrap: {
    position: 'relative'
  },
  swiperNavs: {
    position: 'absolute',
    left: 0,
    bottom: 20,
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
    paddingLeft: 10,
    paddingRight: 10
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
    maxWidth: 'fit-content',
    textAlign: 'center'
  },
  bgPink: {
    backgroundColor: ConstantStyle.STYLE_BG_COLOR
  },
  productItemImgWrap: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden'
  }
}));

const Landing = () => {
  const { classes } = useStyles();
  const RESPONSIVE_MOBILE = useMediaQuery('(max-width: 767px)');
  const RESPONSIVE_TABLET = useMediaQuery('(max-width: 900px)');

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
              color: ConstantStyle.COLOR_BLACK
            },
            a: {
              color: 'inherit!important'
            }
          })
        }}
      >
        {/* HEADER */}
        <LandingHeader />
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
              <Container
                size={1400}
                className={classes.swiperContent}
                pb={RESPONSIVE_MOBILE ? 50 : 0}
              >
                <Grid justify="space-between" align="center">
                  <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 8}>
                    <Stack
                      spacing={0}
                      style={{ height: RESPONSIVE_MOBILE ? 'auto' : 700 }}
                      justify={RESPONSIVE_MOBILE ? 'top' : 'center'}
                    >
                      <Title
                        size={
                          RESPONSIVE_MOBILE ? 16 : RESPONSIVE_TABLET ? 20 : 40
                        }
                        weight={300}
                        order={1}
                      >
                        Will you get married in spring?
                      </Title>
                      <Title
                        size={RESPONSIVE_TABLET ? 30 : 50}
                        weight={500}
                        order={2}
                      >
                        One Click to make mobile RSVP
                      </Title>
                      <Text
                        size={RESPONSIVE_TABLET ? 16 : 20}
                        pr={RESPONSIVE_TABLET ? 0 : 100}
                        mt={20}
                      >
                        Lorem Ipsum has been the industry standard dummy text
                        ever the 1500s, when an unknown printer took a galley of
                        typem to make a type specimen book.
                      </Text>
                      <Button
                        variant="gradient"
                        color="color-white"
                        gradient={ConstantStyle.STYLE_BTN_COLOR}
                        size={RESPONSIVE_TABLET ? 'md' : 'lg'}
                        className={classes.freeTrialBtn}
                        p={12}
                        mt={RESPONSIVE_MOBILE ? 30 : 60}
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
                  <Grid.Col
                    span={RESPONSIVE_MOBILE ? 12 : 'content'}
                    className={classes.swiperRight}
                  >
                    <Box className={RESPONSIVE_MOBILE ? '' : classes.visualImg}>
                      <Image
                        src={require('../assets/img/visual-phone-mockup.png')}
                        alt="visual phone mockup"
                        width={RESPONSIVE_TABLET ? 185 : 312}
                        height={RESPONSIVE_TABLET ? 374 : 632}
                      />
                    </Box>
                  </Grid.Col>
                </Grid>
              </Container>
            </SwiperSlide>
            {/* <Group className={classes.swiperNavs2} 
              style={{display : (RESPONSIVE_TABLET ? 'none' : 'flex')}}
            >
              <Button
                className={classes.swiperNav2}
                variant="gradient"
                color="white"
                gradient={ConstantStyle.STYLE_BTN_COLOR}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <IconArrowLeft size={RESPONSIVE_TABLET ? 16 : 20} />
              </Button>
              <Button
                className={classes.swiperNav2}
                variant="gradient"
                color="white"
                gradient={ConstantStyle.STYLE_BTN_COLOR}
                onClick={() => swiperRef.current?.slideNext()}
              >
                <IconArrowRight size={RESPONSIVE_TABLET ? 16 : 20} />
              </Button>
            </Group> */}
            <Container size={1400} className={classes.swiperNavsWrap}>
              <Group className={classes.swiperNavs}>
                <Button
                  className={classes.swiperNav}
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <IconArrowLeft
                    size={RESPONSIVE_TABLET ? 16 : 20}
                    color="black"
                  />
                </Button>
                <Box className="swiper-custom-pagination"></Box>
                <Button
                  className={classes.swiperNav}
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <IconArrowRight
                    size={RESPONSIVE_TABLET ? 16 : 20}
                    color="black"
                  />
                </Button>
              </Group>
            </Container>
          </Swiper>
        </Container>
        {/* SECTION 01 */}
        <Container
          py={RESPONSIVE_MOBILE ? 50 : RESPONSIVE_TABLET ? 50 : 150}
          px={0}
          fluid
        >
          <Stack spacing={0} align="center">
            <Title
              size={RESPONSIVE_TABLET ? 20 : 35}
              weight={300}
              order={3}
              mb={10}
            >
              Will you get married in spring?
            </Title>
            <Title
              size={RESPONSIVE_TABLET ? 30 : 50}
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
              gradient={ConstantStyle.STYLE_BTN_COLOR}
              size={RESPONSIVE_TABLET ? 'md' : 'lg'}
              className={classes.freeTrialBtn}
              p={12}
              mt={RESPONSIVE_MOBILE ? 30 : 60}
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
                style={{ maxHeight: 500 }}
              />
            </Box>
          </Stack>
        </Container>
        {/* SECTION 02 */}
        <Container
          py={RESPONSIVE_MOBILE ? 50 : RESPONSIVE_TABLET ? 50 : 150}
          px={0}
          fluid
          className={classes.bgPink}
        >
          <Container size={1400}>
            <Grid justify="space-between" align="center">
              <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6}>
                <Stack spacing={0} align="left">
                  <Text
                    size={RESPONSIVE_TABLET ? 16 : 20}
                    weight={500}
                    color={ConstantStyle.SECONDARY_COLOR}
                  >
                    OUR BENEFIT 01
                  </Text>
                  <Title
                    size={RESPONSIVE_TABLET ? 25 : 45}
                    weight={700}
                    order={2}
                    transform="uppercase"
                    color={ConstantStyle.SECONDARY_COLOR}
                    my={RESPONSIVE_MOBILE ? 15 : 30}
                  >
                    Our mobile invitation is
                    <br />
                    100% customizable.
                  </Title>
                  <Text
                    size={RESPONSIVE_TABLET ? 16 : 25}
                    weight={400}
                    color="#666"
                  >
                    Every components in Inviteyou can customize from color to
                    font. Every components in Inviteyou can customize from color
                    to font.
                  </Text>
                  <Button
                    variant="gradient"
                    color="color-white"
                    gradient={ConstantStyle.STYLE_BTN_COLOR}
                    size={RESPONSIVE_TABLET ? 'md' : 'lg'}
                    className={classes.freeTrialBtn}
                    p={12}
                    mt={RESPONSIVE_MOBILE ? 30 : 60}
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
              <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 'content'}>
                <Box
                  ml={RESPONSIVE_MOBILE ? 0 : 50}
                  mt={RESPONSIVE_MOBILE ? 20 : 0}
                >
                  <Image
                    src={require('../assets/img/visual-phone-mockup.png')}
                    alt="visual image"
                    width={RESPONSIVE_TABLET ? 185 : 312}
                    height={RESPONSIVE_TABLET ? 374 : 632}
                  />
                </Box>
              </Grid.Col>
            </Grid>
          </Container>
        </Container>
        {/* SECTION 03 */}
        <Container
          py={RESPONSIVE_MOBILE ? 50 : RESPONSIVE_TABLET ? 50 : 150}
          px={0}
          fluid
        >
          <Container size={1400}>
            <Grid justify="space-between" align="center">
              <Grid.Col
                span={RESPONSIVE_MOBILE ? 12 : 6}
                order={2}
                orderSm={1}
                orderLg={2}
              >
                <Box
                  mr={RESPONSIVE_MOBILE ? 0 : 50}
                  mt={RESPONSIVE_MOBILE ? 20 : 0}
                >
                  <Image
                    src={require('../assets/img/landing-img-mockup.png')}
                    alt="visual image"
                    width="100%"
                    style={{ maxHeight: 450 }}
                    fit="contain"
                  />
                </Box>
              </Grid.Col>
              <Grid.Col
                span={RESPONSIVE_MOBILE ? 12 : 6}
                order={1}
                orderSm={2}
                orderLg={1}
              >
                <Stack spacing={0} align="left">
                  <Text
                    size={RESPONSIVE_TABLET ? 16 : 20}
                    weight={500}
                    color={ConstantStyle.SECONDARY_COLOR}
                  >
                    OUR BENEFIT 02
                  </Text>
                  <Title
                    size={RESPONSIVE_TABLET ? 25 : 45}
                    weight={700}
                    order={2}
                    transform="uppercase"
                    color={ConstantStyle.SECONDARY_COLOR}
                    my={RESPONSIVE_MOBILE ? 15 : 30}
                  >
                    Our mobile invitation is
                    <br />
                    100% customizable.
                  </Title>
                  <Text
                    size={RESPONSIVE_TABLET ? 16 : 25}
                    weight={400}
                    color="#666"
                  >
                    Every components in Inviteyou can customize from color to
                    font. Every components in Inviteyou can customize from color
                    to font.
                  </Text>
                  <Button
                    variant="gradient"
                    color="color-white"
                    gradient={ConstantStyle.STYLE_BTN_COLOR}
                    size={RESPONSIVE_TABLET ? 'md' : 'lg'}
                    className={classes.freeTrialBtn}
                    p={12}
                    mt={RESPONSIVE_MOBILE ? 30 : 60}
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
        <Container
          py={RESPONSIVE_MOBILE ? 50 : RESPONSIVE_TABLET ? 50 : 150}
          px={0}
          fluid
          className={classes.bgPink}
        >
          <Container size={1400}>
            <Grid justify="space-between" align="center">
              <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6}>
                <Stack spacing={0} align="left">
                  <Text
                    size={RESPONSIVE_TABLET ? 16 : 20}
                    weight={500}
                    color={ConstantStyle.SECONDARY_COLOR}
                  >
                    OUR BENEFIT 03
                  </Text>
                  <Title
                    size={RESPONSIVE_TABLET ? 25 : 45}
                    weight={700}
                    order={2}
                    transform="uppercase"
                    color={ConstantStyle.SECONDARY_COLOR}
                    my={RESPONSIVE_MOBILE ? 15 : 30}
                  >
                    Our mobile invitation is
                    <br />
                    100% customizable.
                  </Title>
                  <Text
                    size={RESPONSIVE_TABLET ? 16 : 25}
                    weight={400}
                    color="#666"
                  >
                    Every components in Inviteyou can customize from color to
                    font. Every components in Inviteyou can customize from color
                    to font.
                  </Text>
                  <Button
                    variant="gradient"
                    color="color-white"
                    gradient={ConstantStyle.STYLE_BTN_COLOR}
                    size={RESPONSIVE_TABLET ? 'md' : 'lg'}
                    className={classes.freeTrialBtn}
                    p={12}
                    mt={RESPONSIVE_MOBILE ? 30 : 60}
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
              <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6}>
                <Box
                  mr={RESPONSIVE_MOBILE ? 0 : 50}
                  mt={RESPONSIVE_MOBILE ? 20 : 0}
                >
                  <Image
                    src={require('../assets/img/landing-img-mockup.png')}
                    alt="visual image"
                    width="100%"
                    style={{ maxHeight: 450 }}
                    fit="contain"
                  />
                </Box>
              </Grid.Col>
            </Grid>
          </Container>
        </Container>
        {/* SECTION 05 */}
        <Container
          py={RESPONSIVE_MOBILE ? 50 : RESPONSIVE_TABLET ? 50 : 150}
          size={1400}
        >
          <Title
            size={RESPONSIVE_TABLET ? 25 : 45}
            weight={700}
            order={2}
            mb={RESPONSIVE_MOBILE ? 30 : 60}
            align="center"
            transform="uppercase"
          >
            Mobile wedding invitation
          </Title>
          <Grid gutter={20}>
            <Grid.Col
              span={RESPONSIVE_MOBILE ? 6 : RESPONSIVE_TABLET ? 4 : 3}
              mb={20}
            >
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    style={{ maxHeight: 435 }}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_TABLET ? 16 : 20}
                        weight={500}
                        transform="capitalize"
                      >
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_MOBILE ? 16 : 22}
                        weight={700}
                        transform="uppercase"
                        align={RESPONSIVE_MOBILE ? 'left' : 'right'}
                        color={ConstantStyle.PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col
              span={RESPONSIVE_MOBILE ? 6 : RESPONSIVE_TABLET ? 4 : 3}
              mb={20}
            >
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    style={{ maxHeight: 435 }}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_TABLET ? 16 : 20}
                        weight={500}
                        transform="capitalize"
                      >
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_MOBILE ? 16 : 22}
                        weight={700}
                        transform="uppercase"
                        align={RESPONSIVE_MOBILE ? 'left' : 'right'}
                        color={ConstantStyle.PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col
              span={RESPONSIVE_MOBILE ? 6 : RESPONSIVE_TABLET ? 4 : 3}
              mb={20}
            >
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    style={{ maxHeight: 435 }}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_TABLET ? 16 : 20}
                        weight={500}
                        transform="capitalize"
                      >
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_MOBILE ? 16 : 22}
                        weight={700}
                        transform="uppercase"
                        align={RESPONSIVE_MOBILE ? 'left' : 'right'}
                        color={ConstantStyle.PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col
              span={RESPONSIVE_MOBILE ? 6 : RESPONSIVE_TABLET ? 4 : 3}
              mb={20}
            >
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    style={{ maxHeight: 435 }}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_TABLET ? 16 : 20}
                        weight={500}
                        transform="capitalize"
                      >
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_MOBILE ? 16 : 22}
                        weight={700}
                        transform="uppercase"
                        align={RESPONSIVE_MOBILE ? 'left' : 'right'}
                        color={ConstantStyle.PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col
              span={RESPONSIVE_MOBILE ? 6 : RESPONSIVE_TABLET ? 4 : 3}
              mb={20}
            >
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    style={{ maxHeight: 435 }}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_TABLET ? 16 : 20}
                        weight={500}
                        transform="capitalize"
                      >
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_MOBILE ? 16 : 22}
                        weight={700}
                        transform="uppercase"
                        align={RESPONSIVE_MOBILE ? 'left' : 'right'}
                        color={ConstantStyle.PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col
              span={RESPONSIVE_MOBILE ? 6 : RESPONSIVE_TABLET ? 4 : 3}
              mb={20}
            >
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    style={{ maxHeight: 435 }}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_TABLET ? 16 : 20}
                        weight={500}
                        transform="capitalize"
                      >
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_MOBILE ? 16 : 22}
                        weight={700}
                        transform="uppercase"
                        align={RESPONSIVE_MOBILE ? 'left' : 'right'}
                        color={ConstantStyle.PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col
              span={RESPONSIVE_MOBILE ? 6 : RESPONSIVE_TABLET ? 4 : 3}
              mb={20}
            >
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    style={{ maxHeight: 435 }}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_TABLET ? 16 : 20}
                        weight={500}
                        transform="capitalize"
                      >
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_MOBILE ? 16 : 22}
                        weight={700}
                        transform="uppercase"
                        align={RESPONSIVE_MOBILE ? 'left' : 'right'}
                        color={ConstantStyle.PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col
              span={RESPONSIVE_MOBILE ? 6 : RESPONSIVE_TABLET ? 4 : 3}
              mb={20}
            >
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    style={{ maxHeight: 435 }}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_TABLET ? 16 : 20}
                        weight={500}
                        transform="capitalize"
                      >
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_MOBILE ? 16 : 22}
                        weight={700}
                        transform="uppercase"
                        align={RESPONSIVE_MOBILE ? 'left' : 'right'}
                        color={ConstantStyle.PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col
              span={RESPONSIVE_MOBILE ? 6 : RESPONSIVE_TABLET ? 4 : 3}
              mb={20}
            >
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    style={{ maxHeight: 435 }}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_TABLET ? 16 : 20}
                        weight={500}
                        transform="capitalize"
                      >
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_MOBILE ? 16 : 22}
                        weight={700}
                        transform="uppercase"
                        align={RESPONSIVE_MOBILE ? 'left' : 'right'}
                        color={ConstantStyle.PRIMARY_COLOR}
                      >
                        $20 CAD
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col
              span={RESPONSIVE_MOBILE ? 6 : RESPONSIVE_TABLET ? 4 : 3}
              mb={20}
            >
              <Stack>
                <Box className={classes.productItemImgWrap}>
                  <Image
                    src={require('../assets/img/sample-img-product-item.jpg')}
                    alt="item mockup"
                    width="100%"
                    style={{ maxHeight: 435 }}
                    fit="cover"
                  />
                </Box>
                <Box>
                  <Grid m={0}>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_TABLET ? 16 : 20}
                        weight={500}
                        transform="capitalize"
                      >
                        invitation title
                      </Text>
                      <Text size={14} color="grey" transform="capitalize">
                        invitation Description
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={RESPONSIVE_MOBILE ? 12 : 6} p={0}>
                      <Text
                        size={RESPONSIVE_MOBILE ? 16 : 22}
                        weight={700}
                        transform="uppercase"
                        align={RESPONSIVE_MOBILE ? 'left' : 'right'}
                        color={ConstantStyle.PRIMARY_COLOR}
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
        <LandingFooter />
      </MantineProvider>
    </>
  );
};

export default Landing;
