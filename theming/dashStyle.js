import styled from 'styled-components/native';

export const Connections = styled.Text`
  color: ${props => props.theme.GREY};
  fontFamily: "header";
  fontSize: 95px;
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

export const ProfileText = styled.Text`
  color: ${props => props.theme.GREY};
  textAlign: left;
  margin: 15px;
  fontSize: 19px;
  fontFamily: "text";
`;

export const HeaderText = styled.Text`
  fontSize: 45px;
  fontFamily: "header";
  textAlign: left;
  color: ${props => props.theme.PRIMARY_COLOR};
  fontWeight: 900;
  paddingBottom: 11px;
`;


export const ProfileImage = styled.Image`
  height: 175px;
  width: 175px;
  borderRadius: 100px;
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
  color: ${props => props.theme.GREY};
  textAlign: center;
  fontSize: 15px;
  fontFamily: "text";
  paddingBottom: 5px;
  paddingLeft: 5px;
`;

