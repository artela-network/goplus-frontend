"use client"
type FetchOptions = RequestInit & {
    headers?: HeadersInit;
};

const xfetch = async (url: string, options: FetchOptions = {}): Promise<Response> => {
    let token = '';

    // 检查是否在客户端环境中
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('jwt') || '';
    }

    // 添加统一的请求头
    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': `${token}` // 加上 Bearer
    };

    // 合并传入的headers和默认headers
    const mergedHeaders: HeadersInit = {
        ...defaultHeaders,
        ...options.headers
    };

    // 创建新的options对象
    const newOptions: FetchOptions = {
        ...options,
        headers: mergedHeaders
    };

    // 调用fetch
    const response = await fetch(url, newOptions);
    return response;
};

export default xfetch;