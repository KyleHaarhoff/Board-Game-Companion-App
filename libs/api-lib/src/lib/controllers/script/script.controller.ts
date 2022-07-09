import { Controller, Body,  Get, Query, Post, Put, Delete, Req ,UploadedFile, UseInterceptors, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ScriptService } from '../../services/scripts/script.service';
import { Script } from '../../schemas/script.schema';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { status } from '../../models/general/status';


@Controller('scripts')
export class ApiScriptController {
    constructor(private readonly scriptService:ScriptService){}
    
    @Post('create-script')
    @UseInterceptors(FileInterceptor('icon'))
    async createScript(@Req() request: Request,@Body('user')user:string,@Body('name')name:string,@Body('boardGameId')boardGameId:string,@Body('description')description:string,@UploadedFile()icon): Promise<Script>{ 
        const stat:status = {value : 1, message:  name + " has been in progress since " +this.scriptService.formatDate(new Date()) + "."}

        return this.scriptService.create(user,name,boardGameId,stat,description,icon);
    }

    @Get('retrieve/byid')
    async retrieveScript(@Query('id')id:number): Promise<Script>{
        return await this.scriptService.findById(id);
    }
    
    @Get('retrieve/all')
    async retrieveAllScripts():Promise<Script[]>{
        return await this.scriptService.findAll();
    }

    @Post('update')
    async updateScriptInfo(@Body('id')id:string,@Body('name')name:string,@Body('public')pub:boolean,@Body('export')exp:boolean,@Body('status')stat:status){
        return await this.scriptService.updateInfo(id,name,pub,exp,stat); 
    }

    @Delete('remove/:id')
    async removeScript(@Param('id')id:string){
       await this.scriptService.removeById(id); 
    }

    //rating functions
    
    @Post('create-rating')
    async createUserRating(@Body('user')user:number,@Body('script')scriptId:string,@Body('value')value:number){
        console.log('createUserRating');
    }

    @Get('retrieve-rating')
    async retrieveUserRating(@Query('id')user:number): Promise<Script>{
        return await this.scriptService.findById(user);
    }

    @Put('update-rating')
    async updateUserRating(@Body('id')ratingId:string,@Body('value')value:number){
        console.log('updateRating');
    }

    //comment functions
    @Put('add-comment')
    async addComment(@Body('scriptId')scriptId:string,@Body('commentId')commentId:string):Promise<void>{
        this.scriptService.addComment(scriptId,commentId);
    }   
}
