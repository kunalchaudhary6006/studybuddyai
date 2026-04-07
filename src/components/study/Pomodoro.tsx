"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          clearInterval(interval);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl border-none">
      <div className="flex items-center gap-2 mb-4">
        <Timer className="w-5 h-5" />
        <h3 className="font-bold text-lg">Focus Timer</h3>
      </div>
      <div className="text-5xl font-mono font-bold text-center mb-6">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex justify-center gap-3">
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={toggleTimer}
          className="rounded-full bg-white/20 hover:bg-white/30 border-none text-white"
        >
          {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={resetTimer}
          className="rounded-full bg-white/20 hover:bg-white/30 border-none text-white"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
};

export default Pomodoro;