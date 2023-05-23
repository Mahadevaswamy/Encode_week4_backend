import { Injectable } from '@nestjs/common';
import{Contract, ethers} from "ethers";
import * as tokenJson from "./assets/ERC20VotesContract.json";
import * as ballotJson from "./assets/Ballot.json";
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {
   provider: ethers.providers.BaseProvider ;
   tokenContract: ethers.Contract;
   ballotContract: ethers.Contract;
   apiKey: string;
   signer: ethers.Wallet;

   constructor(private configService: ConfigService){
    this.apiKey=this.configService.get<string>('ETHERSCAN_API_KEY');
    this.provider= new ethers.providers.EtherscanProvider('sepolia',this.apiKey);
   //  this.provider = ethers.getDefaultProvider("sepolia");
     this.tokenContract=new Contract(this.getTokenContractAddress(), tokenJson.abi, this.provider);
     this.ballotContract=new Contract(this.getBallotContractAddress(), ballotJson.abi, this.provider);
     const pkey=this.configService.get<string>('PRIVATE_KEY');
    const wallet=new ethers.Wallet(pkey);
    this.signer=wallet.connect(this.provider);
   }
  getHello(): string {
    return 'Hello World!';
  }

  getLastBlock(): Promise<ethers.providers.Block> {
   // const wallet=new  ethers.Wallet(process.env.PRIVATE_KEY ?? "");
   //console.log(`Using the wallet address: ${wallet.address}`)
  
   //const provider=new ethers.providers.AlchemyProvider("sepolia", process.env.ALCHEMY_API_KEY);
   return this.provider.getBlock("latest");
  }
  getTokenContractAddress()
  {
    const tokeAddress=this.configService.get<string>('TOKEN_ADDRESS');
    return tokeAddress;
  }
  getBallotContractAddress()
  {
    const tokeAddress=this.configService.get<string>('BALLOT_ADDRESS');
    return tokeAddress;
  }
  getTotalSupply()
  {
    
    return this.tokenContract.totalSupply();
  }
  getBalanceOf(address: string)
  {
      return this.tokenContract.balanceOf(address);
  }
  async getTransactionReceipt(hash: string){
    const tx= await this.provider.getTransaction(hash);
    const receipt=await tx.wait();
     return receipt;
  }
async isAddressHasMinterRole(address: string)
{
  return this.tokenContract.MINTER_ROLE;
}
  async getReceipt(tx: ethers.providers.TransactionResponse){
    return await tx.wait();
  }
  async requestTokens(address:string, tokens:string)
  {

return this.tokenContract.connect(this.signer).mint(address, ethers.utils.parseUnits(tokens));
  }
  
  async getVotes(address: string )
  {
   return this.tokenContract.connect(this.signer).getVotes(address);
 //   return ethers.utils.parseUnits(votes);
  }


  async vote(proposal:string, votesCount: string )
  {
    return this.ballotContract.connect(this.signer).vote(proposal, votesCount);
  } 
  async delegate(address:string)
  {
    return this.tokenContract.connect(this.signer).delegate(address);
  }
  async getWinnerName()
  {
   const winner= this.ballotContract.connect(this.signer).winnerName();
   
   return winner;
  }
  async getVotingPower(address: string)
  {
    return this.ballotContract.connect(this.signer).votingPower(address);
  }
}
