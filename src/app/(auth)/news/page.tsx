'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { ActionCard } from '@/components/action-card';
import { ExternalLink, Trophy, Users, TrendingUp, Target, BarChart3, Zap, Globe } from 'lucide-react';

export default function NewsPage() {
  const handleSiteClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AuthPageLayout title="News">
      <div className="space-y-6">
        
        {/* Page Header */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Fantasy Football Resources</h2>
          <p className="text-muted-foreground">Stay updated with the best fantasy football sites</p>
        </div>

        {/* Fantasy Football Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          
          <ActionCard
            icon={<Globe className="w-5 h-5 text-blue-600" />}
            title="ESPN Fantasy"
            description="The most popular fantasy platform with leagues and analysis"
            buttonText="Visit Site"
            variant="outline"
            onButtonClick={() => handleSiteClick('https://fantasy.espn.com/football/')}
          />

          <ActionCard
            icon={<Trophy className="w-5 h-5 text-purple-600" />}
            title="Yahoo Fantasy"
            description="Free fantasy leagues with advanced stats and insights"
            buttonText="Visit Site"
            variant="outline"
            onButtonClick={() => handleSiteClick('https://football.fantasysports.yahoo.com/')}
          />

          <ActionCard
            icon={<BarChart3 className="w-5 h-5 text-green-600" />}
            title="FantasyPros"
            description="Expert consensus rankings and draft tools"
            buttonText="Visit Site"
            variant="outline"
            onButtonClick={() => handleSiteClick('https://www.fantasypros.com/')}
          />

          <ActionCard
            icon={<Target className="w-5 h-5 text-orange-600" />}
            title="Fantasy Points"
            description="Advanced analytics and most accurate rankings"
            buttonText="Visit Site"
            variant="outline"
            onButtonClick={() => handleSiteClick('https://www.fantasypoints.com/')}
          />

          <ActionCard
            icon={<Zap className="w-5 h-5 text-red-600" />}
            title="Draft Sharks"
            description="Most accurate fantasy football experts and rankings"
            buttonText="Visit Site"
            variant="outline"
            onButtonClick={() => handleSiteClick('https://www.draftsharks.com/')}
          />

          <ActionCard
            icon={<Users className="w-5 h-5 text-indigo-600" />}
            title="Footballguys"
            description="Long-standing fantasy advice with daily newsletters"
            buttonText="Visit Site"
            variant="outline"
            onButtonClick={() => handleSiteClick('https://www.footballguys.com/')}
          />

          <ActionCard
            icon={<TrendingUp className="w-5 h-5 text-cyan-600" />}
            title="The Athletic Fantasy"
            description="Premium fantasy football content and analysis"
            buttonText="Visit Site"
            variant="outline"
            onButtonClick={() => handleSiteClick('https://www.nytimes.com/athletic/fantasy-football/')}
          />

          <ActionCard
            icon={<ExternalLink className="w-5 h-5 text-gray-600" />}
            title="NFL.com Fantasy"
            description="Official NFL fantasy platform with player news"
            buttonText="Visit Site"
            variant="outline"
            onButtonClick={() => handleSiteClick('https://fantasy.nfl.com/')}
          />

        </div>

      </div>
    </AuthPageLayout>
  );
}