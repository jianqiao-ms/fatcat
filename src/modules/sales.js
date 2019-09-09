import React from 'react';
import dateformat from 'dateformat'

import "../scss/index.scss"


class SalesUI extends React.Component {
  render() {
    return(
      <div className={"container-fluid bg-dark vh-100 pt-2 pl-4"}>
        <SalesHeader />
      </div>
    )
  }
}

class SalesHeader extends React.Component {
  render = () => {
    return(
      <div className={"row pt-3 pb-2 text-white border border-white"}>
        <SalesHeaderLeftBlock />
        <SalesHeaderSecondBlock />
      </div>
    )
  }
}
class SalesHeaderBlockLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      value: this.props.value
    };
  };

  render() {
    return(
      <div className={"row"}>
        <div className={"col-3"}>{this.state.name}</div>
        <div className={"col-auto"}>{this.state.value}</div>
      </div>
    )
  }
}
class SalesHeaderBlockLineClock extends SalesHeaderBlockLine {
  componentDidMount = () => {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  };
  componentWillUnmount = () => {
    clearInterval(this.intervalID);
  };
  tick = () => {
    this.setState({
      value: dateformat(new Date(), "yyyy/mm/dd H:M:s")
    });
  }
}

class SalesHeaderLeftBlock extends React.Component {
  render() {
    const current_time = dateformat(new Date(), "yyyy/mm/dd H:M:S");
    return(
      <div className={"col-2 border-right border-white"}>
        <SalesHeaderBlockLine name={"单号"} value={"012345678910"}/>
        <SalesHeaderBlockLineClock name={"时间"} value={current_time}/>
        <SalesHeaderBlockLine name={"Mode"} value={"联机"}/>
      </div>
    )
  }
}

class SalesHeaderSecondBlock extends React.Component {
  render() {
    return (
      <div className={"col-2 border-right border-white"}>
        <SalesHeaderBlockLine name={"收银员"} value={"大碗面"}/>
      </div>
    )
  }
}

export default SalesUI
