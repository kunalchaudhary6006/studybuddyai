"use client";

import React, { useState } from 'react';
import { Search, Mic, Book, Atom, Calculator, TrendingUp, Star, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Pomodoro from '@/components/study/Pomodoro';
import { MadeWithDyad } from '@/components/made-with-dyad';

const Index = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      navigate(`/learn?topic=${encodeURIComponent(query)}`);
    }
  };

  const subjects = [
    { name: 'Physics', icon: <Atom className="w-6 h-6" />, color: 'bg-blue-500', topic: 'Quantum Mechanics' },
    { name: 'Chemistry', icon: <Book className="w-6 h-6" />, color: 'bg-emerald-500', topic: 'Organic Chemistry' },
    { name: 'Math', icon: <Calculator className="w-6 h-6" />, color: 'bg-rose-500', topic: 'Calculus' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl">S</div>
          <h1 className="text-2xl font-black tracking-tight">StudyBuddy AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <TrendingUp className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-muted border-2 border-primary/10 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Master any concept <br />
            <span className="text-primary">with AI precision.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From basic fundamentals to JEE Advanced mastery. Your personal AI tutor is ready.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to learn today?" 
              className="h-16 pl-14 pr-32 text-lg rounded-2xl border-2 shadow-xl focus-visible:ring-primary/20"
            />
            <div className="absolute inset-y-2 right-2 flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10">
                <Mic className="w-5 h-5 text-primary" />
              </Button>
              <Button type="submit" className="h-12 px-6 rounded-xl font-bold">
                Learn
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-3">
            {['Thermodynamics', 'Integration', 'Periodic Table', 'Optics'].map(tag => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="px-4 py-1.5 rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => { setQuery(tag); handleSearch(); }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Quick Subjects */}
          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {subjects.map((sub) => (
                <Card 
                  key={sub.name}
                  className="p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-none shadow-lg group"
                  onClick={() => navigate(`/learn?topic=${sub.topic}`)}
                >
                  <div className={`${sub.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {sub.icon}
                  </div>
                  <h3 className="font-bold text-lg">{sub.name}</h3>
                  <p className="text-sm text-muted-foreground">Explore topics</p>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  Recent Progress
                </h3>
                <Button variant="link" className="text-primary">View All</Button>
              </div>
              <div className="space-y-3">
                {[
                  { topic: "Newton's Laws", score: '85%', date: '2h ago' },
                  { topic: "Chemical Bonding", score: '92%', date: 'Yesterday' }
                ].map((item, i) => (
                  <Card key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {item.score}
                      </div>
                      <div>
                        <p className="font-bold">{item.topic}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Review</Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Tools */}
          <div className="space-y-8">
            <Pomodoro />
            
            <Card className="p-6 border-2 border-dashed border-primary/20 bg-primary/5">
              <h3 className="font-bold mb-4">Formula Vault</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You have 12 saved formulas for quick revision.
              </p>
              <Button className="w-full variant-outline border-primary text-primary hover:bg-primary hover:text-white">
                Open Vault
              </Button>
            </Card>
          </div>
        </div>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;