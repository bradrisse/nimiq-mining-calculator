import {
    blueGrey500,
    blueGrey700,
    cyan500,
    fullBlack,
    grey300,
    grey400,
    grey900,
    orange500,
    orange700,
    white
} from 'material-ui/colors'

import Spacing from 'material-ui/styles/spacing'

export default {
    spacing: Spacing,
    typography: {
        fontFamily: 'Source Sans Pro, sans-serif'
    },
    palette: {
        primary1Color: '#697796',
        primary2Color: blueGrey700,
        primary3Color: blueGrey700,
        accent1Color: orange500,
        accent2Color: orange700,
        accent3Color: orange700,
        textColor: grey900,
        alternateTextColor: grey300,
        canvasColor: white,
        borderColor: grey400,
        pickerHeaderColor: cyan500,
        shadowColor: fullBlack
    },
    overrides: {
        MuiListItemSecondaryAction: {
            root: {
                marginTop: -10
            }
        },
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#042146'
            }
        },
        MuiCardHeader: {
            root: {
                backgroundColor: '#F0F0F0'
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: 5
            }
        },
        MuiTypography: {
            colorSecondary: {
                color: 'white'
            }
        }
    }
}