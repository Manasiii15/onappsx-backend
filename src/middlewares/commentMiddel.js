import User from '../models/user.js'


commentSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const user = await User.findById(this.userId).select('name');
            if (user) {
                this.name = user.name;
            }
        } catch (err) {
            return next(err);
        }
    }
    next();
});