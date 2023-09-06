import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/Logo';

const Homepage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/create-url');
  };

  return (
    <Box p={{ sm: '1rem' }}>
      <Card
        align='center'
        bg={'white.400'}
        height={{ base: '40vh', sm: '45vh', md: '50vh', lg: '50vh' }}
        w={{ lg: '50%' }}
        m={'0 auto'}
        border={'1px'}
        borderRadius={['md']}
        boxShadow={['lg']}>
        <CardHeader>
          <Box w={{ sm: '6em', lg: '6em' }} m='0 auto'>
            <Logo />
          </Box>

          <Heading fontSize={{ sm: '1.5rem', md: '1.8rem', lg: '2.5rem' }}>
            URL Shortner{' '}
            <span>
              <ExternalLinkIcon
                mx='2px'
                fontSize={{ sm: '1.3rem', md: '1.6rem', lg: '2rem' }}
              />
            </span>
          </Heading>
        </CardHeader>
        <CardBody display='flex' alignItems={'center'}>
          <Text fontSize={{ sm: '1rem', md: '1.2rem', lg: '1.6rem' }}>
            Create a short link in a click.
          </Text>
        </CardBody>
        <CardFooter>
          <Button
            colorScheme='telegram'
            variant='outline'
            onClick={handleNavigate}>
            Create your URL Short
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default Homepage;
