/**
 * 构造带查询参数的URL。
 * @param baseUrl 基础URL。
 * @param params 查询参数对象。
 * @returns 构造好的URL字符串。
 */
export default function constructGetUrl(baseUrl: string, params: Record<string, any>): string {
    // 创建一个URL对象。
    const url = new URL(baseUrl);
    
    // 遍历`params`对象，并将每个键值对作为查询参数添加到URL中。
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== null && value !== undefined) { // 过滤掉null和undefined的参数
        url.searchParams.append(key, value.toString());
      }
    });
  
    // 返回完整的URL字符串。
    return url.toString();
  }