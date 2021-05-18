function getAllUsers (){
    return {
        _source: ["username"],
        query: {
            match_all: {}
        }
    }
}


module.exports={
    getAllUsers
}
