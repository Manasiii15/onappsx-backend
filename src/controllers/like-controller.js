import Apps from '../models/apps.js';
// Add a like to an app
const addLike = async (req, res) => {
    try {
        
        const  appId  = req.params.id;
      
        const userId = req.body.id;  // Assuming you have user ID from authentication middleware

        const app = await Apps.findById(appId);

        if (!app) {
            return res.status(404).json({ message: 'App not found' });
        }

        // Check if the user has already liked the app
        const existingLike = app.likes.find(like => like.userId.toString() === userId.toString());

        if (existingLike) {
            return res.status(400).json({ message: 'You have already liked this app' });
        }

        // Add the like
        app.likes.push({ userId });

        await app.save();

        res.status(200).json({ message: 'App liked successfully', app });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// Remove a like from an app
const removeLike = async (req, res) => {
    try {
        const appId = req.params.id;
        const userId = req.body.id;

        const app = await Apps.findById(appId);

        if (!app) {
            return res.status(404).json({ message: 'App not found' });
        }

        // Check if the user has liked the app
        const likeIndex = app.likes.findIndex(like => like.userId.toString() === userId.toString());

        if (likeIndex === -1) {
            return res.status(400).json({ message: 'You have not liked this app' });
        }

        // Remove the like
        app.likes.splice(likeIndex, 1);

        await app.save();

        res.status(200).json({ message: 'Like removed successfully', app });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// Get all likes for an app
const getLikes = async (req, res) => {
    // console.log(req.params);
    const appId = req.params.id;
    const userId = req.body.id;
    try {
        const app = await Apps.findById(appId)
        // console.log("apppp",app);

        if (!app) {
            return res.status(404).json({ message: 'App not found' });
        }
        const likeverify = app.likes.find(like => like.userId.toString() === userId);

        if (!likeverify) {
            return res.status(200).json({ message: false });
        }
        res.status(200).json({  message: true });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

export default {
    addLike,
    removeLike,
    getLikes,
};
