import { Button, Input, MantineTheme, Radio, Text } from '@mantine/core';
import { useState } from 'react';
import { sendRsvpApiThirdVersion } from '../utils/rsvpUtils';
import { SubmitInfo } from '../common/interfaces';
import { sendPostRsvpApi } from '../utils/ParticipateUtils';
import { ModalInfo, useStyles } from './Visual3';

interface Visual3RSVPFormProps {
  _id?: object;
  subdomain: string;
  actionType: 'POST' | 'PUT';
  onSubmit: (info: SubmitInfo) => void;
  opened?: boolean;
  setModalOpen?: (opened: boolean) => void;
  getParticipantList?: () => void;
}
const radioGroupStyle = {
  root: {
    marginBottom: '20px !important'
  },
  required: {
    color: 'red !important'
  },
  label: {
    fontSize: 16,
    marginBottom: '16px !important',
    marginTop: '16px !important'
  },
  error: {
    color: 'red !important',
    marginTop: '10px !important'
  }
};
const radioButtonStyle = {
  body: {
    cursor: 'pointer'
  },
  icon: {
    color: 'rgb(180, 152, 133)',
    width: '12px',
    height: '12px',
    top: 'calc(50% - 6px)',
    left: 'calc(50% - 6px)',
    cursor: 'pointer'
  },
  radio: {
    cursor: 'pointer',
    ':checked': {
      backgroundColor: '#fff',
      border: '1px solid rgb(180, 152, 133)'
    },
    '&::after': {
      backgroundColor: 'rgb(180, 152, 133)',
      borderColor: 'rgb(180, 152, 133)'
    }
  }
};
const optionStyle = (theme: MantineTheme, isClicked: boolean) => ({
  root: {
    flex: 1,
    marginRight: 10,
    marginTop: '3px',
    '&:not([data-disabled])': theme.fn.hover({
      backgroundColor: theme.fn.darken('#B39884', 0.05)
    }),
    backgroundColor: isClicked ? 'rgb(180, 152, 133)' : 'rgb(204, 204, 204)'
  }
});
export const calendarContainer = {
  border: '40px solid rgb(180, 152, 133)',
  color: '#bbbbbb',
  padding: '20px'
};
const inputWrapperStyle = {
  root: {
    marginBottom: '16px !important'
  },
  required: {
    color: 'red !important'
  },
  label: {
    fontFamily: 'KoPub Batang',
    fontSize: '16px'
  },
  error: {
    color: 'red !important',
    marginTop: '10px !important'
  }
};
const inputStyle = {
  wrapper: {
    'input::placeholder': {
      margin: '16px 0',
      fontSize: '16px'
    },
    padding: '16px 0 10px 0 !important',
    borderBottom: '1px solid #ddd !important'
  },
  input: {
    fontSize: '16px'
  }
};
const NAME_INPUT_ERROR = 'Please enter your name';
const RSVP_INPUT_ERROR = 'Please choose your attendance';
const SIDE_INPUT_ERROR = 'Please choose your side';
const MENU_INPUT_ERROR = 'Please select an option';
export const initModalInfo: ModalInfo = {
  opened: false,
  submitInfo: {
    name: '',
    participate: '',
    side: '',
    menu: '',
    note: ''
  }
};

