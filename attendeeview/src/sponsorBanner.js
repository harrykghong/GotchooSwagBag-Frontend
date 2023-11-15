import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
import { Paper, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

// const ClickableSponsor = ({ imageUrl, altname, redirectUrl }) => {
//   const [openModal, setOpenModal] = useState(false);

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleRedirect = () => {
//     // Handle redirection logic here
//     console.log('Redirecting...');
//     setOpenModal(false); // Close the modal after redirection
//   };

//   return (
//     <>
//       <Paper onClick={handleOpenModal} elevation={3} style={{ padding: 16, cursor: 'pointer' }}>
//         <img src={imageUrl} alt={`${altname} logo`} style={{ width: '100%', height: 'auto' }} />
//       </Paper>

//       {/* Popup Modal */}
//       <Dialog open={openModal} onClose={handleCloseModal}>
//         <DialogTitle>Confirmation</DialogTitle>
//         <DialogContent>
//           <p>Are you sure you want to proceed with the redirection?</p>
//           <Button onClick={handleRedirect} variant="contained" color="primary">
//             Yes, Redirect
//           </Button>
//           <Button onClick={handleCloseModal} variant="outlined" color="secondary">
//             Cancel
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

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
            {/* <ClickableImage imageUrl={sponsor.logo} alt={`${sponsor.name} logo`} to={sponsor.website_link} /> */}
          </Grid>
        ))}
      </Grid>
    </Container>
  </Grid>
);

export default Sponsors;
