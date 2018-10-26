export const customizedThemes = {
    palette: {
      primary: {
        light: '#EF5350',
        main: '#37aab1',
        dark: '#343942',
        contrastText: '#fff',
      },
      secondary: {
        light: '#EF5350',
        main: '#f04344',
        dark: '#EF5350',
        contrastText: '#fff',
      },
      background: {
        default: '#f8f8f8',
      },
    },
    typography: {
        useNextVariants: true,
    },
    overrides: {
      Typography: {
        root: {
          fontFamily: 'Roboto',
        },
      },
      MuiButton: {
        root: {
          height: '40px',
          fontSize: '15px',
          borderRadius: '2px',
          padding: '8px',
        },
      },
      MuiTableRow: {
        root: {
          height: '35px',
        },
      },
      MuiTableCell: {
        root: {
          padding: '10px 20px 10px 20px',
          maxWidth: '250px',
        },
      }
    },
  };