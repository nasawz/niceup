import { EuiBreadcrumb, EuiHeaderBreadcrumbs } from '@elastic/eui';
import _ from 'lodash';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { NavLinks } from './collapsible_nav_list';

const nameDict = _.keyBy(
  _.map(NavLinks, link => {
    return {
      segment: _.last(link.href?.split('/')),
      label: link.label,
    };
  }),
  'segment',
);
nameDict['shop'] = { label: 'UP团', segment: 'shop' };

export interface IBreadcrumbsProps {}

export default function Breadcrumbs(props: IBreadcrumbsProps) {
  const history = useHistory();
  let { pathname } = useLocation();
  pathname = pathname.replace(/^\//, '');
  const pathSegments = pathname.split('/');
  const breadcrumbContext: string[] = [];
  const breadcrumbs: EuiBreadcrumb[] = [];

  const parseName = segment => {
    return nameDict[segment] && nameDict[segment].label
      ? nameDict[segment].label
      : segment;
  };

  for (const segment of pathSegments) {
    const breadcrumbPath = breadcrumbContext.concat(segment).join('/');
    breadcrumbs.push({
      text: parseName(segment),
      onClick: () => history.push(`/${breadcrumbPath}`),
    });

    breadcrumbContext.push(segment);
  }
  return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
}
