import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {getTournamentTypes} from './../../api/torunamentTypes/tournamentTypes';

const items = getTournamentTypes().map((type, index) =>
  <MenuItem
    key = {index}
    value = {type._id}
    primaryText = {type.name}
  />);

export default class NewTournament extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      type: '',
      hidden: false
    };
  }

  handleTypeChange(event, index, value) {
    this.setState({type: value});
  }

  handleNameChange(event, value) {
    this.setState({name: value});
  }

  handleCreateTap() {
    Meteor.call('tournaments.insert', this.state.name, this.state.type, () => {
      this.setState({name: '', type: ''});
    });
  }
  render() {
    return (
      <Card>
        <CardTitle
          title = "Create new tournament"
        />
        <CardText>
          <div>
            <TextField
              value = {this.state.name}
              onChange = {this.handleNameChange.bind(this)}
              hintText = "Hard tournament"
              floatingLabelText = "Name of tournament"
            />
            <br />
            <SelectField
              value = {this.state.type}
              onChange = {this.handleTypeChange.bind(this)}
              floatingLabelText = "Type of tournament">
              {items}
            </SelectField>
            <br />
            <RaisedButton
              disabled = {this.state.type === '' || this.state.name === ''}
              label = "Create"
              primary = {true}
              onTouchTap = {this.handleCreateTap.bind(this)}
            />
          </div>
        </CardText>
      </Card>
    );
  }
}
