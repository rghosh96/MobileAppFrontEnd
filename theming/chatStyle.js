import styled from 'styled-components/native';

export const ChatContainer = styled.View`
    flex: 1;
    width: 100%;
    backgroundColor: ${props => props.theme.BG_COLOR};
    paddingTop: 70px;
    alignItems: flex-start;
    justifyContent: flex-start;
`;

export const ChatList = styled.ScrollView`
    width: 100%;
    paddingLeft: 20px;
    paddingRight: 20px;
    paddingBottom: 50px;
    marginBottom: 20px;
`;

export const SendButton = styled.TouchableOpacity`
    backgroundColor:${props => props.theme.BG_COLOR};
    width:40px;
    height:40px;
    borderRadius:360px;
    alignItems:center;
    justifyContent:center;
`;

export const ChatHeader = styled.Text`
  fontSize: 35px;
  fontFamily: "header";
  textAlign: left;
  color: ${props => props.theme.PRIMARY_COLOR};
  fontWeight: 900;
  paddingBottom: 11px;
  marginLeft: 5px;
`;

export const ChatHeaderContainer = styled.View`
    backgroundColor: ${props => props.theme.BG_COLOR};
    width: 100%;
    paddingLeft: 20px;
    paddingRight: 20px;
    flexDirection: row;
`;

export const ChatFooter = styled.View`
    flexDirection: row;
    height:60px;
    backgroundColor: ${props => props.theme.PRIMARY_COLOR};
    paddingHorizontal:30px;
    padding:20px;
    marginBottom: 50px;
`;

export const ChatInput = styled.View`
    borderBottomColor: #F5FCFF;
    backgroundColor: #FFFFFF;
    borderRadius:30px;
    borderBottomWidth: 1px;
    height:40px;
    flexDirection: row;
    alignItems:center;
    flex:1;
    marginRight:10px;
   
`;

export const ChatText = styled.Text`
  color: ${props => props.theme.BG_COLOR};
  fontFamily: "text";
  fontSize: 15px;
  textAlign: left;
`;

