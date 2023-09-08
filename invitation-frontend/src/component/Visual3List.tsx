import { useEffect, useState } from 'react';
import { Button, Container, Table, Text } from '@mantine/core';
import { getParticipants } from '../utils/rsvpUtils';
import { deleteParticipateSecondApi } from '../utils/ParticipateUtils';

interface Visual3ListProps {
  subdomain: string;
}

interface Participant {
  name: string;
  participate: string;
  side: string;
  menu: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

const Visual3List = ({ subdomain }: Visual3ListProps) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const getParticipantList = async () => {
    const response = await getParticipants(subdomain);
    const json = await response.json();

    setParticipants(json);
  };

  useEffect(() => {
    getParticipantList();
  }, []);

  const handleDeleteRow = async (name: string) => {
    const response = await deleteParticipateSecondApi(name);

    if (response.ok) {
      await getParticipantList();
    } else {
      console.error('Error deleting participant:', await response.text());
    }
  };

  return (
    <Container fluid px={0}>
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
                <Button onClick={() => handleDeleteRow(participant.name)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Visual3List;
