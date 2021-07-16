import React from 'react';
import Fade from '@material-ui/core/Fade';

export default ({ children }) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked((prev) => !prev);
  }, []);
  
  return (
    <Fade in={checked}>{children}</Fade>
  );
};
