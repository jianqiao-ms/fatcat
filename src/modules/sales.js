import React from 'react';
import dateformat from 'dateformat'

import "../scss/index.scss"

// 整体界面
class SalesUI extends React.Component {
  render() {
    return(
      <div className={"container-fluid bg-dark vh-100 pt-2 pl-4"}>
        <SalesHeader />
        <SalesBodyTable />
      </div>
    )
  }
}

// 头部
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
// 头部普通行元素
class SalesHeaderBlockLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      value: this.props.value
    };
  };

  render() {
    const small_width = this.props.small_width ? this.props.small_width:3;
    return(
      <div className={"row"}>
        <div className={"col-xl-3 pr-0 col-sm-"+small_width}>{this.state.name}</div>
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
      value: dateformat(new Date(), "yyyy/mm/dd HH:MM:ss")
    });
  }
}

// 头部左侧区块
class SalesHeaderLeftBlock extends React.Component {
  render() {
    const current_time = dateformat(new Date(), "yyyy/mm/dd HH:MM:ss");
    return(
      <div className={"col-xl-2 col-sm-4 border-right border-white"}>
        <SalesHeaderBlockLine name={"单号"} value={"012345678910"}/>
        <SalesHeaderBlockLineClock name={"时间"} value={current_time}/>
        <SalesHeaderBlockLine name={"模式"} value={"联机"}/>
      </div>
    )
  }
}

// 头部左侧第二区块
class SalesHeaderSecondBlock extends React.Component {
  render() {
    return (
      <div className={"col-xl-2 col-sm-4 border-right border-white"}>
        <SalesHeaderBlockLine small_width={4} name={"收银员"} value={"大碗面"}/>
        <SalesHeaderBlockLine small_width={4} name={"值班经理"} value={"太美"}/>
      </div>
    )
  }
}

// 中部
class SalesBodyTable extends React.Component {
  render() {
    return(
      <div className={"row mt-1"}>
        <div className={"col-12 pl-0 pr-0"}>
          <table className={"table pl-0 pr-0"}>
            <SalesBodyTableHeader />
          </table>
        </div>
      </div>
    )
  }
}
// 中部普通行元素
class SalesBodyTableHeader extends React.Component {
  render() {
    return (
      <thead className={"bg-light"}>
         <tr>
            <SalesBodyTableCell value={"序号"}/>
            <SalesBodyTableCell value={"条码"}/>
            <SalesBodyTableCell value={"商品名称"}/>
            <SalesBodyTableCell value={"单位"}/>
            <SalesBodyTableCell value={"单价"}/>
            <SalesBodyTableCell value={"数量"}/>
            <SalesBodyTableCell value={"序号"}/>
            <SalesBodyTableCell value={"金额"} last={true}/>
         </tr>
       </thead>
    )
  }
}
class SalesBodyTableCell extends React.Component {
  render() {
    return(
      <td className={"pt-1 pb-0 text-center border-dark" +
          (this.props.last? "" :" border-right ")
      }>
        {this.props.value}
      </td>
    )
  }
}
export default SalesUI
