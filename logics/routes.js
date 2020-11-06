router.post('/follow', async (req, res, next) => {
    const { follower, following, action } = req.body;
    try {
        switch(action) {
            case 'follow':
                await Promise.all([ 
                    users.findByIdAndUpdate(follower, { $push: { following: following }}),
                    users.findByIdAndUpdate(following, { $push: { followers: follower }})
                
                ]);
            break;

            case 'unfollow':
                await Promise.all([ 
                    users.findByIdAndUpdate(follower, { $pull: { following: following }}),
                    users.findByIdAndUpdate(following, { $pull: { followers: follower }})
                
                ]); 
            break;

            default:
                break;
        }

        res.json({ done: true });
        
    } catch(err) {
        res.json({ done: false });
    }
});

