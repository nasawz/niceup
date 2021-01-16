// import { useEffect, useState } from "react";
import Taro from '@tarojs/taro';
import { useState } from 'react';
import concat from 'lodash.concat';
import remove from 'lodash.remove';
import map from 'lodash.map';

function useBag() {
  const [bag, setBag] = useState(Taro.getStorageSync('bag'));

  const addProdct = (product, spec, num) => {
    // product_id product_title thumb
    // spec_id spec_title price
    // num
    // console.log('-----addProdct');
    // console.log(product, spec, num);

    let psns = Taro.getStorageSync('bag') || [];
    let canAdd = true;
    psns = map(psns, psn => {
      if (psn.product_id == product._id && psn.spec_id == spec._id) {
        psn.num = num;
        canAdd = false;
      }
      return psn;
    });
    if (canAdd) {
      let psn = {
        product_id: product._id,
        product_title: product.title,
        product_thumb: product.thumb,
        spec_id: spec._id,
        spec_title: spec.title,
        spec_price: spec.price,
        spec_weight: spec.weight,
        spec_three: spec.three,
        num,
      };
      psns = concat([psn], psns);
    }

    Taro.setStorage({ key: 'bag', data: psns });
    setBag(psns);
  };

  const updateProdct = (product_id, spec_id, num) => {
    let psns = Taro.getStorageSync('bag') || [];
    psns = map(psns, psn => {
      if (psn.product_id == product_id && psn.spec_id == spec_id) {
        psn.num = num;
      }
      return psn;
    });

    Taro.setStorage({ key: 'bag', data: psns });
    setBag(psns);
  };

  const removeProdct = (product_id, spec_id) => {
    let psns = Taro.getStorageSync('bag') || [];
    remove(psns, psn => {
      return psn.product_id == product_id && psn.spec_id == spec_id;
    });

    Taro.setStorage({ key: 'bag', data: psns });
    setBag(psns);
  };

  const removeProdcts = spec_ids => {
    let psns = Taro.getStorageSync('bag') || [];
    remove(psns, psn => {
      return spec_ids.indexOf(psn.spec_id) > -1;
    });
    Taro.setStorage({ key: 'bag', data: psns });
    setBag(psns);
  };

  const reGetBag = () => {
    setBag(Taro.getStorageSync('bag'));
  };

  return [
    bag,
    { reGetBag, addProdct, removeProdct, removeProdcts, updateProdct },
  ];
}

export { useBag };
