import React from 'react';

//* COMPONENTS
import { makeStyles, AppBar } from '@material-ui/core';
import Paper from '../../Components/Paper/PaperNoMargin';
import TabPanel from '../../Components/Tabs/TabPanel';
import Tabs from '../../Components/Tabs/Tabs';
import CircularProcess from '../../Components/Loading';

//* CONTEXT
import useLogs from '../../Context/Log.Context';

const LogsAcesso = React.lazy(() => import('./LogsAcessos.Table'));
const LogsEmail = React.lazy(() => import('./LogsEmails.Table'));
const LogsPDF = React.lazy(() => import('./LogsPdfs.Table'));
const LogsDialog = React.lazy(() => import('./Logs.Dialog'));

const tabs = [
  {
    id: 0,
    render: LogsEmail,
    options: {
      title: 'Emails'
    }
  },
  {
    id: 1,
    render: LogsPDF,
    options: {
      title: "PDFs"
    }
  },
  {
    id: 2,
    render: LogsAcesso,
    options: {
      title: 'Acessos'
    }
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: '-6rem',
    backgroundColor: theme.palette.background.paper
  },
  headTab: {
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)'
  },
  '.Mui-selected': {
    color: 'white',
    background: '#3f51b5'
  },
  '.MuiBox-root': {
    padding: '0px !important',
  }
}));

export default function () {
  const classes = useStyles();
  const { currentTab, handleChange } = useLogs();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.headTab}>
        <Tabs
          handleChange={handleChange}
          currentTab={currentTab}
          arrayTab={tabs}
        />
      </AppBar>
      <React.Suspense fallback={<CircularProcess type="Tab" />}>
        <TabPanel
          value={currentTab}
          index={tabs[currentTab].id}
          key={tabs[currentTab].id}
        >
          <Paper
            Render={tabs[currentTab].render}
            RenderDialog={LogsDialog}
            options={tabs[currentTab].options}
          />
        </TabPanel>
      </React.Suspense>
    </div>
  );
}
