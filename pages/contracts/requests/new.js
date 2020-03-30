import React,{Component} from 'react';
import {Form,Button,Message,Input} from 'semantic-ui-react';
import MyContract from '../../../ethereum/contract';
import web3 from '../../../ethereum/web3';
import {Link,Router} from '../../../routes';
import Layout from '../../../components/Layout';
class RequestNew extends Component{
  state={
    value:'',
    description:'',
    recipient:'',
    errorMsg:'',
    loading:false
  }
  static async getInitialProps(props){
    const {address} = props.query;
    return {address};
  }
  onSubmit = async event =>{
    event.preventDefault();
    console.log("hii");
    const contract=MyContract(this.props.address);
    const {description,value,recipient}=this.state;
    this.setState({loading:true,errorMsg:''});
    try {
      const accounts=await web3.eth.getAccounts();
      await contract.methods.createRequest(description,
      web3.utils.toWei(value,'ether'),recipient).send(
        {
          from: accounts[0]
        }

      );
      Router.pushRoute(`/contracts/${this.props.address}/requests`);
    }catch(err){
        this.setState({errorMsg:err.message});
    }
    this.setState({loading:false});
  }
  render(){
    return (
      <Layout>
      <Link route={`/contracts/${this.props.address}/requests`}>
      <a>
      <Button primary>Back</Button>
      </a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
      <Form.Field>
      <label>Description</label>
      <Input
      value={this.state.description}
      onChange={event =>this.setState({description:event.target.value})}
      />
      </Form.Field>

      <Form.Field>
      <label>Value</label>
      <Input
      value={this.state.value}
      onChange={event =>this.setState({value:event.target.value})}
      /></Form.Field>


      <Form.Field>
      <label>Recipient</label>
      <Input
      value={this.state.recipient}
      onChange={event =>this.setState({recipient:event.target.value})}
      />
      </Form.Field>
      <Message error header="Oops!" content={this.state.errorMsg}/>
      <Button primary loading={this.state.loading}>Create!</Button>
      </Form>
      </Layout>
    );
  }
}

export default RequestNew;
