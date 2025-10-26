'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Video {
  id: string;
  prompt: string;
  url: string;
  timestamp: number;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [progress, setProgress] = useState(0);

  const sampleVideos = [
    { prompt: "A serene sunset over a calm ocean with waves gently crashing", thumb: "🌅" },
    { prompt: "A futuristic city at night with neon lights and flying cars", thumb: "🌃" },
    { prompt: "A cat walking through a field of flowers on a sunny day", thumb: "🐱" },
    { prompt: "Northern lights dancing over a snowy mountain landscape", thumb: "✨" },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate video generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Simulate API call
    setTimeout(() => {
      const newVideo: Video = {
        id: Date.now().toString(),
        prompt: prompt,
        url: `https://api.placeholder.com/video/${Date.now()}`,
        timestamp: Date.now(),
      };
      setVideos([newVideo, ...videos]);
      setIsGenerating(false);
      setProgress(0);
      setPrompt('');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🎬</div>
              <h1 className="text-3xl font-bold gradient-text">Sora Free</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                ✓ No Watermarks
              </span>
              <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-semibold">
                ∞ Unlimited
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            AI Video Generation
          </h2>
          <p className="text-xl text-gray-400 mb-2">
            Create stunning videos from text. Completely free. No restrictions.
          </p>
          <p className="text-sm text-gray-500">
            Powered by advanced AI technology
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="glass rounded-2xl p-8 shadow-2xl">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the video you want to create... Be as detailed as possible for best results."
              className="w-full bg-white/5 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
              disabled={isGenerating}
            />

            {isGenerating && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Generating your video...</span>
                  <span className="text-sm text-purple-400 font-semibold">{progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isGenerating ? '🎨 Creating Magic...' : '✨ Generate Video'}
            </button>
          </div>
        </motion.div>

        {/* Sample Prompts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-200">
            Try These Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleVideos.map((sample, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPrompt(sample.prompt)}
                className="glass rounded-xl p-6 text-left hover:border-purple-500/50 transition-all group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {sample.thumb}
                </div>
                <p className="text-sm text-gray-300 line-clamp-3">{sample.prompt}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Generated Videos */}
        {videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-200">Your Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-xl overflow-hidden hover:border-purple-500/50 transition-all"
                >
                  <div className="video-placeholder aspect-video flex items-center justify-center text-6xl">
                    🎥
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">{video.prompt}</p>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded-lg transition-colors">
                        ▶ Play
                      </button>
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors">
                        ⬇ Download
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="glass rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h4 className="text-xl font-bold mb-2 text-gray-200">Lightning Fast</h4>
            <p className="text-gray-400">Generate high-quality videos in seconds with our advanced AI</p>
          </div>
          <div className="glass rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">🎨</div>
            <h4 className="text-xl font-bold mb-2 text-gray-200">Creative Freedom</h4>
            <p className="text-gray-400">No limits on creativity. Generate as many videos as you want</p>
          </div>
          <div className="glass rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">💎</div>
            <h4 className="text-xl font-bold mb-2 text-gray-200">Premium Quality</h4>
            <p className="text-gray-400">Professional results without watermarks or restrictions</p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Sora Free. AI-powered video generation for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
