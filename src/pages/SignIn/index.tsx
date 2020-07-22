import React from 'react';
import {Image} from 'react-native';

import {Container} from './styles';

import logo from '../../assets/logo.png';

const SingIn: React.FC = () => {
  return (
    <Container>
      <Image source={logo} />
    </Container>
  );
};

export default SingIn;
