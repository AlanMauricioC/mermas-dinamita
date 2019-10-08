import { createMuiTheme } from "@material-ui/core";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#527DDF'
        },
        secondary: {
            main: '#B5243E'
        },
        feedback:{
            ok:'green',
            warning: '#ffbb33',
            error: 'red',
        }

    }
})

export default theme