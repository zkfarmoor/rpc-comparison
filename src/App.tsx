// @ts-nocheck
import {
  Button,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useEndpointWithResponseTime } from './hooks/useEndpointWithResponseTime';
import { useProvider } from './hooks/useProvider';

function App() {
  const alchemyProvider = useProvider('alchemy');
  const ankrProvider = useProvider('ankr');
  const quiknodeProvider = useProvider('quiknode');
  const oneRpcProvider = useProvider('1rpc');
  const { responseTime: alchemyResponseTime, refetch: refetchAlchemy } =
    useEndpointWithResponseTime(
      alchemyProvider as ethers.providers.Provider,
      'getBlockNumber'
    );
  const { responseTime: ankrResponseTime, refetch: refetchAnkr } =
    useEndpointWithResponseTime(
      ankrProvider as ethers.providers.Provider,
      'getBlockNumber'
    );
  const { responseTime: quiknodeResponseTime, refetch: refetchQuiknode } =
    useEndpointWithResponseTime(
      quiknodeProvider as ethers.providers.Provider,
      'getBlockNumber'
    );
  const { responseTime: oneRpcResponseTime, refetch: refetchOneRpc } =
    useEndpointWithResponseTime(
      oneRpcProvider as ethers.providers.Provider,
      'getBlockNumber'
    );

  const refetch = async () => {
    refetchAlchemy();
    refetchAnkr();
    refetchQuiknode();
    refetchOneRpc();
  };
  return (
    <VStack paddingY='20'>
      <Heading>RPC Latency</Heading>
      <TableContainer>
        <Table variant='striped'>
          <TableCaption>Fetched with "eth_getBlockNumber" endpoint</TableCaption>
          <Thead>
            <Tr>
              <Th>RPC provider</Th>
              <Th isNumeric>Response time (in ms)</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Ankr</Td>
              <Td isNumeric>{ankrResponseTime || 'rekt'}</Td>
            </Tr>
            <Tr>
              <Td>Alchemy</Td>
              <Td isNumeric>{alchemyResponseTime || 'rekt'}</Td>
            </Tr>
            <Tr>
              <Td>Quiknode</Td>
              <Td isNumeric>{quiknodeResponseTime || 'rekt'}</Td>
            </Tr>
            <Tr>
              <Td>1RPC</Td>
              <Td isNumeric>{oneRpcResponseTime || 'rekt'}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={refetch}>🔁 Refresh</Button>
    </VStack>
  );
}

export default App;
