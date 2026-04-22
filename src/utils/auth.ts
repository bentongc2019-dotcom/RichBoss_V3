export interface User {
  email: string;
  password: string; // In real prod env, NEVER store plain passwords!
}

// Helper to get stored users array from localStorage
function getUsers(): User[] {
  const data = localStorage.getItem('richboss_users');
  return data ? JSON.parse(data) : [];
}

// Helper to save users array to localStorage
function setUsers(users: User[]) {
  localStorage.setItem('richboss_users', JSON.stringify(users));
}

/**
 * 注册账户（仅在本地存储，演示用）
 * @param email 用户邮箱
 * @param password 密码（最低 6 位）
 * @returns 成功信息或抛出错误
 */
export function signup(email: string, password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!email || !password) {
      reject(new Error('邮箱和密码不能为空'));
      return;
    }
    if (password.length < 6) {
      reject(new Error('密码至少需要 6 个字符'));
      return;
    }
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      reject(new Error('此邮箱已注册，请直接登录'));
      return;
    }
    users.push({ email, password });
    setUsers(users);
    resolve('✅ 注册成功！请直接登录');
  });
}

/**
 * 登录账户（本地校验）
 */
export function login(email: string, password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const users = getUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      reject(new Error('此邮箱未注册，请先注册'));
      return;
    }
    if (user.password !== password) {
      reject(new Error('密码错误'));
      return;
    }
    // 将登录状态写入 localStorage，供页面判断
    localStorage.setItem('richboss_current_user', JSON.stringify({ email }));
    resolve('登录成功');
  });
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem('richboss_current_user');
}

/**
 * 获取当前登录用户信息（如果有）
 */
export function getCurrentUser(): { email: string } | null {
  const data = localStorage.getItem('richboss_current_user');
  return data ? JSON.parse(data) : null;
}
