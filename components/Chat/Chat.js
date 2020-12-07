import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

import firebaseSDK from '../../firebaseSDK'
import { ChatContainer, ChatList, SendButton, ChatHeader, ChatHeaderContainer, ChatFooter, ChatInput, ChatText } from '../../theming/chatStyle';
import { Subtitle } from '../../theming/masterStyle'
import { Line } from '../../theming/settingStyle'

class Chat extends Component {

  constructor(props) {

    super(props);

    this.state = {
      f_name:'',
      u_name:'',
      text:'',
      chatData:[],
      data: [
        {id:1, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit amet"},
        {id:2, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit amet"} ,
        {id:3, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:4, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:5, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"}, 
        {id:6, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"}, 
        {id:7, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:8, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
        {id:9, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a mesaddsat"},
      ]
    }
  }



  async componentDidMount(){
      firebaseSDK.refOn().then((solve)=>{
        this.setState({chatData:solve})
      }).then(()=>{
        let data=this.state.chatData
      }).catch((fail)=>{
        console.log(fail)
      })
      this.retrieveData()
  }



  retrieveData = async() => {

      name = this.props.route.params.name;
      uname = this.props.route.params.uname;
      console.log('this is user data==>  '+name+'   '+uname);
      this.setState({
        f_name:name,
        u_name:uname,
      }) 
    }


  onSend=()=>{
        this.textInput.clear()
        firebaseSDK.send(
            this.state.text,
            this.state.f_name,
            this.state.u_name
          )

        console.log(
          '  text '+this.state.text+
          '  uname  '+this.state.u_name
        )

        firebaseSDK.refOn().then((solve)=>{
          this.setState({chatData:solve})
        }).then(()=>{
          let data=this.state.chatData
        }).catch((fail)=>{
          console.log(fail)
        })
    }

  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }



  render() {

    let Data=this.state.chatData 

    let chats=Data.map((c_data, index)=>{
    console.log(this.props.theme)

          if(
            // if you are sender, name on message is f_name and reciever will be u_name
            (this.state.f_name==c_data.fname && this.state.u_name==c_data.user.uname )
            || 
            // if you are reciever and if sender is who you're chatting with
            (this.state.f_name==c_data.user.uname && this.state.u_name==c_data.fname)){
              // if who youre chatting with is reciever on message
              if(this.state.u_name==c_data.user.uname){

                  return(

                    <View  key={index} style={{

                      backgroundColor:this.props.theme.PRIMARY_COLOR,

                      //padding:15,

                      marginLeft:'50%',

                      borderRadius:4,

                      marginBottom:20, 

                      width:'50%',

                      maxWidth: 500,

                      padding: 15,

                      borderRadius: 20,

                      }}>  

                    <ChatText> {c_data.text}</ChatText>

                    </View>

                  )

              }else{

                  return(

                    <View  key={index} style={{

                      backgroundColor:this.props.theme.SECONDARY_COLOR,

                      //padding:15,

                      borderRadius:4,

                      marginBottom:20, 

                      width:'50%',

                      maxWidth: 500,

                      padding: 15,

                      borderRadius: 20,

                      }}>             

                          <ChatText> {c_data.text}</ChatText>

                    </View>

                  )

              }

          }

      }) 



    return (

      <ThemeProvider theme={ this.props.theme }>
        
            <ChatContainer>
            <ChatHeaderContainer>
              <MaterialCommunityIcons  name="keyboard-backspace" onPress={() => this.props.navigation.navigate('Chat')} size={35} color={this.props.theme.PRIMARY_COLOR} />
              <ChatHeader>{this.state.f_name}</ChatHeader>
            </ChatHeaderContainer>
            <Line />
                  <ChatList>       
                      {chats} 
                  </ChatList>
                </ChatContainer>
                <KeyboardAvoidingView
                style={{ backgroundColor: this.props.theme.PRIMARY_COLOR }}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                <ChatFooter>
                    <ChatInput>
                      <TextInput style={styles.inputs}
                          placeholder="send a chat ...!"
                          underlineColorAndroid='transparent'
                          ref={input => { this.textInput = input }}
                          onChangeText={(msg) => this.setState({text:msg})}/>
                    </ChatInput>
                    <SendButton onPress={this.onSend}>
                      <MaterialCommunityIcons name="send-circle" size={35} color={this.props.theme.PRIMARY_COLOR} />
                    </SendButton>
                </ChatFooter>
                </KeyboardAvoidingView>
        </ThemeProvider>

      )

    }

}



const styles = StyleSheet.create({

  container:{

    flex:1

  },

  list:{

    paddingHorizontal: 17,

  },

  footer:{

    flexDirection: 'row',

    height:60,

    backgroundColor: '#eeeeee',

    paddingHorizontal:30,

    padding:20,
    marginBottom: 50

  },

  btnSend:{
    backgroundColor:"#00BFFF",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
  },

  iconSend:{
    width:30,
    height:30,
    alignSelf:'center',
  },

  inputContainer: {

    borderBottomColor: '#F5FCFF',

    backgroundColor: '#FFFFFF',

    borderRadius:30,

    borderBottomWidth: 1,

    height:40,

    flexDirection: 'row',

    alignItems:'center',

    flex:1,

    marginRight:10,

  },

  inputs:{

    height:40,

    marginLeft:16,

    borderBottomColor: '#FFFFFF',

    flex:1,

  },

  balloon: {

    maxWidth: 500,

    padding: 15,

    borderRadius: 20,

    

  },

  itemIn: {

    alignSelf: 'flex-start'

  },

  itemOut: {

    alignSelf: 'flex-end'

  },

  time: {

    alignSelf: 'flex-end',

    margin: 15,

    fontSize:12,

    color:"#808080",

  },

  item: {

    marginVertical: 14,

    flex: 1,

    flexDirection: 'row',

    backgroundColor:"#eeeeee",

    borderRadius:50,

    padding:5,

  },

})

function mapStateToProps(state) {
  return {
      theme: state.themeReducer.theme
  }
}

export default connect(mapStateToProps, {pickTheme})(Chat);