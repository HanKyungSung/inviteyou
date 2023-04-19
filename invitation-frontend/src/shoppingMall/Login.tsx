import {
  Title,
  Container,
  createStyles,
  Button,
  Anchor,
  Stack,
  MantineProvider,
  PasswordInput,
  Input,
  TextInput
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons';

import LandingHeader from '../common/LandingHeader';
import LandingFooter from '../common/LandingFooter';

import * as Constant from './Constant';
import * as ConstantStyle from '../common/Constant';

import { useState } from 'react';

const defaultLoginData = {
  email : "",
  password : ""
}

const defaultLoginErrorMessage : Record<string, string> = {
  email : "",
  password : ""
}

const Login = () => {
  const [form, setForm] = useState(defaultLoginData)
  const [errorMessages, setErrorMessages] = useState(defaultLoginErrorMessage)
  const [submitForm, setSubmitForm] = useState(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emptyInputError : Record<string, string> = {}

  const handleValidateInput = (name: keyof typeof form, value: string): string => {
    let errorMessage = "";
    switch (name) {
      case "email":
        if (!value) {
          errorMessage = Constant.EMPTY_EMAIL_ERROR;
        } else if (typeof value === "string" && !emailRegex.test(value)) {
          errorMessage = Constant.EMAIL_REGEX_ERROR;
        }
        break;
      case "password":
        if (!value) {
          errorMessage = Constant.EMPTY_PASSWORD1_ERROR;
        } else if (typeof value === "string" && (value.length < 8 || value.length > 16)) {
          errorMessage = Constant.PASSWORD_REGEX_ERROR;
        }
        break;
        default:
        break;
    }
    return errorMessage;
  }

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitForm(true);
    
    let inputErrors:Record<string, string> = {};
    for (let name in form) {
      const errorMessage = handleValidateInput(name as keyof typeof form, form[name as keyof typeof form])
      if (errorMessage) {
        inputErrors[name] = errorMessage;
      }
    }
    setErrorMessages(inputErrors);
  
    if (Object.keys(emptyInputError).length === 0) {
      console.log(form);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const errorMessage: string = handleValidateInput(name as keyof typeof form, value);
    setErrorMessages((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

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
        {/* LOGIN */}
        <Container py={250} size={1400}>
          <Title align="center" size={45} weight={700} mb={65} order={1}>
            SIGN IN
          </Title>
          <form action="" onSubmit={handleSignIn}>
            <Container size={430}>
              <Stack>
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
                    maxLength={16}
                    value={form.password}
                    onChange={handleInputChange}
                    defaultValue="secret"
                      visibilityToggleIcon={({ reveal, size }) =>
                        reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
                    }
                    error={errorMessages.password}
                  />
                </Input.Wrapper>
                <Stack spacing={30}>
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
                    Sign In
                  </Button>
                  {/* <Grid>
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
                  </Grid> */}
                  <Button
                    variant="outline"
                    color="pink"
                    fullWidth
                    size="xl"
                    p={12}
                    radius={5}
                    mb={30}
                    uppercase
                    type="submit"
                  >
                    <Anchor component={Link} underline={false} to="/Register">
                      Sign Up
                    </Anchor>
                  </Button>
                  {/* <Grid>
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
                  </Grid> */}
                </Stack>
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