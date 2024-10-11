import { synchronize } from '@nozbe/watermelondb/sync';
import database from './index';
import { supabase } from '../lib/supabase';
import { getLoggedInUserId } from '../app/(auth)/getLoggedInUserId';


let debounce = true;

export async function mySync() {

  const loggedInUserId = await getLoggedInUserId();  // Lấy user_id người đăng nhập

  await synchronize({
    database,
    sendCreatedAsUpdated: true,

    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      console.log('Pulling data');
      // const { data, error } = await supabase.rpc('pull', {
      //   last_pulled_at: lastPulledAt,
      //   schemaversion: schemaVersion,
      //   migration: migration,
      // });

      //hàm pulltest
// Gọi hàm pull với user_id của người đăng nhập
      debounce = true;
      let _lastPulledAt = debounce ? 0 : lastPulledAt;


      const { data, error } = await supabase.rpc('test', {
         last_pulled_at: _lastPulledAt,
         schemaversion: schemaVersion,
         migration: migration,
        _user_id: loggedInUserId  // Truyền user_id của người đăng nhập
      });

      if (debounce){
        debounce = false;
      }

/////hàm pulltest
      console.log(error);
      console.log(JSON.stringify(data));
      return {
        changes: data.changes,
        timestamp: data.timestamp,
      };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.log('Pushing data');

      const { error } = await supabase.rpc('push', { changes });

      console.log('Error: ', error);

      console.log(changes);

      console.log("Changes data: ", JSON.stringify(changes, null, 2));

      // push changes to supabase


    },
  });
}
