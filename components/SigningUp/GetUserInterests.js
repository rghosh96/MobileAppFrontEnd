import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Subtitle, Divider, HeaderText, Button, ButtonText } from '../../theming/masterStyle'
import { Rating } from 'react-native-elements';
import CustomRatings from '../CustomRatings'
import { CommentInput, FormArea, CreateProfileContent, RatingContainer, HeaderContainer, H1 } from '../../theming/createStyle'
import { Formik } from 'formik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Alert } from "react-native";



class GetUserInterests extends Component {
    constructor(props) {
        super(props)
        console.log(props.route.params.user)
        this.updateState = this.updateState.bind(this)
    }
    state = {
        user: this.props.route.params.user,
        success: false,
        fashionRating: null,
        foodRating: null,
        gameRating: null,
        outRating: null,
        musicRating: null,
        readRating: null,
        fashionComment: null,
        foodComment: null,
        gamingComment: null,
        outdoorsComment: null,
        musicComment: null,
        readingComment: null,
      }

      updateState = (attribute, data) => {
        console.log("trynna update state")
        console.log(attribute)
        console.log(data)
        this.setState({
          [attribute]: data
        })
      }

      setInterests(info) {
        if (this.state.fashionRating === null || this.state.gameRating === null || this.state.foodRating === null
            || this.state.outRating === null || this.state.musicRating === null || this.state.readRating === null ){
            Alert.alert(
                "You're missing a rating!",
                "please make sure you provided a rating for everything! ),:",
                [
                  { text: "oops let me fix that..", onPress: () => console.log("okay pressed") }
                ],
                { cancelable: false }
              );
              console.log(typeof(this.state.fashionRating))
        }
        else {
            this.setState({
                fashionComment: info.fashion,
                foodComment: info.food,
                gamingComment: info.gaming,
                outdoorsComment: info.outdoors,
                musicComment: info.music,
                readingComment: info.reading,
              })
              console.log(this.state)
              this.addInterestsDB();
        }
      }

