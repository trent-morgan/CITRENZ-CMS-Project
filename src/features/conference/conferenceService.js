import { supabase } from '../../lib/supabaseClient';

export const getConferences = async () => {
  const { data, error } = await supabase
    .from('conferences') // The name of your table in Supabase
    .select('*');        // Select all columns

  if (error) throw error;
  return data;
};