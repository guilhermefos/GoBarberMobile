import React from 'react';
import {Image} from 'react-native';

import {Container, Title} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

const SingIn: React.FC = () => {
  return (
    <Container>
      <Image source={logo} />
      <Title>Faça o seu Logon</Title>
      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />
      <Button onPress={() => console.log('button')}>Entrar</Button>
    </Container>
  );
};

export default SingIn;
