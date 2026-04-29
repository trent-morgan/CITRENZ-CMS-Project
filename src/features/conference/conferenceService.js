import { supabase } from '../../lib/supabaseClient';

export const getConferences = async () => {
  const { data, error } = await supabase
    .from('conferences') 
    .select('*');       

  if (error) throw error;
  return data;
};