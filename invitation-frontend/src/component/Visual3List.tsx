import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Input,
  Modal,
  Radio,
  Table,
  Text
} from '@mantine/core';
import { getParticipants } from '../utils/rsvpUtils';
import {
  deleteParticipateSecondApi,
  sendPostRsvpApi
} from '../utils/ParticipateUtils';

interface Visual3ListProps {
  subdomain: string;
}

interface IParticipant {
  _id: object;
  name: string;
  participate: string;
  side: string;
  menu: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

const initialConfirmModal = {
  open: false,
  name: ''
};

const initEditModal = {
  open: false,
  user: {
    _id: {},
    name: '',
    participate: '',
    side: '',
    menu: '',
    note: ''
  }
};

interface IEditableUser {
  _id: object;
  name: string;
  participate: string;
  side: string;
  menu: string;
  note: string;
}

interface IEditModal {
  open: boolean;
  user: IEditableUser;
}

interface IConfirmModal {
  open: boolean;
  name: string;
}

interface ConfirmDeleteModalProps {
  confirmModal: IConfirmModal;
  setConfirmModal: (modal: { open: boolean; name: string }) => void;
  handleDeleteRow: () => void;
  initialConfirmModal: {
    open: boolean;
    name: string;
  };
}

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

const Visual3List = ({ subdomain }: Visual3ListProps) => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [confirmModal, setConfirmModal] =
    useState<IConfirmModal>(initialConfirmModal);
  const [editModal, setEditModal] = useState<IEditModal>(initEditModal);

  const getParticipantList = async () => {
    const response = await getParticipants(subdomain);
    const json = await response.json();

    setParticipants(json);
  };

  useEffect(() => {
    getParticipantList();
  }, []);

  const openConfirmModal = (participantName: string) => {
    setConfirmModal({ open: true, name: participantName });
  };

  const handleDeleteRow = async () => {
    const response = await deleteParticipateSecondApi(confirmModal.name);

    if (response.ok) {
      await getParticipantList();
    } else {
      console.error('Error deleting participant:', await response.text());
    }

    setConfirmModal(initialConfirmModal);
  };

  const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    confirmModal,
    setConfirmModal,
    handleDeleteRow,
    initialConfirmModal
  }) => {
    const handleCloseModal = () => {
      setConfirmModal({
        ...confirmModal,
        open: false
      });
    };

    const handleCancelDeletion = () => {
      setConfirmModal(initialConfirmModal);
    };

    return (
      <Modal
        opened={confirmModal.open}
        onClose={handleCloseModal}
        centered
        title={
          <Text>
            Are you sure to remove <b>{confirmModal.name}?</b>
          </Text>
        }
      >
        <Grid>
          <Grid.Col span="content">
            <Button color="red" onClick={handleDeleteRow}>
              YES
            </Button>
          </Grid.Col>
          <Grid.Col span="content">
            <Button onClick={handleCancelDeletion}>NO</Button>
          </Grid.Col>
        </Grid>
      </Modal>
    );
  };

  return (
    <Container fluid px={0}>
      {/* Edit Modal */}
      <EditModal
        opened={editModal.open}
        setModalOpen={(opened) =>
          setEditModal({
            ...editModal,
            open: opened
          })
        }
        getParticipantList={getParticipantList}
        user={editModal.user}
        participants={participants}
        subdomain={subdomain}
      />
      {/* Delete Confirm Modal */}
      <ConfirmDeleteModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        handleDeleteRow={handleDeleteRow}
        initialConfirmModal={initialConfirmModal}
      />
      <Text>Total Rows: {participants.length}</Text>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Participate</th>
            <th>Side</th>
            <th>Menu</th>
            <th>Note</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.name}>
              <td>{participant.name}</td>
              <td>{participant.participate}</td>
              <td>{participant.side}</td>
              <td>{participant.menu}</td>
              <td>{participant.note}</td>
              <td>{new Date(participant.createdAt).toLocaleDateString()}</td>
              <td>{new Date(participant.updatedAt).toLocaleDateString()}</td>
              <td>
                <Button onClick={() => openConfirmModal(participant.name)}>
                  Remove
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    setEditModal({
                      open: true,
                      user: {
                        _id: participant._id,
                        name: participant.name,
                        participate: participant.participate,
                        side: participant.side,
                        menu: participant.menu,
                        note:
                          participant.note !== undefined ? participant.note : ''
                      }
                    });
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

