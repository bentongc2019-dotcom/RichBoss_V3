import { supabase } from './supabase';

export interface User {
  id: string;
  email: string;
}

/**
 * 注册账户 (Supabase)
 * @param email 用户邮箱
 * @param password 密码（最低 6 位）
 * @returns 成功信息或抛出错误
 */
export async function signup(email: string, password: string): Promise<string> {
  if (!email || !password) {
    throw new Error('邮箱和密码不能为空');
  }
  if (password.length < 6) {
    throw new Error('密码至少需要 6 个字符');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return '✅ 注册成功！请直接登录';
}

/**
 * 登录账户 (Supabase)
 */
export async function login(email: string, password: string): Promise<string> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('登录失败：' + error.message);
  }

  return '登录成功';
}

/**
 * 退出登录
 */
export async function logout() {
  await supabase.auth.signOut();
}

/**
 * 获取当前登录用户信息（如果有）
 */
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (user && user.email) {
    return { id: user.id, email: user.email };
  }
  return null;
}

