import { useEffect, useState } from 'react';
import { Button, Container, Grid, Modal, Table, Text } from '@mantine/core';
import { getParticipants } from '../utils/rsvpUtils';
import { deleteParticipateSecondApi } from '../utils/ParticipateUtils';
import { Visual3RSVPForm } from './Visual3RSVPForm';
import { SubmitInfo } from '../common/interfaces';

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
  _id?: object;
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
const Visual3List = ({ subdomain }: Visual3ListProps) => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [confirmModal, setConfirmModal] =
    useState<IConfirmModal>(initialConfirmModal);
  const [editModal, setEditModal] = useState<IEditModal>(initEditModal);

  const getParticipantList = async () => {
    const response = await getParticipants(subdomain);
    const json = await response.json();
    console.log(json);
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

const EditModal = (props: IEditModalProps) => {
  const { opened, setModalOpen, getParticipantList, user, subdomain } = props;

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setModalOpen(false)}
      title={`UPDATE THE PARTICIPATE ${user.name}`}
      size="xl"
    >
      <Visual3RSVPForm
        _id={user._id}
        subdomain={subdomain}
        actionType="POST"
        opened={false}
        setModalOpen={setModalOpen}
        getParticipantList={getParticipantList}
        onSubmit={(submitInfo: SubmitInfo) => {
          console.log(submitInfo);
        }}
      />
    </Modal>
  );
};

export default Visual3List;
