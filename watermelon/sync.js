import { synchronize } from '@nozbe/watermelondb/sync'
import database from './db';
import axios from 'axios';

const  mySync = async () => {
  try {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {


        const response = await axios.get(`https://hagys.pagekite.me/pull`);

        const changes = response.data.changes;
        const timestamp = response.data.timestamp;


        console.log(changes);
        console.log(timestamp);

        return { changes, timestamp }
      },
      pushChanges: async ({ changes, lastPulledAt }) => {
        console.log(changes);

        const response = await axios.post('https://hagys.pagekite.me/push', {changes, lastPulledAt} );
        
        if (!response.ok) {
          throw new Error(await response.text())
        }
      },
    })
  } catch (error) {
    console.log(error)      
  }
}

export default mySync;