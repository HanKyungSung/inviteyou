import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Table,
  Text,
  Modal,
  Input,
  Radio,
  NumberInput
} from '@mantine/core';
import { getParticipants, sendRsvpApiSecondVersion } from '../utils/rsvpUtils';
import { deleteParticipateApi } from '../utils/ParticipateUtils';
// import { useAuth } from '../hooks/useAuth';

interface ISamHanList {
  subdomain: string;
}

interface IParticipant {
  name: string;
  adultCount: number;
  childCount: number;
  participate: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

interface IConfirmModal {
  open: boolean;
  name: string;
}

interface IEditableUser {
  name: string;
  participate: string;
  adultCount: number;
  childCount: number;
  note: string;
}

interface IEditModal {
  open: boolean;
  user: IEditableUser;
}

const initialConfirmModal = {
  open: false,
  name: ''
};

const initEditModal = {
  open: false,
  user: {
    name: '',
    participate: 'yes',
    adultCount: 0,
    childCount: 0,
    note: ''
  }
};

const SamHanList = (props: ISamHanList) => {
  const { subdomain } = props;
  // const { user } = useAuth();
  const [confirmModal, setConfirmModal] =
    useState<IConfirmModal>(initialConfirmModal);
  const [editModal, setEditModal] = useState<IEditModal>(initEditModal);
  const [participants, setParticipants] = useState<IParticipant[]>([]);

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
    const response = await deleteParticipateApi(confirmModal.name);

    if (response.status === 202) {
      await getParticipantList();
    }

    await setConfirmModal(initialConfirmModal);
  };

  let totalAdultCounts = 0;
  let totalChildren = 0;

  const rows = participants.map((participant) => {
    totalAdultCounts += participant.adultCount;
    totalChildren += participant.childCount;

    return (
      <tr key={participant.name}>
        <td>{participant.name}</td>
        <td>{participant.participate}</td>
        <td>{participant.adultCount}</td>
        <td>{participant.childCount}</td>
        <td>{participant.note}</td>
        <td>{participant.createdAt}</td>
        <td>{participant.updatedAt}</td>
        <td>
          <Button onClick={() => openConfirmModal(participant.name)}>
            Remove
          </Button>
        </td>
        <td>
          <Button
            onClick={() =>
              setEditModal({
                open: true,
                user: {
                  name: participant.name,
                  participate: participant.participate,
                  adultCount: participant.adultCount,
                  childCount: participant.childCount,
                  note: participant.note !== undefined ? participant.note : ''
                }
              })
            }
          >
            Edit
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Container fluid px={0}>
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
      <Modal
        opened={confirmModal.open}
        onClose={() =>
          setConfirmModal({
            ...confirmModal,
            open: false
          })
        }
        title={
          <Text>
            Are you sure remove <b>{confirmModal.name}</b>?
          </Text>
        }
        centered
      >
        <Grid>
          <Grid.Col span="content">
            <Button color="red" onClick={() => handleDeleteRow()}>
              Yes
            </Button>
          </Grid.Col>
          <Grid.Col span="content">
            <Button onClick={() => setConfirmModal(initialConfirmModal)}>
              No
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
      <Grid style={{ overflow: 'auto' }}>
        <Grid.Col span={12}>
          <Text>Total Rows: {participants.length}</Text>
          <Text>Total Adults: {totalAdultCounts}</Text>
          <Text>Total Children: {totalChildren}</Text>
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Participate</th>
                <th>Adult Count</th>
                <th>Child Count</th>
                <th>Note</th>
                <th>Submission Date</th>
                <th>Updated At</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Grid.Col>
      </Grid>
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
  nameExistsError: string;
  adultCountError: string;
}

const EditModal = (props: IEditModalProps) => {
  const {
    opened,
    setModalOpen,
    getParticipantList,
    user,
    subdomain,
    participants
  } = props;
  const [editedUser, setEditedUser] = useState<IEditableUser>({ ...user });
  const [disableSubmit, setdisableSubmit] = useState<boolean>(true);
  const [errors] = useState<IEditModalErrors>({
    nameError: 'Name can not be empty.',
    nameExistsError: 'Entered name exists already exists',
    adultCountError: 'Adult count must be greater than 0'
  });

  const filteredParticipants = participants.filter(
    (participant: IParticipant) => participant.name !== user.name
  );
  const foundParticipant = filteredParticipants.find(
    (participant: IParticipant) => participant.name === editedUser.name
  );

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  useEffect(() => {
    if (
      editedUser.name === user.name &&
      editedUser.participate === user.participate &&
      editedUser.adultCount === user.adultCount &&
      editedUser.childCount === user.childCount &&
      editedUser.note === user.note
    ) {
      setdisableSubmit(true);
      return;
    }

    // Validations
    if (editedUser.name === '') {
      setdisableSubmit(true);
      return;
    }

    if (foundParticipant) {
      setdisableSubmit(true);
      return;
    }

    if (editedUser.adultCount == 0) {
      setdisableSubmit(true);
      return;
    }

    setdisableSubmit(false);
  }, [editedUser]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await sendRsvpApiSecondVersion({
      ...editedUser,
      subdomain: subdomain
    });
    await setModalOpen(false);
    await getParticipantList();
  };

  const nameError = () => {
    if (editedUser.name === '') {
      return errors.nameError;
    } else if (foundParticipant) {
      return errors.nameExistsError;
    } else {
      return '';
    }
  };

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setModalOpen(false)}
      title="Update the participate"
    >
      <form onSubmit={handleSubmit}>
        <Input.Wrapper
          required
          id="edit-modal-name"
          label="Name"
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
          />
        </Input.Wrapper>
        <Radio.Group
          withAsterisk
          value={editedUser.participate}
          onChange={(e) =>
            setEditedUser({
              ...editedUser,
              participate: e
            })
          }
          name="participate"
          label="Participate"
          styles={{
            root: {
              marginBottom: '10px'
            }
          }}
        >
          <Radio value="yes" label="Yes" />
          <Radio value="no" label="No" />
        </Radio.Group>
        <NumberInput
          value={editedUser.adultCount}
          placeholder="Adult Count"
          label="Adult Count"
          withAsterisk
          min={0}
          error={editedUser.adultCount !== 0 ? '' : errors.adultCountError}
          onChange={(count: number) =>
            setEditedUser({
              ...editedUser,
              adultCount: count
            })
          }
          styles={{
            root: {
              marginBottom: '10px'
            }
          }}
        />
        <NumberInput
          value={editedUser.childCount}
          placeholder="Child Count"
          label="Child Count"
          min={0}
          onChange={(count: number) =>
            setEditedUser({
              ...editedUser,
              childCount: count
            })
          }
          styles={{
            root: {
              marginBottom: '10px'
            }
          }}
        />
        <label>Note</label>
        <textarea
          name="note"
          id="note"
          cols={30}
          rows={10}
          value={editedUser.note}
          placeholder="Please provide us any food restriction you have "
          onChange={(e) =>
            setEditedUser({
              ...editedUser,
              note: e.currentTarget.value
            })
          }
          style={{
            width: '100%'
          }}
        />
        <Grid>
          <Grid.Col span="content">
            <Button type="submit" color="red" disabled={disableSubmit}>
              Yes
            </Button>
          </Grid.Col>
          <Grid.Col span="content">
            <Button onClick={() => setModalOpen(false)}>No</Button>
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  );
};

export default SamHanList;
