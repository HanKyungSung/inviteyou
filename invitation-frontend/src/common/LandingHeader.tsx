import {
  Header,
  Grid,
  Text,
  Container,
  createStyles,
  Button,
  Group,
  Anchor,
  MantineProvider
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconSearch, IconMenu2 } from '@tabler/icons';

import * as ConstantStyle from '../common/Constant';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((_theme, _params, _getRef) => ({
  header: {
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
    fontSize: 25,
    fontWeight: 400,
    color: ConstantStyle.COLOR_BLACK
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
  }
}));

const LandingHeader = () => {
  const { classes } = useStyles();
  const RESPONSIVE_MOBILE = useMediaQuery('(max-width: 767px)');

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
        <Header
          height={RESPONSIVE_MOBILE ? 60 : 90}
          className={classes.header}
          py={RESPONSIVE_MOBILE ? 10 : 25}
        >
          <Container size={1400}>
            <Grid justify="space-between" align="center">
              <Grid.Col span={6}>
                <Container
                  className={classes.headerLeft}
                  px={RESPONSIVE_MOBILE ? 0 : 20}
                >
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
                  <Group
                    className={classes.gnbLists}
                    style={{ display: RESPONSIVE_MOBILE ? 'none' : 'block' }}
                  >
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
                      gradient={ConstantStyle.STYLE_BTN_COLOR}
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
              <Grid.Col span="content">
                <Container
                  className={classes.headerRight}
                  px={RESPONSIVE_MOBILE ? 0 : 20}
                >
                  <Group
                    className={classes.gnbLists}
                    style={{ display: RESPONSIVE_MOBILE ? 'none' : 'block' }}
                  >
                    <Anchor
                      component={Link}
                      underline={false}
                      className={classes.gnbList}
                      to="/Login"
                    >
                      Log in
                    </Anchor>
                    <Button
                      color={ConstantStyle.SECONDARY_COLOR}
                      className={classes.gnbList}
                      styles={{
                        root: { backgroundColor: ConstantStyle.SECONDARY_COLOR }
                      }}
                      size="md"
                      p={12}
                      uppercase
                    >
                      <Anchor component={Link} underline={false} to="/Register">
                        Sign up
                      </Anchor>
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
      </MantineProvider>
    </>
  );
};

export default LandingHeader;