      addInterestsDB() {
        console.log("INSIDE ADD INTERSTEST")
        console.log(this.state)
        const interests={
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                interestUSER: this.state.user, 
                values: {
                    interestFOOD: this.state.foodRating,
                    interestFOOD_COMMENT: this.state.foodComment,
                    interestFASHION: this.state.fashionRating,
                    interestFASHION_COMMENT: this.state.fashionComment,
                    interestOUTDOORS: this.state.outRating,
                    interestOUTDOORS_COMMENT: this.state.outdoorsComment,
                    interestGAMING: this.state.gameRating,
                    interestGAMING_COMMENT: this.state.gamingComment,
                    interestMUSIC: this.state.musicRating,
                    interestMUSIC_COMMENT: this.state.musicComment,
                    interestREADING: this.state.readRating,
                    interestREADING_COMMENT: this.state.readingComment
                }
            })
        }
        console.log("INTERESTS JSON")
        console.log(interests)
        // call api endpoint, sending in user to add to db
        fetch(`http://mobile-app.ddns.uark.edu/CRUDapis/interest/updateInterests`, interests)
            .then((response) => response.text())
            .then((json) => {
                // parse the response & extract data
                let data = JSON.parse(json)
                console.log(data)
                if (data.isError === false) {
                    this.setState({success: true})
                } else {
                    this.setState({success: false})
                }
                
            })
            .catch((error) => console.error(error))
            .finally(() => {
                if (this.state.success === true) {
                    this.props.navigation.navigate(
                        "GetUserInfo",
                        {user: this.state.user});
                } else {
                    Alert.alert(
                        "Hmmm...",
                        "there was an error, please try again ):",
                        [
                          { text: "okie", onPress: () => console.log("okay pressed") }
                        ],
                        { cancelable: false }
                      );
                }  
            })
      }

  render() {
      console.log(this.state)
    return (
        <ThemeProvider theme={ this.props.theme }>
            <KeyboardAwareScrollView
                style={{ backgroundColor: this.props.theme.BG_COLOR }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                >
            <CreateProfileContent>   
            <Formik 
                            initialValues={{ 
                                fashion: '', 
                                food: '',
                                gaming: '',
                                outdoors: '',
                                music: '',
                                reading: ''}}
                            // validationSchema={SignUpSchema}
                            onSubmit={(values) => {
                                console.log(values)
                                this.setInterests(values);
                            }}
                        >
                            {/* get access to props of Formik */}
                            {(props) => (
                                <FormArea>
                                    <HeaderContainer>
                                        <HeaderText>real quick..</HeaderText>
                                        <Subtitle>tell us a bit about your interests! use your finger to slide
                                            to rate each of the areas, and leave an optional comment!
                                        </Subtitle>
                                    </HeaderContainer>
                                    <Divider/>
                                    <RatingContainer>    
                                    <H1>fashion ({this.state.fashionRating}/5)&nbsp;</H1>
                                    <CustomRatings 
                                        infoType="fashionRating" 
                                        updateState={this.updateState}
                                        rating={this.state.fashionRating} 
                                        icon="shopping"
                                    />       
                                    </RatingContainer>
                                    <CommentInput 
                                        placeholder='maybe some trends, designers, if you like hair, nails, etc..' 
                                        onChangeText={props.handleChange('fashion')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.fashionComment}
                                    />
                                    <RatingContainer>
                                    <H1>food ({this.state.foodRating}/5) &nbsp;</H1>
                                    <CustomRatings 
                                        infoType="foodRating" 
                                        updateState={this.updateState}
                                        rating={this.state.foodRating} 
                                        icon="food-apple"
                                    />   
                                    </RatingContainer>
                                    <CommentInput 
                                        placeholder='what are your favorite cuisines? restaurants?' 
                                        onChangeText={props.handleChange('food')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.foodComment}
                                    />
                                    <RatingContainer>
                                    <H1>gaming ({this.state.gameRating}/5)&nbsp;</H1>
                                    <CustomRatings 
                                        infoType="gameRating" 
                                        updateState={this.updateState}
                                        rating={this.state.gameRating} 
                                        icon="gamepad-variant"
                                    />    
                                    </RatingContainer>
                                    <CommentInput 
                                        placeholder='what kind of games u playin (your fav console, etc)' 
                                        onChangeText={props.handleChange('gaming')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.gamingComment}
                                    />
                                    <RatingContainer>
                                    <H1>outdoors ({this.state.outRating}/5)&nbsp;</H1>
                                    <CustomRatings 
                                        infoType="outRating" 
                                        updateState={this.updateState}
                                        rating={this.state.outRating} 
                                        icon="pine-tree"
                                    />     
                                    </RatingContainer>
                                    <CommentInput 
                                        placeholder='hiking? biking? running? camping? fav trails?' 
                                        onChangeText={props.handleChange('outdoor')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.outdoorComment}
                                    />
                                    <RatingContainer>
                                    <H1>music ({this.state.musicRating}/5)&nbsp;</H1>
                                    <CustomRatings 
                                        infoType="musicRating" 
                                        updateState={this.updateState}
                                        rating={this.state.musicRating} 
                                        icon="music-note"
                                    />     
                                    </RatingContainer>
                                    <CommentInput 
                                        placeholder='fav artists? genres?' 
                                        onChangeText={props.handleChange('music')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.musicRating}
                                    />
                                    <RatingContainer>
                                    <H1>reading ({this.state.readRating}/5)&nbsp;</H1>
                                    <CustomRatings 
                                        infoType="readRating" 
                                        updateState={this.updateState}
                                        rating={this.state.readRating} 
                                        icon="book"
                                    />      
                                    </RatingContainer>   
                                    <CommentInput 
                                        placeholder='whether it be productivity, fiction, or your algorithms textbook, give us ur fav titles!' 
                                        onChangeText={props.handleChange('reading')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.readingComment}
                                    />     
                                    
                                    <Button title="Submit" onPress={() => props.handleSubmit()}>
                                        <ButtonText>i'm done!</ButtonText>
                                    </Button>
                                </FormArea>
                            )}
                        </Formik>
                    
                </CreateProfileContent>
                </KeyboardAwareScrollView>
        </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}

export default connect(mapStateToProps, {pickTheme})(GetUserInterests);



