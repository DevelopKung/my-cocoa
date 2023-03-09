const url = process.env.NODE_ENV == 'development' ? process.env.URL_API_DEV + '/' : process.env.URL_API + '/';
export default {
  topping: {
    list: url + 'topping',
    info: url + 'topping/{:id}',
    create: url + 'topping',
    update: url + 'topping/{:id}',
    delete: url + 'topping/{:id}',
  },
  product: {
    list: url + 'product',
    info: url + 'product/{:id}',
    create: url + 'product',
    update: url + 'product/{:id}',
    delete: url + 'product/{:id}',
  },
  bill: {
    list: url + 'bill',
    info: url + 'bill/{:id}',
    create: url + 'bill',
    update: url + 'bill/{:id}',
    delete: url + 'bill/{:id}',
  },
}