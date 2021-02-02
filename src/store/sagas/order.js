import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

export function* purchaseBurgerSagas(action) {
  yield put(actions.purchaseBurgerStart())
  try {
    const response = yield axios.post(
      'https://react-my-burger-2f17d.firebaseio.com/orders.json?auth=' +
        action.token,
      action.orderData
    )
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    )
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err.response.data.error))
  }
}

export function* fetchOrdersSagas(action) {
  yield put(actions.fetchedOrdersStart())
  const queryParams =
    '?auth=' +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"'
  try {
    const response = yield axios.get(
      'https://react-my-burger-2f17d.firebaseio.com/orders.json' + queryParams
    )
    const fetchedOrders = []
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key,
      })
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders))
  } catch (error) {
    yield put(actions.fetchOrdersFail(error))
  }
}
