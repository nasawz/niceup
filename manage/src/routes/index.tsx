import * as React from 'react';
import { EuiButton, EuiEmptyPrompt, EuiErrorBoundary } from '@elastic/eui';
import { Helmet } from 'react-helmet';
import { getTheme, Theme, themeConfig } from '../lib/theme';
import { ReactElement } from 'react';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Chrome from '../components/chrome';
import Login from './login';
import Ext from './ext';
import ExtForm from './ext/form';
import ExtList from './ext/list';
import { useUser } from '../hook/useUser';
import ExtScf from './ext/scf';
import KvList from './shop/kv/list';
import ProductList from './shop/product/list';
import FileList from './file/list';
import MemberList from './shop/member/list';
import FreightList from './shop/freight/list';
import OrderList from './shop/order/list';
import TagList from './shop/tag/list';
import NoticeList from './shop/notice/list';
import PsnList from './shop/psn/list';
import ShopDashBoard from './shop';

export interface IAppProps {
  children?: any;
}

const pathPrefix = process.env.PUBLIC_URL;

function themeLink(theme: Theme): ReactElement {
  let disabledProps = {};

  if (theme.id !== getTheme()) {
    disabledProps = {
      disabled: true,
      'aria-disabled': true,
    };
  }
  return (
    <link
      rel="stylesheet"
      href={`${pathPrefix}/${theme.publicPath}`}
      data-name="eui-theme"
      data-theme-name={theme.name}
      data-theme={theme.id}
      key={theme.id}
      {...disabledProps}
    />
  );
}

function NoMatch() {
  // let location = useLocation();

  return (
    <EuiEmptyPrompt
      iconType="editorStrike"
      title={<h2>Ack! There&apos;s nothing here.</h2>}
      body={
        <React.Fragment>
          <p>You found a page that doesn&apos;t exist.</p>
        </React.Fragment>
      }
      actions={
        <Link to="/">
          <EuiButton color="primary" fill>
            Go Home
          </EuiButton>
        </Link>
      }
    />
  );
}

export default function App(props: IAppProps) {
  // const location = useLocation();
  const { user } = useUser();

  return (
    <>
      <Helmet>
        {themeConfig.availableThemes.map(each => themeLink(each))}
      </Helmet>
      <EuiErrorBoundary>
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/shop" /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login" component={Login} />
          <Chrome>
            <Switch>
              <Route exact path="/shop" component={ShopDashBoard} />
              <Route path="/ext/list" component={ExtList} />
              <Route path="/ext/form" component={ExtForm} />
              <Route path="/ext/scf" component={ExtScf} />
              <Route exact path="/shop" component={ShopDashBoard} />
              <Route path="/shop/kv" component={KvList} />
              <Route path="/shop/product" component={ProductList} />
              <Route path="/shop/member" component={MemberList} />
              <Route path="/shop/freight" component={FreightList} />
              <Route path="/shop/order" component={OrderList} />
              <Route path="/shop/tag" component={TagList} />
              <Route path="/shop/notice" component={NoticeList} />
              <Route path="/shop/psn" component={PsnList} />
              <Route path="/file" component={FileList} />
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Chrome>
        </Switch>
      </EuiErrorBoundary>
    </>
  );
}
