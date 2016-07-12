import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false
    };
  }


  render() {
    console.log(this);
    return (
      <Card>
        <CardTitle
          title = {this.props.params.id + ' User name'}
        />
        <CardText>
          <p>ssdasda</p>
        </CardText>
      </Card>
    );
  }
}
