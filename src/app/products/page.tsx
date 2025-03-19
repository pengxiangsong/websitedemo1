import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Products() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">我们的产品与服务</h1>
            <p className="text-xl max-w-3xl mx-auto">
              为您提供全方位的解决方案，助力企业发展
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "企业网站开发",
                description: "专业的网站开发服务，打造您的品牌形象",
                features: ["响应式设计", "SEO优化", "高性能", "安全防护"],
                price: "详询",
                image: "🌐"
              },
              {
                title: "移动应用开发",
                description: "iOS和Android应用开发，助力数字化转型",
                features: ["原生开发", "跨平台方案", "用户体验", "技术支持"],
                price: "详询",
                image: "📱"
              },
              {
                title: "数字营销服务",
                description: "全方位的数字营销解决方案",
                features: ["社交媒体", "内容营销", "数据分析", "效果优化"],
                price: "详询",
                image: "📈"
              },
              {
                title: "企业管理系统",
                description: "量身定制的企业管理系统",
                features: ["流程管理", "数据统计", "权限控制", "实时监控"],
                price: "详询",
                image: "💼"
              },
              {
                title: "技术咨询服务",
                description: "专业的技术咨询和解决方案",
                features: ["架构设计", "技术选型", "性能优化", "安全评估"],
                price: "详询",
                image: "🔧"
              },
              {
                title: "运维支持服务",
                description: "7x24小时运维支持服务",
                features: ["系统监控", "故障处理", "性能优化", "安全加固"],
                price: "详询",
                image: "⚙️"
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="text-4xl mb-4">{product.image}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <Link href="/contact" 
                      className="mt-4 block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                      立即咨询
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">为什么选择我们？</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "专业团队",
                description: "经验丰富的开发团队",
                icon: "👥"
              },
              {
                title: "快速响应",
                description: "24小时内响应需求",
                icon: "⚡"
              },
              {
                title: "优质服务",
                description: "持续的技术支持",
                icon: "🌟"
              },
              {
                title: "价格合理",
                description: "性价比最优方案",
                icon: "💰"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 