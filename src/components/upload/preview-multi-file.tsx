import { m, AnimatePresence } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import FileThumbnail, { fileData } from '../file-thumbnail';
import { Close } from '@mui/icons-material';
import { fData } from '@/utils/data';

// ----------------------------------------------------------------------

interface MFP {
  thumbnail?: any;
  files?: any;
  onRemove?: any;
  sx?: any
}

export default function MultiFilePreview({ thumbnail, files, onRemove, sx }: MFP) {

  // console.log(files);

  return (
    <AnimatePresence initial={false}>
      {files?.map((file: any) => {

        const theFile = file?.link || file;

        const { key, name = '', size = 0 } = fileData(theFile);

        const isNotFormatFile = typeof theFile === 'string';

        const isImage = typeof theFile === 'string' ? theFile.split('?')[0].match(/\.(jpeg|jpg|gif|png|webp)$/) : false;

        if (thumbnail) {
          return (
            <Stack
              key={key}
              component={m.div}
              alignItems="center"
              display="inline-flex"
              justifyContent="center"
              sx={{
                m: 0.5,
                width: 80,
                height: 80,
                borderRadius: 1.25,
                overflow: 'hidden',
                position: 'relative',
                border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
                ...sx,
              }}
            >
              <FileThumbnail
                tooltip
                imageView
                file={theFile}
                sx={{ position: 'absolute' }}
                imgSx={{ position: 'absolute' }}
              />

              {onRemove && (
                <IconButton
                  size="small"
                  onClick={() => onRemove(file)}
                  sx={{
                    p: 0.5,
                    top: 4,
                    right: 4,
                    position: 'absolute',
                    color: 'common.white',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                    },
                  }}
                >
                  <Close />
                </IconButton>
              )}
            </Stack>
          );
        }

        return (
          <Stack
            key={key}
            component={m.div}
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
              my: 1,
              py: 1,
              px: 1.5,
              borderRadius: 1,
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
              ...sx,
            }}
          >
            {isImage && <img
              src={theFile}
              alt={name}
              style={{
                width: 70,
                height: 70,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />}
            {!isImage && <FileThumbnail file={theFile} />}

            <ListItemText
              primary={isNotFormatFile ? theFile : name}
              secondary={isNotFormatFile ? '' : fData(size)}
              secondaryTypographyProps={{
                component: 'span',
                typography: 'caption',
              }}
            />

            {onRemove && (
              <IconButton size="small" onClick={() => onRemove(file)}>
                <Close />
              </IconButton>
            )}
          </Stack>
        );
      })}
    </AnimatePresence>
  );
}
