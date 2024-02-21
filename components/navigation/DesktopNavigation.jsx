import { useUser } from '@auth0/nextjs-auth0/client';
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
import BasketIcon from '@/components/BasketIcon';

function DesktopNavigation({
  handleDrawerToggle = () =>
    console.log('no handleDrawerToggle function provided'),
}) {
  const theme = useTheme();
  const { user } = useUser();

  // console.log(theme);
  const lightTextColor = theme.palette.common.white;
  return (
    <AppBar
      component="nav"
      sx={{
        mb: 2,
        backgroundImage: 'none',
        boxShadow: 'none',
        position: 'absolute',
      }}
      // color="transparent"
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon sx={{ color: 'white' }} fontSize="large" />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            display: { xs: 'none', md: 'block' },
            textDecoration: 'none',
            color: lightTextColor,
            // flexGrow: 1,
          }}
        >
          Bike Shop
        </Typography>
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Button
            sx={{
              color: lightTextColor,
              display: { xs: 'none', md: 'inline-flex' },
            }}
            component={Link}
            href="/"
          >
            Home
          </Button>
          <Button
            sx={{
              color: lightTextColor,
              display: { xs: 'none', md: 'inline-flex' },
            }}
            component={Link}
            href="/products"
          >
            Shop
          </Button>
          <Button
            sx={{
              color: lightTextColor,
              display: { xs: 'none', md: 'inline-flex' },
            }}
            component={Link}
            href="/contact"
          >
            Contact
          </Button>
          <Button
            sx={{
              color: lightTextColor,
              display: { xs: 'none', md: 'inline-flex' },
            }}
            component={Link}
            href="/blog"
          >
            Blog
          </Button>
        </Box>
        <Box>
          {user ? (
            <>
              <Button
                sx={{
                  color: lightTextColor,
                  display: { xs: 'none', md: 'inline-flex' },
                }}
                component={Link}
                href="/profile"
              >
                Profile
              </Button>
              <Button
                sx={{
                  color: lightTextColor,
                  display: { xs: 'none', md: 'inline-flex' },
                }}
                component={Link}
                href="/api/auth/logout"
              >
                Log out
              </Button>
            </>
          ) : (
            <Button
              sx={{
                color: lightTextColor,
                display: { xs: 'none', md: 'inline-flex' },
              }}
              component={Link}
              href="/api/auth/login"
            >
              Log in
            </Button>
          )}
          <BasketIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default DesktopNavigation;
