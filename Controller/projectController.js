const projects = require('../Model/projectModel')


// addprojects

exports.addProjects= async (req,res)=>{
    console.log("inside project controller fn");
    const {title,languages,github,website,overview} = req.body;
    const projectImage = req.file.filename
    const userId = req.payload
    //console.log(title,languages,github,website,overview,projectImage,userId);
    // res.status(200).json("add project request recieved")

try{
    const existingProject = await projects.findOne({github})
    if(existingProject){
        res.status(406).json("project already exist...")
    }else{
        const newProject = new projects({
            title,
            languages,
            github,
            website,
            overview,
            projectImage,
            userId
        })
        newProject.save()
        res.status(200).json(newProject)
    }
}catch(err){
        res.status(401).json(err)
    }
}

// home projects

exports.getHomeProjects = async(req,res)=>{
    try{
        const allProjects = await projects.find().limit(3)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// all userproject

exports.getAllUserProjects = async(req,res)=>{
    const searchKey =req.query.search
    console.log(searchKey);
    const query = {
        languages:{$regex:searchKey,$options:"i"}
    }
    try{
        const alluserprojects = await projects.find(query)
        res.status(200).json(alluserprojects)
    }catch(err){
        res.status(401).json(err)
    }
}
// userprojects


exports.getUserProjects = async(req,res)=>{
    const userId = req.payload
    try{
        const UserProjects = await projects.find({userId})
        res.status(200).json(UserProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// edit projects

exports.editUserProjects = async(req,res)=>{
    const { title,languages,github,website,overview,projectImage}= req.body
    const uploadImage = req.file?req.file.filename:projectImage
    const userId = req.payload
    const {pid}= req.params
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{
            title,
            languages,
            github,
            website,
            overview,
            projectImage:uploadImage,
            userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }catch(err){
res.status(401).json(err)
    }
}

// deleteuserproject

exports.deleteProjects = async(req,res)=>{
    const {pid} = req.params
    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)
    }catch{
        res.status(401).json(err)
    }
}