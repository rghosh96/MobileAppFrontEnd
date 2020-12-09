import styled from 'styled-components/native';


export const CardContainer = styled.View`
    borderWidth: 0px;
    borderColor:${props => props.theme.PRIMARY_COLOR};
    backgroundColor: ${props => props.theme.PRIMARY_COLOR};
    width: 100%;
    padding: 20px;
    borderRadius: 10px;
    marginBottom: 30px;
    flexDirection: row;
    alignItems: center;
    justifyContent: space-between;
    shadowColor: ${props => props.theme.GREY};
    shadowOpacity: 0.8;
    elevation: 15;
    shadowRadius: 8px;
    shadowOffset: 0 7px;
`;

export const InfoSection = styled.View`
    flexDirection: column;
`;

export const FilterContainer = styled.View`
    flexDirection: column;
    paddingLeft: 20px;
    paddingRight: 20px;
`;


export const AllUsersList = styled.ScrollView`
    width: 100%;
    paddingLeft: 20px;
    paddingRight: 20px;
    paddingBottom: 50px;
    marginBottom: 20px;
`;

export const ProfileImage = styled.Image`
  height: 85px;
  width: 85px;
  borderRadius: 100px;
`;

export const Title = styled.Text`
  fontSize: 15px;
  fontFamily: "header";
  color: ${props => props.theme.BG_COLOR};
  fontWeight: 900;
  marginBottom: 5px;
`;

export const Subtitle = styled.Text`
  color: ${props => props.theme.BG_COLOR};
  fontFamily: "text";
  fontSize: 13px;
  marginBottom: 5px;
  textAlign: left;
`;

export const ModalTitle = styled.Text`
  fontSize: 15px;
  fontFamily: "header";
  color: ${props => props.theme.PRIMARY_COLOR};
  fontWeight: 900;
  marginBottom: 5px;
`;

export const ModalSubtitle = styled.Text`
  color: ${props => props.theme.GREY};
  fontFamily: "text";
  fontSize: 13px;
  marginBottom: 5px;
  marginTop: 5px;
  textAlign: left;
`;

export const InterestsView = styled.View`
  flexDirection: column;
  margin: 10px;
  alignItems: center;
  justifyContent: center;
`;

export const InterestHeader = styled.Text`
  color: ${props => props.theme.GREY};
  fontFamily: "header";
  fontSize: 13px;
  marginBottom: 5px;
  textAlign: left;
`;

export const Header = styled.View`
flexDirection: column;
margin: 10px;
alignItems: center;
justifyContent: center;
`;

export const ModalView = styled.View`
  backgroundColor: ${props => props.theme.BG_COLOR};
  borderWidth: 2px;
  borderColor: ${props => props.theme.PRIMARY_COLOR};
  borderRadius: 20px;
  padding: 25px;
  alignItems: center;
  maxHeight: 800px;
  opacity: 1;
`;





