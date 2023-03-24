import {
  Title,
  Container,
  createStyles,
  Button,
  Box,
  Anchor,
  Stack,
  MantineProvider,
  PasswordInput,
  Input,
  TextInput,
  Checkbox
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons';

import LandingHeader from '../common/LandingHeader';
import LandingFooter from '../common/LandingFooter';

import * as ConstantStyle from '../common/Constant';

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

const defaultRegisterData = {
  name : "",
  email : "",
  password : "",
  password2 : "",
  checkbox1 : false,
  checkbox2 : false
}

const defaultRegisterErrorMessage: Record<string, string> = {
  name: '',
  email: '',
  password: '',
  password2: '',
  checkbox1 : '',
  checkbox2 : ''
}

const Login = () => {
  //Email regit
  //password length : 8 above 16 below
  //checkbox 
  //name = first name/ last name
  const { classes } = useStyles();
  const [form, setForm] = useState(defaultRegisterData)
  const [errorMessages, setErrorMessages] = useState(defaultRegisterErrorMessage);
  
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit', form)
  
    const { name, email, password, password2, checkbox1, checkbox2 } = form;
    if (!name || !email || !password || !password2) {
      const emptyInputError: Record<string, string> = {};
      Object.entries(form).forEach(([key, value]) => {
        if (!value) {
          emptyInputError[key] = `Please enter ${key}`;
        }

        if (key === "checkbox1" && !value) {
          emptyInputError[key] = "Please check checkbox1";
        } else if (key === "checkbox2" && !value) {
          emptyInputError[key] = "Please check checkbox2";
        }
      });
      setErrorMessages(emptyInputError);
    } else if (password !== password2) {
      setErrorMessages(prevState => ({
        ...prevState,
        password2: 'Please confirm your password',
      }));
    } else {
      setErrorMessages(defaultRegisterErrorMessage)
      console.log('submit', form)
    }
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setForm({...form, [name]: value})
  }
  
  useEffect(() => {
    console.log('form', form);
    console.log('errorMessages', errorMessages);
  }, [form, errorMessages]);

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
        {/* Register */}
        <Container py={250} size={1400}>
          <Title align="center" size={45} weight={700} mb={65} order={1}>
            SIGN UP
          </Title>
            <form action="" onSubmit={handleSignUp}>
              <Container size={430}>
                  <Stack spacing={20}>
                    <Input.Wrapper>
                      <TextInput 
                        placeholder="Name" 
                        radius={5} 
                        size="xl" 
                        value={form.name} 
                        onChange={handleInputChange}
                        name="name" 
                        error={errorMessages.name}
                      />
                    </Input.Wrapper>
                    <Input.Wrapper>
                      <TextInput 
                        placeholder="Email" 
                        radius={5} 
                        size="xl" 
                        value={form.email} 
                        onChange={handleInputChange}
                        name="email"
                        error={errorMessages.email}
                      />
                    </Input.Wrapper>
                    <Input.Wrapper>
                      <PasswordInput
                        placeholder="Your password"
                        radius={5}
                        size="xl"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                        defaultValue="secret"
                          visibilityToggleIcon={({ reveal, size }) =>
                            reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
                        }
                        error={errorMessages.password}
                      />
                    </Input.Wrapper>
                    <Input.Wrapper>
                      <PasswordInput
                        placeholder="Re-enter Your password"
                        radius={5}
                        size="xl"
                        name="password2"
                        value={form.password2}
                        onChange={handleInputChange}
                        defaultValue="secret"
                          visibilityToggleIcon={({ reveal, size }) =>
                            reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
                        }
                        error={errorMessages.password2}
                      />
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
                      gradient={ConstantStyle.STYLE_BTN_COLOR}
                      fullWidth
                      size="xl"
                      p={12}
                      radius={5}
                      uppercase
                      type="submit"
                    >
                      Sign Up
                    </Button>
                    {/* <Button
                      variant="outline"
                      color="pink"
                      fullWidth
                      size="xl"
                      p={12}
                      radius={5}
                      uppercase
                    >
                      <Anchor 
                        component={Link} underline={false} to="/Login"
                      >
                        Sign In
                      </Anchor>
                    </Button> */}
                  </Stack>
              </Container>
            </form>
        </Container>
        {/* FOOTER */}
        <LandingFooter />
      </MantineProvider>
    </>
  );
};

export default Login;