export const Visual3RSVPForm = (props: Visual3RSVPFormProps) => {
  const {
    _id,
    subdomain,
    actionType,
    setModalOpen,
    onSubmit,
    getParticipantList
  } = props;

  const { classes } = useStyles();

  const [name, setName] = useState<string>('');
  const [rsvp, setRsvp] = useState<string>('');
  const [side, setSide] = useState<string>('');
  const [menu, setMenu] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const [isFirstOptionClicked, setIsFirstOptionClicked] =
    useState<boolean>(false);
  const [isSecondOptionClicked, setIsSecondOptionClicked] =
    useState<boolean>(false);

  const [isNameValidated, setIsNameValidated] = useState<boolean>(false);
  const [isRsvpValidated, setIsRsvpValidated] = useState<boolean>(false);
  const [isSideValidated, setIsSideValidated] = useState<boolean>(false);
  const [isMenuValidated, setIsMenuValidated] = useState<boolean>(false);

  const [initForm, setInitForm] = useState<boolean>(true);
  const [initNameInput, setInitNameInput] = useState<boolean>(true);
  const [initMenuInput, setInitMenuInput] = useState<boolean>(true);

  const menuFontSize = {
    size: 12
  };

  const resetForm = () => {
    setInitForm(true);
    setInitNameInput(true);
    setInitMenuInput(true);

    setName('');
    setRsvp('');
    setSide('');
    setMenu('');
    setIsFirstOptionClicked(false);
    setIsSecondOptionClicked(false);
    setNote('');

    setIsNameValidated(false);
    setIsRsvpValidated(false);
    setIsSideValidated(false);
    setIsMenuValidated(false);
  };

  const createRsvpObject = () => ({
    _id: _id,
    name: name,
    participate: rsvp,
    side: side,
    menu: menu,
    note: note,
    subdomain
  });

  const resetFields = () => {
    if (!isNameValidated) setName('');
    if (!isRsvpValidated) setRsvp('');
    if (!isSideValidated) setSide('');
    if (!isMenuValidated) setMenu('');
  };

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setInitForm(false);

    resetFields();

    if (
      isNameValidated &&
      isRsvpValidated &&
      isSideValidated &&
      isMenuValidated
    ) {
      const rsvpDetails = createRsvpObject();

      if (actionType === 'PUT') {
        sendRsvpApiThirdVersion(rsvpDetails);
        onSubmit(rsvpDetails);
      } else {
        const response = await sendPostRsvpApi(rsvpDetails);
        if (response.ok) {
          setModalOpen?.(false);
          getParticipantList?.();
        } else {
          console.error('Error editing participant:', await response.text());
        }
      }

      resetForm();
    }
  };

  const handleOnChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.currentTarget.value;
    setName(newName);
    setInitNameInput(false);

    if (newName === '') {
      setIsNameValidated(false);
    } else {
      setIsNameValidated(true);
    }
  };

  const handleOnChangeRsvpInput = (rsvp: string) => {
    setRsvp(rsvp);

    if (rsvp === '') {
      setIsRsvpValidated(false);
    } else {
      setIsRsvpValidated(true);
    }
  };

  const handleOnchangeSideInput = (side: string) => {
    setSide(side);

    if (side === '') {
      setIsSideValidated(false);
    } else {
      setIsSideValidated(true);
    }
  };

  const handleOptionClick = (option: 'firstOption' | 'secondOption') => {
    setInitMenuInput(false);
    setIsMenuValidated(true);

    if (option === 'firstOption') {
      setMenu('MENU_OPTION_1');
      setIsFirstOptionClicked(true);
      setIsSecondOptionClicked(false);
    } else if (option === 'secondOption') {
      setMenu('MENU_OPTION_2');
      setIsSecondOptionClicked(true);
      setIsFirstOptionClicked(false);
    }
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <Input.Wrapper
        label="NAME"
        styles={inputWrapperStyle}
        required
        error={
          name === '' && (!initNameInput || !initForm) ? NAME_INPUT_ERROR : ''
        }
      >
        <Input
          id="name-input"
          placeholder="Please enter your full name"
          variant="unstyled"
          name="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChangeNameInput(e)
          }
          styles={inputStyle}
        />
      </Input.Wrapper>
      <Radio.Group
        label="ATTENDANCE"
        styles={radioGroupStyle}
        required
        value={rsvp}
        onChange={(rsvp) => handleOnChangeRsvpInput(rsvp)}
        error={rsvp === '' && !initForm ? RSVP_INPUT_ERROR : ''}
      >
        <Radio
          name="ATTENDANCE"
          label="Yes"
          value="yes"
          styles={radioButtonStyle}
        />
        <Radio
          name="ATTENDANCE"
          label="No"
          value="no"
          styles={radioButtonStyle}
        />
      </Radio.Group>
      <Radio.Group
        label="INVITED FROM"
        styles={radioGroupStyle}
        required
        value={side}
        onChange={(side) => handleOnchangeSideInput(side)}
        error={side === '' && !initForm ? SIDE_INPUT_ERROR : ''}
      >
        <Radio
          name="INVITED FROM"
          label="Bride Side"
          value="bride"
          styles={radioButtonStyle}
        />
        <Radio
          name="INVITED FROM"
          label="Groom Side"
          value="groom"
          styles={radioButtonStyle}
        />
        <Radio
          name="INVITED FROM"
          label="Both Side"
          value="both"
          styles={radioButtonStyle}
        />
      </Radio.Group>
      <div>
        <div>
          <Text size={16}>
            MENU<span className={classes.asteriskColor}> *</span>
          </Text>
        </div>
        <div className={classes.menuContainer}>
          <div
            className={`${classes.menu} ${
              isFirstOptionClicked ? classes.clickedMenu : ''
            }`}
            onClick={() => handleOptionClick('firstOption')}
          >
            <Text {...menuFontSize} mb={10}>
              OPTION 01
            </Text>
            <Text {...menuFontSize}>Tomato Pasta</Text>
            <Text {...menuFontSize}>Turkey Salad</Text>
            <Text {...menuFontSize}>Chicken Wings</Text>
            <Text {...menuFontSize}>Fruit Plater</Text>
            <Text {...menuFontSize} mb={10}>
              Chocolate Cake
            </Text>
            <Text {...menuFontSize} mb={10}>
              Free Drink
            </Text>
          </div>
          <div
            className={`${classes.menu} ${
              isSecondOptionClicked ? classes.clickedMenu : ''
            }`}
            onClick={() => handleOptionClick('secondOption')}
          >
            <Text {...menuFontSize} mb={10}>
              OPTION 02
            </Text>
            <Text {...menuFontSize}>Tomato Pasta</Text>
            <Text {...menuFontSize}>Turkey Salad</Text>
            <Text {...menuFontSize}>Chicken Wings</Text>
            <Text {...menuFontSize}>Fruit Plater</Text>
            <Text {...menuFontSize} mb={10}>
              Chocolate Cake
            </Text>
            <Text {...menuFontSize} mb={10}>
              Free Drink
            </Text>
          </div>
        </div>
        <div className={classes.menuContainer}>
          <Button
            onClick={() => handleOptionClick('firstOption')}
            styles={(theme) => optionStyle(theme, isFirstOptionClicked)}
            radius="xs"
            uppercase
          >
            Select This Menu
          </Button>
          <Button
            onClick={() => handleOptionClick('secondOption')}
            styles={(theme) => optionStyle(theme, isSecondOptionClicked)}
            radius="xs"
            uppercase
          >
            Select This Menu
          </Button>
        </div>

        {menu === '' && (!initMenuInput || !initForm) ? (
          <Text size={12} mt={10} className={classes.error}>
            {MENU_INPUT_ERROR}
          </Text>
        ) : (
          ''
        )}
      </div>
      {/* Menu End */}
      <div className={classes.marginTopForty}>
        <label htmlFor="note">Allegetic Note</label>
        <textarea
          name="note"
          id="note"
          cols={30}
          rows={10}
          value={note}
          placeholder="Please provide us any food restriction you have "
          className={classes.textarea}
          onChange={(e) => setNote(e.currentTarget.value)}
        ></textarea>
      </div>
      <button className={classes.customButton} type="submit">
        SUBMIT
      </button>
    </form>
  );
};
