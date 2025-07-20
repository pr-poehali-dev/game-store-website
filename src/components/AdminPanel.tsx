import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'robux' | 'accounts' | 'items';
  image: string;
  description?: string;
  original?: number;
  discount?: number;
  badges?: string[];
  rarity?: string;
}

interface AdminPanelProps {
  username: string;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ username, onLogout }) => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: '800 Робаксов', price: 299, category: 'robux', image: '💎', original: 399, discount: 25 },
    { id: 2, name: '1700 Робаксов', price: 599, category: 'robux', image: '💎', original: 799, discount: 25 },
    { id: 4, name: 'Премиум аккаунт 2022', price: 1299, category: 'accounts', image: '👤', badges: ['Премиум', 'Редкие вещи'] },
    { id: 6, name: 'Dominus Empyreus', price: 5999, category: 'items', image: '🎩', rarity: 'Легендарный' },
  ]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'robux',
    image: '',
    description: ''
  });

  const [bulkUpload, setBulkUpload] = useState('');

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product: Product = {
        id: Date.now(),
        name: newProduct.name,
        price: newProduct.price,
        category: newProduct.category as 'robux' | 'accounts' | 'items',
        image: newProduct.image || '🎮',
        description: newProduct.description,
      };

      if (newProduct.original) product.original = newProduct.original;
      if (newProduct.discount) product.discount = newProduct.discount;
      if (newProduct.rarity) product.rarity = newProduct.rarity;

      setProducts([...products, product]);
      setNewProduct({ name: '', price: 0, category: 'robux', image: '', description: '' });
    }
  };

  const handleBulkUpload = () => {
    try {
      const lines = bulkUpload.split('\n').filter(line => line.trim());
      const newProducts: Product[] = [];

      lines.forEach(line => {
        const [name, price, category, image] = line.split(',').map(item => item.trim());
        if (name && price && category) {
          newProducts.push({
            id: Date.now() + Math.random(),
            name,
            price: parseInt(price),
            category: category as 'robux' | 'accounts' | 'items',
            image: image || '🎮'
          });
        }
      });

      setProducts([...products, ...newProducts]);
      setBulkUpload('');
    } catch (error) {
      alert('Ошибка при загрузке товаров. Проверьте формат данных.');
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'robux': return 'Робаксы';
      case 'accounts': return 'Аккаунты';
      case 'items': return 'Предметы';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'robux': return 'bg-roblox-blue';
      case 'accounts': return 'bg-roblox-red';
      case 'items': return 'bg-roblox-yellow text-black';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-roblox-blue rounded-lg flex items-center justify-center text-white">
                <Icon name="Shield" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-roblox-gray">Админ-панель</h1>
                <p className="text-sm text-gray-500">Добро пожаловать, {username}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Управление товарами</TabsTrigger>
            <TabsTrigger value="add">Добавить товар</TabsTrigger>
            <TabsTrigger value="bulk">Массовая загрузка</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Package" size={20} className="mr-2" />
                  Товары в магазине ({products.length})
                </CardTitle>
                <CardDescription>Управление существующими товарами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{product.image}</div>
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getCategoryColor(product.category)}>
                              {getCategoryName(product.category)}
                            </Badge>
                            <span className="text-lg font-bold text-roblox-blue">{product.price}₽</span>
                            {product.original && (
                              <span className="text-sm line-through text-gray-400">{product.original}₽</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить новый товар
                </CardTitle>
                <CardDescription>Создание нового товара для магазина</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Название товара</Label>
                    <Input
                      id="name"
                      placeholder="Например: 1000 Робаксов"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Цена (₽)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="299"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value as any})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="robux">Робаксы</SelectItem>
                        <SelectItem value="accounts">Аккаунты</SelectItem>
                        <SelectItem value="items">Предметы</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Эмодзи/Иконка</Label>
                    <Input
                      id="image"
                      placeholder="💎"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="original">Старая цена (₽)</Label>
                    <Input
                      id="original"
                      type="number"
                      placeholder="399"
                      value={newProduct.original || ''}
                      onChange={(e) => setNewProduct({...newProduct, original: parseInt(e.target.value) || undefined})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rarity">Редкость (для предметов)</Label>
                    <Input
                      id="rarity"
                      placeholder="Легендарный"
                      value={newProduct.rarity || ''}
                      onChange={(e) => setNewProduct({...newProduct, rarity: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    placeholder="Описание товара..."
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>

                <Button onClick={handleAddProduct} className="w-full bg-roblox-blue hover:bg-roblox-blue/90">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить товар
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Upload" size={20} className="mr-2" />
                  Массовая загрузка товаров
                </CardTitle>
                <CardDescription>Загрузите несколько товаров одновременно</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Формат данных:</h4>
                  <p className="text-sm text-blue-700 mb-2">Каждая строка - один товар в формате:</p>
                  <code className="text-xs bg-blue-100 p-2 rounded block">
                    Название, Цена, Категория, Эмодзи
                  </code>
                  <p className="text-xs text-blue-600 mt-2">
                    Категории: robux, accounts, items
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulk">Данные товаров</Label>
                  <Textarea
                    id="bulk"
                    placeholder="800 Робаксов, 299, robux, 💎&#10;Премиум аккаунт, 1299, accounts, 👤&#10;Редкий меч, 2499, items, ⚔️"
                    value={bulkUpload}
                    onChange={(e) => setBulkUpload(e.target.value)}
                    rows={8}
                  />
                </div>

                <Button onClick={handleBulkUpload} className="w-full bg-roblox-green hover:bg-roblox-green/90">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить товары
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;