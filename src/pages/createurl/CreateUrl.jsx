import React, { useEffect, useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Text,
  InputGroup,
  InputLeftAddon,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useToast,
  useClipboard,
  Flex,
  Divider,
} from '@chakra-ui/react';

const CreateUrl = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  const isError = originalUrl === '';
  const placeholder = 'Link to be copied...';

  useEffect(() => {
    setTimeout(() => {
      setValue('');
    }, 120000);
  }, [setValue]);

  const handleInputChange = (e) => {
    setOriginalUrl(e.target.value);
    setValue('');
  };
  const handleNavigate = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check url protocol
    const { protocol } = new URL(originalUrl);
    if (protocol !== 'https:' && protocol !== 'http:') {
      return toast({
        title: 'URL is not a valid URL.',
        description: 'Missing "https:" or "http:"',
        status: 'warning',
        duration: 1200,
        isClosable: true,
        position: 'bottom',
      });
    }

    // make an axios call here
    try {
      setIsLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_CREATE_URL}`, {
        originalUrl,
      });
      toast({
        title: 'Loading.',
        description: "We've creating your link for you.",
        status: 'loading',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      toast({
        title: 'Link Shortend.',
        status: res.data.message,
        duration: 1500,
        isClosable: true,
        position: 'top',
      });
      setValue(res.data.URL);
      setOriginalUrl('');
      setIsLoading(false);
    } catch (err) {
      toast({
        title: err.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right',
      });
      setOriginalUrl('');
      setIsLoading(false);
    }
  };

  return (
    <Card
      align='center'
      bg={'white.400'}
      width={[
        '100%', // 0-30em
        '90%', // 30em-48em
        '75%', // 48em-62em
        '65%', // 62em+
      ]}
      m={'0 auto'}
      border={'1px'}
      borderRadius={['md']}
      boxShadow={['lg']}>
      <CardHeader>
        <Text
          variant={'h3'}
          fontFamily={'sans-serif'}
          fontSize={{ sm: '1.5rem', md: '1.8rem', lg: '2.5rem' }}
          textAlign={'center'}>
          URL Shortner{' '}
          <span>
            <ExternalLinkIcon
              mx='2px'
              fontSize={{ sm: '1.3rem', md: '1.6rem', lg: '2rem' }}
            />
          </span>
        </Text>
      </CardHeader>
      <Divider />
      <CardBody
        width={[
          '100%', // 0-30em
          '90%', // 30em-48em
          '75%', // 48em-62em
          '75%', // 62em+
        ]}>
        <FormControl
          display={'flex'}
          flexDir={'column'}
          gap={'1rem'}
          isInvalid={isError}>
          <FormLabel>URL</FormLabel>
          <InputGroup size={['xs', 'sm', 'md', 'lg']}>
            <InputLeftAddon children='https://' />
            <Input
              type={'url'}
              variant='filled'
              placeholder='Enter your URL...'
              _placeholder={{ opacity: 1, color: 'teal.500' }}
              value={originalUrl}
              onChange={handleInputChange}
            />
          </InputGroup>
          {!isError ? (
            <FormHelperText>Enter your wayback long URL..</FormHelperText>
          ) : (
            <FormErrorMessage>URL is required.</FormErrorMessage>
          )}

          <HStack
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}>
            {_.isEmpty(originalUrl) ? (
              <Button
                size={['xs', 'sm', 'md', 'lg']}
                colorScheme='whiteAlpha'
                color={'steelblue'}
                rightIcon={<ChevronRightIcon />}
                type='submit'>
                Click to Shorten
              </Button>
            ) : (
              <Button
                isLoading={isLoading}
                loadingText='Submitting'
                size={['xs', 'sm', 'md', 'lg']}
                colorScheme='linkedin'
                rightIcon={<ChevronRightIcon />}
                type='submit'
                onClick={handleSubmit}>
                Click to Shorten
              </Button>
            )}
          </HStack>
        </FormControl>
        <Flex mt={2.5} mb={2}>
          <Input
            placeholder={placeholder}
            value={value}
            onChange={setValue}
            mr={2}
          />
          <Button onClick={onCopy}>{hasCopied ? 'Copied!' : 'Copy'}</Button>
        </Flex>
      </CardBody>
      <CardFooter>
        <Button
          variant={'outline'}
          size={['xs', 'sm', 'md', 'lg']}
          colorScheme='messenger'
          rightIcon={<ChevronLeftIcon />}
          onClick={handleNavigate}>
          Go Back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateUrl;
