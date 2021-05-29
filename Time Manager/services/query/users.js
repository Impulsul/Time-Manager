function getAllUsers (){
    return {
        query: {
            match_all: {}
        }
    }
}


module.exports={
    getAllUsers
}
