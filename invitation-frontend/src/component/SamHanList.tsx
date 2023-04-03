import { useEffect, useState } from 'react';
import { Grid, Table } from '@mantine/core';
import { getParticipants } from '../utils/rsvpUtils';

interface HanSungList {
  subdomain: string;
}

interface Participant {
  name: string;
  numberOfParticipate?: number;
  participate: string;
  menu?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

const HanSungList = (props: HanSungList) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  
  useEffect(() => {
    const { subdomain } = props;
    const getParticipantList = async () => {
      const response = await getParticipants(subdomain);
      const json = await response.json();

      setParticipants(json);
    };

    getParticipantList();
  }, []);

  const rows = participants.map(participant => (
    <tr key={participant.name}>
      <td>{participant.name}</td>
      <td>{participant.numberOfParticipate}</td>
      <td>{participant.participate}</td>
      <td>{participant.menu}</td>
      <td>{participant.note}</td>
      <td>{participant.createdAt}</td>
      <td>{participant.updatedAt}</td>
    </tr>
  ));
    
  return (
    <Grid>
      <Grid.Col span={6}>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number of guest</th>
              <th>Participate</th>
              <th>Menu</th>
              <th>Note</th>
              <th>Submission Date</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Grid.Col>
    </Grid>
  )
};

export default HanSungList;
