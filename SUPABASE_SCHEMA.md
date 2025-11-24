# Supabase Database Schema

This document describes the database schema for MarsFocus when using Supabase.

## Tables

### users
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT,
  name TEXT NOT NULL,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  badges JSONB DEFAULT '[]',
  total_focus_time INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### missions
```sql
CREATE TABLE missions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL,
  tasks JSONB DEFAULT '[]',
  quiz_questions JSONB DEFAULT '[]',
  start_time BIGINT,
  end_time BIGINT,
  distractions JSONB DEFAULT '[]',
  xp_earned INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_missions_user_id ON missions(user_id);
CREATE INDEX idx_missions_completed ON missions(completed);
```

## Setup Instructions

1. Create a new Supabase project at https://supabase.com

2. Run the SQL commands above in the Supabase SQL Editor

3. Get your project URL and anon key from Project Settings > API

4. Update your `.env.local` file with the values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

5. (Optional) Set up Row Level Security (RLS) policies:
   ```sql
   -- Enable RLS
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

   -- Allow users to read/write their own data
   CREATE POLICY "Users can view own data" ON users
     FOR SELECT USING (auth.uid()::text = id);

   CREATE POLICY "Users can update own data" ON users
     FOR UPDATE USING (auth.uid()::text = id);

   CREATE POLICY "Users can view own missions" ON missions
     FOR SELECT USING (auth.uid()::text = user_id);

   CREATE POLICY "Users can insert own missions" ON missions
     FOR INSERT WITH CHECK (auth.uid()::text = user_id);
   ```

## Migration from localStorage

The app currently uses Zustand with localStorage persistence. To migrate to Supabase:

1. Set up the Supabase tables as described above
2. Configure environment variables
3. The app will automatically start syncing new data to Supabase
4. Existing localStorage data will continue to work
5. To migrate old data, you can manually insert it into Supabase

## Notes

- The app works without Supabase configuration (localStorage only)
- When Supabase is configured, data syncs to both localStorage and Supabase
- User authentication is optional but recommended for production
