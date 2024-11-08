export interface Position {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  status: 'active' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export const MOCK_RECENT_POSITIONS: Position[] = [
  {
    id: '1',
    title: '前端架构师',
    department: '技术部',
    type: '全职',
    location: '北京',
    salary: '40-60K·15薪',
    status: 'active',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15'
  },
  {
    id: '2',
    title: '高级算法工程师',
    department: '算法部',
    type: '全职',
    location: '北京',
    salary: '45-70K·15薪',
    status: 'active',
    createdAt: '2024-03-14',
    updatedAt: '2024-03-14'
  },
  {
    id: '3',
    title: '产品经理',
    department: '产品部',
    type: '全职',
    location: '北京',
    salary: '35-50K·15薪',
    status: 'active',
    createdAt: '2024-03-13',
    updatedAt: '2024-03-13'
  }
];