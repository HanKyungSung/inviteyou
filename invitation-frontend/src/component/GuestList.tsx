import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Grid, Table } from '@mantine/core';
import { getParticipants } from '../utils/rsvpUtils';
import { Participant } from '../common/interfaces';

interface GuestListProps {
  subdomain: string;
}

const unuseProperties = [ '__v' ];

const GuestList = (props: GuestListProps) => {
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

  if (participants.length > 0) {
    const headerProperties = Object.keys(participants[0]);
    const filteredProperties = headerProperties.filter(headerProperty => !unuseProperties.includes(headerProperty))
    const headers = filteredProperties
      .map(headerProperty => headerProperty.charAt(0).toUpperCase() + headerProperty.slice(1))
      .map(header => {
        return (
          <th key={header}>{header}</th>
        )
      })

    const rows = participants.map(participant => {
      const tableDataCell = filteredProperties.map(header => <td>{participant[header]}</td>)

      return (
        <tr key={participant.name}>
          {tableDataCell}
        </tr>
      )
      });

    return (
      <Grid>
        <Grid.Col span={6}>
          {participants.length > 0 ?
            <>
              <Text>Total Guest: {participants.length}</Text>
              <Table striped>
                <thead>
                  <tr>
                    {headers}
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </>
            :
            <></>
          }
        </Grid.Col>
      </Grid>
    )
  } else {
    return <></>;
  }
};

export default GuestList;
