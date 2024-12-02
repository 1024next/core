import { _decorator, Component, Node } from 'cc';
const { ccclass } = _decorator;

export class Network {
    // GET 请求
    static async get(url: string, headers: HeadersInit = {}): Promise<any> {
        return this.request(url, 'GET', headers);
    }

    // POST 请求
    static async post(url: string, data: any, headers: HeadersInit = {}): Promise<any> {
        return this.request(url, 'POST', headers, data);
    }

    // PUT 请求
    static async put(url: string, data: any, headers: HeadersInit = {}): Promise<any> {
        return this.request(url, 'PUT', headers, data);
    }

    // DELETE 请求
    static async delete(url: string, headers: HeadersInit = {}): Promise<any> {
        return this.request(url, 'DELETE', headers);
    }

    // 封装通用请求方法
    private static async request(url: string, method: string, headers: HeadersInit = {}, data: any = null): Promise<any> {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: data ? JSON.stringify(data) : null,
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`${method} Request Error:`, error);
            throw error;
        }
    }
}


