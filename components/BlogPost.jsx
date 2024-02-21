import { useTheme } from '@emotion/react';
import Image from 'next/image';
import Heading from '@/components/Heading';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from '@/components/mui';
import Markdown from 'marked-react';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import React from 'react';
import LinkWrapper from './LinkWrapper';

function BlogPost({ blogPost, isSummary }) {
  const theme = useTheme();

  const imagePaddingStyles = isSummary
    ? { paddingBottom: 'min(200px, 100%)' }
    : { paddingBottom: '50vh' };

  const {
    title,
    slug,
    heroImage: { url },
    body,
  } = blogPost;
  return (
    <LinkWrapper link={`/blog/${slug}`}>
      <Card
        component="article"
        sx={{
          width: '100%',
          minHeight: '100%',
          position: 'relative',
          '&:hover': {
            backgroundColor: theme.palette.grey[100],
            '& .iconBtn': {
              backgroundColor: theme.palette.primary.main,
            },
          },
        }}
      >
        <CardMedia
          sx={{
            width: '100%', // Make width responsive
            height: 0,
            // Limit the maximum size
            position: 'relative',
            ...imagePaddingStyles,
            // Equal to width for a square aspect ratio
            overflow: 'hidden',
          }}
        >
          <Image
            src={url}
            alt={title}
            fill
            // onError={errorHandler}
            sizes="50%"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              maxWidth: '100%',
            }}
          />
        </CardMedia>
        <CardContent sx={{ width: { sm: '100%', md: '75%' }, margin: 'auto' }}>
          <Heading component="h2" variant="h4">
            {title}
          </Heading>
          {!isSummary && <Markdown>{body}</Markdown>}
        </CardContent>
        {isSummary && (
          <CardActions>
            <IconButton
              className="iconBtn"
              sx={{
                fontSize: '4rem',
                position: 'absolute',
                top: '130px',
                right: '20px',
                colour: 'white',
                backgroundColor: theme.palette.grey[400],

                '&:hover': {
                  scale: '1.05',
                },
              }}
              variant="contained"
              href={`/blog/${slug}`}
            >
              <ReadMoreIcon fontSize="inherit" sx={{ color: 'white' }} />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </LinkWrapper>
  );
}

export default BlogPost;
