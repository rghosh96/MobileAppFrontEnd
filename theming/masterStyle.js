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

export const Center = styled.View`
    flex: 1;
    width: 100%;
    alignItems: center;
    justifyContent: center;
`;

export const Divider = styled.View`
  borderBottomColor: ${props => props.theme.GREY};
  borderBottomWidth: 1px;
  margin: 20px;
`;


export const HeaderText = styled.Text`
  fontSize: 45px;
  fontFamily: "header";
  textAlign: left;
  color: ${props => props.theme.PRIMARY_COLOR};
  fontWeight: 900;
  paddingBottom: 11px;
`;

export const Line = styled.View`
  borderBottomWidth: 1px;
  borderBottomColor: ${props => props.theme.GREY};
  alignSelf: stretch;
  margin: 11px;
`

export const HeaderContainer = styled.View`
    backgroundColor: ${props => props.theme.BG_COLOR};
    width: 100%;
    paddingLeft: 20px;
    paddingRight: 20px;
`;

export const FacultyView = styled.View`
    backgroundColor: ${props => props.theme.BG_COLOR};
    width: 100%;
    marginTop: 30px;
    justifyContent: center;
    alignItems: center;
`;

export const DescriptionArea = styled.View`
    flexDirection: row;
    alignItems: baseline;
`;

export const RowView = styled.View`
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
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
  fontSize: 17px;
  marginBottom: 11px;
  textAlign: left;
`;

export const H2 = styled.Text`
color: ${props => props.theme.GREY};
fontFamily: "header";
fontSize: 15px;
textAlign: left;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  alignSelf: center;
  borderRadius: 2px;
  backgroundColor:${props => props.theme.PRIMARY_COLOR};
  margin: 7px;
`;

export const H1 = styled.Text`
  color: ${props => props.theme.PRIMARY_COLOR};
  fontFamily: "header";
  fontSize: 23px;
  textAlign: left;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.BG_COLOR};
  textAlign: center;
  fontFamily: "header";
`;

