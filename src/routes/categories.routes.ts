import { Router } from 'express'
import {v4 as uuidV4} from 'uuid'
import { Category } from '../model/Category'
import { CategoriesRepository } from '../repositories/CategoriesRepository'


const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()


categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body
    
   
    return response.status(201).send()
})


categoriesRoutes.get("/list", (request, response) => {
    const all = categoriesRepository.list()
    return response.status(200).json(all)
})

export { categoriesRoutes }