import styled from 'styled-components/native';


export const SignUpContent = styled.View`
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



