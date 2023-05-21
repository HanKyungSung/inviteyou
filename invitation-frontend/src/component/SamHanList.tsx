import { useEffect, useState } from 'react';
import { Button, Grid, Table, Text } from '@mantine/core';
import { getParticipants } from '../utils/rsvpUtils';
import { deleteParticipateApi } from '../utils/ParticipateUtils';

interface SamHanList {
  subdomain: string;
}

interface Participant {
  name: string;
  adultCount: number;
  childCount: number;
  participate: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

const SamHanList = (props: SamHanList) => {
  const { subdomain } = props;
  const [participants, setParticipants] = useState<Participant[]>([]);

  const getParticipantList = async () => {
    const response = await getParticipants(subdomain);
    const json = await response.json();

    setParticipants(json);
  };
  
  useEffect(() => {
    getParticipantList();
  }, []);

  const handleDeleteRow = async (participantName: string) => {
    const response = await deleteParticipateApi(participantName);

    if (response.status === 202) {
      getParticipantList();
    }

    console.log(response.statusText);
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
        <td><Button onClick={() => handleDeleteRow(participant.name)}>Remove</Button></td>
      </tr>
    );
  });
    
  return (
    <Grid>
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
