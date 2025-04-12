import { FONT_FAMILY, PRIMARY_COLOR, SECONDARY_COLOR } from "@/config";
import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import GlobalStyles from "./global-styles";

const fontFamily = FONT_FAMILY.style.fontFamily

const theme = createTheme({
    palette: {
        primary: PRIMARY_COLOR,
        secondary: SECONDARY_COLOR,
    },
    typography: { fontFamily },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: () => ({
                    textTransform: 'capitalize',
                })
            }
        },
        MuiCard: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.variant !== 'outlined' && {
                        boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.5)'
                    })
                })
            }
        }
    }
})

export default function ThemeProvider ({ children }: { children: ReactNode }) {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            {children}
        </MuiThemeProvider>
    )
}