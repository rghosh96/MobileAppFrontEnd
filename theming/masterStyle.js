import styled from 'styled-components/native';

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
  color: ${props => props.theme.PRIMARY_COLOR};
  fontWeight: 900;
  paddingBottom: 11px;
`;

export const HeaderContainer = styled.View`
    backgroundColor: ${props => props.theme.BG_COLOR};
    width: 100%;
    padding: 0px 15px 0px 15px;
`;

export const Text = styled.Text`
  color: ${props => props.theme.GREY};
  fontSize: 21px;
  marginBottom: 11px;
  textAlign: left;
`;

