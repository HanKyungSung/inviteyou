import { useEffect, useState } from 'react';
import { Button, Grid, Table, Text, Modal } from '@mantine/core';
import { getParticipants } from '../utils/rsvpUtils';
import { deleteParticipateApi } from '../utils/ParticipateUtils';
import { useAuth } from '../hooks/useAuth';

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

const initialConfirmModal = {
  open: false,
  name: ""
};

const SamHanList = (props: ISamHanList) => {
  const { subdomain } = props;
  const { user } = useAuth();
  const [confirmModal, setConfirmModal] = useState<IConfirmModal>(initialConfirmModal);
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
  }

  const handleDeleteRow = async () => {
    const response = await deleteParticipateApi(confirmModal.name);

    if (response.status === 202) {
      await getParticipantList();
    }

    await setConfirmModal(initialConfirmModal);
  };

  let totalAdultCounts = 0;
  let totalChildren = 0;

  const rows = participants.map(participant => {
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
        <td><Button onClick={() => openConfirmModal(participant.name)}>Remove</Button></td>
      </tr>
    );
  });
    
  return (
    <Grid>
      <Modal
        opened={confirmModal.open}
        onClose={() => setConfirmModal({
          ...confirmModal,
          open: false
        })}
        title={<Text>Are you sure remove <b>{confirmModal.name}</b>?</Text>}
        centered
      >
        <Grid>
          <Grid.Col span="content">
            <Button
              color='red'
              onClick={() => handleDeleteRow()}
            >
              Yes
            </Button>
          </Grid.Col>
          <Grid.Col span="content">
            <Button onClick={() => setConfirmModal(initialConfirmModal)}>No</Button>
          </Grid.Col>
        </Grid>
      </Modal>
      <Grid.Col span={6}>
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
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Grid.Col>
    </Grid>
  )
};

export default SamHanList;
