import styled from 'styled-components/native';

export const BioInput = styled.TextInput`
    borderWidth: 1px;
    borderColor: ${props => props.theme.LIGHT_GREY};
    borderRadius: 5px;
    padding: 7px;
    margin: 7px;
    height: 100px;
    fontFamily: "text";
`

export const TextInput = styled.TextInput`
    borderWidth: 1px;
    borderColor: ${props => props.theme.LIGHT_GREY};
    borderRadius: 5px;
    padding: 7px;
    margin: 7px;
    height: 30px;
    fontFamily: "text";
`

export const CommentInput = styled.TextInput`
    borderWidth: 1px;
    borderColor: ${props => props.theme.LIGHT_GREY};
    borderRadius: 5px;
    padding: 7px;
    marginBottom: 10px;
    height: 50px;
    fontFamily: "text";
`

export const RatingContainer = styled.View`
  flex: 1;
  width: 100%;
  flexDirection: row;
  justifyContent: center;
  alignItems: stretch;
`;

export const CreateProfileContent = styled.View`
    flex: 1;
    width: 100%;
    backgroundColor: ${props => props.theme.BG_COLOR};
    alignItems: center;
    justifyContent: center;
`;

export const FormArea = styled.View`
    flex: 1;
    backgroundColor: ${props => props.theme.BG_COLOR};
    margin: 70px;
    justifyContent: center;
    width: 100%;
    padding: 40px;
`;

export const FormInput = styled.TextInput`
    borderBottomWidth: 1px;
    borderBottomColor: ${props => props.theme.GREY};
    borderRadius: 2px;
    padding: 7px;
    margin: 7px;
    fontFamily: "text";
`;

export const ErrorText = styled.Text`
  color: ${props => props.theme.GREY};
  fontFamily: "text";
  fontSize: 13px;
  marginBottom: 11px;
  marginLeft: 7px;
  textAlign: left;
`;

export const H1 = styled.Text`
  color: ${props => props.theme.PRIMARY_COLOR};
  fontFamily: "header";
  fontSize: 23px;

  textAlign: left;
`;


