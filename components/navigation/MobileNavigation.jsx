import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@/components/mui';


function MobileNavigation({
  mobileOpen = false,
  handleDrawerToggle = () =>
    console.log('no handleDrawerToggle function provided'),
  drawerWidth = 240,
}) {
  const itemLinkStyles = {
    display: 'block',
    textDecoration: 'none',
    flexGrow: 1,
  };

  const {user} = useUser()
  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Coffee Shop
          </Typography>
          <Divider />
          <List>
            <ListItem>
              <Link href="/" passHref style={itemLinkStyles} to="/">
                <ListItemButton sx={{ textAlign: 'left', width: '100%' }}>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/contact" passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: 'left', width: '100%' }}>
                  <ListItemText primary="Contact" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/blog" passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: 'left', width: '100%' }}>
                  <ListItemText primary="Blog" />
                </ListItemButton>
              </Link>
            </ListItem>

            {user ? (
              <>
              <ListItem>
              <Link href="/profile" passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: 'left', width: '100%' }}>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/api/auth/logout" passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: 'left', width: '100%' }}>
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </Link>
            </ListItem>
            </>
            ):(
              <ListItem>
              <Link href="/api/auth/login" passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: 'left', width: '100%' }}>
                  <ListItemText primary="Log in" />
                </ListItemButton>
              </Link>
            </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default MobileNavigation;
