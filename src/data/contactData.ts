import { ContactFormData } from '@/types/contact';

// 获取所有联系人数据
export async function getContactData(): Promise<ContactFormData[]> {
  try {
    const response = await fetch('/api/contact', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('获取数据失败:', error);
    throw error;
  }
}

// 添加新的联系人数据
export async function addContactData(data: Omit<ContactFormData, 'id' | 'createdAt'>): Promise<ContactFormData> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('添加数据失败:', error);
    throw error;
  }
}

// 根据 ID 删除联系人数据
export const deleteContactData = async (id: string) => {
  const response = await fetch(`/api/contact/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '删除失败');
  }
  return response.json();
};

// 清空所有数据
export const clearContactData = async () => {
  const response = await fetch('/api/contact', {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '清空失败');
  }
  return response.json();
}; 