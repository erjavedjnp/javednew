mehtods.adminList = async (req, res) => {
    var query = {
        $and: [{
            status: { $in: ['Active', 'Blocked'] }
        }]
    }
};

if (req.admin.type != 'SuperAdmin' && req.admin.userId) {
    query.$and.push({ userId: req.admin.userId });
}
if (req.query.type && req.query.type != 'undefined') {
    query.$and.push({ type: req.query.type });
}

if (req.query.searchBy && req.query.searchBy != 'undefined') {
    var search_query = {
        $or: [{
            "name": {
                $regex: ".*" + req.query.searchBy + ".*",
                $options: "si"
            }
        }]
    };
    query.$and.push(search - query);
}
var Admin = database.getConnecton().model('admin');
var Admins = await
Admin.paginate(query, {
    limit: 10,
    page: req.query.page || 1,
    sort: '-createdAt',
    select: 'name email phone avatar createdAt status',
});
return send_response.to_user(res, 200, null, message.success, admins);























































































