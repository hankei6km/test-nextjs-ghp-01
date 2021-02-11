import ReactDomServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import theme from '../src/theme';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type ContentStickyBar = {
  fieldId: 'contentMessageBanner';
  message: string;
  autoHide?: boolean;
};

export function stickyBarToHtml(contentStickyBar: ContentStickyBar): string {
  const sheets = new ServerStyleSheets();
  console.log('sticky');
  console.log(contentStickyBar.message);
  const html = ReactDomServer.renderToStaticMarkup(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <div>
          <Snackbar open={true}>
            <Alert severity="success">
              This is a success message!
              <p>{`${contentStickyBar.message}`}</p>
            </Alert>
          </Snackbar>
        </div>
      </ThemeProvider>
    )
  );
  // const html = ReactDomServer.renderToStaticMarkup(
  //   sheets.collect(
  //     <ThemeProvider theme={theme}>
  //       <div>
  //         <Snackbar open={true}>
  //           <Alert severity="success">
  //             This is a success message!
  //             <p>{`${contentStickyBar.message}`}</p>
  //           </Alert>
  //         </Snackbar>
  //       </div>
  //     </ThemeProvider>
  //   )
  // );
  console.log(html);
  return html;
}
