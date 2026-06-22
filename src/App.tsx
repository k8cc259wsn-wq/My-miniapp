import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { TabBar } from '@/components/layout/TabBar';
import { AchievementToast } from '@/components/ui/AchievementToast';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { TodayPage } from '@/pages/TodayPage';
import { NutritionHistoryPage } from '@/pages/NutritionHistoryPage';
import { WorkoutsPage } from '@/pages/WorkoutsPage';
import { ProgramDetailPage } from '@/pages/ProgramDetailPage';
import { ActiveWorkoutPage } from '@/pages/ActiveWorkoutPage';
import { WorkoutBuilderPage } from '@/pages/WorkoutBuilderPage';
import { WorkoutHistoryPage } from '@/pages/WorkoutHistoryPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { useAppStore } from '@/store/appStore';
import { initTelegramApp } from '@/utils/telegram';

export function App() {
  const { isHydrated, profile, hydrate, justUnlocked, clearJustUnlocked } = useAppStore();

  useEffect(() => {
    initTelegramApp();
    hydrate();
  }, [hydrate]);

  if (!isHydrated) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--color-text-secondary)' }}>MassUp</div>
      </div>
    );
  }

  if (!profile || !profile.onboardingDone) {
    return <OnboardingPage />;
  }

  return (
    <HashRouter>
      <AchievementToast achievementId={justUnlocked} onDismiss={clearJustUnlocked} />
      <Routes>
        <Route path="/" element={<TodayPage />} />
        <Route path="/nutrition" element={<NutritionHistoryPage />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
        <Route path="/workouts/builder" element={<WorkoutBuilderPage />} />
        <Route path="/workouts/history" element={<WorkoutHistoryPage />} />
        <Route path="/workouts/:programId" element={<ProgramDetailPage />} />
        <Route path="/workouts/:programId/:dayId" element={<ActiveWorkoutPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <TabBar />
    </HashRouter>
  );
}
