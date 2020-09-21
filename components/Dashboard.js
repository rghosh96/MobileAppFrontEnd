import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Container, HeaderContainer, HeaderText, Connections, Text,
  ButtonText, ProfileText, ProfileImage, ProfileContainer, ConnectionsContainer, 
  PeopleImage, MatchesContainer, MatchesText, MatchesDash } from '../theming/dashStyle'


class Dashboard extends Component {
  render() {
      console.log(this.props.theme)
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <Container>
                <HeaderContainer>
                    <HeaderText>mobile app</HeaderText>
                </HeaderContainer>
                
          

                <ProfileContainer>
                    <ProfileImage source={require('../mockData/rashi.jpeg')} />
                    <ProfileText>
                        rashi ghosh {"\n"}
                        computer science {"\n"}
                        senior
                    </ProfileText>
                </ProfileContainer>
                
                <MatchesContainer>
                  <MatchesDash>
                    <MatchesText>top 3 matches</MatchesText>
                  </MatchesDash>
                  <PeopleImage source={require('../mockData/pic1.jpg')} />
                  <PeopleImage source={require('../mockData/pic4.jpg')} />
                  <PeopleImage source={require('../mockData/pic3.jpg')} />
                </MatchesContainer>

                <MatchesContainer>
                  <PeopleImage source={require('../mockData/pic2.jpg')} />
                  <PeopleImage source={require('../mockData/pic5.jpg')} />
                  <PeopleImage source={require('../mockData/pic6.jpg')} />
                  <MatchesDash>
                    <MatchesText>random matches</MatchesText>
                  </MatchesDash>
                </MatchesContainer>

                <ConnectionsContainer>
                  <Connections>11</Connections>
                  <Text>total connections</Text>
                </ConnectionsContainer>
                
                
            </Container>
        </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}

export default connect(mapStateToProps, {pickTheme})(Dashboard);




