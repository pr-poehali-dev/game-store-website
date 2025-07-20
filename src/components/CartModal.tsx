import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { type Product } from '@/hooks/useProducts';

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: Product[];
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
  onPurchase: (items: Product[]) => void;
}

const CartModal: React.FC<CartModalProps> = ({ 
  open, 
  onOpenChange, 
  cart, 
  onRemoveItem, 
  onClearCart,
  onPurchase 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      onPurchase(cart);
      setIsProcessing(false);
      onOpenChange(false);
    }, 2000);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Icon name="ShoppingCart" size={24} className="mr-2" />
            Корзина ({cart.length})
          </DialogTitle>
          <DialogDescription>
            Ваши выбранные товары готовы к покупке
          </DialogDescription>
        </DialogHeader>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
            <p className="text-gray-500">Добавьте товары для покупки</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              {cart.map((item) => (
                <Card key={`${item.id}-${Date.now()}`} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{item.image}</div>
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getCategoryColor(item.category)}>
                              {getCategoryName(item.category)}
                            </Badge>
                            <span className="text-lg font-bold text-roblox-blue">{item.price}₽</span>
                            {item.original && (
                              <span className="text-sm line-through text-gray-400">{item.original}₽</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Итого:</span>
                <span className="text-2xl font-bold text-roblox-blue">{totalPrice}₽</span>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={onClearCart}
                  className="flex-1"
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Очистить корзину
                </Button>
                <Button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  className="flex-1 bg-roblox-blue hover:bg-roblox-blue/90"
                >
                  {isProcessing ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <Icon name="CreditCard" size={16} className="mr-2" />
                      Купить за {totalPrice}₽
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;