interface IEditModalProps {
  opened: boolean;
  setModalOpen: (opened: boolean) => void;
  getParticipantList: () => void;
  user: IEditableUser;
  subdomain: string;
  participants: IParticipant[];
}

interface IEditModalErrors {
  nameError: string;
}

const EditModal = (props: IEditModalProps) => {
  const { opened, setModalOpen, getParticipantList, user, subdomain } = props;

  const [editedUser, setEditedUser] = useState<IEditableUser>({ ...user });

  const [errors] = useState<IEditModalErrors>({
    nameError: 'Name can not be empty'
  });

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  const nameError = () => {
    if (editedUser.name === '') {
      return errors.nameError;
    } else {
      return '';
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await sendPostRsvpApi({
      ...editedUser,
      subdomain: subdomain
    });

    if (response.ok) {
      await setModalOpen(false);
      await getParticipantList();
    } else {
      console.error('Error editing participant:', await response.text());
    }
  };

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setModalOpen(false)}
      title={`UPDATE THE PARTICIPATE ${user.name}`}
      size="xl"
    >
      <form onSubmit={handleSubmit}>
        <Input.Wrapper
          required
          id="edit-modal-name"
          label="NAME"
          error={nameError()}
          styles={{
            root: {
              marginBottom: '10px'
            }
          }}
        >
          <Input
            placeholder="Name"
            value={editedUser.name}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setEditedUser({
                ...editedUser,
                name: e.currentTarget.value
              });
            }}
            styles={inputStyle}
          />
          <Radio.Group
            withAsterisk
            value={editedUser.participate}
            onChange={(e) => {
              setEditedUser({
                ...editedUser,
                participate: e
              });
            }}
            name="participate"
            label="PARTICIPATE"
            styles={radioGroupStyle}
          >
            <Radio value="yes" label="Yes" styles={radioButtonStyle} />
            <Radio value="no" label="No" styles={radioButtonStyle} />
          </Radio.Group>
          <Radio.Group
            label="INVITED FROM"
            styles={radioGroupStyle}
            withAsterisk
            value={editedUser.side}
            onChange={(e) => {
              setEditedUser({
                ...editedUser,
                side: e
              });
            }}
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
          <Radio.Group
            label="MENU"
            value={editedUser.menu}
            onChange={(e) => {
              setEditedUser({
                ...editedUser,
                menu: e
              });
            }}
            styles={radioGroupStyle}
            withAsterisk
          >
            <Radio
              name="OPTION 1"
              label="OPTION 1"
              value="MENU_OPTION_1"
              styles={radioButtonStyle}
            />
            <Radio
              name="OPTION 2"
              label="OPTION 2"
              value="MENU_OPTION_2"
              styles={radioButtonStyle}
            />
          </Radio.Group>
          <label>NOTE</label>
          <textarea
            name="note"
            id="note"
            value={editedUser.note}
            onChange={(e) =>
              setEditedUser({
                ...editedUser,
                note: e.currentTarget.value
              })
            }
            cols={30}
            rows={10}
            placeholder="Please provide us any food restriction you have "
            style={{
              width: '100%'
            }}
          />
          <Grid>
            <Grid.Col span="content">
              <Button type="submit" color="red">
                Yes
              </Button>
            </Grid.Col>
            <Grid.Col span="content">
              <Button onClick={() => setModalOpen(false)}>No</Button>
            </Grid.Col>
          </Grid>
        </Input.Wrapper>
      </form>
    </Modal>
  );
};

export default Visual3List;
