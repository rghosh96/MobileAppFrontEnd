import styled from 'styled-components/native';


export const SettingContainer = styled.View`
    flex: 1;
    width: 100%;
    backgroundColor: ${props => props.theme.BG_COLOR};
    alignItems: flex-start;
    justifyContent: flex-start;
`;

export const ModalContainer = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

export const ModalView = styled.View`
  margin: 20px;
  backgroundColor: ${props => props.theme.BG_COLOR};
  borderWidth: 2px;
  borderColor: ${props => props.theme.PRIMARY_COLOR};
  borderRadius: 20px;
  padding: 45px;
  alignItems: center;
  opacity: 1;
`;

export const Title = styled.Text`
  fontSize: 25px;
  fontFamily: "header";
  color: ${props => props.theme.PRIMARY_COLOR};
  fontWeight: 900;
  paddingBottom: 11px;
`;

export const ListItem = styled.Text`
  fontSize: 17px;
  padding: 5px;
  marginLeft: 10px;
  marginBottom: 5px;
  fontFamily: "text";
  color: ${props => props.theme.GREY};
`;

export const SelectedTheme = styled.Text`
  fontSize: 17px;
  borderWidth: 2px;
  borderColor: ${props => props.theme.PRIMARY_COLOR};
  borderRadius: 15px;
  padding: 10px;
  margin: 5px;
  fontFamily: "text";
  color: ${props => props.theme.GREY};
  fontWeight: bold;
`;

export const ModalOptions = styled.Text`
  fontSize: 17px;
  padding: 10px;
  margin: 5px;
  fontFamily: "text";
  color: ${props => props.theme.GREY};
  fontWeight: bold;
`;


export const Line = styled.View`
  borderBottomWidth: 1px;
  borderBottomColor: ${props => props.theme.GREY};
  alignSelf: stretch;
  margin: 11px;
`