import { NextResponse } from 'next/server';
import { HttpsProxyAgent } from 'https-proxy-agent';

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        console.log(process.env.OPENAI_API_KEY);

        const proxyAgent = new HttpsProxyAgent('http://192.168.0.22:20172');


        // 调用 OpenAI 接口，注意替换接口地址或参数结构
        const apiResponse = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // 使用环境变量中的 API Key
            },
            body: JSON.stringify({ prompt })
        });

        const data = await apiResponse.json();
        // 假设返回的数据结构为 { response: string }
        return NextResponse.json({ response: data.response || '暂无回复' });
    } catch (error) {
        console.error('后台请求出错：', error);
        return NextResponse.json({ response: '请求出错，请稍后重试。' }, { status: 500 });
    }
}
