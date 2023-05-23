import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';
import{ethers} from "ethers";
import { AppService } from './app.service';
import { RequestTokenDto } from './dtos/RequestTokenDto';
import { VoteDto } from './dtos/VoteDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  @Get("last-block")
  getLastBlock() {
    return this.appService.getLastBlock();
  }

  a: number=0;
  @Get("contract-address")
  getContractAddress()
  {
    return this.appService.getTokenContractAddress();
  }
  @Get("total-supply")
  getTotalSupply()
  {
    return this.appService.getTotalSupply();
  }

  @Get("balance-of/:address")
  getBalanceOf(@Param('address') address: string )
  {
    return this.appService.getBalanceOf(address);
  }
  
  @Get("transaction-receipt/")
  getTransactionReceipt(@Query('hash') hash: string )
  {
    return this.appService.getTransactionReceipt(hash);
  }

  
  @Post("request-tokens/")
  requestTokens(@Body('') body: RequestTokenDto )
  {
    return this.appService.requestTokens(body.address,body.tokens)
  }

  @Get("votes-count/:address")
  getVotes(@Param('address') address: string  )
  {
    return this.appService.getVotes(address);
  }

  @Post("vote/")
  vote(@Body('') body: VoteDto )
  {
    return this.appService.vote(body.proposalNo,body.votes)
  }
  @Get("delegate/")
  delegate(@Query('delegate') delegate: string )
  {
    return this.appService.delegate(delegate);
  }
@Get("winnerName/")
  getWinner( )
  {
    return this.appService.getWinnerName();
  }

  @Get("votePower/")
  getVotePower(@Query('address') address: string )
  {
    return this.appService.getVotingPower(address);
  }
}
