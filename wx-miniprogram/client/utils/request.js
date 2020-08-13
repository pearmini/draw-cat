wx.cloud.init();

const db = wx.cloud.database();
const $ = db.command.aggregate

export default async function ({method, name, options}) {
  const getByMethod = {
    fn: (options) => {},
    db: (options) => {
      const {query} = options;
      return query(db, $);
    },
    request: (options) => {},
  };
  wx.showLoading({
    title: '加载中...',
  })
  console.log(`[request: ${method}(${name})]`, options);
  const get = getByMethod[method];
  const res = await get(options);
  console.log(`[response: ${method}]`, res);
  wx.hideLoading();
  return res;
}
