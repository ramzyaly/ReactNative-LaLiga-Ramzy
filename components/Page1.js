import React from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Footer, Content, Icon, Button, Item, Input, Text, ListItem, List, Spinner, Thumbnail } from 'native-base';

class Page1 extends React.Component {

    state = {
        laligateams: "",
        loading: false
    }

    static navigationOptions = {
        title: "La Liga Teams",
        headerStyle: {
            backgroundColor: "purple"
        },
        headerTintColor: "white"
    }

    componentDidMount() {
        this.setState({
            loading: true
        });

        axios.get('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?s=Soccer&c=Spain').then((x) => {
            this.setState({
                laligateams: x.data.teams,
                loading: false
            });
        });
    }

    displayTeams() {
        return this.state.laligateams.map((val, i) => {
            var teamsid = val.teamsid;
            var teamsname = val.strTeam;
            var teamswebsite = val.strWebsite;
            var teamslogo = val.strTeamBadge

            return (
                <ListItem key={i} avatar onPress={() => {
                    this.props.navigation.navigate("Page2", {
                        teamsid: teamsid,
                        teamsname: teamsname
                    })
                }}>
                    <Left>
                        <Thumbnail source={{ uri: teamslogo }} />
                    </Left>
                    <Body>
                        <Text>{teamsname}</Text>
                        <Text note>{teamswebsite}</Text>
                    </Body>
                    <Right>
                    </Right>
                </ListItem>
            )
        })
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <List>
                        {this.state.loading ? <Spinner /> : this.state.laligateams ? this.displayTeams() : <Text></Text>}
                    </List>
                </ScrollView>
            </Container>
        )
    }
}

export default Page1;
