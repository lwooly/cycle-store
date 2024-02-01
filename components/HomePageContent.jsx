import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Box, Button, Typography } from '@/components/mui';
import Paragraph from '@/components/Paragraph';
import { useTheme } from '@emotion/react';
import Heading from './Heading';

function HomePageContent({ title, description, imageSrc, exploreLink }) {
  const theme = useTheme();

  return (
    <Box
      component="article"
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${imageSrc})`,
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
      {/* <Image
        src={imageSrc}
        alt={description}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        style={{ zIndex: 0 }}
      /> */}
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          height: '100%',
          minHeight: '100vh',
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
          }}
        >
          <Typography component="h2" variant="h5" sx={{ zIndex: 1 }}>
            Discover the collection
          </Typography>
          <ErrorBoundary>
            <Heading component="h3" variant="h2">
              {title}
            </Heading>
            <Paragraph> {description}</Paragraph>
            <Button
              variant="contained"
              sx={{ marginRight: 'auto', color: 'white' }}
              href={exploreLink}
            >
              Explore Now
            </Button>
          </ErrorBoundary>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePageContent;
