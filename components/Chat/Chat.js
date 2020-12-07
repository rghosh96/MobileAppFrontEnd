import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  TextInput,
  FlatList,
  Button,
  AsyncStorage
} from 'react-native';

import firebaseSDK from '../../firebaseSDK'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Chat extends Component {

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

      console.log('f_name = ' + this.state.f_name);
      console.log('c_data.fname = ' + c_data.fname);
      console.log('u_name = ' + this.state.u_name);
      console.log('c_data.user.uname = ' + c_data.user.uname);
      console.log('text = ' + c_data.text)
//      console.log(c_data)

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

                      backgroundColor:"#91d0fb",

                      //padding:15,

                      marginLeft:'50%',

                      borderRadius:4,

                      marginBottom:20, 

                      width:'50%',

                      maxWidth: 500,

                      padding: 15,

                      borderRadius: 20,

                      }}>  

                    <Text style={{fontSize:16,color:"#000" }}> {c_data.text}</Text>

                    </View>

                  )

              }else{

                  return(

                    <View  key={index} style={{

                      backgroundColor:"#dedede",

                      //padding:15,

                      borderRadius:4,

                      marginBottom:20, 

                      width:'50%',

                      maxWidth: 500,

                      padding: 15,

                      borderRadius: 20,

                      }}>             

                          <Text style={{fontSize:16,color:"#000" }}> {c_data.text}</Text>

                    </View>

                  )

              }

          }

      }) 



    return (

        <View style={styles.container}>

            <View style={{

                height:screenHeight - 150,

                marginVertical: 20,

                flex: 1,

                flexDirection: 'row',

                backgroundColor:"#eeeeee",

                borderRadius:10,

                padding:0,

              }}>

              <ScrollView>       

                  {chats} 

              </ScrollView>

            </View>

            <View style={styles.footer}>

                <View style={styles.inputContainer}>

                  <TextInput style={styles.inputs}

                      placeholder="Write a message..."

                      underlineColorAndroid='transparent'

                      ref={input => { this.textInput = input }}

                      onChangeText={(msg) => this.setState({text:msg})}/>

                </View>

                <TouchableOpacity style={styles.btnSend} onPress={this.onSend}>

                    <Image source={{uri:"https://www.searchpng.com/wp-content/uploads/2019/02/Send-Icon-PNG-1.png"}} style={styles.iconSend}  />

                </TouchableOpacity>

            </View>

        </View>

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

    paddingHorizontal:10,

    padding:5,

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