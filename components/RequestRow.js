import React,{Component} from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3'
import MyContract from '../ethereum/contract';
import Router from '../routes';
class RequestRow extends Component{

    onFinalize=async()=>{
      const contract = MyContract(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await contract.methods.finalizeRequest(this.props.id).send(
        {from : accounts[0]}
      );
      Router.pushRoute(`/contracts/${this.props.address}/requests`);

    };
    onApprove=async()=>{
        const contract = MyContract(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await contract.methods.approveRequest(this.props.id).send(
          {from : accounts[0]}
        );
        Router.pushRoute(`/contracts/${this.props.address}/requests`);

        };
  render(){
    console.log(Router);
    const {Row,Cell}=Table;
    const {id,request,approversCount}=this.props;
    const readyToFinalize = request.approvalCount>approversCount/2;
    return (
      <Row disabled={request.complete} positive={readyToFinalize &&!request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value,'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>
        <Cell> {
          request.complete ? null : (
          <Button color="green" basic onClick={this.onApprove}>Approve
          </Button>)}
        </Cell>
        <Cell>
          {
            request.complete ? null : (
                  <Button color="teal" basic onClick={this.onFinalize}>Finalize
                  </Button>
            )
          }
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
