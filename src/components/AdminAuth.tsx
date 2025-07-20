import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AdminAuthProps {
  onLogin: (username: string) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'roblox2024'
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        onLogin(username);
      } else {
        setError('Неверный логин или пароль');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-blue via-roblox-red to-roblox-yellow flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-roblox-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            <Icon name="Shield" size={32} />
          </div>
          <CardTitle className="text-2xl font-bold text-roblox-gray">Админ-панель</CardTitle>
          <CardDescription>Вход только для администраторов</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                type="text"
                placeholder="Введите логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-roblox-blue hover:bg-roblox-blue/90"
              disabled={loading}
            >
              {loading ? (
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
              ) : (
                <Icon name="LogIn" size={16} className="mr-2" />
              )}
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Демо доступ:</strong><br />
              Логин: admin<br />
              Пароль: roblox2024
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;