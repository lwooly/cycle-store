import { useTheme } from '@emotion/react';
import React from 'react';

function LinkWrapper({ children, link }) {
  const theme = useTheme();
  if (!link) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
  return (
    <a
      href={link}
      rel="noopener noreferrer"
      target="_blank"
      aria-label="Link to product page"
      color="black"
      style={{
        textDecoration: 'none',
        color: theme.palette.text.primary,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </a>
  );
}

export default LinkWrapper;
