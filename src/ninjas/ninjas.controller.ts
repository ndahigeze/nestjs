import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { NotFoundError } from 'rxjs';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjaService: NinjasService){}
    @Get()
    getNinjas(@Query('type') weapon: 'stars'| 'nunchucks') { 
        
      return this.ninjaService.getNinjas(weapon);
    }

    /**
     * 
     * @param id Can create custom Pipe for validation purpose 
     * @returns 
     */
    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id: number) {
        try{
            return this.ninjaService.getNinja(id);
        }catch(err){
         throw new NotFoundException()
        }
    }


    @Post()
    @UseGuards(BeltGuard)
    createNinjas(@Body(new ValidationPipe()) createNinjasDto:CreateNinjaDto){
        return this.ninjaService.createNinja(createNinjasDto)
    }

    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto:UpdateNinjaDto){
        return this.ninjaService.updateNInja(+id, updateNinjaDto)
    }

    @Delete(':id')
    deleteNinjas(@Param('id') id: string){
        return this.ninjaService.removeNinja(+id);
    }
}
