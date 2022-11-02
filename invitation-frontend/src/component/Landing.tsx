import {
  Header,
  Grid,
  Text,
  Container,
  createStyles,
  Button,
  Group,
  Box
} from '@mantine/core';

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

const useStyles = createStyles((theme, _params, getRef) => ({
  header: {
    paddingTop: 25,
    paddingBottom: 25
  },
  headerLeft: {
    display: 'flex'
  },
  headerRight: {
    display: 'flex'
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
    gap: 10
  },
  gnbList: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 400
  },
  visual: {
    position: 'relative'
  },
  swiperLists: {
    position: 'relative'
  },
  swiperList: {
    minHeight: 700,
    background: '#ccc'
  },
  swiperNavs: {
    position: 'absolute',
    left: 50,
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
      <Header height={90} className={classes.header}>
        <Container size={1400}>
          <Grid>
            <Grid.Col lg={6}>
              <Container className={classes.headerLeft}>
                <Button variant="white" component="h2" className={classes.logo}>
                  <Text weight={700} component="span">
                    Invite
                  </Text>
                  You
                </Button>
                <Group className={classes.gnbLists}>
                  <Button
                    variant="white"
                    color="dark"
                    className={classes.gnbList}
                    uppercase
                  >
                    ABOUT US
                  </Button>
                  <Button
                    variant="white"
                    color="dark"
                    className={classes.gnbList}
                    uppercase
                  >
                    TEMPLATE
                  </Button>
                  <Button
                    variant="white"
                    color="dark"
                    className={classes.gnbList}
                    uppercase
                  >
                    CONTACT US
                  </Button>
                  <Button
                    variant="gradient"
                    color="white"
                    gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                    className={classes.gnbList}
                    size="md"
                    p={12}
                    uppercase
                  >
                    CONTACT US
                  </Button>
                </Group>
              </Container>
            </Grid.Col>
            <Grid.Col lg="auto" offset={3}>
              <Container className={classes.headerRight}>
                <Group className={classes.gnbLists}>
                  <Button
                    variant="gradient"
                    color="white"
                    gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                    className={classes.gnbList}
                    size="md"
                    p={12}
                    uppercase
                  >
                    Log in
                  </Button>
                  <Button
                    color="dark"
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
      <Container fluid className={classes.visual}>
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
          <SwiperSlide className={classes.swiperList}>Slide 1</SwiperSlide>
          <SwiperSlide className={classes.swiperList}>Slide 2</SwiperSlide>
          <SwiperSlide className={classes.swiperList}>Slide 3</SwiperSlide>
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
        </Swiper>
      </Container>
    </>
  );
};

export default Landing;
