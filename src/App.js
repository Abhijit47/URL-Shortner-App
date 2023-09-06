import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import CreateUrl from './pages/createurl/CreateUrl';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Error from './components/error/Error';
import './App.css';

const App = () => {
  return (
    <ChakraProvider>
      <>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/create-url' element={<CreateUrl />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </>
    </ChakraProvider>
  );
};

export default App;
