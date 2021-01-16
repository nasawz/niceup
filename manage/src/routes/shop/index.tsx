import {
  Wcontainer,
  Wnumber,
  Wicon,
  Wpie,
  Wbar,
  Wlinebar,
} from '@alicloud/cloud-charts';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiPageContentBody,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiCard,
  EuiPanel,
  EuiIcon,
  EuiStat,
  EuiLoadingSpinner,
  EuiBasicTable,
} from '@elastic/eui';
import * as React from 'react';
import styled from 'styled-components';
import { DatePickerRange } from '../../components/formControls';
import { useDashBoard } from '../../hook/useDashBoard';
import moment from 'moment';
import _ from 'lodash';

const Header = styled.header`
  margin-bottom: 24px;
`;

export interface IShopDashBoardProps {}

export default function ShopDashBoard(props: IShopDashBoardProps) {
  const [range, setRange] = React.useState({
    startDate: parseInt(moment().subtract(7, 'd').format('x')),
    endDate: parseInt(moment().format('x')),
  });

  const { data }: any = useDashBoard(range.startDate, range.endDate);

  if (!data) {
    return (
      <EuiPage restrictWidth>
        <EuiPageBody>
          <EuiPageContent verticalPosition="center" horizontalPosition="center">
            <EuiLoadingSpinner size="xl" />
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }

  return (
    <EuiPage restrictWidth>
      <EuiPageBody>
        {/* <Header>
          <EuiFlexGroup gutterSize="m" alignItems="center">
            <EuiFlexItem>
              <EuiTitle size="l">
                <h1>概览</h1>
              </EuiTitle>
            </EuiFlexItem>
          </EuiFlexGroup>
        </Header> */}
        <EuiFlexGroup
          gutterSize="m"
          direction="column"
          alignItems="flexEnd"
        ></EuiFlexGroup>
        <EuiSpacer size="m"></EuiSpacer>
        <EuiFlexGroup gutterSize="m" direction="column">
          <EuiFlexItem>
            <EuiFlexGroup gutterSize="m">
              <EuiFlexItem>
                <EuiPanel paddingSize="m">
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <Wnumber bottomTitle="新订单">
                        {data.newOrderCount}
                      </Wnumber>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <i
                        className="van-icon van-icon-orders-o"
                        style={{ fontSize: '44px' }}
                      />
                      {/* <EuiIcon type="cheer" size="xxl" /> */}
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel paddingSize="m">
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <Wnumber bottomTitle="订单总数">
                        {data.allOrderCount}
                      </Wnumber>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <i
                        className="van-icon van-icon-orders-o"
                        style={{ fontSize: '44px' }}
                      />
                      {/* <EuiIcon type="cheer" size="xxl" /> */}
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel paddingSize="m">
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <Wnumber bottomTitle="上架商品数">
                        {data.allProductCount}
                      </Wnumber>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiIcon type="grid" size="xxl" />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <DatePickerRange
              value={range}
              onChange={range => {
                setRange(range);
              }}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup gutterSize="m">
              <EuiFlexItem>
                <EuiPanel paddingSize="m">
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <Wnumber bottomTitle="总收款">
                        {_.reduce(
                          data.priceData,
                          (sum, o) => {
                            return sum + o[1];
                          },
                          0,
                        )}
                      </Wnumber>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <i
                        className="van-icon van-icon-cashier-o"
                        style={{ fontSize: '44px' }}
                      />
                      {/* <EuiIcon type="cheer" size="xxl" /> */}
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel paddingSize="m">
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <Wnumber bottomTitle="总成本">
                        {_.reduce(
                          data.costData,
                          (sum, o) => {
                            return sum + o[1];
                          },
                          0,
                        )}
                      </Wnumber>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <i
                        className="van-icon van-icon-paid"
                        style={{ fontSize: '44px' }}
                      />
                      {/* <EuiIcon type="cheer" size="xxl" /> */}
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel paddingSize="m">
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <Wnumber bottomTitle="总盈利" status="red">
                        {_.reduce(
                          data.profitData,
                          (sum, o) => {
                            return sum + o[1];
                          },
                          0,
                        )}
                      </Wnumber>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <i
                        className="van-icon van-icon-balance-pay"
                        style={{ fontSize: '44px' }}
                      />
                      {/* <EuiIcon type="cheer" size="xxl" /> */}
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel paddingSize="m">
              <EuiBasicTable
                compressed
                items={data.psns}
                columns={[
                  {
                    field: '_id',
                    name: '商品',
                    width: '380px',
                  },
                  {
                    field: 'sales',
                    name: '销量',
                  },
                  {
                    field: 'cost',
                    name: '成本',
                  },
                  {
                    field: 'profit',
                    name: '利润',
                  },
                ]}
              />
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem style={{ display: 'none' }}>
            <EuiFlexGroup gutterSize="m">
              <EuiFlexItem>
                <EuiPanel paddingSize="m">
                  <EuiTitle size="xs">
                    <h5>利润</h5>
                  </EuiTitle>
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <Wcontainer style={{ width: '400px', height: '300px' }}>
                        <Wbar
                          height="300"
                          config={{
                            column: false,
                            stack: true,
                            label: {
                              position: 'middle',
                            },
                            xAxis: {
                              labelFormatter: function (value) {
                                return '';
                              },
                            },
                          }}
                          data={[
                            {
                              data: data.profitData,
                            },
                          ]}
                        />
                      </Wcontainer>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel paddingSize="m">
                  <EuiTitle size="xs">
                    <h5>销量</h5>
                  </EuiTitle>
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <Wcontainer style={{ width: '100%', height: '300px' }}>
                        <Wpie
                          config={{
                            label: {
                              labelFormatter(v, item) {
                                return `${item._origin.x}: ${v}`;
                              },
                            },
                            drawPadding: [100, 100, 100, 100],
                            legend: false,
                          }}
                          data={[
                            {
                              data: data.salesData,
                            },
                          ]}
                        />
                      </Wcontainer>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiPanel paddingSize="m">
              <Wlinebar
                height="400"
                config={{
                  dodgeStack: true,
                  padding: [40, 60, 28, 28],
                  xAxis: {
                    type: 'cat',
                    // autoRotate: true
                    labelFormatter: function (value) {
                      return '';
                    },
                  },
                  yAxis: [
                    {
                      labelFormatter: function (value) {
                        if (value < 1) return Math.floor(value * 100) / 100;
                        else return value;
                      },
                      min: 0,
                      minLimit: 0,
                    },
                    {
                      labelFormatter: function (value) {
                        return value;
                      },
                    },
                  ],
                  // yAxis: [
                  //   {
                  //     labelFormatter: function (value) {
                  //       if (value < 1) return Math.floor(value * 100) / 100;
                  //       else return value;
                  //     }
                  //   },
                  //   {
                  //     labelFormatter: function (value) {
                  //       return value + 'S';
                  //     }
                  //   },
                  // ]
                }}
                data={[
                  {
                    name: '总成本',
                    type: 'bar',
                    dodge: 'g2',
                    data: data.costData,
                  },
                  // {
                  //   name: '总收款',
                  //   type: 'bar',
                  //   dodge: 'g1',
                  //   data: data.priceData,
                  // },
                  {
                    name: '总利润',
                    type: 'bar',
                    dodge: 'g2',
                    data: data.profitData,
                  },
                  // {
                  //   name: '总销量',
                  //   type: 'line',
                  //   yAxis: 1,
                  //   data: data.salesData,
                  // },
                ]}
              />
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
    </EuiPage>
  );
}
