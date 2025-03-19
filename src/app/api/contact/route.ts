import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('获取数据失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取数据失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: '请求必须是 JSON 格式' },
        { status: 400 }
      );
    }

    const data = await request.json();
    console.log('收到的数据:', data);
    
    // 验证必填字段
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: '姓名、邮箱和留言内容是必填项' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        message: data.message
      }
    });
    
    console.log('创建成功:', contact);
    return NextResponse.json(contact);
  } catch (error) {
    console.error('创建数据失败:', error);
    if (error instanceof Error) {
      console.error('错误详情:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '创建数据失败' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await prisma.contact.deleteMany();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('清空数据失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '清空数据失败' },
      { status: 500 }
    );
  }
} 