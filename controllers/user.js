import User from '../models/User.js';

/* READ */
const getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map(friendId => User.findById(friendId))
    );

    const formattedFriends = friends.map(friend => {
      return {
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        email: friend.email,
        occupation: friend.occupation,
        location: friend.location,
        picturePath: friend.picturePath,
      };
    });

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

/* UPDATE */

const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(id => id !== friendId);
      friend.friends = friend.friends.filter(id => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map(id => User.findById(id))
    );

    const formattedFriends = friends.map(friend => {
      return {
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        email: friend.email,
        occupation: friend.occupation,
        location: friend.location,
        picturePath: friend.picturePath,
      };
    });

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export { getUserInfo, getUserFriends, addRemoveFriend };
