import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Plant {
  id: number;
  name: string;
  latinName: string;
  price: number;
  image: string;
  size: string;
  lighting: string;
  difficulty: string;
  inStock: boolean;
}

const plants: Plant[] = [
  {
    id: 1,
    name: "Криптокорина парва",
    latinName: "Cryptocoryne parva",
    price: 150,
    image: "/img/02c179ea-ecd0-445f-b0e6-675a7b12f33f.jpg",
    size: "small",
    lighting: "low",
    difficulty: "easy",
    inStock: true,
  },
  {
    id: 2,
    name: "Хемиантус микрантемоидес",
    latinName: "Hemianthus micranthemoides",
    price: 190,
    image: "/img/3b8c32e6-17a3-4755-96f8-2e477c2722f2.jpg",
    size: "small",
    lighting: "medium",
    difficulty: "medium",
    inStock: true,
  },
  {
    id: 3,
    name: "Микрантемум Монте Карло",
    latinName: "Micranthemum sp. Monte Carlo",
    price: 200,
    image: "/img/3b8c32e6-17a3-4755-96f8-2e477c2722f2.jpg",
    size: "small",
    lighting: "high",
    difficulty: "medium",
    inStock: true,
  },
  {
    id: 4,
    name: "Людвигия аркуата",
    latinName: "Ludwigia arcuata",
    price: 290,
    image: "/img/3dfc4cc8-4fd2-44f4-a21b-e02990bb37c9.jpg",
    size: "medium",
    lighting: "high",
    difficulty: "hard",
    inStock: true,
  },
  {
    id: 5,
    name: "Анубиас нана",
    latinName: "Anubias barteri var. nana",
    price: 320,
    image: "/img/02c179ea-ecd0-445f-b0e6-675a7b12f33f.jpg",
    size: "medium",
    lighting: "low",
    difficulty: "easy",
    inStock: true,
  },
  {
    id: 6,
    name: "Ротала индика",
    latinName: "Rotala indica",
    price: 180,
    image: "/img/3dfc4cc8-4fd2-44f4-a21b-e02990bb37c9.jpg",
    size: "large",
    lighting: "medium",
    difficulty: "medium",
    inStock: false,
  },
];

export default function Index() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sizeFilter, setSizeFilter] = useState<string>("all");
  const [lightingFilter, setLightingFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const addToCart = (plantId: number) => {
    setCart(prev => ({
      ...prev,
      [plantId]: (prev[plantId] || 0) + 1
    }));
  };

  const removeFromCart = (plantId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[plantId] > 1) {
        newCart[plantId]--;
      } else {
        delete newCart[plantId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.latinName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSize = sizeFilter === "all" || plant.size === sizeFilter;
    const matchesLighting = lightingFilter === "all" || plant.lighting === lightingFilter;
    const matchesDifficulty = difficultyFilter === "all" || plant.difficulty === difficultyFilter;
    
    return matchesSearch && matchesSize && matchesLighting && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLightingColor = (lighting: string) => {
    switch (lighting) {
      case "low": return "bg-blue-100 text-blue-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-white px-3 py-2 rounded-lg font-bold text-xl">
                AQUA PLANT
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-primary transition-colors">Главная</a>
              <a href="#catalog" className="bg-primary px-4 py-2 rounded-lg text-white font-medium">Каталог товаров</a>
              <a href="#" className="hover:text-primary transition-colors">Скидки</a>
              <a href="#" className="hover:text-primary transition-colors">Доставка и оплата</a>
              <a href="#" className="hover:text-primary transition-colors">О нас</a>
              <a href="#" className="hover:text-primary transition-colors">Контакты</a>
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Input
                  type="text"
                  placeholder="Поиск по товарам"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                />
                <Icon name="Search" size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              </div>
              <Button variant="outline" className="relative bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
                <Icon name="ShoppingCart" size={20} />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Home" size={16} />
          <span>Главная</span>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground">Растения</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Растения</h1>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Фильтры</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <Input
                type="text"
                placeholder="Поиск растений..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Размер" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все размеры</SelectItem>
                <SelectItem value="small">Маленькие</SelectItem>
                <SelectItem value="medium">Средние</SelectItem>
                <SelectItem value="large">Большие</SelectItem>
              </SelectContent>
            </Select>
            <Select value={lightingFilter} onValueChange={setLightingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Освещение" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любое освещение</SelectItem>
                <SelectItem value="low">Слабое</SelectItem>
                <SelectItem value="medium">Среднее</SelectItem>
                <SelectItem value="high">Сильное</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Сложность ухода" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любая сложность</SelectItem>
                <SelectItem value="easy">Легкая</SelectItem>
                <SelectItem value="medium">Средняя</SelectItem>
                <SelectItem value="hard">Сложная</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div id="catalog" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => (
            <Card key={plant.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!plant.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="destructive">Нет в наличии</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  <Badge variant="outline" className={getDifficultyColor(plant.difficulty)}>
                    {plant.difficulty === "easy" ? "Легкая" : plant.difficulty === "medium" ? "Средняя" : "Сложная"}
                  </Badge>
                  <Badge variant="outline" className={getLightingColor(plant.lighting)}>
                    {plant.lighting === "low" ? "Слабое" : plant.lighting === "medium" ? "Среднее" : "Сильное"}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">{plant.name}</h3>
                <p className="text-sm text-muted-foreground italic mb-3">{plant.latinName}</p>
                <p className="text-2xl font-bold text-primary">{plant.price} ₽</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between w-full">
                  {cart[plant.id] ? (
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromCart(plant.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Icon name="Minus" size={16} />
                      </Button>
                      <span className="font-medium min-w-[20px] text-center">{cart[plant.id]}</span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(plant.id)}
                        className="h-8 w-8 p-0"
                        disabled={!plant.inStock}
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => addToCart(plant.id)} 
                      className="flex-1"
                      disabled={!plant.inStock}
                    >
                      В корзину
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-12">
            <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Растения не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска или фильтры</p>
          </div>
        )}
      </main>
    </div>
  );
}