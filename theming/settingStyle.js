import styled from 'styled-components/native';


export const SettingContainer = styled.View`
    flex: 1;
    width: 100%;
    backgroundColor: ${props => props.theme.BG_COLOR};
    alignItems: flex-start;
    justifyContent: flex-start;
    margin: 25px;
`;


export const ItemTitle = styled.Text`
fontSize: 21px;
fontFamily: "header";
color: ${props => props.theme.GREY};
padding: 21px;
`;

export const Line = styled.View`
  borderBottomWidth: 1px;
  borderBottomColor: ${props => props.theme.GREY};
  width: 90%;
  margin: 11px;
`