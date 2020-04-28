import React from 'react';

interface ProfileAvatarProps {
  avatar: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = (
  props: ProfileAvatarProps
) => {
  if (props.avatar) {
    return (
      <div className="media-left">
        <figure className="image is-128x128">
          <img alt="profile" src={props.avatar} />
        </figure>
      </div>
    );
  } else {
    return null;
  }
};

export default ProfileAvatar;
