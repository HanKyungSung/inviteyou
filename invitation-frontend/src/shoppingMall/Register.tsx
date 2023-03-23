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
  MantineProvider,
  Autocomplete,
  Loader,
  PasswordInput,
  Input,
  Checkbox
} from '@mantine/core';
import { Link } from 'react-router-dom';
import LandingHeader from '../common/LandingHeader';
import LandingFooter from '../common/LandingFooter';


import { useState, useRef } from 'react';

const SECONDARY_COLOR = '#191F28';
const COLOR_BLACK = '#222222';
const STYLE_BTN_COLOR = { from: '#ed6ea0', to: '#ec8c69', deg: 35 };

const useStyles = createStyles((_theme, _params, _getRef) => ({
  loginIcons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  registerCheckboxWrap: {
    position: 'relative'
  },
  registerCheckboxMore: {
    position: 'absolute',
    right: 0,
    top: 0
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
        <LandingHeader />
        {/* Register */}
        <Container py={250} size={1400}>
          <Title align="center" size={45} weight={700} mb={65} order={1}>
            SIGN UP
          </Title>
          <Container size={430}>
            <Stack spacing={20}>
              <Input.Wrapper>
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
              <Input.Wrapper>
                <PasswordInput
                  placeholder="Your password"
                  id="your-password"
                  radius={5}
                  size="xl"
                  error="Invalid password"
                />
              </Input.Wrapper>
              <Input.Wrapper>
                <PasswordInput
                  placeholder="Re-enter Your password"
                  id="your-password"
                  radius={5}
                  size="xl"
                />
              </Input.Wrapper>
              <Input.Wrapper className={classes.loginIcons}>
                <Input placeholder="Phone Number" radius={5} size="xl" />
                <Button
                  variant="gradient"
                  color="color-white"
                  gradient={STYLE_BTN_COLOR}
                  size="xl"
                  p={12}
                  radius={5}
                  ml={10}
                >
                  Verification
                </Button>
              </Input.Wrapper>
              <Input.Wrapper>
                <Input placeholder="Vertification Code" radius={5} size="xl" />
              </Input.Wrapper>
              <Stack spacing={10}>
                <Box className={classes.registerCheckboxWrap}>
                  <Checkbox label="Privacy Policy" color="pink" size="md" />
                  <Anchor
                    component={Link}
                    size={16}
                    underline={true}
                    className={classes.registerCheckboxMore}
                    to="/"
                  >
                    View Details
                  </Anchor>
                </Box>
                <Box className={classes.registerCheckboxWrap}>
                  <Checkbox label="Agreement" color="pink" size="md" />
                  <Anchor
                    component={Link}
                    size={16}
                    underline={true}
                    className={classes.registerCheckboxMore}
                    to="/"
                  >
                    View Details
                  </Anchor>
                </Box>
              </Stack>
              <Button
                variant="gradient"
                color="color-white"
                gradient={STYLE_BTN_COLOR}
                fullWidth
                size="xl"
                p={12}
                radius={5}
                uppercase
              >
                Sign Up
              </Button>
              <Button
                variant="outline"
                color="pink"
                fullWidth
                size="xl"
                p={12}
                radius={5}
                uppercase
              >
                <Anchor component={Link} underline={false} to="/Login">
                  Sign In
                </Anchor>
              </Button>
            </Stack>
          </Container>
        </Container>
        {/* FOOTER */}
        <LandingFooter />
      </MantineProvider>
    </>
  );
};

export default Login;
