import styled from 'styled-components/native';

export const BioInput = styled.TextInput`
    borderWidth: 1px;
    borderColor: ${props => props.theme.GREY};
    borderRadius: 5px;
    padding: 7px;
    margin: 7px;
    height: 100px;
    fontFamily: "text";
`

export const TextInput = styled.TextInput`
    borderWidth: 1px;
    borderColor: ${props => props.theme.GREY};
    borderRadius: 5px;
    padding: 7px;
    margin: 7px;
    height: 30px;
    fontFamily: "text";
`

export const CommentInput = styled.TextInput`
    borderWidth: 1px;
    borderColor: ${props => props.theme.GREY};
    borderRadius: 5px;
    padding: 7px;
    margin: 0px 7px 15px 7px;
    height: 50px;
    fontFamily: "text";
`

export const RatingContainer = styled.View`
  flex: 1;
  width: 100%;
  flexDirection: row;
  justifyContent: center;
  alignItems: baseline;
`;

export const CreateProfileContent = styled.View`
    flex: 1;
    width: 100%;
    backgroundColor: ${props => props.theme.BG_COLOR};
    alignItems: center;
    justifyContent: center;
`;

export const FormArea = styled.ScrollView`
    backgroundColor: ${props => props.theme.BG_COLOR};
    margin: 70px;
    width: 100%;
    padding: 0px 40px 0px 40px;
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
  fontSize: 15px;
  marginBottom: 11px;
  textAlign: left;
`;



