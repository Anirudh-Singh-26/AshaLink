
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Heart, Apple, Dumbbell, Brain, Baby } from 'lucide-react';

const HealthTipsPanel = () => {
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const nutritionTips = [
    {
      id: 1,
      title: "Iron-Rich Foods",
      content: "Include spinach, lentils, and lean meat in your diet. Iron helps prevent anemia during pregnancy.",
      category: "nutrition",
      image: "🥬",
      importance: "high"
    },
    {
      id: 2,
      title: "Folic Acid Benefits",
      content: "Take 400-800 mcg of folic acid daily. It helps prevent birth defects in your baby's brain and spine.",
      category: "nutrition",
      image: "💊",
      importance: "high"
    },
    {
      id: 3,
      title: "Calcium Sources",
      content: "Get 1000mg calcium daily from dairy, leafy greens, and fortified foods for strong bones.",
      category: "nutrition",
      image: "🥛",
      importance: "medium"
    },
    {
      id: 4,
      title: "Healthy Hydration",
      content: "Drink 8-10 glasses of water daily. Proper hydration supports increased blood volume during pregnancy.",
      category: "nutrition",
      image: "💧",
      importance: "high"
    }
  ];

  const exerciseTips = [
    {
      id: 5,
      title: "Prenatal Yoga",
      content: "Practice gentle yoga poses to improve flexibility and reduce back pain. Always consult your doctor first.",
      category: "exercise",
      image: "🧘‍♀️",
      importance: "medium"
    },
    {
      id: 6,
      title: "Walking Benefits",
      content: "Take 30-minute walks daily. Walking improves circulation and helps prepare your body for labor.",
      category: "exercise",
      image: "🚶‍♀️",
      importance: "high"
    },
    {
      id: 7,
      title: "Swimming Safety",
      content: "Swimming is excellent low-impact exercise. Avoid hot tubs and maintain comfortable water temperature.",
      category: "exercise",
      image: "🏊‍♀️",
      importance: "medium"
    }
  ];

  const wellnessTips = [
    {
      id: 8,
      title: "Sleep Position",
      content: "Sleep on your left side with a pillow between your knees. This improves blood flow to your baby.",
      category: "wellness",
      image: "😴",
      importance: "high"
    },
    {
      id: 9,
      title: "Stress Management",
      content: "Practice deep breathing and meditation. High stress can affect your baby's development.",
      category: "wellness",
      image: "🧘",
      importance: "high"
    },
    {
      id: 10,
      title: "Regular Checkups",
      content: "Attend all prenatal appointments. Regular monitoring ensures both you and baby stay healthy.",
      category: "wellness",
      image: "🏥",
      importance: "high"
    }
  ];

  const developmentTips = [
    {
      id: 11,
      title: "Baby's First Movements",
      content: "You may feel first movements between 16-25 weeks. These 'quickening' sensations are normal.",
      category: "development",
      image: "👶",
      importance: "medium"
    },
    {
      id: 12,
      title: "Brain Development",
      content: "Your baby's brain develops rapidly. Omega-3 fatty acids from fish support cognitive development.",
      category: "development",
      image: "🧠",
      importance: "high"
    }
  ];

  const allTips = [...nutritionTips, ...exerciseTips, ...wellnessTips, ...developmentTips];

  const getImportanceColor = (importance) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[importance] || colors.medium;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      nutrition: <Apple className="h-4 w-4" />,
      exercise: <Dumbbell className="h-4 w-4" />,
      wellness: <Heart className="h-4 w-4" />,
      development: <Baby className="h-4 w-4" />
    };
    return icons[category] || <Heart className="h-4 w-4" />;
  };

  const TipCard = ({ tip }) => (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-healthcare-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{tip.image}</span>
            <div>
              <CardTitle className="text-lg">{tip.title}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                {getCategoryIcon(tip.category)}
                <Badge variant="outline" className="text-xs capitalize">
                  {tip.category}
                </Badge>
                <Badge className={`text-xs ${getImportanceColor(tip.importance)}`}>
                  {tip.importance} priority
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorite(tip.id)}
            className={favorites.has(tip.id) ? 'text-red-500' : 'text-gray-400'}
          >
            {favorites.has(tip.id) ? '❤️' : '🤍'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{tip.content}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-healthcare-primary to-healthcare-secondary bg-clip-text text-transparent">
          Health & Nutrition Tips
        </h2>
        <p className="text-muted-foreground">
          Evidence-based advice for a healthy pregnancy journey
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="pt-6">
            <Apple className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">{nutritionTips.length}</div>
            <div className="text-sm text-red-600">Nutrition Tips</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <Dumbbell className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{exerciseTips.length}</div>
            <div className="text-sm text-blue-600">Exercise Tips</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{wellnessTips.length}</div>
            <div className="text-sm text-purple-600">Wellness Tips</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <Baby className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{developmentTips.length}</div>
            <div className="text-sm text-green-600">Development</div>
          </CardContent>
        </Card>
      </div>

      {/* Tips Content */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="all">All Tips</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {allTips.map((tip) => <TipCard key={tip.id} tip={tip} />)}
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <div className="grid gap-4">
            {nutritionTips.map((tip) => <TipCard key={tip.id} tip={tip} />)}
          </div>
        </TabsContent>

        <TabsContent value="exercise" className="space-y-4">
          <div className="grid gap-4">
            {exerciseTips.map((tip) => <TipCard key={tip.id} tip={tip} />)}
          </div>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-4">
          <div className="grid gap-4">
            {wellnessTips.map((tip) => <TipCard key={tip.id} tip={tip} />)}
          </div>
        </TabsContent>

        <TabsContent value="development" className="space-y-4">
          <div className="grid gap-4">
            {developmentTips.map((tip) => <TipCard key={tip.id} tip={tip} />)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Favorites Section */}
      {favorites.size > 0 && (
        <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
          <CardHeader>
            <CardTitle className="text-pink-800">❤️ Your Favorite Tips</CardTitle>
            <CardDescription className="text-pink-600">
              Quick access to your saved health tips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {allTips
                .filter(tip => favorites.has(tip.id))
                .map((tip) => (
                  <div key={tip.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-pink-200">
                    <span className="text-xl">{tip.image}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-pink-900">{tip.title}</h4>
                      <p className="text-sm text-pink-700">{tip.content}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HealthTipsPanel;
