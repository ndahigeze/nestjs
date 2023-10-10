import { Injectable } from '@nestjs/common';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { CreateNinjaDto } from './dto/create-ninja.dto';

@Injectable()
export class NinjasService {
    private ninjas = [
        {id:0,name:'NinjaApi',weapon:'stars'},
        {id:1, name:'NinjaBundle',weapon:'nunchucks'},
    ];

    getNinjas(weapon?: 'stars'|'nunchucks') {
      if(weapon){
        return this.ninjas.filter(ninjas => ninjas.weapon === weapon);
      }
      return this.ninjas;
    }

    getNinja(id: number){
        const ninja=this.ninjas.find((ninja)=>{
            if(ninja.id === id){
                return ninja
            }
        })
        if(!ninja){
            throw new Error('Ninja not found')
        }
        return ninja
    }

    createNinja(createNinjaDto: CreateNinjaDto){
      const  newNinja = {
        ...createNinjaDto,
        id: Date.now()
      }
      this.ninjas.push(newNinja);
      return newNinja
    }

    updateNInja(id:number, updateNinjaDto: UpdateNinjaDto){
        this.ninjas = this.ninjas.map((ninja)=>{
            if(ninja.id === id){
                return {...ninja, ...updateNinjaDto};
            }
            return ninja
        })
        return this.getNinja(id)
    }

    removeNinja(id: number){
        const tobeRemoved = this.getNinja(id);
        this.ninjas = this.ninjas.filter((ninja)=>ninja.id!==id)
        return tobeRemoved
    }



}
