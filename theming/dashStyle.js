import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
    backgroundColor: ${props => props.theme.BG_COLOR};
    padding: 70px 30px 0px 30px;
    alignItems: flex-start;
    justifyContent: flex-start;
`;

export const HeaderContainer = styled.View`
    backgroundColor: ${props => props.theme.BG_COLOR};
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    margin: 15px 0px 15px 0px;
    backgroundColor: ${props => props.theme.GREY};
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  borderRadius: 2px;
  backgroundColor:${props => props.theme.PRIMARY_COLOR};
  margin: 7px;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.BG_COLOR};
`;

export const ProfileInfo = styled.Text`
  color: ${props => props.theme.GREY};
  textAlign: left;
  margin: 30px;
  fontSize: 15px;
`;

export const HeaderText = styled.Text`
  fontSize: 50px;
  color: ${props => props.theme.PRIMARY_COLOR};
  fontWeight: 900;
`;

export const ProfileImage = styled.Image`
  height: 125px;
  width: 125px;
  borderRadius: 75px;
`;

export const ImageContainer = styled.View`
  flex: .2;
  margin: 15px;
  width: 100%;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
`;

export const Content = styled.View`
  flex: .2;
  width: 100%;
  justifyContent: center;
  alignItems: center;
`;