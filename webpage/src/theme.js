import { createMuiTheme } from "@material-ui/core";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#383935',
            // gradient:'linear-gradient(0deg, rgba(229,60,46,1) 0%, rgba(246,141,40,1) 100%)'
        },
        secondary: {
            main: '#007cba'
        },
        feedback:{
            ok:'green',
            warning: '#ffbb33',
            error: 'red',
        }

    }
})

export default theme