import React from 'react';
import {
  Avatar,
} from '@material-ui/core';

import Gravatar from '../../Service/gravatar.service';

const MyGravatar = (props) => {
  const [src, setSrc] = React.useState();

  React.useEffect(() => {
    if (props.email) {
      const gravatar = new Gravatar(props.email)
      setSrc(gravatar.getImage())
    }
  },[])

  return (
    <Avatar
      src={src}
      {...props}
    >
      {src && props.children}
    </Avatar>
  );
};


export default MyGravatar;
