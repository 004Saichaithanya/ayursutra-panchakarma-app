import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Leaf,
  Clock,
  CheckCircle,
  AlertCircle,
  Coffee,
  Utensils,
  Moon,
  Sun,
  Droplets,
  ThermometerSun,
  Ban,
  Plus,
  BookOpen,
  Eye,
  Snowflake,
  Flower
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function DietLifestyle({ onPageChange }) {
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('meals');

  const [todayMeals, setTodayMeals] = React.useState([
    {
      id: 1,
      time: 'Breakfast (8:00 AM)',
      meal: 'Warm oatmeal with ghee, almonds, and honey',
      benefits: ['Nourishing', 'Grounding', 'Easy to digest'],
      eaten: true
    },
    {
      id: 2,
      time: 'Lunch (12:00 PM)',
      meal: 'Quinoa bowl with steamed vegetables and turmeric',
      benefits: ['Balancing', 'Protein-rich', 'Anti-inflammatory'],
      eaten: false
    },
    {
      id: 3,
      time: 'Snack (3:30 PM)',
      meal: 'Warm herbal tea with dates',
      benefits: ['Hydrating', 'Natural sweetness', 'Energy boost'],
      eaten: false
    },
    {
      id: 4,
      time: 'Dinner (6:30 PM)',
      meal: 'Mung dal soup with ginger and cumin',
      benefits: ['Light', 'Detoxifying', 'Easy to digest'],
      eaten: false
    }
  ]);

  const [lifestyleHabits, setLifestyleHabits] = React.useState([
    {
      category: 'Sleep',
      icon: Moon,
      habits: [
        { id: 1, text: 'Sleep by 10:00 PM', completed: false },
        { id: 2, text: 'Wake up before sunrise', completed: true },
        { id: 3, text: 'Avoid screens 1 hour before bed', completed: false }
      ]
    },
    {
      category: 'Exercise',
      icon: Sun,
      habits: [
        { id: 4, text: 'Daily yoga practice', completed: true },
        { id: 5, text: 'Regular walks in nature', completed: true },
        { id: 6, text: 'Breathing exercises', completed: false }
      ]
    },
    {
      category: 'Hydration',
      icon: Droplets,
      habits: [
        { id: 7, text: 'Drink warm water throughout day', completed: true },
        { id: 8, text: 'Herbal teas between meals', completed: false },
        { id: 9, text: 'Avoid cold drinks', completed: true }
      ]
    },
    {
      category: 'Stress Management',
      icon: Leaf,
      habits: [
        { id: 10, text: 'Daily meditation practice', completed: true },
        { id: 11, text: 'Regular oil massage', completed: false },
        { id: 12, text: 'Maintain regular routine', completed: true }
      ]
    }
  ]);

  const weeklyProgress = {
    dietCompliance: 85,
    lifestyleScore: 78,
    energyLevel: 82,
    digestiveHealth: 88
  };

  const recipeLibrary = [
    {
      id: 1,
      name: 'Quinoa Khichdi',
      category: 'Main Course',
      doshaType: 'Vata-Pitta',
      cookTime: '30 minutes',
      difficulty: 'Easy',
      benefits: ['Balancing', 'Digestive', 'Nourishing'],
      ingredients: [
        '1 cup quinoa',
        '1/2 cup yellow moong dal',
        '2 tsp ghee',
        '1 tsp cumin seeds',
        '1 inch ginger',
        '1 tsp turmeric',
        'Salt to taste',
        '4 cups water',
        'Fresh coriander leaves'
      ],
      instructions: [
        'Wash quinoa and moong dal thoroughly',
        'Heat ghee in a pressure cooker, add cumin seeds',
        'Add ginger and sauté for 1 minute',
        'Add quinoa, dal, turmeric, and salt',
        'Add water and pressure cook for 3 whistles',
        'Garnish with coriander and serve warm'
      ]
    },
    {
      id: 2,
      name: 'Golden Milk Latte',
      category: 'Beverage',
      doshaType: 'All Doshas',
      cookTime: '10 minutes',
      difficulty: 'Easy',
      benefits: ['Anti-inflammatory', 'Calming', 'Immunity boost'],
      ingredients: [
        '1 cup almond milk',
        '1/2 tsp turmeric powder',
        '1/4 tsp ginger powder',
        '1 pinch black pepper',
        '1 tsp honey',
        '1/4 tsp cinnamon',
        '1 pinch cardamom'
      ],
      instructions: [
        'Heat almond milk in a saucepan',
        'Add turmeric, ginger, cinnamon, cardamom',
        'Whisk until well combined',
        'Add black pepper and simmer for 2 minutes',
        'Remove from heat, add honey when cool',
        'Serve warm before bedtime'
      ]
    },
    {
      id: 3,
      name: 'Ayurvedic Oatmeal',
      category: 'Breakfast',
      doshaType: 'Vata-Pitta',
      cookTime: '15 minutes',
      difficulty: 'Easy',
      benefits: ['Grounding', 'Nourishing', 'Sustained energy'],
      ingredients: [
        '1/2 cup rolled oats',
        '1 cup warm milk',
        '1 tbsp ghee',
        '1 tbsp chopped almonds',
        '1 tsp honey',
        '1/4 tsp cinnamon',
        '2-3 dates, chopped'
      ],
      instructions: [
        'Heat ghee in a pan, add oats',
        'Roast oats for 2-3 minutes until fragrant',
        'Add warm milk and cinnamon',
        'Cook for 8-10 minutes, stirring occasionally',
        'Add chopped dates and almonds',
        'Serve warm with honey drizzled on top'
      ]
    }
  ];

  const herbalTeas = [
    {
      name: 'Triphala Tea',
      benefits: ['Digestive health', 'Detoxification', 'Gentle cleansing'],
      doshaType: 'All Doshas',
      bestTime: 'Before bed',
      preparation: 'Steep 1 tsp powder in hot water for 5 minutes',
      description:
        'A traditional blend of three fruits that supports natural detoxification and digestive health.'
    },
    {
      name: 'Ginger-Turmeric Tea',
      benefits: ['Anti-inflammatory', 'Digestive fire', 'Immunity'],
      doshaType: 'Vata-Kapha',
      bestTime: 'Morning or before meals',
      preparation: 'Boil fresh ginger and turmeric root for 10 minutes',
      description: 'A warming blend that stimulates digestion and reduces inflammation.'
    },
    {
      name: 'Chamomile Tea',
      benefits: ['Relaxation', 'Better sleep', 'Nervous system'],
      doshaType: 'Pitta-Vata',
      bestTime: 'Evening',
      preparation: 'Steep dried flowers in hot water for 5-7 minutes',
      description: 'A gentle, calming tea that promotes relaxation and restful sleep.'
    },
    {
      name: 'Fennel-Coriander Tea',
      benefits: ['Cooling', 'Digestive', 'Hydrating'],
      doshaType: 'Pitta',
      bestTime: 'After meals',
      preparation: 'Boil equal parts fennel and coriander seeds for 8 minutes',
      description: 'A cooling digestive tea that helps balance Pitta and aids digestion.'
    }
  ];

  const seasonalGuidelines = [
    {
      season: 'Spring',
      icon: Flower,
      duration: 'March - May',
      dosha: 'Kapha Season',
      characteristics: ['Wet', 'Cool', 'Heavy'],
      recommendations: [
        'Eat lighter, warming foods',
        'Increase physical activity',
        'Practice detoxification',
        'Favor bitter and pungent tastes',
        'Wake up early (before 6 AM)',
        'Avoid dairy and cold foods'
      ],
      avoid: ['Heavy, oily foods', 'Excessive sleep', 'Cold drinks', 'Sweet foods']
    },
    {
      season: 'Summer',
      icon: Sun,
      duration: 'June - August',
      dosha: 'Pitta Season',
      characteristics: ['Hot', 'Sharp', 'Intense'],
      recommendations: [
        'Eat cooling, sweet foods',
        'Stay hydrated with room temperature water',
        'Practice gentle, cooling exercises',
        'Favor sweet, bitter, and astringent tastes',
        'Avoid excessive heat and sun',
        'Include coconut, cucumber, and mint'
      ],
      avoid: ['Spicy foods', 'Excessive exercise', 'Alcohol', 'Sour foods']
    },
    {
      season: 'Monsoon',
      icon: Droplets,
      duration: 'September - October',
      dosha: 'Vata-Pitta Season',
      characteristics: ['Humid', 'Variable', 'Changeable'],
      recommendations: [
        'Eat fresh, easily digestible foods',
        'Boost immunity with ginger and turmeric',
        'Maintain regular routines',
        'Favor warm, cooked foods',
        'Practice gentle yoga',
        'Keep body warm and dry'
      ],
      avoid: ['Street food', 'Raw vegetables', 'Excessive cold foods', 'Irregular schedules']
    },
    {
      season: 'Winter',
      icon: Snowflake,
      duration: 'November - February',
      dosha: 'Vata Season',
      characteristics: ['Cold', 'Dry', 'Light'],
      recommendations: [
        'Eat warming, nourishing foods',
        'Increase healthy fats and oils',
        'Practice oil massage (abhyanga)',
        'Favor sweet, sour, and salty tastes',
        'Maintain warm body temperature',
        'Follow regular sleep schedule'
      ],
      avoid: ['Cold foods and drinks', 'Excessive raw foods', 'Irregular meals', 'Cold, windy exposure']
    }
  ];

  const toggleMealEaten = (mealId) => {
    setTodayMeals((meals) =>
      meals.map((meal) => (meal.id === mealId ? { ...meal, eaten: !meal.eaten } : meal))
    );
  };

  const toggleHabitCompleted = (categoryIndex, habitId) => {
    setLifestyleHabits((habits) =>
      habits.map((category, catIndex) =>
        catIndex === categoryIndex
          ? {
              ...category,
              habits: category.habits.map((habit) =>
                habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
              )
            }
          : category
      )
    );
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Diet & Lifestyle Guidance</h1>
          <p className="text-green-100 mb-6">
            Personalized nutrition and lifestyle recommendations for your Vata-Pitta constitution
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Utensils className="w-8 h-8 mx-auto mb-2" />
              <p className="text-green-100">Diet Compliance</p>
              <p className="text-2xl font-bold">{weeklyProgress.dietCompliance}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Leaf className="w-8 h-8 mx-auto mb-2" />
              <p className="text-green-100">Lifestyle Score</p>
              <p className="text-2xl font-bold">{weeklyProgress.lifestyleScore}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Sun className="w-8 h-8 mx-auto mb-2" />
              <p className="text-green-100">Energy Level</p>
              <p className="text-2xl font-bold">{weeklyProgress.energyLevel}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <ThermometerSun className="w-8 h-8 mx-auto mb-2" />
              <p className="text-green-100">Digestive Health</p>
              <p className="text-2xl font-bold">{weeklyProgress.digestiveHealth}%</p>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1754493930441-2550a605e805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZSUyMGF5dXJ2ZWRhfGVufDF8fHx8MTc1ODM4NTc1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Herbal medicine"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Diet & Lifestyle Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="meals">Today's Meals</TabsTrigger>
          <TabsTrigger value="recipes">Recipe Library</TabsTrigger>
          <TabsTrigger value="teas">Herbal Teas</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Guide</TabsTrigger>
        </TabsList>

        {/* Today's Meals Tab */}
        <TabsContent value="meals" className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-8">
              {/* Today's Meal Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Utensils className="w-5 h-5 text-green-600" />
                    <span>Today's Meal Plan</span>
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Customized for your treatment phase and dosha balance
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todayMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className={`border rounded-xl p-6 ${
                        meal.eaten
                          ? 'bg-green-50 border-green-200'
                          : 'border-gray-200 hover:border-green-200'
                      } transition-colors`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Checkbox
                              checked={meal.eaten}
                              onCheckedChange={() => toggleMealEaten(meal.id)}
                              className="mt-1"
                            />
                            <h3 className="font-medium text-gray-900">{meal.time}</h3>
                            {meal.eaten && <CheckCircle className="w-5 h-5 text-green-500" />}
                          </div>
                          <p className="text-gray-700 mb-3 ml-7">{meal.meal}</p>
                          <div className="flex flex-wrap gap-2 ml-7">
                            {meal.benefits.map((benefit, idx) => (
                              <Badge key={idx} className="bg-green-100 text-green-700">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3 ml-7">
                        <Button
                          size="sm"
                          onClick={() => toggleMealEaten(meal.id)}
                          className={
                            meal.eaten ? 'bg-gray-600 hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700'
                          }
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {meal.eaten ? 'Mark as Not Eaten' : 'Mark as Eaten'}
                        </Button>
                        <Button variant="outline" size="sm" className="border-green-200 text-green-600">
                          View Recipe
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Lifestyle Habits Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Lifestyle Habits</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {lifestyleHabits.map((category, categoryIndex) => {
                    const Icon = category.icon;
                    const completed = category.habits.filter((h) => h.completed).length;
                    const total = category.habits.length;

                    return (
                      <div key={categoryIndex} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-5 h-5 text-green-600" />
                            <span className="font-medium">{category.category}</span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {completed}/{total}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {category.habits.map((habit) => (
                            <div
                              key={habit.id}
                              className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                                habit.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <Checkbox
                                checked={habit.completed}
                                onCheckedChange={() => toggleHabitCompleted(categoryIndex, habit.id)}
                              />
                              <span
                                className={`text-sm flex-1 ${
                                  habit.completed ? 'text-green-800 line-through' : 'text-gray-700'
                                }`}
                              >
                                {habit.text}
                              </span>
                              {habit.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Recipe Library Tab */}
        <TabsContent value="recipes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recipeLibrary.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{recipe.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className="bg-green-100 text-green-700">{recipe.category}</Badge>
                        <Badge variant="outline" className="border-green-300 text-green-700">
                          {recipe.doshaType}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{recipe.cookTime}</p>
                      <p>{recipe.difficulty}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.benefits.map((benefit, idx) => (
                      <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedRecipe(recipe)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Recipe
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{recipe.name}</DialogTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className="bg-green-100 text-green-700">{recipe.category}</Badge>
                          <Badge variant="outline">{recipe.doshaType}</Badge>
                          <span className="text-sm text-gray-600">
                            {recipe.cookTime} • {recipe.difficulty}
                          </span>
                        </div>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Benefits</h4>
                          <div className="flex flex-wrap gap-2">
                            {recipe.benefits.map((benefit, idx) => (
                              <span key={idx} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Ingredients</h4>
                          <ul className="space-y-1">
                            {recipe.ingredients.map((ingredient, idx) => (
                              <li key={idx} className="text-gray-700 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span>{ingredient}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Instructions</h4>
                          <ol className="space-y-2">
                            {recipe.instructions.map((instruction, idx) => (
                              <li key={idx} className="text-gray-700 flex items-start space-x-3">
                                <span className="font-medium text-green-600 bg-green-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">
                                  {idx + 1}
                                </span>
                                <span className="flex-1">{instruction}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Herbal Teas Tab */}
        <TabsContent value="teas" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {herbalTeas.map((tea, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{tea.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className="bg-blue-100 text-blue-700">{tea.doshaType}</Badge>
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          {tea.bestTime}
                        </Badge>
                      </div>
                    </div>
                    <Coffee className="w-8 h-8 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{tea.description}</p>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {tea.benefits.map((benefit, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Preparation</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{tea.preparation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Seasonal Guidelines Tab */}
        <TabsContent value="seasonal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {seasonalGuidelines.map((season, index) => {
              const Icon = season.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon className="w-8 h-8 text-green-600" />
                      <div>
                        <CardTitle className="text-xl">{season.season}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {season.duration} • {season.dosha}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Characteristics</h4>
                      <div className="flex flex-wrap gap-2">
                        {season.characteristics.map((char, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                      <ul className="space-y-1">
                        {season.recommendations.slice(0, 4).map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                      {season.recommendations.length > 4 && (
                        <p className="text-xs text-gray-500 mt-2">
                          +{season.recommendations.length - 4} more recommendations
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Avoid</h4>
                      <ul className="space-y-1">
                        {season.avoid.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                            <Ban className="w-3 h-3 text-red-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Diet Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            onClick={() => setActiveTab('recipes')}
            className="w-full justify-start space-x-3 border-green-200 text-green-700 hover:bg-green-50"
          >
            <BookOpen className="w-5 h-5" />
            <span>Recipe Library</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveTab('teas')}
            className="w-full justify-start space-x-3 border-green-200 text-green-700 hover:bg-green-50"
          >
            <Coffee className="w-5 h-5" />
            <span>Herbal Tea Guide</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveTab('seasonal')}
            className="w-full justify-start space-x-3 border-green-200 text-green-700 hover:bg-green-50"
          >
            <Leaf className="w-5 h-5" />
            <span>Seasonal Guidelines</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
