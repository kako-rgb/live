import { Stack, Typography, useTheme, useMediaQuery } from '@mui/material';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack 
      spacing={isMobile ? 0.5 : 1} 
      textAlign="center"
      sx={{
        px: isMobile ? 2 : 0,
        maxWidth: '100%'
      }}
    >
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        fontWeight="bold"
        sx={{
          fontSize: {
            xs: '1.5rem',    // for extra-small devices
            sm: '1.8rem',    // for small devices
            md: '2rem',      // for medium devices and up
          },
          lineHeight: 1.2
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{
            fontSize: {
              xs: '0.875rem', // for extra-small devices
              sm: '0.925rem', // for small devices
              md: '1rem',     // for medium devices and up
            },
            px: { xs: 2, sm: 4, md: 6 },
            maxWidth: '100%',
            wordWrap: 'break-word'
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}