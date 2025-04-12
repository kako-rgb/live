import { CSS_FONT_FAMILY, PRIMARY_COLOR } from '@/config';
import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

export default function GlobalStyles () {
    const inputGlobalStyles = (
        <MuiGlobalStyles
            styles={{
                "@layer base": {
                    '*': {
                        boxSizing: 'border-box',
                        padding: 0,
                        margin: 0,
                        fontFamily: CSS_FONT_FAMILY,
                        scrollBehavior: "smooth",
                    },
                    body: {
                        maxWidth: '100vw',
                        overflowX: 'hidden',
                    },
                    html: {
                        maxWidth: '100vw',
                        overflowX: 'hidden',
                        WebkitOverflowScrolling: 'touch',
                    },
                    "::-webkit-scrollbar": {
                        width: "4px",
                    },
                    "::-webkit-scrollbar-track": {
                        boxShadow: "inset 0 0 5px grey",
                        borderRadius: "10px",
                    },
                    "::-webkit-scrollbar-thumb": {
                        borderRadius: "10px",
                        background: PRIMARY_COLOR.main
                    },
                }
            }}
        />
    );
    return inputGlobalStyles;
}