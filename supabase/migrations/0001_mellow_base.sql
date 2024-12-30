/*
  # Create charts table for storing analysis history

  1. New Tables
    - `charts`
      - `id` (uuid, primary key)
      - `image_url` (text, stores base64 image)
      - `analysis` (text, stores GPT analysis)
      - `created_at` (timestamp with timezone)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to:
      - Insert their own charts
      - Read their own charts
*/

CREATE TABLE IF NOT EXISTS charts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  analysis text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE charts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own charts"
  ON charts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own charts"
  ON charts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);