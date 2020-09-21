import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
    width: 100%;
    backgroundColor: ${props => props.theme.BG_COLOR};
    paddingTop: 70px;
    alignItems: flex-start;
    justifyContent: flex-start;
`;

export const HeaderContainer = styled.View`
    backgroundColor: ${props => props.theme.BG_COLOR};
    width: 100%;
    padding: 0px 15px 0px 15px;
`;

export const Connections = styled.Text`
  color: ${props => props.theme.GREY};
  fontSize: 105px;
  fontWeight: 900;
  paddingBottom: 11px;
`

export const ConnectionsContainer = styled.View`
  flex: .3;
  width: 100%;
  flexDirection: column;
  alignItems: center;
  justifyContent: center;
`

export const Button = styled.TouchableOpacity`
  padding: 10px;
  borderRadius: 2px;
  backgroundColor:${props => props.theme.PRIMARY_COLOR};
  margin: 7px;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.BG_COLOR};
`;

export const Text = styled.Text`
  color: ${props => props.theme.GREY};
  fontSize: 21px;
  marginBottom: 11px;
  textAlign: left;
`;

export const ProfileText = styled.Text`
  color: ${props => props.theme.GREY};
  textAlign: left;
  margin: 15px;
  fontSize: 21px;
`;

export const HeaderText = styled.Text`
  fontSize: 50px;
  color: ${props => props.theme.PRIMARY_COLOR};
  fontWeight: 900;
  paddingBottom: 11px;
`;

export const ProfileImage = styled.Image`
  height: 135px;
  width: 135px;
  borderRadius: 75px;
`;

export const PeopleImage = styled.Image`
  height: 65px;
  width: 65px;
  borderRadius: 75px;
  margin: 7px;
`;

export const ProfileContainer = styled.View`
  flex: .3;
  margin: 15px;
  width: 100%;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
`;

export const MatchesContainer = styled.View`
  flex: .175;
  width: 100%;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
`;

export const MatchesDash = styled.View`
  borderBottomWidth: 1px;
  borderBottomColor: ${props => props.theme.GREY};
  width: 41%;
`

export const MatchesText = styled.Text`
  color: ${props => props.theme.PRIMARY_COLOR};
  textAlign: center;
  fontSize: 19px;
  paddingBottom: 5px;
  paddingLeft: 5px;
`;

export const Content = styled.View`
  flex: .5;
  width: 100%;
  justifyContent: center;
  alignItems: center;
`;