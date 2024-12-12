import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe
} from '@nestjs/common'
import { Response } from 'express'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from '@/services/auth.service'
import { Public } from '@/decorators/auth.decorator'
import { User, AuthDTO, UserDTO } from '@/schemas/user.schema'
import { Messages } from '@/utils/messages'
import { UserService } from '@/services/user.service'

@Public()
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @ApiOperation({ summary: 'Authenticate user' })
  @ApiOkResponse({ type: String })
  @Post('login')
  public async login(@Body() user: AuthDTO, @Res() res: Response) {
    const token = await this.authService.login(user)
    return res.status(HttpStatus.OK).json(token)
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ type: User })
  @Post('register')
  public async register(
    @Body(new ValidationPipe()) user: UserDTO,
    @Res() res: Response
  ) {
    const userExists = await this.userService.findOne({
      column: user.username,
      withErrorIfFound: false
    })
    if (userExists) throw new BadRequestException(Messages.User.ALREADY_EXISTS)

    const newUser = await this.authService.register(user)
    return res.status(HttpStatus.CREATED).json(newUser)
  }
}
