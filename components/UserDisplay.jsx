// import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@/components/mui';
import Paragraph from './Paragraph';

function UserDisplay({ ssd: user }) {
  // const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <Card>
        <CardContent>
          <Paragraph>User is not logged in.</Paragraph>
          <Button
            variant="contained"
            onClick={() => router.push('/api/auth/login')}
          >
            Log in
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Card>
        <CardMedia>
          <Avatar alt="User avatar" src={user.picture} />
        </CardMedia>
        <CardContent>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <Paragraph>User: {user.name}</Paragraph>
          <Paragraph>Email: {user.email}</Paragraph>
          <Paragraph>User: {user.nickname}</Paragraph>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={() => router.push('/api/auth/logout')}
          >
            Log out
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default UserDisplay;
