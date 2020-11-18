import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Subtitle, Text, HeaderContainer, HeaderText, Button, ButtonText } from '../theming/masterStyle'
import { Rating } from 'react-native-elements';
import { BioInput, TextInput, CommentInput, FormArea, CreateProfileContent, RatingContainer, ErrorText, H1 } from '../theming/createStyle'
import { Formik } from 'formik'
import * as yup from 'yup';

// form validation
const SignUpSchema = yup.object({
    user: yup.string().required('required!!!'),
    password: yup.string().required('required!!!')
})

class CreateProfile extends Component {
    state = {
        bio: '',
        fashionRating: 0,
        foodRating: 0,
        gameRating: 0,
        outRating: 0,
        readRating: 0
      }

  render() {
      console.log(this.state)
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <CreateProfileContent>   
                        <Formik 
                            initialValues={{ 
                                bio: '', 
                                gender: '', 
                                fashionComment: '',
                                foodComment: '',
                                gamingComment: '',
                                outdoorComment: '',
                                readingComment: '' }}
                            // validationSchema={SignUpSchema}
                            onSubmit={(values) => {
                                console.log(values)
                            }}
                        >
                            {/* get access to props of Formik */}
                            {(props) => (
                                <FormArea>
                                    <HeaderContainer>
                                        <HeaderText>real quick..</HeaderText>
                                        <Subtitle>tell us a bit about yourself! create your profile.
                                        </Subtitle>
                                    </HeaderContainer>
                                    <H1>tell us a little bit about yourself.
                                    </H1>
                                    <BioInput 
                                        placeholder='please enter a short bio! (250 words max)' 
                                        onChangeText={props.handleChange('bio')} 
                                        maxLength={150}
                                        multiline
                                        numberOfLines={7}
                                        value = {props.values.bio}
                                    />
                                    <ErrorText>{props.touched.bio && props.errors.bio }</ErrorText>

                                    <H1>what is your gender identity?</H1>
                                    <TextInput 
                                        placeholder='please tell us your gender!' 
                                        onChangeText={props.handleChange('gender')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.gender}
                                    />
                                    <ErrorText>{props.touched.gender && props.errors.gender }</ErrorText>
                                    
                                    <H1>now let's talk about your interests.</H1>
                                    <Subtitle>use your finger to slide over the following areas to rate
                                        them! you may add any additional comments about the interest area, but it is optional.
                                    </Subtitle>
                                    <RatingContainer>
                                    <Subtitle>fashion ({this.state.fashionRating}/5)&nbsp;</Subtitle>
                                    <Rating
                                            type='heart'
                                            ratingCount={5}
                                            imageSize={15}
                                            fractions={1}
                                            startingValue={0}
                                            onFinishRating={rating => this.setState({fashionRating: rating})}
                                    />         
                                    </RatingContainer>
                                    <CommentInput 
                                        placeholder='comments about fashion...' 
                                        onChangeText={props.handleChange('fashionComment')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.fashionComment}
                                    />
                                    <RatingContainer>
                                    <Subtitle>food ({this.state.foodRating}/5) &nbsp;</Subtitle>
                                    <Rating
                                            type='heart'
                                            ratingCount={5}
                                            imageSize={15}
                                            fractions={1}
                                            startingValue={0}
                                            onFinishRating={rating => this.setState({foodRating: rating})}
                                    />   
                                    </RatingContainer>
                                    <CommentInput 
                                        placeholder='comments about food...' 
                                        onChangeText={props.handleChange('foodComment')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.foodComment}
                                    />
                                    <RatingContainer>
                                    <Subtitle>gaming ({this.state.gameRating}/5)&nbsp;</Subtitle>
                                    <Rating
                                            type='heart'
                                            ratingCount={5}
                                            imageSize={15}
                                            fractions={1}
                                            startingValue={0}
                                            onFinishRating={rating => this.setState({gameRating: rating})}
                                    />   
                                    </RatingContainer>
                                    <CommentInput 
                                        placeholder='comments about gaming...' 
                                        onChangeText={props.handleChange('gamingComment')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.gamingComment}
                                    />
                                    <RatingContainer>
                                    <Subtitle>outdoors &nbsp;</Subtitle>
                                    <Rating
                                            type='heart'
                                            ratingCount={5}
                                            imageSize={15}
                                            fractions={1}
                                            startingValue={0}
                                            onFinishRating={rating => this.setState({outRating: rating})}
                                    />    
                                    </RatingContainer>
                                    <CommentInput 
                                        placeholder='comments about the outdoors...' 
                                        onChangeText={props.handleChange('outdoorComment')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.outdoorComment}
                                    />
                                    <RatingContainer>
                                    <Subtitle>reading &nbsp;</Subtitle>
                                    <Rating
                                            type='heart'
                                            ratingCount={5}
                                            imageSize={15}
                                            fractions={1}
                                            startingValue={0}
                                            onFinishRating={rating => this.setState({readRating: rating})}
                                    />    
                                    </RatingContainer>   
                                    <CommentInput 
                                        placeholder='comments about reading...' 
                                        onChangeText={props.handleChange('readingComment')} 
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

        </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}

export default connect(mapStateToProps, {pickTheme})(CreateProfile);




