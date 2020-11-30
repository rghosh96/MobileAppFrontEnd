import styled from 'styled-components/native';


export const SettingContainer = styled.View`
    flex: 1;
    width: 100%;
    backgroundColor: ${props => props.theme.BG_COLOR};
    alignItems: flex-start;
    justifyContent: flex-start;
    paddingTop: 70px;
    paddingLeft: 20px;
    paddingRight: 20px;
`;

export const ModalContainer = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

export const ListContainer = styled.View`
    flex: 1;
    paddingRight: 10px;
    paddingLeft: 10px;
`;

export const ModalView = styled.View`
  backgroundColor: ${props => props.theme.BG_COLOR};
  borderWidth: 2px;
  borderColor: ${props => props.theme.PRIMARY_COLOR};
  borderRadius: 20px;
  padding: 55px;
  alignItems: center;
  maxHeight: 800px;
  opacity: 1;
`;

export const FormInput = styled.TextInput`
    borderBottomWidth: 1px;
    borderBottomColor: ${props => props.theme.PRIMARY_COLOR};
    color: ${props => props.theme.PRIMARY_COLOR};
    borderRadius: 2px;
    padding: 7px;
    margin: 7px;
    fontFamily: "text";
`;

export const BioInput = styled.TextInput`
    borderWidth: 1px;
    borderColor: ${props => props.theme.PRIMARY_COLOR};
    color: ${props => props.theme.PRIMARY_COLOR};
    borderRadius: 5px;
    padding: 7px;
    margin: 7px;
    width: 250px;
    height: 100px;
    fontFamily: "text";
`

export const Title = styled.Text`
  fontSize: 25px;
  fontFamily: "header";
  color: ${props => props.theme.PRIMARY_COLOR};
  fontWeight: 900;
  paddingBottom: 11px;
`;

export const UserAttribute = styled.Text`
  color: ${props => props.theme.GREY};
  fontFamily: "text";
  fontSize: 17px;
  textAlign: center;
`;

export const EditItem = styled.Text`
  color: ${props => props.theme.LIGHT_GREY};
  fontFamily: "header";
  fontSize: 17px;
  marginBottom: 10px;
`;

export const ProfileImage = styled.Image`
  height: 100px;
  width: 100px;
  borderRadius: 100px;
  alignSelf: center;
`;

export const InfoArea = styled.View`
  flex: 1;
  width: 100%;
  flexDirection: column; 
  alignItems: center;
  marginTop: 30px;
`

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

export const Container = styled.View`
    flex: 1;
    width: 100%;
    backgroundColor: ${props => props.theme.BG_COLOR};
`;