import web3 from './web3';
import MyContract from './build/MyProfile.json';
export default (address)=>{

  return new web3.eth.Contract(
    JSON.parse(MyContract.interface),
    address
  );
};
