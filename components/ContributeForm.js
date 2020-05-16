import React,{Component} from 'react';
import {Form ,Input,Message,Button} from 'semantic-ui-react';
import MyContract from '../ethereum/contract';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ContributeForm extends Component{
  state={
    value:'',
    errorMsg:'',
    loading:false,
    manager:'',
    reciever:'',
    date:''
  };

  onSubmit = async event=>{
    event.preventDefault();
    const contract = MyContract(this.props.address);
    const manager_address=await contract.methods.getManagerAddress().call();
    const receiver_address=await contract.methods.getReceiverAddress().call();
    this.setState({manager:manager_address});
    this.setState({reciever:receiver_address});
    this.setState({loading:true});
    try{

      const accounts = await web3.eth.getAccounts();
      var d=new Date();
      var n=this.state.value+"\n at: "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"   "+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
      this.setState({date:n});
      if(accounts[0]==receiver_address)
      {await contract.methods.setMsgfromReceiver(n).send({
        from: accounts[0],
      });
    }else if(accounts[0]==manager_address){
      await contract.methods.setMsgfromManager(n).send({
        from: accounts[0],
      });

    }

      Router.replaceRoute(`/contracts/${this.props.address}`);
    }catch(err){
      this.setState({errorMsg:err.message});
    }
    this.setState({loading:false,value:''});
  };
  render(){
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
      <Form.Field>
      <label style={this.props.isAccepted ? { display: 'none' } : {}}>Add Some Suggestions</label>
      <Input value={this.state.value} onChange={event => this.setState({value: event.target.value})} style={this.props.isAccepted ? { display: 'none' } : {}}>
      </Input>
      </Form.Field>
      <Message error header="Oops!" content={this.state.errorMsg}/>
      <Button primary loading={this.state.loading} style={this.props.isAccepted ? { display: 'none' } : {}}>Add</Button>
      </Form>
    );
  }
}
export default ContributeForm;
