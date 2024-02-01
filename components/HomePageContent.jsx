import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useProducts } from '@/lib/tq/products/queries';
import { Box, Button, CircularProgress, Typography } from '@/components/mui';
import Paragraph from '@/components/Paragraph';
import Product from '@/components/Product';
import Image from 'next/image';
import Heading from './Heading';
import { formatPrice } from '@/lib/utils/formatters';
import { toDecimal } from 'dinero.js';
import { dinero } from 'dinero.js';
import { GBP } from '@dinero.js/currencies';
import { useAddToBasket } from '@/lib/tq/baskets/mutations';
import { useTheme } from '@emotion/react';

function HomePageContent({ title, description, imageSrc, exploreLink }) {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        height: '100vh',
        width: '100%',
        '&::before': {
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          content: '""',
          position: 'absolute',
          backgroundColor: 'transparent',
          //   backgroundImage: `linear-gradient(90deg, ${theme.palette.secondary.main} 50%,${theme.palette.primary.main} 50%)`,
          opacity: 0.67,
          zIndex: 1,
        },
      }}
    >
      <Image
        src={imageSrc}
        alt={description}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        style={{ zIndex: 0 }}
      />
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', height: '100%' }}>
        {/* title */}
        <Box
          sx={{
            zIndex: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'white',
            maxWidth: '40%',
            height: '100%',
          }}
        >
          <Typography component="h2" variant="h4" sx={{ zIndex: 1 }}>
            Discover the collection
          </Typography>
          <ErrorBoundary>
            <Heading component="h1" variant="h1">
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
