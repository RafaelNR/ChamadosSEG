import React from 'react';
import {
  Avatar,
} from '@material-ui/core';

import useUser from "../../Hooks/useUser";
import Gravatar from '../../Service/gravatar.service';

const MyGravatar = (props) => {
  const [src, setSrc] = React.useState();

  React.useEffect(() => {
    if (props.email) {
      const gravatar = new Gravatar(props.email)
      setSrc(gravatar.getImage())
    }
  },[props.email, setSrc])

  return (
    <Avatar
      src={src}
      sizes={props.size}
      {...props}
    >
      {src && props.children}
    </Avatar>
  );
};


export default MyGravatar;
