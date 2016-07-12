import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Card, CardTitle, CardText} from 'material-ui/Card';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false
    };
  }


  render() {
    return (
      <Card>
        <CardTitle
          title = "Your games"
          subtitle = "Your actual games."
        />
        <CardText>
          <List>
            <ListItem
              primaryText = "Game Name"
              leftAvatar = {
                <Avatar
                  src = "images/kolage-128.jpg"
                />
              }
              rightIcon = {
                <Avatar
                  src = "images/kolage-128.jpg"
                />
              }
              secondaryText = {
                <p>
                  Adolf: 666<br />
                  Jan: 616
                </p>
              }
              secondaryTextLines = {2}
            />
          </List>
        </CardText>
      </Card>
    );
  }
}
