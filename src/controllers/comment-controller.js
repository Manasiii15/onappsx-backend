import Apps from '../models/apps.js'; 
import User from '../models/user.js'; 

// Create a new comment for an app
export const addComment = async (req, res) => {
    try {
        const appId = req.params.id;
        const userId = req.body.id;
        const { comment } = req.body.bodydata;

        const app = await Apps.findById(appId);

        if (!app) {
            return res.status(404).json({ message: 'App not found' });
        }

        const username = await User.findById(userId);
        // const name = username.name
        // const profilePicture = username.profilePicture
        console.log(username);
        const newComment = {
            userId,
            comment,
            // name,
            // profilePicture,
        };
console.log(newComment);
        app.comments.push(newComment);
        await app.save();

        res.status(201).json({message:'✅ Comment Post Successfully !!'});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all comments for an app
// export const getComments = async (req, res) => {
//     try {
//         const appId = req.params.id;
//         const app = await Apps.findById(appId)
//         if (!app) {
//             return res.status(404).json({ message: 'App not found' });
//         }

//         res.status(200).json(app.comments);
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error', error });
//     }
// };

// Get all comments for an app
export const getComments = async (req, res) => {
    try {
        const appId = req.params.id;
        console.log(appId);
        // console.log(Apps.findById(appId));
        const app = await Apps.findById(appId).populate({
            path: 'comments.userId',  // Populate the userId inside the comments array
            select: 'name profilePicture'  // Fetch only the name and profile picture fields
        });
        console.log("comments okkk",app.comments);
        console.log("---------------------------");
        console.log("okkkk",app);

        if (!app) {
            return res.status(404).json({ message: 'App not found' });
        }

        // Iterate through comments and dynamically access profile picture
        const commentsWithProfile = app.comments.map(comment => ({
            comment: comment.comment,
            userName: comment.userId?.name,
            profilePicture: comment.userId?.profilePicture,  // Dynamically access profile picture
            timestamp: comment.timestamp
        }));
        console.log("comments",commentsWithProfile);

        res.status(200).json(commentsWithProfile);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update a comment for an app
export const updateComment = async (req, res) => {
    try {
        const appId = req.params.id;
        const  commentId  = req.params.cid;
        const { comment } = req.body.bodydata;

        const app = await Apps.findById(appId);

        if (!app) {
            return res.status(404).json({ message: 'App not found' });
        }

        const commentToUpdate = app.comments.id(commentId);

        if (!commentToUpdate) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (commentToUpdate.userId.toString() !== req.body.id.toString()) {  // Assuming `req.user` contains the logged-in user's data
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        commentToUpdate.comment = comment;
        await app.save();

        
        res.status(200).json({ message: 'Comment Update successfully !!' ,data:commentToUpdate});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a comment for an app
export const deleteComment = async (req, res) => {
    try {
        const appId = req.params.id;
        const  commentId  = req.params.cid;

        const app = await Apps.findById(appId);

        if (!app) {
            return res.status(404).json({ message: 'App not found' });
        }

        const commentToDelete = app.comments.id(commentId);
        console.log(commentToDelete);
        if (!commentToDelete) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (commentToDelete.userId.toString() !== req.body.id.toString()) {  // Assuming `req.user` contains the logged-in user's data
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        
        app.comments.pull({ _id: commentId });
        await app.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error); 
        res.status(500).json({ message: 'Server Error', error });
    }
};
