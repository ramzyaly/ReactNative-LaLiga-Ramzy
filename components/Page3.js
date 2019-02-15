import React from 'react';
import axios from 'axios';
import { Image, ScrollView } from 'react-native';
import { Container, Card, CardItem, Header, Left, Body, Right, Title, Footer, Content, Icon, Button, Item, Input, Text, ListItem, List, Spinner, Thumbnail } from 'native-base';

class Page3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playersdetail: "",
            loading: false,
            playersid: this.props.navigation.getParam("playersid")
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("playersname"),
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


        axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${this.state.playersid}`).then((x) => {
            this.setState({
                playerDetails: x.data.players[0],
                loading: false
            });
        });
    }

    displayDetails() {
        return (
            <Card transparent style={{ flex: 0, width: 350, alignSelf: "center", marginTop: 10 }}>
                <CardItem>
                    <Left>
                        <Thumbnail style={{ maxWidth: 30, maxHeight: 30 }} source={{ uri: this.props.navigation.getParam("playersphoto") }} />
                        <Body>
                            <Text>{this.props.navigation.getParam("playersname")}</Text>
                            <Text note>{this.props.navigation.getParam("playersnat")}</Text>
                        </Body>
                    </Left>
                    <Right>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <Image source={{ uri: this.props.navigation.getParam("playersphoto") }} style={{ height: 200, width: "100%", flex: 1 }} />
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{ fontSize: 12 }}>{this.props.navigation.getParam("playersdescription")}</Text>
                    </Left>
                </CardItem>
            </Card>
        )
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    {this.displayDetails()}
                </ScrollView>
            </Container>
        )
    }
}

export default Page3;