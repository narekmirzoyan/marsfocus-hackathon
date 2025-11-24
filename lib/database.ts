import { supabase, isSupabaseConfigured } from './supabase';
import { Mission, User } from '@/types';

export const syncMissionToDatabase = async (mission: Mission): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Mission saved to localStorage only.');
    return false;
  }

  try {
    const { error } = await supabase!
      .from('missions')
      .insert({
        id: mission.id,
        user_id: mission.userId || 'local-user',
        topic: mission.topic,
        description: mission.description,
        duration: mission.duration,
        tasks: mission.tasks,
        quiz_questions: mission.quizQuestions,
        start_time: mission.startTime,
        end_time: mission.endTime,
        distractions: mission.distractions,
        xp_earned: mission.xpEarned,
        completed: mission.completed,
        status: mission.status,
        created_at: new Date(mission.createdAt).toISOString(),
      });

    if (error) {
      console.error('Error syncing mission to database:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error syncing mission:', error);
    return false;
  }
};

export const syncUserToDatabase = async (user: User): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. User data saved to localStorage only.');
    return false;
  }

  try {
    const { error } = await supabase!
      .from('users')
      .upsert({
        id: user.id,
        email: user.email,
        name: user.name,
        total_xp: user.totalXP,
        level: user.level,
        badges: user.badges,
        total_focus_time: user.totalFocusTime,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error syncing user to database:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error syncing user:', error);
    return false;
  }
};

export const fetchUserMissions = async (userId: string): Promise<Mission[]> => {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabase!
      .from('missions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching missions:', error);
      return [];
    }

    return data as Mission[];
  } catch (error) {
    console.error('Unexpected error fetching missions:', error);
    return [];
  }
};
