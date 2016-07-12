import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {createContainer} from 'meteor/react-meteor-data';
import FlatButton from 'material-ui/FlatButton';
import Game from '../components/game';

import {Games} from '../../api/Games';

const style = {
  position: 'fixed',
  right: 25,
  bottom: 25
};

class GamesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      hidden: false,
      dialogOpen: false
    };
  }
  handleOpen() {
    this.setState({dialogOpen: true});
  }

  handleClose() {
    this.setState({dialogOpen: false});
  }

  handleCreate() {
    Meteor.call('games.insert', this.state.name, this.state.type, () => {
      this.setState({name: '', dialogOpen: false});
    });
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  render() {
    const actions = [
      <FlatButton
        key = {1}
        label = "Cancel"
        secondary = {true}
        onTouchTap = {this.handleClose.bind(this)}
      />,
      <FlatButton
        key = {2}
        label = "Create"
        secondary = {true}
        onTouchTap = {this.handleCreate.bind(this)}
      />

    ];
    return (
      <div>
        <Card>
          <CardTitle
            title = "Games:"
          />
          <CardText>
            {this.props.games.map((game, key) =>
              <Game
                key = {key}
                game = {game}
              />
            )}
          </CardText>
        </Card>
        <FloatingActionButton
          secondary = {true}
          style = {style}
          onTouchTap = {this.handleOpen.bind(this)}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title = "Create new game"
          actions = {actions}
          modal = {false}
          open = {this.state.dialogOpen}
          onRequestClose = {this.handleClose.bind(this)}>
          <TextField
            hintText = "No pain no game"
            floatingLabelText = "Game name"
            value = {this.state.name}
            onChange = {this.handleNameChange.bind(this)}
          />
        </Dialog>
      </div>
    );
  }
}
export default createContainer(() => {
  Meteor.subscribe('games');

  return {
    games: Games.find({}, {sort: {createdAt: -1}}).fetch(),
    currentUser: Meteor.user()
  };
}, GamesList);
