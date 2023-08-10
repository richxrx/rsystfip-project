import DownloadIcon from '@mui/icons-material/Download';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';

interface IProps {
  pdf: TCreatedPdf;
}

function Downloader({ pdf }: IProps): React.ReactNode {
  return (
    <Fab
      variant="extended"
      size="small"
      color="primary"
      sx={{ mb: 2 }}
      onClick={
        () => pdf.open()
        // pdf.download(`Rsystfip-Report-${formatTodaysDateTime()}.pdf`)
      }
    >
      <DownloadIcon sx={{ mr: 1 }} />

      <Typography fontWeight={500} sx={{ mr: 1 }}>
        Download
      </Typography>
    </Fab>
  );
}

export default Downloader;
