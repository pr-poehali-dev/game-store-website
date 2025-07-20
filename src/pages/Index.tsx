import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import AdminAuth from '@/components/AdminAuth';
import AdminPanel from '@/components/AdminPanel';
import CartModal from '@/components/CartModal';
import NotificationToast from '@/components/NotificationToast';
import { useProducts, type Product } from '@/hooks/useProducts';

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: number, message: string, type: 'success' | 'info'}>>([]);
  const { getProductsByCategory } = useProducts();

  const addNotification = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    addNotification(`Товар "${product.name}" добавлен в корзину! 🛒`);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const buyInstant = (product: Product) => {
    const chatUrl = `https://t.me/robloxshop_support?text=Хочу купить: ${product.name} за ${product.price}₽`;
    addNotification(`🎉 Переходим в чат для покупки "${product.name}"!`, 'info');
    
    setTimeout(() => {
      window.open(chatUrl, '_blank');
    }, 1500);
  };

  const handleCartPurchase = (items: Product[]) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    const itemsList = items.map(item => `${item.name} (${item.price}₽)`).join(', ');
    const chatUrl = `https://t.me/robloxshop_support?text=Хочу купить из корзины: ${itemsList}. Итого: ${totalPrice}₽`;
    
    addNotification(`🎉 Заказ оформлен! Переходим в чат с продавцом...`, 'success');
    clearCart();
    
    setTimeout(() => {
      window.open(chatUrl, '_blank');
    }, 2000);
  };

  const handleAdminLogin = (username: string) => {
    setAdminUser(username);
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setShowAdmin(false);
  };

  if (showAdmin && !adminUser) {
    return <AdminAuth onLogin={handleAdminLogin} />;
  }

  if (showAdmin && adminUser) {
    return <AdminPanel username={adminUser} onLogout={handleAdminLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-blue via-roblox-red to-roblox-yellow font-rubik">
      
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-roblox-blue rounded-lg flex items-center justify-center text-white font-bold text-xl">
                R
              </div>
              <h1 className="text-2xl font-bold text-roblox-gray">RobloxShop</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#home" className="hover:text-roblox-blue transition-colors">Главная</a>
              <a href="#robux" className="hover:text-roblox-blue transition-colors">Робаксы</a>
              <a href="#accounts" className="hover:text-roblox-blue transition-colors">Аккаунты</a>
              <a href="#items" className="hover:text-roblox-blue transition-colors">Предметы</a>
            </nav>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="relative"
                onClick={() => setShowCart(true)}
              >
                <Icon name="ShoppingCart" size={16} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-roblox-red text-white text-xs flex items-center justify-center">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              <Button className="bg-roblox-blue hover:bg-roblox-blue/90">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAdmin(true)}
                className="hidden md:flex"
              >
                <Icon name="Shield" size={16} className="mr-2" />
                Админ
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <div className="animate-bounce-light mb-8">
            <div className="text-8xl mb-4">🎮</div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Лучший магазин<br />
            <span className="text-roblox-cream">товаров Roblox</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Робаксы, аккаунты и редкие предметы с автоматической выдачей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-roblox-blue hover:bg-white/90 font-semibold text-lg px-8 py-4">
              <Icon name="Zap" size={20} className="mr-2" />
              Начать покупки
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-roblox-blue font-semibold text-lg px-8 py-4">
              <Icon name="Play" size={20} className="mr-2" />
              Как это работает
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow animate-scale-in">
              <CardHeader>
                <div className="text-4xl mb-4">⚡</div>
                <CardTitle className="text-roblox-blue">Мгновенная доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Автоматическая выдача товаров сразу после оплаты</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow animate-scale-in" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <div className="text-4xl mb-4">🔒</div>
                <CardTitle className="text-roblox-blue">Безопасность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">100% безопасные сделки и защита покупателей</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow animate-scale-in" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <div className="text-4xl mb-4">💸</div>
                <CardTitle className="text-roblox-blue">Лучшие цены</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Самые выгодные предложения на рынке</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Robux Section */}
      <section id="robux" className="py-16 bg-gradient-to-r from-roblox-blue/10 to-roblox-green/10">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12 text-roblox-gray">
            💎 Робаксы
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {getProductsByCategory('robux').map((product) => (
              <Card key={product.id} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                {product.discount && (
                  <Badge className="absolute top-4 right-4 bg-roblox-red text-white">
                    -{product.discount}%
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4">{product.image}</div>
                  <CardTitle className="text-roblox-blue">{product.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-2xl font-bold text-roblox-gray">{product.price}₽</span>
                      {product.original && (
                        <span className="text-lg line-through text-gray-400">{product.original}₽</span>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => buyInstant(product)}
                    className="w-full bg-roblox-blue hover:bg-roblox-blue/90"
                  >
                    <Icon name="Zap" size={16} className="mr-2" />
                    Купить мгновенно
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => addToCart(product)}
                    className="w-full"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accounts Section */}
      <section id="accounts" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12 text-roblox-gray">
            👤 Аккаунты
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {getProductsByCategory('accounts').map((product) => (
              <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{product.image}</div>
                    <div>
                      <CardTitle className="text-roblox-blue">{product.name}</CardTitle>
                      <div className="flex space-x-2 mt-2">
                        {product.badges?.map((badge, index) => (
                          <Badge key={index} variant="secondary" className="bg-roblox-yellow/20 text-roblox-gray">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardDescription>
                    <span className="text-2xl font-bold text-roblox-gray">{product.price}₽</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => buyInstant(product)}
                    className="w-full bg-roblox-red hover:bg-roblox-red/90"
                  >
                    <Icon name="Zap" size={16} className="mr-2" />
                    Купить мгновенно
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => addToCart(product)}
                    className="w-full"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Items Section */}
      <section id="items" className="py-16 bg-gradient-to-r from-roblox-yellow/10 to-roblox-red/10">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12 text-roblox-gray">
            ⚔️ Предметы
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {getProductsByCategory('items').map((product) => (
              <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{product.image}</div>
                    <div>
                      <CardTitle className="text-roblox-blue">{product.name}</CardTitle>
                      <Badge className="mt-2 bg-gradient-to-r from-roblox-blue to-roblox-red text-white">
                        {product.rarity}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>
                    <span className="text-2xl font-bold text-roblox-gray">{product.price}₽</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => buyInstant(product)}
                    className="w-full bg-gradient-to-r from-roblox-blue to-roblox-red hover:opacity-90"
                  >
                    <Icon name="Zap" size={16} className="mr-2" />
                    Купить мгновенно
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => addToCart(product)}
                    className="w-full"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-roblox-gray text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">RobloxShop</h4>
              <p className="text-gray-300">Лучший магазин товаров для Roblox с автоматической выдачей</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Товары</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#robux" className="hover:text-white transition-colors">Робаксы</a></li>
                <li><a href="#accounts" className="hover:text-white transition-colors">Аккаунты</a></li>
                <li><a href="#items" className="hover:text-white transition-colors">Предметы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Гарантии</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-roblox-gray">
                  <Icon name="MessageCircle" size={16} />
                </Button>
                <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-roblox-gray">
                  <Icon name="Youtube" size={16} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RobloxShop. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      <CartModal
        open={showCart}
        onOpenChange={setShowCart}
        cart={cart}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onPurchase={handleCartPurchase}
      />

      {/* Notifications */}
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default Index;