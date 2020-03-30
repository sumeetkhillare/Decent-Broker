import React,{Component} from 'react';
import Layout from '../../../components/Layout'
import {Button,Table} from 'semantic-ui-react';
import {Link } from '../../../routes';
import Campaign from '../../../ethereum/contract';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component{
  static async getInitialProps(props){
    const {address} = props.query;
    const campaign = Campaign(address);
    const reqCount=await campaign.methods.getRequestCount().call();
    const approversCount=await campaign.methods.approversCount().call();

    const request = await Promise.all(
      Array(parseInt(reqCount)).fill().map((element,index)=>{
        return campaign.methods.requests(index).call();
      })
    );
    console.log(request);
    return {address,request,reqCount,approversCount};
  }
  renderRow(){
    return this.props.request.map((request,index)=>{
      return <RequestRow
      key={index}
      id={index}
      request={request}
      address={this.props.address}
      approversCount={this.props.approversCount}
      />;
    });
  }
  render(){
    const {Header, Row, HeaderCell, Body}=Table;
    return(
      <Layout>
      <h3>Request page</h3>
      <Link route={`/campaigns/${this.props.address}/requests/new`}>
      <a>
      <Button primary floated="right" style={{marginBottom:10}}>Add Request</Button>
      </a>
      </Link>
      <Table>
      <Header>
      <Row>
      <HeaderCell>ID</HeaderCell>
      <HeaderCell>Description</HeaderCell>
      <HeaderCell>Amount</HeaderCell>
      <HeaderCell>Recepient</HeaderCell>
      <HeaderCell>Approval Count</HeaderCell>
      <HeaderCell>Approve</HeaderCell>
      <HeaderCell>Finalize</HeaderCell>
      </Row>
      </Header>
      <Body>
      {this.renderRow()}
      </Body>
      </Table>
      <div>Found {this.props.reqCount} requests</div>
      </Layout>
    );
  }
}

export default RequestIndex;
