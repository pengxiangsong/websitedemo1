'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TencentMap from '@/components/TencentMap';
import { addContactData, getContactData } from '@/data/contactData';
import { ContactFormData } from '@/types/contact';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [allData, setAllData] = useState<ContactFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getContactData();
      setAllData(data);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addContactData(formData);
      alert('感谢您的留言，我们会尽快与您联系！');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
      // 重新加载数据
      loadData();
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请稍后重试');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Contact Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">联系我们</h1>
            <p className="text-xl text-center text-gray-600 mb-12">
              如果您有任何问题或需求，请随时与我们联系
            </p>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="text-lg font-semibold mb-2">电话</h3>
                <p className="text-gray-600">400-123-4567</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-semibold mb-2">邮箱</h3>
                <p className="text-gray-600">contact@company.com</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">📍</div>
                <h3 className="text-lg font-semibold mb-2">地址</h3>
                <p className="text-gray-600">[在这里输入您的公司地址]</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">发送消息</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓名
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      电话
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      公司
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    留言内容
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    发送消息
                  </button>
                </div>
              </form>
            </div>

            {/* 显示所有提交的数据 */}
            {!isLoading && allData.length > 0 && (
              <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">已收到的消息</h2>
                <div className="space-y-4">
                  {allData.map((data) => (
                    <div key={data.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{data.name}</h3>
                          <p className="text-sm text-gray-600">{data.email}</p>
                          <p className="text-sm text-gray-600">{data.phone}</p>
                          <p className="text-sm text-gray-600">{data.company}</p>
                          <p className="mt-2">{data.message}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(data.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isLoading && (
              <div className="mt-12 text-center">
                <p className="text-gray-600">加载中...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
            <TencentMap
              latitude={39.9087243}
              longitude={116.3952859}
              address="[在这里输入您的公司地址]"
            />
          </div>
        </div>
      </section>
    </main>
  );
} 