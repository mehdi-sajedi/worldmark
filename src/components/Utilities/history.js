import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen((location, action) => {
  if (action === 'POP') {
    console.log('yes');
    history.replace(location.pathname, { specialAnimation: 'whatever' });
  }
});

export default createBrowserHistory();
