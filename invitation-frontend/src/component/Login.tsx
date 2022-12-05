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
  MantineProvider,
  Autocomplete,
  Loader,
  PasswordInput,
  Input,
  Checkbox
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconSearch, IconMenu2 } from '@tabler/icons';

import { useState, useRef } from 'react';

const SECONDARY_COLOR = '#191F28';
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
    top: 0
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
  loginIcons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const Login = () => {
  const { classes } = useStyles();

  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ['gmail.com', 'outlook.com', 'yahoo.com'].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 1000);
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
                      to="/Login"
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
        {/* LOGIN */}
        <Container py={250} size={1400}>
          <Title align="center" size={45} weight={700} mb={65} order={1}>
            SIGN IN
          </Title>
          <Container size={430}>
            <Input.Wrapper mb={20}>
              <Autocomplete
                value={value}
                data={data}
                onChange={handleChange}
                rightSection={loading ? <Loader size={16} /> : null}
                placeholder="Your email"
                radius={5}
                size="xl"
                label={false}
              />
            </Input.Wrapper>
            <Input.Wrapper mb={20}>
              <PasswordInput
                placeholder="Your password"
                id="your-password"
                radius={5}
                size="xl"
                error="Invalid password"
              />
            </Input.Wrapper>
            <Button
              variant="gradient"
              color="color-white"
              gradient={STYLE_BTN_COLOR}
              fullWidth
              size="xl"
              p={12}
              radius={5}
              mb={30}
              uppercase
            >
              Sign In
            </Button>
            <Grid mb={20}>
              <Grid.Col span={6}>
                <Checkbox label="Remember ID" color="pink" size="md" />
              </Grid.Col>
              <Grid.Col span={6} className={classes.loginIcons}>
                <Anchor component={Link} size={16} underline={false} to="/">
                  Find ID
                </Anchor>
                <Text mx={10}>|</Text>
                <Anchor component={Link} size={16} underline={false} to="/">
                  Find PW
                </Anchor>
              </Grid.Col>
            </Grid>
            <Button
              variant="outline"
              color="pink"
              fullWidth
              size="xl"
              p={12}
              radius={5}
              mb={30}
              uppercase
            >
              <Anchor component={Link} underline={false} to="/builder">
                Sign Up
              </Anchor>
            </Button>
            <Grid>
              <Grid.Col span={6}>
                <Text size={20} lineClamp={2}>
                  Sign in or Create Account with
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group ml={20} className={classes.loginIcons}>
                  <Anchor component={Link} underline={false} to="/">
                    <Image
                      src={require('../assets/img/icon-login-kakao.png')}
                      alt="con-login-kakao"
                      width={60}
                      height={60}
                    />
                  </Anchor>
                  <Anchor component={Link} underline={false} to="/">
                    <Image
                      src={require('../assets/img/icon-login-naver.png')}
                      alt="con-login-naver"
                      width={60}
                      height={60}
                    />
                  </Anchor>
                </Group>
              </Grid.Col>
            </Grid>
          </Container>
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

export default Login;
