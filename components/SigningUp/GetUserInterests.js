import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Subtitle, Divider, HeaderContainer, HeaderText, Button, ButtonText } from '../../theming/masterStyle'
import { Rating } from 'react-native-elements';
import { CommentInput, FormArea, CreateProfileContent, RatingContainer, ErrorText, H1 } from '../../theming/createStyle'
import { Formik } from 'formik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Alert } from "react-native";



class GetUserInterests extends Component {
    state = {
        fashionRating: null,
        foodRating: null,
        gameRating: null,
        outRating: null,
        readRating: null,
        fashionComment: '',
        foodComment: '',
        gamingComment: '',
        outdoorsComment: '',
        readingComment: '',
      }
      

      setInterests(info) {
        if (this.state.fashionRating === null || this.state.gameRating === null || this.state.foodRating === null
            || this.state.outRating === null || this.state.readRating === null ){
            Alert.alert(
                "You're missing a rating!",
                "please make sure you provided a rating for everything! ),:",
                [
                  { text: "oops let me fix that..", onPress: () => console.log("okay pressed") }
                ],
                { cancelable: false }
              );
        }
        else {
            this.setState({
                fashionComment: info.fashion,
                foodComment: info.food,
                gamingComment: info.gaming,
                outdoorsComment: info.outdoors,
                readingComment: info.reading,
              })
              console.log(this.state)
              this.props.navigation.navigate("GetUserInfo");
        }
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
                                    <Rating
                                            type='heart'
                                            ratingCount={5}
                                            imageSize={25}
                                            startingValue={0}
                                            onFinishRating={rating => this.setState({fashionRating: rating})}
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
                                    <Rating
                                            type='heart'
                                            ratingCount={5}
                                            imageSize={25}
                                            startingValue={0}
                                            onFinishRating={rating => this.setState({foodRating: rating})}
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
                                    <Rating
                                            type='heart'
                                            ratingCount={5}
                                            imageSize={25}
                                            startingValue={0}
                                            onFinishRating={rating => this.setState({gameRating: rating})}
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
                                    <Rating
                                            type='heart'
                                            ratingCount={5}
                                            imageSize={25}
                                            startingValue={0}
                                            onFinishRating={rating => this.setState({outRating: rating})}
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
                                    <H1>reading ({this.state.readRating}/5)&nbsp;</H1>
                                    <Rating
                                            type='heart'
                                            ratingCount={5}
                                            imageSize={25}
                                            startingValue={0}
                                            onFinishRating={rating => this.setState({readRating: rating})}
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



