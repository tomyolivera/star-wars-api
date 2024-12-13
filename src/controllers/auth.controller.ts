import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res
} from '@nestjs/common'
import { Response } from 'express'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from '@/services/auth.service'
import { Public } from '@/decorators/auth.decorator'
import { User, AuthDTO, UserDTO } from '@/schemas/user.schema'
import { UserService } from '@/services/user.service'
import { Messages } from '@/utils/messages'

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
    if (!token) throw new BadRequestException(Messages.User.INVALID_CREDENTIALS)
    return res.status(HttpStatus.OK).json({ token })
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ type: User })
  @Post('register')
  public async register(@Body() user: UserDTO, @Res() res: Response) {
    const newUser = await this.authService.register(user)
    if (!newUser) throw new BadRequestException(Messages.User.ALREADY_EXISTS)
    return res.status(HttpStatus.CREATED).json(newUser)
  }
}
