import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Box, Button, Typography } from '@/components/mui';
import Paragraph from '@/components/Paragraph';
import { useTheme } from '@emotion/react';
import Heading from './Heading';

function NewBikeSection() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url('https://images.unsplash.com/photo-1503669678209-c68d00b3765d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'relative',
        '&::before': {
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          content: '""',
          position: 'absolute',
          backgroundColor: 'transparent',
          backgroundImage: `linear-gradient(0deg, ${theme.palette.secondary.main} 0%, transparent 100%)`,
          opacity: 1,
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          height: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* title */}
        <Box
          sx={{
            p: 4,
            zIndex: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1rem',
            color: 'white',
            maxWidth: '40%',
            height: '100%',
            minHeight: '100vh',
            textAlign: 'center',
          }}
        >
          <Typography component="h4" variant="h5" sx={{ zIndex: 1 }}>
            The All New
          </Typography>
          <ErrorBoundary>
            <Heading component="h3" variant="h2">
            Kryo XVV Road Bike Is Here
            </Heading>
            <Paragraph>Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo.</Paragraph>
            <Button
              variant="contained"
              sx={{ width:'50%', color: 'white', margin: '0 auto', zIndex: 1}}
              href='/products'
            >
              View now
            </Button>
          </ErrorBoundary>
        </Box>
      </Box>
    </Box>
  );
}

export default NewBikeSection;
