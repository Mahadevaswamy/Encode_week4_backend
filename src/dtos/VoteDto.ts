import { ApiProperty } from "@nestjs/swagger";

export class VoteDto{
    @ApiProperty()
    readonly proposalNo: string;
    @ApiProperty()
    readonly votes: string;
}