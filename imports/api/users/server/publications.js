import { profilePics } from '../profilePics';

Meteor.publish('loggedInUser', function () {
    return Meteor.users.find({ _id: this.userId }, { limit: 1 });
});

Meteor.publish('users', function (limit, filter) {
    // Meteor._sleepForMs(1000);
    if (filter.length) {
        let regex = new RegExp(filter, 'i');
        return Meteor.users.find(
            {
                $or: [{
                    'profile.name': regex
                }, {
                    registered_emails: {
                        $elemMatch: {
                            address: regex
                        }
                    }
                }
                ]
            }, { limit: limit });
    }
    return Meteor.users.find({}, { limit: limit });
});

Meteor.publish('single_user', function (id) {
    // Meteor._sleepForMs(1000);
    return Meteor.users.find({ _id: id }, { limit: 1 });
});

Meteor.publish('profilePics', function () {
    return profilePics.find().cursor;
});