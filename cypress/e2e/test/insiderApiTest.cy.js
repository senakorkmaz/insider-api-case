/// <reference types="cypress" />
import petService from '../services/petService.js'

describe('Api test',()=>{
    
    it('Positive CRUD',()=>{
        petService.postPet("VALID_PET",200)
        petService.postImage("VALID_PET",200)
        petService.putPet("UPDATED_PET",200)
        petService.getPetByStatus("pending",200)
        petService.getPetById("UPDATED_PET",200)
        petService.updatePetData("UPDATED_PET2",200)
        petService.getPetById("UPDATED_PET2",200)
        petService.deletePet("UPDATED_PET2",200)
    })

    it('Negative CRUD',()=>{
        petService.postPet("UNVALID_PET",500)
        petService.postImage("UNVALID_PET",404)
        petService.putPet("UNVALID_PET",500)
        petService.getPetById("UNVALID_PET",404)
        petService.updatePetData("UNVALID_PET",404)
        petService.getPetById("UNVALID_PET",404)
        petService.deletePet("UNVALID_PET",404)
    })
})