import React from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  IconButton,
  MenuIcon,
  Toolbar,
  Typography,
  Button,
} from '@/components/mui';

function DesktopNavigation({
  handleDrawerToggle = () =>
    console.log('no handleDrawerToggle function provided'),
}) {
  const theme = useTheme();
  // console.log(theme);
  const lightTextColor = theme.palette.common.white;
  return (
    <AppBar component="nav" position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            display: { xs: 'none', sm: 'block' },
            textDecoration: 'none',
            color: lightTextColor,
            flexGrow: 1,
          }}
        >
          Coffee Shop
        </Typography>
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Button
            sx={{ color: lightTextColor }}
            component={Link}
            href="/contact"
          >
            Contact
          </Button>
          <Button sx={{ color: lightTextColor }} component={Link} href="/blog">
            Blog
          </Button>
          <Button
            sx={{ color: lightTextColor }}
            component={Link}
            href="/profile"
          >
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default DesktopNavigation;
