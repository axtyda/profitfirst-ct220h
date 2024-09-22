import { FlatList } from "react-native"
import AccountListItem from "./AccountListItem"
import { useEffect, useState } from "react";
import { accountsCollection } from "../db";
import Account from "../model/Account";

import { withObservables } from '@nozbe/watermelondb/react';

export default function AccountsList() {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const accounts = await accountsCollection.query().fetch();
            setAccounts(accounts);
        };
        fetchAccounts();
    }, []);

    return (
        <FlatList 
            data={accounts}
            contentContainerStyle={{gap: 5}} 
            renderItem={() => <AccountListItem />} 
        />
    );
}

// const enhance = withObservables([], () => ({
//     accounts: accountsCollection.query(),
//   }));
  
// export default enhance(AccountsList);
