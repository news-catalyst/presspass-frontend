import React from 'react';

interface ProfileAvatarProps {
  avatar: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = (
  props: ProfileAvatarProps
) => {
  if (props.avatar) {
    return (
      <figure className="media-left">
        <p className="image is-64x64">
          <img alt="profile" src={props.avatar} />
        </p>
      </figure>
    );
  } else {
    return null;
  }
};

export default ProfileAvatar;
