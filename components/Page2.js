import React from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Footer, Content, Icon, Button, Item, Input, Text, ListItem, List, Spinner, Thumbnail } from 'native-base';

class Page2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerslist: "",
            loading: false,
            teamsid: this.props.navigation.getParam("teamsid")
        }
    }


    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("teamName"),
            headerStyle: {
                backgroundColor: "purple"
            },
            headerTintColor: "white"
        }
    }

    componentDidMount() {

        this.setState({
            loading: true
        });


        axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${this.state.teamsid}`).then((x) => {
            this.setState({
                playerslist: x.data.player,
                loading: false
            });
        });
    }

    displayPlayers() {
        return this.state.playerslist.map((val, i) => {
            var playersid = val.playersid;
            var playersname = val.strPlayer;
            var playersphoto = val.strThumb;
            var playersposition = val.strPosition;
            var playersdescription = val.strDescriptionEN;
            var playersnat = val.strNationality;

            return (
                <ListItem key={i} avatar onPress={() => {
                    this.props.navigation.navigate("Page3", {
                        playersid: playersid,
                        playersname: playersname,
                        playersdescription: playersdescription,
                        playersnat: playersnat,
                        playersphoto: playersphoto
                    })
                }}>
                    <Left>
                        <Thumbnail square source={{ uri: playersphoto }} />
                    </Left>
                    <Body>
                        <Text>{playersname}</Text>
                        <Text note>{playersposition}</Text>
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
                        {this.state.loading ? <Spinner /> : this.state.playerslist ? this.displayPlayers() : <Text></Text>}
                    </List>
                </ScrollView>
            </Container>
        )
    }
}

export default Page2;
