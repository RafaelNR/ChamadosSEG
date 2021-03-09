import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

export function ArrowIconTooltips({ title, children }) {
  return (
    <Tooltip title={title} arrow>
      {children}
    </Tooltip>
  );
}
