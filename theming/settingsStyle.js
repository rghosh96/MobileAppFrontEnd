import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  padding: 10px;
  borderRadius: 2px;
  backgroundColor:${props => props.theme.PRIMARY_COLOR};
  margin: 7px;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.BG_COLOR};
`;