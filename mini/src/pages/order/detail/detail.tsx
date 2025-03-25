import * as React from 'react';
import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro';
import { View, Text, Slot, Image } from '@tarojs/components';
import Nav from '../../../components/nav';
import linePath from '../../../assets/line.png';
import { useUser } from '../../../hooks/useUser';
// import { styled } from 'linaria/react'
import * as dayjs from 'dayjs';
import { useOrder, subscribeOrder } from '../../../hooks/useOrder';
import Toast from '../../../components/vant-weapp/toast/toast';

// import tmpPath from '../../../assets/tmp01.jpg'
import copyPath from '../../../assets/copy.svg';
import { miniTitle } from '../../../variables';
const tmpPath = '';
import './detail.less';

export interface IDetailProps {}
function ProductCard(props: any) {
  let { data } = props;
  return (
    <View className="product-card">
      <van-card
        price={data.spec_price}
        title={data.product_title}
        thumb={data.product_thumb}
        thumbMode="aspectFill"
        num={data.num}
      >
        <Slot name="desc">
          <View className="tags">
            <van-tag plain color="#0e9a9c" size="medium">
              {data.spec_title}
            </van-tag>
          </View>
        </Slot>
      </van-card>
    </View>
  );
}
export default function Detail(props: IDetailProps) {
  let params: any = getCurrentInstance().router?.params;
  let [id, setId] = React.useState(params ? params.id : '');

  // const { id } = params
  const { data, mutate: refetch }: any = useOrder(id);

  const { data: user, mutate: reGetUser } = useUser();
  useDidShow(() => {
    reGetUser();
  });

  React.useEffect(() => {
    if (!user || !user.openid) {
      Taro.redirectTo({ url: '/pages/login/login' });
    }
  }, []);

  if (!user || !user.openid || !data) {
    return <View></View>;
  }
  const renderFreight = () => {
    switch (data.freight_type) {
      case 'normal':
        return '普通快递';
      default:
        return '普通快递';
    }
  };

  const handlePay = () => {
    let openid = user.openid;
    let goodsTag = 'tag'; //TODO goodsTag
    let goods_detail = data.psns.map(psn => {
      return {
        goods_id: psn.spec_id,
        goods_name: `${psn.product_title}-${psn.spec_title}`,
        quantity: psn.num,
        price: psn.spec_price,
        spec_id: psn.spec_id,
        product_id: psn.product_id,
      };
    });

    let detail = JSON.stringify({
      goods_detail,
    });

    // let chk_goods_detail = data.psns.map((psn) => {
    //   return {
    //     "goods_id": psn.spec_id,
    //     "goods_name": `${psn.product_title}-${psn.spec_title}`,
    //     "quantity": psn.num,
    //     "price": psn.spec_price,
    //   }
    // })

    // let chk_detail = JSON.stringify({
    //   chk_goods_detail
    // })

    Taro.cloud
      .callFunction({
        name: 'pay',
        data: {
          body: miniTitle,
          detail,
          // chkDetail: chk_detail,
          outTradeNo: data._id,
          totalFee: data.price,
          openid,
          goodsTag,
        },
      })
      .then((res: any) => {
        const { payRes, errorMessage } = res.result;
        if (payRes) {
          const payment = payRes.payment;
          Taro.requestPayment({
            ...payment,
            success: function (res) {
              Toast.success('支付成功！');
              refetch();
            },
            fail: function (res) {},
          });
        } else {
          Toast(errorMessage);
        }
      });
  };

  const renderPayBar = () => {
    return (
      <van-submit-bar
        price={data.price * 100}
        buttonText="支付"
        onSubmit={handlePay}
      />
    );
  };
  const renderStatusBar = () => {
    let stateStr = '';
    let green = '';
    switch (data.state) {
      case 0:
        stateStr = '待付款';
        break;
      case 2:
        stateStr = '待发货';
        green = 'state-bar__bar__payed';
        break;
      case 4:
        stateStr = '已发货';
        green = 'state-bar__bar__exped';
        break;
      case -1:
        stateStr = '已关闭';
        break;
      case -2:
        stateStr = '已退款';
        break;
      default:
        stateStr = '待付款';
        break;
    }

    return (
      <View className="state-bar">
        <View className="bar-class state-bar__bar">
          <View className={`state-bar__bar__state ${green}`}>{stateStr}</View>
        </View>
        <View className="state-bar__safe" />
      </View>
    );
  };

  return (
    <View className="order-detail">
      <van-sticky>
        <Nav
          back={true}
          title="订单详情"
          style={{ backgroundColor: 'white' }}
        />
      </van-sticky>
      <View className="address">
        <Image className="line-img" src={linePath}></Image>
        <van-cell-group>
          <View className="card-wapper_van-cell_last">
            <van-cell
              center
              label={`${data.provinceName}${data.cityName}${data.countyName}${data.detailInfo}`}
            >
              <Slot name="title">
                <View className="header">
                  <View className="name">{data.name}</View>
                  <View className="phone">{data.phone}</View>
                </View>
              </Slot>
            </van-cell>
          </View>
        </van-cell-group>
        <van-cell-group>
          <View className="card-wapper_van-cell_last c-white mt-10">
            <van-cell center title="配送方式" value={renderFreight()} />
          </View>
        </van-cell-group>
      </View>
      <View className="list">
        {data.psns.map(psn => {
          return <ProductCard data={psn} />;
        })}
      </View>
      <View className="mt-10">
        <van-cell-group>
          <van-cell
            title="商品总价"
            value={`￥${data.price - data.freight_fee}`}
          />
          <van-cell title="邮费" value={`￥${data.freight_fee}`} />
          {data.state > 0 && (
            <van-cell title="编号" value={data.outTradeNo}>
              <Slot name="right-icon">
                <View className="act-copy">
                  <van-icon
                    name={copyPath}
                    color="#969799"
                    size="16PX"
                    onClick={() => {
                      Taro.setClipboardData({
                        data: data.outTradeNo,
                        success: function (res) {
                          // Toast.success("复制成功！")
                        },
                      });
                    }}
                  />
                </View>
              </Slot>
            </van-cell>
          )}
          <van-cell
            title="下单时间"
            value={dayjs(new Date(data.createdAt)).format('YYYY-MM-DD HH:mm')}
            border={false}
          />
          {data.state == 4 &&
            data.exp.map((exp, index) => {
              return (
                <van-cell
                  key={index}
                  title={exp.expType}
                  value={exp.expNumber}
                  border={false}
                >
                  <Slot name="right-icon">
                    <View className="act-copy">
                      <van-icon
                        name={copyPath}
                        color="#969799"
                        size="16PX"
                        onClick={() => {
                          Taro.setClipboardData({
                            data: exp.expNumber,
                            success: function (res) {
                              // Toast.success("复制成功！")
                            },
                          });
                        }}
                      />
                    </View>
                  </Slot>
                </van-cell>
              );
            })}
        </van-cell-group>
      </View>

      {!data.subscribe && (
        <View className="mt-10">
          <van-cell-group>
            <van-cell icon="bullhorn-o" title="开启发货消息通知">
              <Slot name="right-icon">
                <van-button
                  type="default"
                  size="mini"
                  onClick={() => {
                    Taro.requestSubscribeMessage({
                      tmplIds: [
                        'n6ixnfxvjOdjzcaZ9p14RJiO7U2VhWMEwRKmg3ZTtV4', //TODO load from db
                      ],
                      success: res => {
                        subscribeOrder(id, () => {
                          refetch();
                        });
                      },
                    });
                  }}
                >
                  去开启
                </van-button>
              </Slot>
            </van-cell>
          </van-cell-group>
        </View>
      )}

      <van-toast id="van-toast" />
      {data.state == 0 ? renderPayBar() : renderStatusBar()}
    </View>
  );
}
