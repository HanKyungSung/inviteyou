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
  Checkbox,
  Text
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons';

import LandingHeader from '../common/LandingHeader';
import LandingFooter from '../common/LandingFooter';

import * as Constant from './Constant';
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
  firstName : "",
  lastName : "",
  email : "",
  password : "",
  password2 : "",
  checkbox1 : false,
  checkbox2 : false
}

const defaultRegisterErrorMessage: Record<string, string> = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  password2: "",
  checkbox1 : "",
  checkbox2 : ""
}

const Register = () => {
  const { classes } = useStyles();
  const [form, setForm] = useState(defaultRegisterData)
  const [errorMessages, setErrorMessages] = useState(defaultRegisterErrorMessage);
  const [submitForm, setSubmitForm] = useState(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emptyInputError: Record<string, string> = {};
  
  const handleValidateInput = (name: keyof typeof form, value: string | boolean): string => {
    let errorMessage = "";
    switch (name) {
      case "firstName":
        if (!value) {
          errorMessage = Constant.EMPTY_FIRST_NAME_ERROR;
        }
        break;
      case "lastName":
        if (!value) {
          errorMessage = Constant.EMPTY_LAST_NAME_ERROR;
        }
        break;
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
      case "password2":
        if (!value) {
          errorMessage = Constant.EMPTY_PASSWORD2_ERROR;
        } else if (typeof value === "string" && (value.length < 8 || value.length > 16)) {
          errorMessage = Constant.PASSWORD_REGEX_ERROR;
        } else if (value !== form.password) {
          errorMessage = Constant.PASSWORD2_CONFORM_ERROR;
        }
        break;
      case "checkbox1":
        if (!value) {
          emptyInputError.checkbox1 = Constant.EMPTY_CHECKBOX_ERROR;
        }
        break;
      case "checkbox2":
        if (!value) {
          emptyInputError.checkbox2 = Constant.EMPTY_CHECKBOX_ERROR;
        }
        break;
      default:
        break;
    }
    return errorMessage;
  }

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
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
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const errorMessage: string = handleValidateInput(name as keyof typeof form, value);
    setErrorMessages((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: checked,
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
                        placeholder="First Name" 
                        radius={5} 
                        size="xl" 
                        value={form.firstName} 
                        onChange={handleInputChange}
                        name="firstName" 
                        error={errorMessages.firstName}
                      />
                    </Input.Wrapper>
                    <Input.Wrapper>
                      <TextInput 
                        placeholder="Last Name" 
                        radius={5} 
                        size="xl" 
                        value={form.lastName} 
                        onChange={handleInputChange}
                        name="lastName" 
                        error={errorMessages.lastName}
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
                    <Input.Wrapper>
                      <PasswordInput
                        placeholder="Re-enter Your password"
                        radius={5}
                        size="xl"
                        name="password2"
                        maxLength={16}
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
                        <Checkbox 
                          label="Privacy Policy"
                          color="pink"
                          size="md" 
                          name="checkbox1"
                          checked={form.checkbox1}
                          onChange={handleCheckboxChange}
                        />
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
                        <Checkbox 
                          label="Agreement"
                          color="pink"
                          size="md"
                          name="checkbox2"
                          checked={form.checkbox2}
                          onChange={handleCheckboxChange}
                        />
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
                    <Text color="red" size={18}>
                      {submitForm && (!form.checkbox1 || !form.checkbox2) && (
                        <Text color="red" size={18}>
                          Please check both Privacy Policy and Agreement
                        </Text>
                      )}
                    </Text>
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
                    <Button
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
                    </Button>
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

export default Register;
