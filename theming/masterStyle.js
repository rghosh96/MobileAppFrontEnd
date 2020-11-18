import styled from 'styled-components/native';
import ReactNative from 'react-native';

export const Container = styled.View`
    flex: 1;
    width: 100%;
    backgroundColor: ${props => props.theme.BG_COLOR};
    paddingTop: 70px;
    alignItems: flex-start;
    justifyContent: flex-start;
`;

export const HeaderText = styled.Text`
  fontSize: 50px;
  fontFamily: "header";
  color: ${props => props.theme.PRIMARY_COLOR};
  fontWeight: 900;
  paddingBottom: 11px;
`;

export const HeaderContainer = styled.View`
    backgroundColor: ${props => props.theme.BG_COLOR};
    width: 100%;
`;

export const Text = styled.Text`
  color: ${props => props.theme.GREY};
  fontFamily: "text";
  fontSize: 21px;
  marginBottom: 11px;
  textAlign: left;
`;

export const Subtitle = styled.Text`
  color: ${props => props.theme.GREY};
  fontFamily: "text";
  fontSize: 13px;
  marginBottom: 11px;
  textAlign: left;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  alignSelf: center;
  borderRadius: 2px;
  backgroundColor:${props => props.theme.PRIMARY_COLOR};
  margin: 7px;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.BG_COLOR};
  textAlign: center;
  fontFamily: "header";
`;

