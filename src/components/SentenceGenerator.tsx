'use client';
import '@ant-design/v5-patch-for-react-19';
import { useState } from 'react';
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function SentenceGenerator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [reasoning, setReasoning] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResult(''); // Clear previous result
    setReasoning(''); // Clear previous reasoning
    try {
      const response = await fetch(`/friend/api/completion?query=${encodeURIComponent(input)}`);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('Failed to get response reader');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const content = line.slice(6);
            if (content === '[DONE]') continue;
            try {
              const data = JSON.parse(content);
              if (data.type === 'reasoning') {
                setReasoning(prev => prev + data.content);
              } else if (data.type === 'content') {
                setResult(prev => prev + data.content);
              }
            } catch (e) {
              console.error('Error parsing content:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setResult('生成失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full mb-8">
        <Input
          placeholder="请输入你想要生成的朋友圈内容主题或关键词"
          size="large"
          className="text-base"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleGenerate}
          suffix={
            <Button 
              type="primary" 
              icon={<SearchOutlined />}
              onClick={handleGenerate}
              loading={loading}
            >
              {loading ? 'Thinking' : '生成朋友圈'}
            </Button>
          }
        />
      </div>
      <div className="w-full">
        {reasoning && (
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4 text-[#1a1a1a]">思考过程</h2>
            <div className="max-h-[200px] overflow-y-auto bg-gray-50 rounded-lg border border-gray-200 p-4">
              <p className="text-base text-[#666666] whitespace-pre-wrap">{reasoning}</p>
            </div>
          </div>
        )}
        <div>
          <h2 className="text-lg font-medium mb-4 text-[#1a1a1a]">生成结果</h2>
          <p className="text-base text-[#2b2b2b]">{result || '生成的朋友圈内容将在这里显示...'}</p>
        </div>
      </div>
    </>
  );
}