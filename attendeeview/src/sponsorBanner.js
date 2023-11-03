import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const Sponsors = ({ sponsors }) => (
  <Grid Container className="sponsors" sx={{ borderRadius: '8px' }}>
    <Typography component="h2" variant='h2' color="#0A2647" sx= {{fontWeight: 'bold'}}>Our Sponsors</Typography>
    <Container sx={{ py: 4 }} maxWidth="xl">
      <Grid container spacing={4} className="sponsor-logos">
        {sponsors.map((sponsor) => (
          <Grid item key={sponsor.id} className="sponsor-logo-container" >
            <img
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              className="sponsor-logo"
              style={{
                width: 'auto', // Adjust this value to control the maximum width
                height: '90px', // Maintain aspect ratio
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Grid>
);

export default Sponsors;
