import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getFeed,
  getIngredients,
  selectFeedOrders,
  selectFeedStatus
} from '@slices';
import { useDispatch, useSelector } from '@store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectFeedOrders);
  const feedStatus = useSelector(selectFeedStatus);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getFeed());
      dispatch(getIngredients());
    }
  }, [orders, dispatch]);

  if (feedStatus === 'loading') {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
