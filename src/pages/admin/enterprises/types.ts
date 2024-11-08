export interface Enterprise {
  id: number;
  name: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  status: 'trial' | 'formal' | 'expired';
  userCount: number;
  subscription: string;
  lastActive: string;
  contacts: {
    name: string;
    title: string;
    phone: string;
    email: string;
  }[];
  usage: {
    totalInterviews: number;
    totalCheckIns: number;
    scheduledInterviews: number,
    activeUsers: number;
  };
  trial?: {
    days: number;
    startDate: string;
  };
  contract?: {
    startDate: string;
    endDate: string;
  };
  sales: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };
}

export const MOCK_ENTERPRISES: Enterprise[] = [
  {
    id: 1,
    name: '字节跳动',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=64&h=64&fit=crop&auto=format',
    industry: '互联网',
    size: '10000人以上',
    location: '北京市海淀区',
    status: 'formal',
    userCount: 1200,
    subscription: '企业版',
    lastActive: '2024-03-15',
    contacts: [
      {
        name: '张三',
        title: 'HR总监',
        phone: '13800138000',
        email: 'zhangsan@bytedance.com'
      },
      {
        name: '李四',
        title: '技术负责人',
        phone: '13800138001',
        email: 'lisi@bytedance.com'
      }
    ],
    usage: {
      totalInterviews: 5000,
      totalCheckIns: 4800,
      scheduledInterviews: 450,
      activeUsers: 800
    },
    contract: {
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    sales: {
      name: '王小明',
      title: '高级销售经理',
      phone: '13800138002',
      email: 'xiaoming@example.com'
    }
  },
  {
    id: 2,
    name: '阿里巴巴',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=64&h=64&fit=crop&auto=format',
    industry: '电子商务',
    size: '10000人以上',
    location: '杭州市余杭区',
    status: 'trial',
    userCount: 800,
    subscription: '企业版',
    lastActive: '2024-03-14',
    contacts: [
      {
        name: '王五',
        title: 'HR经理',
        phone: '13800138002',
        email: 'wangwu@alibaba.com'
      }
    ],
    usage: {
      totalInterviews: 3000,
      totalCheckIns: 2800,
      scheduledInterviews: 280,
      activeUsers: 500
    },
    trial: {
      days: 30,
      startDate: '2024-03-01'
    },
    sales: {
      name: '李小红',
      title: '销售经理',
      phone: '13800138003',
      email: 'xiaohong@example.com'
    }
  },
  {
    id: 3,
    name: '腾讯科技',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=64&h=64&fit=crop&auto=format',
    industry: '互联网',
    size: '10000人以上',
    location: '深圳市南山区',
    status: 'expired',
    userCount: 1500,
    subscription: '企业版',
    lastActive: '2024-02-28',
    contacts: [
      {
        name: '赵六',
        title: 'HR总监',
        phone: '13800138004',
        email: 'zhaoliu@tencent.com'
      }
    ],
    usage: {
      totalInterviews: 4200,
      totalCheckIns: 4000,
      scheduledInterviews: 0,
      activeUsers: 0
    },
    contract: {
      startDate: '2023-03-01',
      endDate: '2024-02-29'
    },
    sales: {
      name: '张小强',
      title: '销售总监',
      phone: '13800138005',
      email: 'xiaoqiang@example.com'
    }
  }
];