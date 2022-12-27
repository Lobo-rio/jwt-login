import { 
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UserService } from "../../../application/usecases/users/user.service";

import { CreateUserDto } from "../../../application/usecases/users/dto/create-user.dto";
import { UpdateUserDto } from "../../../application/usecases/users/dto/update-user.dto";

import { BadRequestSwagger } from "../../../helppers/swagger/bad-request.swagger";
import { ConflictExceptionSwagger } from "../../../helppers/swagger/conflict-exception.swagger";
import { NotFoundSwagger } from "../../../helppers/swagger/not-found.swagger";

import { CreateUserSwagger } from "./swagger/user/create-user.swagger";
import { IndexUserSwagger } from "./swagger/user/index-user.swagger";
import { UpdateUserSwagger } from "./swagger/user/update-user.swagger";

@Controller('app/v1/users')
@ApiTags('Users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    @ApiOperation({ summary: 'List users' })
    @ApiResponse({ 
        status:  200, 
        description: 'List of users returned successfully',
        type: IndexUserSwagger,
        isArray: true,
    })
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'List a single users' })
    @ApiResponse({ 
        status:  200, 
        description: 'Returned single user successfully',
        type: IndexUserSwagger,
        isArray: false, 
    })
    @ApiResponse({ 
        status:  400, 
        description: 'Invalid parameters',
        type: BadRequestSwagger,
    })
    @ApiResponse({ 
        status: 404,
        description: 'User not found',
        type: NotFoundSwagger,
    })
    async findById(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ 
        status:  201, 
        description: 'New user successfully created',
        type: CreateUserSwagger,
    })
    @ApiResponse({ 
        status:  400, 
        description: 'Invalid parameters',
        type: BadRequestSwagger, 
    })
    @ApiResponse({ 
        status:  409, 
        description: 'ConflictException',
        type: ConflictExceptionSwagger, 
    })
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ 
        status:  200, 
        description: 'User updated successfully',
        type: UpdateUserSwagger,
    })
    @ApiResponse({ 
        status:  400, 
        description: 'Invalid parameters',
        type: BadRequestSwagger,
    })
    @ApiResponse({ 
        status: 404,
        description: 'User not found',
        type: NotFoundSwagger,
    })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: UpdateUserDto
    ) {
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ 
        status:  204, 
        description: 'User removed successfully' 
    })
    @ApiResponse({ 
        status:  400, 
        description: 'Invalid parameters',
        type: BadRequestSwagger,
    })
    @ApiResponse({ 
        status: 404,
        description: 'User not found',
        type: NotFoundSwagger,
    })
    async remove(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userService.remove(id);
    }
}