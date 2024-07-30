// ./src/app/login/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const [customerCode, setCustomerCode] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);

  const handleLogin = () => {
    if (!customerCode) {
      alert('고객코드를 입력하세요.');
      return;
    }
    if (!userId) {
      alert('사용자ID를 입력하세요.');
      return;
    }
    if (!password) {
      alert('사용자암호를 입력하세요.');
      return;
    }

    // Handle login logic here
    alert('로그인 성공');
  };

  const handlePasswordChange = () => {
    // Handle password change logic here
  };

  const handleClose = () => {
    // Handle close logic here
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600">요양원 로그인</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">고객코드</label>
            <input
              type="text"
              value={customerCode}
              onChange={(e) => setCustomerCode(e.target.value)}
              className="text-gray-700 w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">사용자ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="text-gray-700 w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">사용자암호:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberId}
              onChange={() => setRememberId(!rememberId)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-gray-700">아이디 저장</label>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              로그인
            </button>
            <button
              onClick={handlePasswordChange}
              className="w-full px-4 py-2 font-bold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              암호변경
            </button>
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 font-bold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
