import Apps from "../models/apps.js";
import User from "../models/user.js";



async function createApps(req, res) {
    try {
        const data = req.body;
        

        if (data) {


            const userData = await User.findOne({ email: data.email });

            if (!userData) {
                return res.status(404).json({ message: "User not found" });
            }


            const appname = await Apps.findOne({ name: data.bodydata.name })
            if (appname) {
                return res.status(400).json({ message: "❌ app allredy created!" })
            }

            const appdata = {
                name: data.bodydata.name,
                logo: data.bodydata.logo,
                title: data.bodydata.title,
                link:data.bodydata.link,
                discription: data.bodydata.discription,
                createdBy: userData._id,

            }

            await Apps.create(appdata)
            return res.status(200).json({ message: "✅ app create Sucessfully" })
        }

        return res.status(400).json({ message: "❎app not create" })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Fill the form Correctly" })
    }
}

async function appApps(req, res) {
    try {
        const apps = await Apps.find()
        return res.status(200).json({ apps: apps })
    } catch (error) {
        return res.status(400).json({ message: "error from all apps" })
    }
}
async function appAppsId(req, res) {
    try {
        const appid = req.params.id
        const apps = await Apps.find({_id:appid})
        return res.status(200).json({apps})
    } catch (error) {
        return res.status(400).json({ message: "error from all apps" })
    }
}

async function searchapp(req, res) {

    try {
        const query = req.query.search;
    
        if (!query) {
            return res.status(400).json({ message: "No search query provided" });
        }

        const apps = await Apps.find({
            $or: [{ "name": { $regex: query, $options: "i" } },
            { "title": { $regex: query, $options: "i" } }]
        });
        return res.status(200).json({ apps: apps });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "search problem" })
    }
}

async function userApps(req, res) {
    try {
        const data = req.body;
        const userData = await User.findOne({ email: data.email });
        
        if (userData) {
            if (data.param.appId) {
                const app = await Apps.findOne({ _id: data.param.appId, createdBy: userData._id });
                
                if (app) {
                    return res.status(200).json({ app });
                } else {
                    return res.status(404).json({ message: "App not found" });
                }
            } else {
                const userApps = await Apps.find({ createdBy: userData._id });
                return res.status(200).json({ apps: userApps });
            }
        }
        
        return res.status(400).json({ message: "User not found" });
    } catch (error) {
        return res.status(400).json({ message: "User apps error", error: error });
    }
}


async function appDelete(req,res){
    try {
       const data = req.body;
       console.log(data);
       const userData = await User.findOne({email:data.email})
       if (userData) {

            const deleteApp = await Apps.findOne({_id:data.bodydata.appId})
            if (deleteApp) {
             await Apps.deleteOne({_id:deleteApp._id})
             return res.status(200).json({message:"App Delete Sucessfully"})
            }
            return res.status(200).json({message:"App Not Found !!"})
       }
       return res.status(400).json({message:"user not found"})

    } catch (error) {
        return res.status(400).json({message:"user apps error delete",error:error})
    }
}

async function appUpdate(req,res) {
    try {
        const userData = req.body;
            console.log(userData);
            const uid = userData.id
            const updateApp = await Apps.findOne({_id:userData.bodydata._id})

             if (updateApp.createdBy == uid) {
                            const appUpdated = await updateApp.updateOne({ 
                                name: userData.bodydata.name,
                                title: userData.bodydata.title,
                                link: userData.bodydata.link,
                                discription: userData.bodydata.discription
                            })
               res.status(200).json({ message: "App Updated Sucessfully", appUpdated });
            }else{
                res.status(400).json({ message: 'user App not found' })
            }


    } catch (error) {
        res.status(200).json({ message: 'App Name allredy Register',error: `${error}` })
    }
}
// app logo update controller
async function appLogoUpdate(req,res) {
    
    try {
        const data = req.body;
        const logo = req.file;

// token
       console.log(data.token);
       
// logo and appid is gating

        if (logo && data.appid) {

        res.status(200).json({message:logo,data:data})

        }else{
            res.status(202).json({message:"logo and data image is not upload"})
        }
        
    } catch (error) {
        res.status(200).json({ message: 'App logo Upload Problem',error: `${error}` })
    }
    
}

export default {
    createApps,
    appApps,
    searchapp,
    userApps,
    appDelete,
    appUpdate,
    appAppsId,
    appLogoUpdate
}