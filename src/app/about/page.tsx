import Navbar from '@/components/Navbar';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">关于我们</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们是一家致力于创新和卓越的企业，为客户提供最优质的解决方案
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">我们的故事</h2>
              <p className="text-gray-600 mb-4">
                自成立以来，我们一直秉持&quot;创新、专业、诚信&quot;的理念，致力于为客户提供最优质的服务。
              </p>
              <p className="text-gray-600 mb-4">
                通过不断创新和改进，我们已经成功帮助众多客户实现了他们的目标。我们的团队由行业专家组成，
                他们拥有丰富的经验和专业知识。
              </p>
              <p className="text-gray-600">
                我们相信，只有通过持续的创新和改进，才能为客户创造更大的价值。
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-blue-100"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">我们的价值观</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "创新精神",
                description: "不断探索新技术和新方法，为客户创造更大价值"
              },
              {
                title: "专业态度",
                description: "以专业的知识和经验，为客户提供最佳解决方案"
              },
              {
                title: "诚信为本",
                description: "诚信经营，与客户建立长期互信的合作关系"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">我们的团队</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "张总经理",
                position: "首席执行官",
                description: "拥有20年行业经验，带领团队不断创新发展"
              },
              {
                name: "李经理",
                position: "技术总监",
                description: "技术专家，负责产品研发和技术创新"
              },
              {
                name: "王经理",
                position: "客户服务总监",
                description: "致力于提供最优质的客户服务体验"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.position}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 