import { Box, Grid, Typography } from '@mui/material';
import InfoCard from './InfoCard';

function WhyChooseSection() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
          height: '100%',
          p: 4,
        }}
      >
        <Typography component="h3" variant="h2" marginBottom="2rem">
          Why Choose KYRO?
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InfoCard
              title="Lightweight"
              text={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                deserunt magni, cumque harum cupiditate`}
              imageSrc="https://images.unsplash.com/photo-1663007155231-f7029e8a72be?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoCard
              title="Durable"
              text={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                deserunt magni, cumque harum cupiditate`}
              imageSrc="https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoCard
              height="200px"
              title="Biggest service network"
              text=""
              imageSrc="https://plus.unsplash.com/premium_photo-1676399362819-d1a6d3315180?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoCard
              height="200px"
              title="Lifetime warranty"
              text=""
              imageSrc="https://images.unsplash.com/photo-1530263503756-b382295fd927?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoCard
              height="200px"
              title="Free first service"
              text=""
              imageSrc="https://plus.unsplash.com/premium_photo-1663011028956-dc51196dd07b?q=80&w=2827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default WhyChooseSection;
