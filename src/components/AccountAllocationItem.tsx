import { View, Text } from 'react-native';
import AccountAllocation from '../model/AccountAllocation';
import { withObservables } from '@nozbe/watermelondb/react';
import Account from '../model/Account';
import numeral from 'numeral'

type AccountAllocationItem = {
  accountAllocation: AccountAllocation;
  account: Account;
};

const AccountAllocationItem = ({
  accountAllocation,
  account,
}: AccountAllocationItem) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>{account.name}</Text>
      <Text>{numeral(accountAllocation.amount).format('0,0')},000VNĐ</Text>
    </View>
  );
};

const enhance = withObservables(
  ['accountAllocation'],
  ({ accountAllocation }: { accountAllocation: AccountAllocation }) => ({
    accountAllocation,
    account: accountAllocation.account,
  })
);

export default enhance(AccountAllocationItem);
