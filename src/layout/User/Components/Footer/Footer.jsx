import React from 'react'
import { Grid, Typography, Link, IconButton, Container } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import XIcon from '@mui/icons-material/X'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import '../../../../css/footer.css'

export default function Footer({ size = '' }) {
  const footerContent = (
    <Grid container className={`${size}`} spacing={2}>
      <Grid item xs={12} sm={size === 'sm' ? 6 : 4} paddingLeft={1}>
        <Typography variant="h6" gutterBottom>
          COMPANY
        </Typography>
        <ul>
          <li>
            <Link className="footer-link" href="#">
              About Us
            </Link>
          </li>
          <li>
            <Link className="footer-link" href="#">
              Careers
            </Link>
          </li>
          <li>
            <Link className="footer-link" href="#">
              Terms
            </Link>
          </li>
          <li>
            <Link className="footer-link" href="#">
              Privacy
            </Link>
          </li>
          <li>
            <Link className="footer-link" href="#">
              Interest Based Ads
            </Link>
          </li>
          <li>
            <Link className="footer-link" href="#">
              Ad Preferences
            </Link>
          </li>
          <li>
            <Link className="footer-link" href="#">
              Help
            </Link>
          </li>
        </ul>
      </Grid>

      <Grid item xs={12} sm={size === 'sm' ? 6 : 4} paddingLeft={1}>
        <Typography variant="h6" gutterBottom>
          WORK WITH US
        </Typography>
        <ul>
          <li>
            <Link className="footer-link" href="#">
              Authors
            </Link>
          </li>
          <li>
            <Link className="footer-link" href="#">
              Advertise
            </Link>
          </li>
          <li>
            <Link className="footer-link" href="#">
              Authors & Ads Blog
            </Link>
          </li>
          <li>
            <Link className="footer-link" href="#">
              API
            </Link>
          </li>
        </ul>
      </Grid>

      <Grid item xs={12} sm={size === 'sm' ? 12 : 4} paddingLeft={1}>
        <Typography variant="h6" gutterBottom>
          CONNECT
        </Typography>
        <div>
          <IconButton aria-label="facebook" href="#" className="icon-facebook">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="twitter" href="#" className="icon-twitter">
            <XIcon />
          </IconButton>
          <IconButton
            aria-label="instagram"
            href="#"
            className="icon-instagram"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton aria-label="linkedin" href="#" className="icon-linkedin">
            <LinkedInIcon />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  )

  return (
    <div className="footer">
      {size === 'sm' ? (
        footerContent
      ) : (
        <Grid
          sx={{
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#f4f1ea',
            marginTop: '100px',
            py: 4,
          }}
          className="footer-container"
        >
          <Container>{footerContent}</Container>
        </Grid>
      )}
    </div>
  )
}
