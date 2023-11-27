const users=[];

function createuser(id,username,room){
    const user={id,username,room};

    users.push(user);

    return user;
}

function getuser(id){

    return users.find(user=>user.id===id)||null;
}
module.exports={
    createuser,
    getuser
}