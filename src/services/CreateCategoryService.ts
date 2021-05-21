class CreateCategoryService {
    execute() {
        const categoryAlreadyExists = categoriesRepository.findByName(name)
        if(categoryAlreadyExists){
            return response.status(400).json({message: "Category already exists."})
        }
        categoriesRepository.create({name, description})
    
    }
}

export { CreateCategoryService }